typescript
import React, { useState, useRef, useCallback, useEffect } from 'react';
import { SendIcon, PaperclipIcon, MicIcon, StopIcon } from './icons';
import Loader from './Loader';
import { parseTransactionFromText, analyzeImage, connectToLive } from '../services/geminiService';
import { useData } from '../context/DataContext';
import { AiParsedTransaction } from '../types';
import { decode, decodeAudioData, encode } from '../utils/audioUtils';
import { LiveServerMessage, LiveSession } from '@google/genai';

interface InputAreaProps {
  onTransactionAdded: () => void;
}

const InputArea: React.FC<InputAreaProps> = ({ onTransactionAdded }) => {
  const [text, setText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [userTranscription, setUserTranscription] = useState('');
  
  const { addTransaction, accounts, categories } = useData();
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const userTranscriptionRef = useRef('');
  const liveSessionRef = useRef<LiveSession | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const scriptProcessorRef = useRef<ScriptProcessorNode | null>(null);
  const mediaStreamSourceRef = useRef<MediaStreamAudioSourceNode | null>(null);
  const outputAudioContextRef = useRef<AudioContext | null>(null);
  const nextStartTimeRef = useRef(0);


  const handleAddTransaction = (parsedTx: AiParsedTransaction) => {
    const fromAccount = accounts.find(a => a.name.toLowerCase() === parsedTx.fromAccountName?.toLowerCase());
    const toAccount = accounts.find(a => a.name.toLowerCase() === parsedTx.toAccountName?.toLowerCase());
    let category = categories.find(c => c.name.toLowerCase() === parsedTx.categoryName?.toLowerCase());
    
    if (!category && parsedTx.categoryName) {
        category = {
            id: `new-cat-${parsedTx.categoryName.toLowerCase().replace(/\s+/g, '-')}`,
            name: parsedTx.categoryName,
            icon: 'CategoryTagIcon',
            groupId: parsedTx.type === 'income' ? 'income' : 'products',
        };
    }

    addTransaction({
        type: parsedTx.type,
        amount: parsedTx.amount,
        currency: parsedTx.currency || 'KZT',
        date: parsedTx.date || new Date().toISOString().split('T')[0],
        fromAccountId: fromAccount?.id,
        toAccountId: toAccount?.id,
        categoryId: category?.id || (parsedTx.type === 'income' ? 'income5' : 'prod1'),
        payee: parsedTx.payeeName,
        note: parsedTx.note,
    });
    onTransactionAdded();
  };

  const handleSubmit = useCallback(async (textOverride?: string) => {
    const textToProcess = textOverride ?? text;
    if (!textToProcess.trim()) return;
    setIsLoading(true);
    try {
      const parsedTx = await parseTransactionFromText(textToProcess);
      handleAddTransaction(parsedTx);
      setText('');
    } catch (error) {
      console.error('Error parsing transaction:', error);
    } finally {
      setIsLoading(false);
    }
  }, [text, addTransaction, onTransactionAdded]);

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsLoading(true);
    try {
      const reader = new FileReader();
      reader.onloadend = async () => {
        const base64String = (reader.result as string).split(',')[1];
        try {
            const parsedTx = await analyzeImage(base64String, file.type);
            handleAddTransaction(parsedTx);
        } catch(e) {
            console.error("Error analyzing image:", e);
        } finally {
            setIsLoading(false);
        }
      };
      reader.readAsDataURL(file);
    } catch (error) {
      console.error('Error processing file:', error);
      setIsLoading(false);
    }
  };
  
  const stopListening = useCallback(() => {
    setIsListening(false);
    liveSessionRef.current?.close();
    liveSessionRef.current = null;
    scriptProcessorRef.current?.disconnect();
    mediaStreamSourceRef.current?.disconnect();
    audioContextRef.current?.close().catch(console.error);
    setUserTranscription('');
    userTranscriptionRef.current = '';
  }, []);
  
  const playAudio = async (base64Audio: string) => {
      if (!outputAudioContextRef.current) {
         outputAudioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
      }
      const ctx = outputAudioContextRef.current;
      const audioBuffer = await decodeAudioData(decode(base64Audio), ctx, 24000, 1);
      
      nextStartTimeRef.current = Math.max(nextStartTimeRef.current, ctx.currentTime);
      const source = ctx.createBufferSource();
      source.buffer = audioBuffer;
      source.connect(ctx.destination);
      source.start(nextStartTimeRef.current);
      nextStartTimeRef.current += audioBuffer.duration;
  };

  const startListening = async () => {
    setIsListening(true);
    setUserTranscription('Говорите...');
    try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 16000 });
        
        const sessionPromise = connectToLive({
            onOpen: () => {
                mediaStreamSourceRef.current = audioContextRef.current!.createMediaStreamSource(stream);
                scriptProcessorRef.current = audioContextRef.current!.createScriptProcessor(4096, 1, 1);

                scriptProcessorRef.current.onaudioprocess = (audioProcessingEvent) => {
                    const inputData = audioProcessingEvent.inputBuffer.getChannelData(0);
                    const pcmData = encode(new Uint8Array(new Int16Array(inputData.map(f => f * 32768)).buffer));
                    
                    sessionPromise.then(session => {
                        session.sendRealtimeInput({
                            media: {
                                data: pcmData,
                                mimeType: 'audio/pcm;rate=16000',
                            }
                        });
                    });
                };
                mediaStreamSourceRef.current.connect(scriptProcessorRef.current);
                scriptProcessorRef.current.connect(audioContextRef.current!.destination);
            },
            onMessage: async (message: LiveServerMessage) => {
                if (message.serverContent?.inputTranscription) {
                    const textChunk = message.serverContent!.inputTranscription!.text;
                    setUserTranscription(prev => {
                        const newTranscription = prev === 'Говорите...' ? textChunk : prev + textChunk;
                        userTranscriptionRef.current = newTranscription;
                        return newTranscription;
                    });
                }
                if (message.serverContent?.turnComplete) {
                     const finalTranscription = userTranscriptionRef.current;
                     stopListening();
                     if (finalTranscription.trim() && finalTranscription !== 'Говорите...') {
                         setText(finalTranscription);
                         await handleSubmit(finalTranscription);
                     }
                }
                const audioData = message.serverContent?.modelTurn?.parts[0]?.inlineData?.data;
                if (audioData) {
                    await playAudio(audioData);
                }
            },
            onError: (e) => { console.error('Live session error:', e); stopListening(); },
            onClose: () => { stream.getTracks().forEach(track => track.stop()); },
        });

        liveSessionRef.current = await sessionPromise;

    } catch (err) {
        console.error("Failed to start microphone", err);
        setIsListening(false);
    }
  };
  
  const handleMicClick = () => {
      if (isListening) {
          stopListening();
      } else {
          startListening();
      }
  };
  
  useEffect(() => {
    return () => {
      stopListening();
    };
  }, [stopListening]);


  return (
    <div className="bg-gray-800 p-3 w-full">
      <div className="bg-gray-700 rounded-xl p-2 flex items-center space-x-2">
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          className="hidden"
          accept="image/*"
        />
        <button
          onClick={() => fileInputRef.current?.click()}
          className="p-2 text-gray-400 hover:text-white transition-colors"
          disabled={isLoading || isListening}
        >
          <PaperclipIcon className="w-6 h-6" />
        </button>
        <div className="flex-grow relative">
            <textarea
              value={isListening ? userTranscription : text}
              onChange={(e) => setText(e.target.value)}
              onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSubmit(); }}}
              placeholder="Например: кофе 3500 тг с карты сегодня"
              className="w-full bg-transparent p-2 pr-10 resize-none outline-none text-gray-200 placeholder-gray-500"
              rows={1}
              disabled={isLoading || isListening}
            />
            {isLoading && <div className="absolute right-2 top-1/2 -translate-y-1/2"><Loader text=""/></div>}
        </div>
        <button
            onClick={handleMicClick}
            className={`p-2 rounded-full transition-colors ${isListening ? 'bg-red-500 text-white' : 'text-gray-400 hover:text-white'}`}
            disabled={isLoading}
        >
            {isListening ? <StopIcon className="w-6 h-6" /> : <MicIcon className="w-6 h-6" />}
        </button>
        <button
          onClick={() => handleSubmit()}
          className="bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600 transition-colors disabled:bg-gray-600"
          disabled={isLoading || isListening || (!isListening && !text.trim())}
        >
          <SendIcon className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
};

export default InputArea;
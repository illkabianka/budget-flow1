typescript
import { GoogleGenAI, Type, Modality, LiveSession, LiveServerMessage } from "@google/genai";
import { AiParsedTransaction } from '../types';

// Получаем API ключ из переменных окружения Vite
const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
if (!apiKey) {
  throw new Error("VITE_GEMINI_API_KEY environment variable is not set.");
}

const ai = new GoogleGenAI({ apiKey });

const SYSTEM_INSTRUCTION = `Ты — умный финансовый ассистент внутри приложения FlowBudget. Твоя роль - помогать пользователю вести личные финансы. Ты должен понимать запросы на русском, английском и казахском, но всегда отвечать на русском. Твоя основная задача - преобразовать текстовые команды пользователя в структурированный JSON объект транзакции. Поля: type ("income", "expense", "transfer"), amount (число), currency (строка, "KZT", "RUB", "USD"), date (ISO "YYYY-MM-DD"), fromAccountName, toAccountName, categoryName, payeeName, note. Если информации не хватает, оставь поле пустым. Не выдумывай данные. 'Сегодня' и другие относительные даты преобразуй в конкретные.`;

const transactionSchema = {
  type: Type.OBJECT,
  properties: {
    type: { type: Type.STRING, enum: ['income', 'expense', 'transfer'], description: 'Тип транзакции' },
    amount: { type: Type.NUMBER, description: 'Сумма транзакции' },
    currency: { type: Type.STRING, description: 'Валюта (KZT, USD, RUB)', nullable: true },
    date: { type: Type.STRING, description: 'Дата в формате YYYY-MM-DD', nullable: true },
    fromAccountName: { type: Type.STRING, description: 'Название счета списания', nullable: true },
    toAccountName: { type: Type.STRING, description: 'Название счета зачисления', nullable: true },
    categoryName: { type: Type.STRING, description: 'Название категории', nullable: true },
    payeeName: { type: Type.STRING, description: 'Получатель/магазин', nullable: true },
    note: { type: Type.STRING, description: 'Заметка к транзакции', nullable: true },
  },
  required: ['type', 'amount'],
};

export const parseTransactionFromText = async (text: string): Promise<AiParsedTransaction> => {
  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash',
    contents: `Разбери эту транзакцию: "${text}"`,
    config: {
      systemInstruction: SYSTEM_INSTRUCTION,
      responseMimeType: 'application/json',
      responseSchema: transactionSchema,
    },
  });
  
  const jsonString = response.text.trim();
  return JSON.parse(jsonString) as AiParsedTransaction;
};

export const analyzeImage = async (base64Image: string, mimeType: string): Promise<AiParsedTransaction> => {
  const imagePart = {
    inlineData: {
      data: base64Image,
      mimeType,
    },
  };
  const textPart = {
    text: 'Извлеки данные о транзакции из этого изображения (чек).',
  };

  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash',
    contents: { parts: [imagePart, textPart] },
    config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        responseMimeType: 'application/json',
        responseSchema: transactionSchema,
    }
  });

  const jsonString = response.text.trim();
  return JSON.parse(jsonString) as AiParsedTransaction;
};

export const generateSpeech = async (text: string): Promise<string> => {
    const response = await ai.models.generateContent({
        model: "gemini-2.5-flash-preview-tts",
        contents: [{ parts: [{ text }] }],
        config: {
            responseModalities: [Modality.AUDIO],
            speechConfig: {
                voiceConfig: {
                    prebuiltVoiceConfig: { voiceName: 'Kore' },
                },
            },
        },
    });
    const base64Audio = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
    if (!base64Audio) {
        throw new Error("No audio data received from TTS API.");
    }
    return base64Audio;
};

export const connectToLive = (callbacks: {
    onOpen: () => void;
    onMessage: (message: LiveServerMessage) => void;
    onError: (e: ErrorEvent) => void;
    onClose: (e: CloseEvent) => void;
}): Promise<LiveSession> => {
    return ai.live.connect({
        model: 'gemini-2.5-flash-native-audio-preview-09-2025',
        callbacks: {
            onopen: callbacks.onOpen,
            onmessage: callbacks.onMessage,
            onerror: callbacks.onError,
            onclose: callbacks.onClose,
        },
        config: {
            responseModalities: [Modality.AUDIO],
            inputAudioTranscription: {},
            outputAudioTranscription: {},
            systemInstruction: 'Ты — дружелюбный и полезный финансовый ассистент. Слушай, как пользователь диктует транзакцию, и подтверждай её. Отвечай кратко и в разговорной манере.',
        },
    });
};
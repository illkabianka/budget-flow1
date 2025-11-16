import os
import re
from perplexity import Perplexity  # официальная библиотека Perplexity 

# 1. Ключ API из переменной окружения (GitHub Actions передаст его из секрета)
API_KEY = os.getenv("PERPLEXITY_API_KEY")
if not API_KEY:
    raise RuntimeError("PERPLEXITY_API_KEY не установлен. Проверь секреты GitHub.")

# 2. Инициализируем клиента Perplexity
client = Perplexity(
    api_key=API_KEY,  # можно было бы не передавать, он и так возьмёт PERPLEXITY_API_KEY из env 
)

# 3. Собираем исходный код проекта
project_code = ""

for root, dirs, files in os.walk("."):
    # пропускаем служебные папки
    skip_dirs = {".git", ".github", "__pycache__", ".venv", "venv", "node_modules"}
    if any(sd in root for sd in skip_dirs):
        continue

    for filename in files:
        # расширения файлов, которые считаем кодом
        if filename.endswith((
            ".py", ".js", ".ts", ".tsx", ".jsx",
            ".java", ".kt", ".cs", ".cpp", ".c", ".go",
            ".gs", ".html", ".css", ".json", ".yaml", ".yml"
        )):
            filepath = os.path.join(root, filename)
            try:
                with open(filepath, "r", encoding="utf-8") as f:
                    code_content = f.read()
            except Exception:
                # если файл не читается — просто пропускаем
                continue

            project_code += f"\n\nFile: {filepath}\n``` \n{code_content}\n```"

if not project_code.strip():
    print("[WARN] Не найдено ни одного файла кода для анализа.")
    raise SystemExit(0)

# 4. Формируем промпт для Perplexity
prompt = (
    "Ты — ассистент по программированию и ревью кода.\n"
    "Тебе даётся код всего проекта (несколько файлов).\n\n"
    "ТВОЯ ЗАДАЧА:\n"
    "1) Найти ТЕХНИЧЕСКИЕ ошибки (синтаксические, неправильные вызовы API, ошибки,\n"
    "   которые мешают запуску/работе кода).\n"
    "2) Найти КОНЦЕПТУАЛЬНЫЕ ошибки (логика, поведение, несоответствие очевидным требованиям и т.п.).\n\n"
    "ФОРМАТ ОТВЕТА:\n"
    "- Сначала коротко опиши, что ты нашёл, текстом.\n"
    "- Если есть ТЕХНИЧЕСКИЕ ошибки и ты можешь их исправить, верни ИСПРАВЛЕННЫЙ КОД\n"
    "  ТОЛЬКО ДЛЯ ТЕХ файлов, где есть такие ошибки, в формате:\n"
    "  File: относительный/путь/к/файлу\n"
    "  ```\n"
    "  <ПОЛНЫЙ НОВЫЙ КОД ЭТОГО ФАЙЛА>\n"
    "  ```\n\n"
    "Если есть только КОНЦЕПТУАЛЬНЫЕ проблемы, просто опиши их текстом, без блоков File: ... ```.\n\n"
    "Вот код проекта:\n"
    f"{project_code}"
)

# 5. Вызываем Perplexity Chat Completions (модель sonar) 
print("[INFO] Отправляем код в Perplexity, это может занять некоторое время...")

completion = client.chat.completions.create(
    model="sonar",           # базовая модель Perplexity; можно сменить, если нужно
    messages=[
        {
            "role": "user",
            "content": prompt,
        }
    ],
)

# формат совместим с OpenAI: choices[0].message.content 
analysis = completion.choices[0].message.content
print("===== PERPLEXITY ANALYSIS START =====")
print(analysis)
print("===== PERPLEXITY ANALYSIS END =====")

# 6. Находим блоки с исправленным кодом:
#    File: путь/к/файлу
#    ```
#    <код>
#    ```
pattern = r"File:\s*(.+?)\n```(?:\s*\n)?(.*?)```"
code_blocks = re.findall(pattern, analysis, re.DOTALL)

files_modified = []

for file_path, new_code in code_blocks:
    file_path = file_path.strip()
    new_code = new_code.strip("\n\r ")

    if not file_path or not new_code:
        continue

    if file_path.lower().startswith("file:"):
        file_path = file_path[5:].strip()

    print(f"[INFO] Пытаюсь применить исправления к файлу: {file_path}")

    try:
        with open(file_path, "w", encoding="utf-8") as f:
            f.write(new_code)
        files_modified.append(file_path)
        print(f"[FIXED] Изменения применены к {file_path}")
    except Exception as e:
        print(f"[ERROR] Не удалось записать в {file_path}: {e}")

# 7. Итог
if not files_modified:
    print(
        "[INFO] Perplexity не вернул блоки с исправленным кодом.\n"
        "Скорее всего, либо нет технических ошибок, либо есть только концептуальные замечания.\n"
        "Смотри текст анализа выше (между PERPLEXITY ANALYSIS START/END)."
    )
else:
    print("[INFO] Технические ошибки исправлены в файлах:")
    for f in files_modified:
        print(" -", f)

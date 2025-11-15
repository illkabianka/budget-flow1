import os
import re
import google.generativeai as genai

# 1. Берём ключ из переменной окружения (его передаёт GitHub Actions)
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
if not GEMINI_API_KEY:
    raise RuntimeError("Переменная GEMINI_API_KEY не установлена. Проверь GitHub Secrets.")

# 2. Настраиваем Gemini
genai.configure(api_key=GEMINI_API_KEY)

# Можно выбрать модель полегче/побыстрее, например:
MODEL_NAME = "gemini-1.5-flash"  # при желании можно заменить на pro, но flash дешевле и быстрее

model = genai.GenerativeModel(MODEL_NAME)

# 3. Собираем исходный код проекта
project_code = ""

for root, dirs, files in os.walk("."):
    # Пропускаем служебные папки, чтобы не заспамить модель
    skip_dirs = {".git", ".github", "__pycache__", ".venv", "venv", "node_modules"}
    if any(sd in root for sd in skip_dirs):
        continue

    for filename in files:
        # Список расширений под твою логику (можешь подправить)
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
                # если файл не читается (кодировка и т.п.) — просто пропускаем
                continue

            project_code += f"\n\nFile: {filepath}\n``` \n{code_content}\n```"

if not project_code.strip():
    print("[WARN] Не найдено ни одного файла кода для анализа.")
    raise SystemExit(0)

# 4. Формируем prompt для Gemini
prompt = (
    "Ты — ассистент по программированию и ревью кода.\n"
    "Тебе даётся код всего проекта (несколько файлов).\n\n"
    "ТВОЯ ЗАДАЧА:\n"
    "1) Найти ТЕХНИЧЕСКИЕ ошибки (синтаксические, неправильные вызовы API, ошибки, "
    "которые мешают запуску/работе кода).\n"
    "2) Найти КОНЦЕПТУАЛЬНЫЕ ошибки (логика, поведение, несоответствие очевидным требованиям и т.п.).\n\n"
    "ФОРМАТ ОТВЕТА:\n"
    "- Сначала коротко опиши, что ты нашёл, текстом.\n"
    "- Если есть ТЕХНИЧЕСКИЕ ошибки и ты можешь их исправить, верни ИСПРАВЛЕННЫЙ КОД "
    "ТОЛЬКО ДЛЯ ТЕХ файлов, где есть такие ошибки, в формате:\n"
    "  File: относительный/путь/к/файлу\n"
    "  ```\n"
    "  <ПОЛНЫЙ НОВЫЙ КОД ЭТОГО ФАЙЛА>\n"
    "  ```\n\n"
    "Если есть только КОНЦЕПТУАЛЬНЫЕ проблемы, просто опиши их текстом, без блоков File: ... ```.\n\n"
    "Вот код проекта:\n"
    f"{project_code}"
)

# 5. Вызываем Gemini
print("[INFO] Отправляем код в Gemini, это может занять некоторое время...")

response = model.generate_content(prompt)

analysis = response.text or ""
print("===== GEMINI ANALYSIS START =====")
print(analysis)
print("===== GEMINI ANALYSIS END =====")

# 6. Ищем блоки с исправленным кодом:
#    Формат: File: путь/к/файлу
#            ```
#            <code>
#            ```
pattern = r"File:\s*(.+?)\n```(?:\s*\n)?(.*?)```"
code_blocks = re.findall(pattern, analysis, re.DOTALL)

files_modified = []

for file_path, new_code in code_blocks:
    file_path = file_path.strip()
    new_code = new_code.strip("\n\r ")

    if not file_path or not new_code:
        continue

    # иногда модель может вывести повторно 'File:' в имени — подстрахуемся
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

# 7. Итоговая информация
if not files_modified:
    print(
        "[INFO] Gemini не вернул блоки с исправленным кодом.\n"
        "Скорее всего, либо нет технических ошибок, либо есть только концептуальные замечания.\n"
        "Смотри текст анализа выше (между GEMINI ANALYSIS START/END)."
    )
else:
    print("[INFO] Технические ошибки исправлены в файлах:")
    for f in files_modified:
        print(" -", f)

# Gulp 5 Modern Build Pipeline

Современная система сборки на базе **Gulp 5** с использованием **ES Modules**, **pnpm** и автоматизированными проверками безопасности.

## Технологии

| Компонент | Версия | Описание |
|-----------|--------|----------|
| Gulp | 5.0.1 | Сборщик задач |
| Node.js | >= 18 | Runtime |
| pnpm | 9+ | Менеджер пакетов |
| BrowserSync | 3.0.4 | Live-reload сервер |

## Быстрый старт

```bash
# Установить зависимости
pnpm install

# Запустить dev-режим (сборка + live-reload)
pnpm run dev

# Продакшен сборка
pnpm run build
```

## Структура проекта

```
├── src/
│   ├── css/           # Исходные стили
│   │   ├── main.css
│   │   └── media.css
│   └── js/            # Исходные скрипты
│       ├── lib.js
│       └── main.js
├── Картинки/          # Исходные изображения
├── build/             # Результат сборки (git ignored)
│   ├── css/style.css
│   └── js/script.js
├── gulpfile.mjs       # Конфигурация сборки (ESM)
├── index.html         # Главная страница
├── package.json
└── pnpm-lock.yaml
```

## Gulp-задачи

| Команда | Описание |
|---------|----------|
| `pnpm run build` | Очистка `build/`, сборка CSS + JS + HTML |
| `pnpm run dev` | Сборка + BrowserSync с live-reload |
| `pnpm run clean` | Удаление содержимого `build/` |
| `pnpm run image` | Копирование изображений в `build/img` |

## Pipeline обработки

### CSS
1. Конкатенация файлов в `style.css`
2. Минификация (clean-css, level 2)
3. Автопрефиксы (Autoprefixer)
4. Вывод в `build/css/`

### JavaScript
1. Конкатенация файлов в `script.js`
2. Минификация (UglifyJS, toplevel)
3. Вывод в `build/js/`

### HTML
1. Минификация (html-minifier-terser)
2. Удаление комментариев
3. Вывод в корень проекта

## Безопасность

- **0 известных уязвимостей** (`pnpm audit` clean)
- **Dependabot** — автоматические PR с обновлениями зависимостей каждую неделю
- **CodeQL** — статический анализ безопасности JavaScript
- **CI audit** — проверка уязвимостей в каждом PR
- Все зависимости актуальные и поддерживаемые

### GitHub Actions

| Workflow | Описание |
|----------|----------|
| `ci.yml` | Сборка + аудит на Node 18/20/22 |
| `codeql.yml` | CodeQL security analysis (push + PR + weekly) |

## Pull Requests

Репозиторий настроен для приёма PR:

1. Fork репозиторий
2. Создай ветку `feature/название`
3. Внеси изменения
4. Запусти `pnpm run build` для проверки
5. Открой PR с использованием шаблона

## Требования

- Node.js >= 18.0.0
- pnpm (установить: `corepack enable && corepack prepare pnpm@latest --activate`)

## Лицензия

ISC

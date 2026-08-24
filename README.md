# Gulp + Webpack 2026

Гибридная система сборки: **Gulp 5** для оркестрации задач + **Webpack 5** для JS бандлинга с **Babel**.

## Стек

| Компонент | Версия | Роль |
|-----------|--------|------|
| Gulp | 5.0.1 | Оркестрация задач (CSS, HTML, изображения) |
| Webpack | 5.109 | JS бандлинг, модули, минификация |
| Babel | 8.0 | Транспиляция ES6+ → совместимый JS |
| BrowserSync | 3.0.4 | Dev-сервер с live-reload |
| pnpm | 10.33 | Менеджер пакетов |

## Быстрый старт

```bash
# Установка
pnpm install

# Dev-режим (сборка + live-reload на :3000)
pnpm run dev

# Продакшен сборка
pnpm run build

# Только Webpack
pnpm run webpack
```

## Структура проекта

```
├── src/
│   ├── css/
│   │   ├── main.css
│   │   └── media.css
│   └── js/
│       ├── app.js          # Webpack entry point
│       ├── lib.js          # Модуль с функциями
│       └── main.js         # Рендер результатов
├── Картинки/               # Исходные изображения
├── build/                  # Результат сборки
│   ├── css/style.css
│   ├── js/bundle.js
│   ├── js/vendor.js        # (при наличии внешних зависимостей)
│   ├── img/
│   └── index.html
├── gulpfile.mjs            # Gulp: CSS, HTML, images, dev server
├── webpack.config.js       # Webpack: JS bundling + Babel
├── babel.config.js         # Babel: @babel/preset-env
├── index.html              # Исходный HTML
└── package.json
```

## Pipeline

### JavaScript (Webpack)

```
src/js/app.js → Babel (ES6+ → ES5) → Bundle + vendor split → build/js/bundle.js
```

- ES modules (`import`/`export`)
- Tree shaking
- Code splitting (vendor chunk)
- Минификация (terser)

### CSS (Gulp)

```
src/css/**/*.css → Autoprefixer → CleanCSS (level 2) → build/css/style.css
```

### HTML (Gulp)

```
index.html → html-minifier-terser → build/index.html
```

### Изображения (Gulp)

```
Картинки/* → rename (prefix/suffix) → build/img/
```

## Команды

| Команда | Описание |
|---------|----------|
| `pnpm run build` | Полная сборка (CSS + JS + HTML + images) |
| `pnpm run dev` | Сборка + BrowserSync на `localhost:3000` |
| `pnpm run clean` | Удаление `build/` |
| `pnpm run webpack` | Только Webpack бандл |
| `pnpm run webpack:dev` | Webpack в watch mode (development) |

## Безопасность

- **0 уязвимостей** (`pnpm audit` clean)
- Dependabot + CodeQL в CI
- Все зависимости актуальные

## Требования

- Node.js >= 22.0.0
- pnpm (`corepack enable`)

## Лицензия

ISC

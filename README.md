# NextGen Slicer Website

Official landing page for the NextGen Slicer project by BallsAi.

NextGen Slicer is a product concept and runtime prototype for adaptive FDM 3D printing. The project connects model preparation, layer-by-layer risk preview, multimodal monitoring, telemetry, Safety Gate logic and bounded correction into one product story.

This repository contains only the public website. It does not include the full working folder, research archive, presentation sources, local drafts or the separate interactive demo repository.

## Live Links

- Website repository: https://github.com/BallsTeamOff/NextGen-Slicer-website
- Runtime demo contour: https://dank1-pro.github.io/nextgen-slicer/
- Team contact: ballsteamsupport@gmail.com

## What The Project Is

NextGen Slicer is not positioned as a finished industrial product yet. It is currently a strong runtime prototype and an engineering foundation for validation on a real FDM stand.

The project goal is to move FDM printing from static G-code execution toward a controlled runtime contour:

- Prepare: model, profile, material and safety constraints before the print cycle.
- Preview: layer/path/ETA/material risk analysis before runtime monitoring.
- Monitor: telemetry, defect signals, AI recommendation, Safety Gate and bounded correction during the print cycle.
- Evidence: logs, HDF5 datasets, audit trail and reports for validation.

The key principle is safety-first control. The AI layer should not freely generate arbitrary G-code. It proposes limited actions, while Safety Gate validates ranges, context, command stream and audit logging before any correction.

## Current Status

What already exists:

- Product landing page with full project story.
- Browser-only runtime demo contour.
- Product scenario: Prepare -> Preview -> Monitor.
- Operator console concept with telemetry, alerts, AI recommendation and Safety Gate.
- Architecture and technical specifications for Unity simulation, sensors, data contracts and future hardware validation.

What is still mocked or pending validation:

- Real printer connection.
- Real Cura slicing integration.
- Real Unity WebSocket stream.
- Real ML inference.
- Real USB/Marlin G-code patching.
- KPI validation on physical FDM scenarios.

Target metrics such as 40-60% scrap reduction, up to 80% lower operator load and sub-2-second anomaly reaction are engineering hypotheses, not confirmed production results.

## Repository Structure

```text
.
├── index.html
├── styles.css
├── script.js
├── assets/
│   └── logo/
├── img/
└── .nojekyll
```

The site is static. There is no build step and no package installation.

## Local Run

Open `index.html` directly in a browser, or serve the folder with any static server.

Example:

```bash
python -m http.server 8000
```

Then open:

```text
http://localhost:8000
```

## GitHub Pages Setup

To publish this website from GitHub:

1. Upload only the contents of this website folder to `BallsTeamOff/NextGen-Slicer-website`.
2. Go to repository `Settings`.
3. Open `Pages`.
4. In `Build and deployment`, choose `Deploy from a branch`.
5. Select branch `main` and folder `/root`.
6. Save.

After GitHub Pages finishes deployment, the website should be available at:

```text
https://ballsteamoff.github.io/NextGen-Slicer-website/
```

If GitHub shows a different Pages URL in repository settings, use that URL as the final public website link.

---

# Сайт NextGen Slicer

Официальный лендинг проекта NextGen Slicer от команды BallsAi.

NextGen Slicer — это продуктовая концепция и runtime-прототип для адаптивной FDM 3D-печати. Проект связывает подготовку модели, постслойный предпросмотр рисков, мультимодальный мониторинг, телеметрию, Safety Gate и ограниченную коррекцию в одну понятную продуктовую историю.

В этом репозитории хранится только публичный сайт. Сюда не входят рабочая папка, архив исследований, исходники презентаций, локальные черновики и отдельный репозиторий интерактивного demo-контура.

## Ссылки

- Репозиторий сайта: https://github.com/BallsTeamOff/NextGen-Slicer-website
- Demo-контур runtime: https://dank1-pro.github.io/nextgen-slicer/
- Контакт команды: ballsteamsupport@gmail.com

## Что это за проект

NextGen Slicer пока не подаётся как готовый промышленный продукт. Текущий статус — сильный runtime-прототип и инженерная база для проверки на реальном FDM-стенде.

Цель проекта — перевести FDM-печать из статичного выполнения G-code в управляемый runtime-контур:

- Подготовка: модель, профиль, материал и safety-ограничения до старта печати.
- Предпросмотр: анализ слоёв, траектории, ETA, расхода материала и рисков.
- Мониторинг: телеметрия, сигналы дефектов, AI-рекомендация, Safety Gate и bounded correction во время печати.
- Доказательная база: логи, HDF5-датасеты, audit trail и отчёты для валидации.

Ключевой принцип — безопасность. AI-слой не должен свободно генерировать произвольный G-code. Он предлагает ограниченное действие, а Safety Gate проверяет диапазоны, контекст, поток команд и журналирование до применения коррекции.

## Текущий статус

Что уже есть:

- Продуктовый лендинг с полной историей проекта.
- Browser-only runtime demo-контур.
- Сценарий продукта: подготовка -> предпросмотр -> мониторинг.
- Концепт operator console с телеметрией, предупреждениями, AI-рекомендацией и Safety Gate.
- Архитектура и ТЗ по Unity-симуляции, сенсорам, контракту данных и будущей аппаратной проверке.

Что пока является mock или требует проверки:

- Подключение к реальному принтеру.
- Реальная интеграция Cura slicing.
- Реальный Unity WebSocket stream.
- Реальный ML inference.
- Реальный USB/Marlin G-code patching.
- Подтверждение KPI на физических FDM-сценариях.

Показатели 40-60% снижения брака, до 80% снижения нагрузки оператора и реакция менее 2 секунд являются инженерными гипотезами, а не подтверждёнными промышленными результатами.

## Структура репозитория

```text
.
├── index.html
├── styles.css
├── script.js
├── assets/
│   └── logo/
├── img/
└── .nojekyll
```

Сайт статический. Сборка и установка зависимостей не нужны.

## Локальный запуск

Можно открыть `index.html` прямо в браузере или запустить любой статический сервер.

Пример:

```bash
python -m http.server 8000
```

Затем открыть:

```text
http://localhost:8000
```

## Как включить GitHub Pages

Чтобы опубликовать сайт:

1. Залить только содержимое этой папки сайта в `BallsTeamOff/NextGen-Slicer-website`.
2. Открыть `Settings` репозитория.
3. Перейти в `Pages`.
4. В `Build and deployment` выбрать `Deploy from a branch`.
5. Выбрать ветку `main` и папку `/root`.
6. Сохранить настройки.

После деплоя GitHub Pages сайт должен быть доступен по адресу:

```text
https://ballsteamoff.github.io/NextGen-Slicer-website/
```

Если GitHub покажет другой адрес в настройках Pages, нужно использовать именно его.

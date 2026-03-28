# TSW6 Dispatcher — Claude Code Guide

## Project Summary
A React + Vite single-page application for managing Train Sim World 6 Special Edition timetables.
Features: timetable editor, live train tracker, delay calculator, and an AI dispatcher powered by the Anthropic API.

## Tech Stack
- React 18 + Vite (plain JavaScript — types documented via JSDoc in `src/types/index.js`)
- Tailwind CSS v3 (dark mode forced via `class="dark"` on `<html>` in `index.html`)
- Framer Motion — page transitions and chat message animations
- React Router v6 — client-side routing (4 routes)
- `@anthropic-ai/sdk` — streaming AI chat
- localStorage — all persistence (no backend)

## Routes
| Path | Page | Component |
|------|------|-----------|
| `/` | Timetables | `TimetablePage` |
| `/tracker` | Live Tracker | `TrackerPage` |
| `/delay` | Delay Calculator | `DelayPage` |
| `/dispatcher` | AI Dispatcher | `DispatcherPage` |

## Architecture Rules
1. **All timetable state** lives in `src/context/TimetableContext.jsx` (useReducer + localStorage)
2. **All localStorage access** goes through `src/hooks/useLocalStorage.js` — never call `localStorage` directly
3. **Business logic** lives in `src/utils/` and `src/hooks/` — not in components
4. **Tracker state** is session-only (`TrackerContext`) — resets on reload by design
5. **API key** is `VITE_ANTHROPIC_API_KEY` in `.env` — never commit this file

## Folder Guide
```
src/
  constants/    Route definitions + train type enums (never changes at runtime)
  context/      TimetableContext (persistent) + TrackerContext (session)
  hooks/        One hook per domain: useTimetables, useTracker, useAnthropicChat
  utils/        Pure functions: timeUtils, timetableUtils, cascadeUtils
  data/         sampleTimetables.json (seed data for first load)
  components/
    layout/     Sidebar, TopBar, PageTransition
    ui/         Button, Input, Select, Badge, Modal, StatusIndicator
    timetable/  TimetableList, TimetableCard, TimetableEditor, StopEditor, ImportExportPanel
    tracker/    TrainSelector, RouteProgress, LiveDisplay, SimulationControls
    delay/      DelayInput, DelayResult, CascadePanel
    dispatcher/ ChatWindow, ChatMessage, ChatInput, ContextPanel
  pages/        One per route — assembles feature components
```

## Common Patterns
- Times stored as `"HH:MM"` strings — parse/format via `src/utils/timeUtils.js`
- IDs generated with `crypto.randomUUID()` at creation time
- Timetable mutations go through `dispatch()` from `TimetableContext`, never direct `setState`
- Modal open/closed state lives in the parent page component

## Adding TSW6 Stations
Edit `src/constants/routes.js` — each route has a `stations: []` array.
Once populated, stop autocomplete (in StopEditor) and route progress dots (in RouteProgress) use them automatically.

## Running
```bash
npm run dev      # Dev server → http://localhost:5173
npm run build    # Production build → dist/
npm run preview  # Preview production build
```

## Environment Variables
```
VITE_ANTHROPIC_API_KEY=your_key_here   # Required for AI Dispatcher
```
**WARNING:** This key is embedded in the browser bundle. Do NOT deploy publicly without moving the API call to a backend proxy (a 20-line Express endpoint is sufficient).

## Security Note
The AI Dispatcher calls the Anthropic API directly from the browser. This is safe for local personal use but the API key will be visible in the JS bundle. For any public-facing deployment, add a `/api/chat` proxy in a backend and change `useAnthropicChat.js` to POST to that endpoint instead.

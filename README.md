# TSW6 Timetable Manager

A personal railway dispatcher tool for **Train Sim World 6 Special Edition** — manage timetables, track trains live, calculate delays and get AI-powered dispatch assistance.

> ⚠️ Work in progress — actively being built.

---

## Features

- **Timetable Editor** — Create and manage timetables for all TSW6 Special Edition routes. Add trains, stops, platforms and departure times.
- **Live Tracker** — Select an active train and track its position in real time. Includes a route progress bar and simulation mode (1x / 2x / 5x speed).
- **Delay Calculator** — Input planned vs. actual times and instantly see delay severity and cascade effects on connecting trains.
- **AI Dispatcher** — Chat with an AI assistant that knows your loaded timetable. Ask questions like _"What happens if IC 1234 is 15 minutes late?"_

---

## Routes

All 8 TSW6 Special Edition routes are included:

| Route                                       | Country        |
| ------------------------------------------- | -------------- |
| Morristown Line (New York – Dover)          | 🇺🇸 USA         |
| Bahnstrecke Leipzig – Dresden               | 🇩🇪 Germany     |
| Mannheim – Kaiserslautern                   | 🇩🇪 Germany     |
| MBTA Boston – Worcester                     | 🇺🇸 USA         |
| Riviera Line (Exeter – Plymouth & Paignton) | 🇬🇧 UK          |
| Cardiff City Network                        | 🇬🇧 UK          |
| Semmeringbahn                               | 🇦🇹 Austria     |
| Zwolle – Groningen                          | 🇳🇱 Netherlands |

---

## Tech Stack

- [React](https://react.dev/) + [Vite](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Framer Motion](https://www.framer.com/motion/)
- [React Router v6](https://reactrouter.com/)
- [Anthropic API](https://www.anthropic.com/) (AI Dispatcher)

---

## Getting Started

### Prerequisites

- Node.js 18+
- An [Anthropic API key](https://console.anthropic.com/) for the AI Dispatcher

### Installation

```bash
git clone https://github.com/pieti30tv/tsw6-timetables-app.git
cd tsw6-timetables-app/tsw6-timetables
npm install
```

### Environment

Create a `.env` file in the project root:

```
VITE_ANTHROPIC_API_KEY=your_api_key_here
```

> ⚠️ This app is intended for **local personal use only**. The API key is bundled client-side — do not deploy publicly without a backend proxy.

### Run

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173)

---

## Project Structure

```
src/
├── components/      # Reusable UI components
├── constants/       # TSW6 routes and train types
├── context/         # Global state (timetables, tracker)
├── hooks/           # Custom React hooks
├── pages/           # Main pages (Timetable, Tracker, Delay, Dispatcher)
├── types/           # JSDoc type definitions
└── utils/           # Helper functions (time, cascade logic, import/export)
```

---

## License

[Apache License 2.0](./LICENSE)

import { useLocation } from 'react-router-dom'
import { useTimetables } from '../../hooks/useTimetables.js'

const pageTitles = {
  '/':           'Timetables',
  '/tracker':    'Live Tracker',
  '/delay':      'Delay Calculator',
  '/dispatcher': 'AI Dispatcher',
}

export function TopBar() {
  const location = useLocation()
  const { activeTimetable } = useTimetables()
  const title = pageTitles[location.pathname] ?? 'TSW6 Dispatcher'

  return (
    <header className="h-14 bg-gray-900/80 backdrop-blur border-b border-gray-800 flex items-center justify-between px-6 shrink-0 sticky top-0 z-10">
      <h1 className="text-sm font-semibold text-gray-100">{title}</h1>
      {activeTimetable && (
        <div className="flex items-center gap-2">
          <span className="hidden sm:block text-xs text-gray-500">Timetable:</span>
          <span className="text-xs text-amber-400 font-medium">{activeTimetable.name}</span>
          <span className="text-xs text-gray-600">
            · {activeTimetable.trains.length} trains
          </span>
        </div>
      )}
    </header>
  )
}

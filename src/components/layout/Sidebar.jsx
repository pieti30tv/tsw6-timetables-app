import { NavLink } from 'react-router-dom'
import { useTimetables } from '../../hooks/useTimetables.js'

const navItems = [
  {
    to: '/',
    label: 'Timetables',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    to: '/tracker',
    label: 'Live Tracker',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
          d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
      </svg>
    ),
  },
  {
    to: '/delay',
    label: 'Delays',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    to: '/dispatcher',
    label: 'AI Dispatcher',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
          d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
      </svg>
    ),
  },
]

export function Sidebar() {
  const { activeTimetable } = useTimetables()

  return (
    <aside className="flex flex-col w-16 md:w-56 bg-gray-900 border-r border-gray-800 shrink-0 min-h-screen">
      {/* Logo / App name */}
      <div className="flex items-center gap-3 px-3 md:px-4 h-14 border-b border-gray-800">
        <div className="w-8 h-8 rounded bg-amber-500 flex items-center justify-center shrink-0">
          <svg className="w-4 h-4 text-gray-950" fill="currentColor" viewBox="0 0 24 24">
            <path d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 8l5 5 5-5M12 3v10" strokeWidth="0" />
            <path fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
              d="M12 3v10m0 0l-4-4m4 4l4-4M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2" />
          </svg>
        </div>
        <span className="hidden md:block text-sm font-bold text-gray-100 tracking-tight leading-tight">
          TSW6<br />
          <span className="text-amber-500 font-normal text-xs">Dispatcher</span>
        </span>
      </div>

      {/* Nav items */}
      <nav className="flex-1 py-4 px-2 space-y-1">
        {navItems.map(item => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.to === '/'}
            className={({ isActive }) =>
              `flex items-center gap-3 px-2 py-2.5 rounded-lg text-sm transition-colors group
               ${isActive
                 ? 'bg-amber-500/15 text-amber-400 border border-amber-500/20'
                 : 'text-gray-400 hover:text-gray-100 hover:bg-gray-800'
               }`
            }
          >
            <span className="shrink-0">{item.icon}</span>
            <span className="hidden md:block">{item.label}</span>
          </NavLink>
        ))}
      </nav>

      {/* Active timetable indicator */}
      {activeTimetable && (
        <div className="px-3 py-3 border-t border-gray-800 hidden md:block">
          <p className="text-xs text-gray-500 uppercase tracking-wider mb-0.5">Active</p>
          <p className="text-xs text-amber-400 font-medium truncate">{activeTimetable.name}</p>
        </div>
      )}
    </aside>
  )
}

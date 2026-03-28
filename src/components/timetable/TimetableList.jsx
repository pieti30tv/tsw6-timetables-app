import { useState } from 'react'
import { useTimetables } from '../../hooks/useTimetables.js'
import { TimetableCard } from './TimetableCard.jsx'
import { Input } from '../ui/Input.jsx'

export function TimetableList({ onEdit }) {
  const { timetables } = useTimetables()
  const [search, setSearch] = useState('')

  const filtered = timetables.filter(t =>
    t.name.toLowerCase().includes(search.toLowerCase()) ||
    t.description?.toLowerCase().includes(search.toLowerCase()) ||
    t.trains.some(tr => tr.trainNumber?.toLowerCase().includes(search.toLowerCase()))
  )

  return (
    <div>
      {/* Search */}
      {timetables.length > 0 && (
        <div className="mb-4">
          <Input
            placeholder="Search timetables…"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
      )}

      {/* List */}
      {filtered.length > 0 ? (
        <div className="space-y-2">
          {filtered.map(t => (
            <TimetableCard key={t.id} timetable={t} onEdit={onEdit} />
          ))}
        </div>
      ) : timetables.length === 0 ? (
        <div className="text-center py-16 text-gray-600">
          <svg className="w-12 h-12 mx-auto mb-3 opacity-30" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1}
              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <p className="text-sm">No timetables yet — create one to get started</p>
        </div>
      ) : (
        <div className="text-center py-8 text-gray-600 text-sm">
          No timetables match "{search}"
        </div>
      )}
    </div>
  )
}

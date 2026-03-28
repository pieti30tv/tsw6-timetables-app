import { useTimetables } from '../../hooks/useTimetables.js'
import { Button } from '../ui/Button.jsx'
import { Badge } from '../ui/Badge.jsx'

export function TimetableCard({ timetable, onEdit }) {
  const { activeTimetableId, setActive, deleteTimetable } = useTimetables()
  const isActive = timetable.id === activeTimetableId

  const routes = [...new Set(timetable.trains.map(t => t.route).filter(Boolean))]
  const updatedDate = new Date(timetable.updatedAt).toLocaleDateString('en-GB', {
    day: '2-digit', month: 'short', year: 'numeric',
  })

  function handleDelete() {
    if (confirm(`Delete "${timetable.name}"? This cannot be undone.`)) {
      deleteTimetable(timetable.id)
    }
  }

  return (
    <div
      className={`
        group bg-gray-900 border rounded-lg p-4 transition-colors
        ${isActive ? 'border-amber-500/40 bg-amber-500/5' : 'border-gray-800 hover:border-gray-700'}
      `}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <h3 className="text-sm font-semibold text-gray-100 truncate">{timetable.name}</h3>
            {isActive && <Badge variant="active">Active</Badge>}
          </div>
          {timetable.description && (
            <p className="text-xs text-gray-500 mt-0.5 truncate">{timetable.description}</p>
          )}
          <div className="flex items-center gap-3 mt-2 text-xs text-gray-500">
            <span>{timetable.trains.length} trains</span>
            {routes.length > 0 && <span>{routes.length} route{routes.length !== 1 ? 's' : ''}</span>}
            <span>Updated {updatedDate}</span>
          </div>
        </div>

        <div className="flex items-center gap-1 shrink-0">
          {!isActive && (
            <Button variant="ghost" size="sm" onClick={() => setActive(timetable.id)}>
              Set Active
            </Button>
          )}
          <Button variant="ghost" size="sm" onClick={() => onEdit(timetable)}>
            Edit
          </Button>
          <Button variant="ghost" size="sm" onClick={handleDelete} className="text-red-500 hover:text-red-400">
            Delete
          </Button>
        </div>
      </div>
    </div>
  )
}

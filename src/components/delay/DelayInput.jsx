import { Input } from '../ui/Input.jsx'
import { Select } from '../ui/Select.jsx'
import { useTimetables } from '../../hooks/useTimetables.js'

export function DelayInput({ selectedTrainId, onTrainChange, plannedTime, onPlannedTimeChange, actualTime, onActualTimeChange }) {
  const { activeTimetable } = useTimetables()
  const trains = activeTimetable?.trains ?? []

  return (
    <div className="bg-gray-900 border border-gray-800 rounded-lg p-4 space-y-4">
      <h3 className="text-xs font-medium text-gray-400 uppercase tracking-wider">Delay Input</h3>

      {!activeTimetable && (
        <p className="text-xs text-gray-600">
          No active timetable — set one on the Timetables page first.
        </p>
      )}

      <Select
        label="Train"
        value={selectedTrainId}
        onChange={e => onTrainChange(e.target.value)}
        disabled={!activeTimetable || trains.length === 0}
      >
        <option value="">— Select train —</option>
        {trains.map(t => (
          <option key={t.id} value={t.id}>{t.trainNumber}</option>
        ))}
      </Select>

      <div className="grid grid-cols-2 gap-3">
        <Input
          label="Planned Time"
          type="time"
          value={plannedTime}
          onChange={e => onPlannedTimeChange(e.target.value)}
          placeholder="HH:MM"
        />
        <Input
          label="Actual Time"
          type="time"
          value={actualTime}
          onChange={e => onActualTimeChange(e.target.value)}
          placeholder="HH:MM"
        />
      </div>
    </div>
  )
}

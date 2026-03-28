import { Select } from '../ui/Select.jsx'
import { useTimetables } from '../../hooks/useTimetables.js'
import { useTrackerContext } from '../../context/TrackerContext.jsx'

export function TrainSelector() {
  const { timetables } = useTimetables()
  const { selectedTimetableId, selectedTrainId, selectTrain } = useTrackerContext()

  const selectedTimetable = timetables.find(t => t.id === selectedTimetableId) ?? null
  const trains = selectedTimetable?.trains ?? []

  function handleTimetableChange(e) {
    const tid = e.target.value
    selectTrain(tid, null)
  }

  function handleTrainChange(e) {
    const trainId = e.target.value
    selectTrain(selectedTimetableId, trainId || null)
  }

  return (
    <div className="bg-gray-900 border border-gray-800 rounded-lg p-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <Select
          label="Timetable"
          value={selectedTimetableId ?? ''}
          onChange={handleTimetableChange}
        >
          <option value="">— Select timetable —</option>
          {timetables.map(t => (
            <option key={t.id} value={t.id}>{t.name}</option>
          ))}
        </Select>

        <Select
          label="Train"
          value={selectedTrainId ?? ''}
          onChange={handleTrainChange}
          disabled={!selectedTimetableId || trains.length === 0}
        >
          <option value="">— Select train —</option>
          {trains.map(t => {
            const first = t.stops[0]?.stationName ?? ''
            const last = t.stops[t.stops.length - 1]?.stationName ?? ''
            return (
              <option key={t.id} value={t.id}>
                {t.trainNumber} {first && last ? `· ${first} → ${last}` : ''}
              </option>
            )
          })}
        </Select>
      </div>
    </div>
  )
}

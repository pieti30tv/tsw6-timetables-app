import { useRef, useState } from 'react'
import { Button } from '../ui/Button.jsx'
import { useTimetables } from '../../hooks/useTimetables.js'
import { exportToJson, importFromJson, validateTimetable } from '../../utils/timetableUtils.js'

export function ImportExportPanel() {
  const { timetables, activeTimetable, importTimetables } = useTimetables()
  const fileRef = useRef(null)
  const [status, setStatus] = useState(null) // { type: 'success'|'error', message }

  function handleExportActive() {
    if (!activeTimetable) return
    exportToJson(activeTimetable, `${activeTimetable.name.replace(/\s+/g, '_')}.json`)
  }

  function handleExportAll() {
    exportToJson(timetables, 'all_timetables.json')
  }

  async function handleImport(e) {
    const file = e.target.files?.[0]
    if (!file) return
    try {
      const data = await importFromJson(file)
      const list = Array.isArray(data) ? data : [data]
      const invalid = list.find(item => !validateTimetable(item).valid)
      if (invalid) {
        const err = validateTimetable(invalid).error
        setStatus({ type: 'error', message: `Invalid timetable format: ${err}` })
        return
      }
      const imported = importTimetables(list)
      setStatus({ type: 'success', message: `Imported ${imported.length} timetable${imported.length !== 1 ? 's' : ''}` })
    } catch (err) {
      setStatus({ type: 'error', message: err.message })
    }
    // Reset file input
    e.target.value = ''
  }

  return (
    <div className="bg-gray-900 border border-gray-700 rounded-lg p-4">
      <h3 className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-3">Import / Export</h3>

      <div className="flex flex-wrap gap-2">
        <Button variant="outline" size="sm" onClick={handleExportActive} disabled={!activeTimetable}>
          Export Active
        </Button>
        <Button variant="outline" size="sm" onClick={handleExportAll} disabled={timetables.length === 0}>
          Export All
        </Button>
        <Button variant="outline" size="sm" onClick={() => fileRef.current?.click()}>
          Import JSON
        </Button>
        <input
          ref={fileRef}
          type="file"
          accept=".json,application/json"
          onChange={handleImport}
          className="hidden"
        />
      </div>

      {status && (
        <p className={`mt-2 text-xs ${status.type === 'error' ? 'text-red-400' : 'text-emerald-400'}`}>
          {status.message}
        </p>
      )}
    </div>
  )
}

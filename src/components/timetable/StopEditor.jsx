import { getStationsForRoute } from '../../constants/routes.js'

function StopRow({ stop, index, total, onUpdate, onRemove, onMoveUp, onMoveDown, routeId }) {
  const suggestions = getStationsForRoute(routeId)

  function update(field, value) {
    onUpdate(index, { ...stop, [field]: value })
  }

  return (
    <tr className="border-b border-gray-800 group">
      {/* Drag handle / index */}
      <td className="py-2 px-2 text-xs text-gray-600 w-8 text-center">{index + 1}</td>

      {/* Station name */}
      <td className="py-1 px-1">
        {suggestions.length > 0 ? (
          <input
            list={`stations-${routeId}`}
            value={stop.stationName}
            onChange={e => update('stationName', e.target.value)}
            placeholder="Station"
            className="w-full bg-gray-800 border border-gray-700 rounded px-2 py-1.5 text-xs text-gray-100 placeholder-gray-600 focus:outline-none focus:ring-1 focus:ring-amber-500"
          />
        ) : (
          <input
            value={stop.stationName}
            onChange={e => update('stationName', e.target.value)}
            placeholder="Station name"
            className="w-full bg-gray-800 border border-gray-700 rounded px-2 py-1.5 text-xs text-gray-100 placeholder-gray-600 focus:outline-none focus:ring-1 focus:ring-amber-500"
          />
        )}
        {suggestions.length > 0 && (
          <datalist id={`stations-${routeId}`}>
            {suggestions.map(s => <option key={s} value={s} />)}
          </datalist>
        )}
      </td>

      {/* Arrival */}
      <td className="py-1 px-1 w-24">
        <input
          type="time"
          value={stop.arrival}
          onChange={e => update('arrival', e.target.value)}
          disabled={index === 0}
          className="w-full bg-gray-800 border border-gray-700 rounded px-2 py-1.5 text-xs text-gray-100 focus:outline-none focus:ring-1 focus:ring-amber-500 disabled:opacity-30"
        />
      </td>

      {/* Departure */}
      <td className="py-1 px-1 w-24">
        <input
          type="time"
          value={stop.departure}
          onChange={e => update('departure', e.target.value)}
          disabled={index === total - 1}
          className="w-full bg-gray-800 border border-gray-700 rounded px-2 py-1.5 text-xs text-gray-100 focus:outline-none focus:ring-1 focus:ring-amber-500 disabled:opacity-30"
        />
      </td>

      {/* Platform */}
      <td className="py-1 px-1 w-20">
        <input
          value={stop.platform}
          onChange={e => update('platform', e.target.value)}
          placeholder="—"
          className="w-full bg-gray-800 border border-gray-700 rounded px-2 py-1.5 text-xs text-gray-100 placeholder-gray-600 focus:outline-none focus:ring-1 focus:ring-amber-500"
        />
      </td>

      {/* Passing */}
      <td className="py-1 px-2 w-16 text-center">
        <input
          type="checkbox"
          checked={stop.passingStop}
          onChange={e => update('passingStop', e.target.checked)}
          className="accent-amber-500 cursor-pointer"
        />
      </td>

      {/* Actions */}
      <td className="py-1 px-1 w-20">
        <div className="flex items-center gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={() => onMoveUp(index)}
            disabled={index === 0}
            className="p-1 text-gray-500 hover:text-gray-300 disabled:opacity-20"
            title="Move up"
          >
            ▲
          </button>
          <button
            onClick={() => onMoveDown(index)}
            disabled={index === total - 1}
            className="p-1 text-gray-500 hover:text-gray-300 disabled:opacity-20"
            title="Move down"
          >
            ▼
          </button>
          <button
            onClick={() => onRemove(index)}
            className="p-1 text-red-600 hover:text-red-400"
            title="Remove"
          >
            ×
          </button>
        </div>
      </td>
    </tr>
  )
}

export function StopEditor({ stops, onChange, routeId }) {
  function addStop() {
    onChange([
      ...stops,
      { id: crypto.randomUUID(), stationName: '', arrival: '', departure: '', platform: '', passingStop: false },
    ])
  }

  function updateStop(index, updated) {
    const next = [...stops]
    next[index] = updated
    onChange(next)
  }

  function removeStop(index) {
    onChange(stops.filter((_, i) => i !== index))
  }

  function moveUp(index) {
    if (index === 0) return
    const next = [...stops]
    ;[next[index - 1], next[index]] = [next[index], next[index - 1]]
    onChange(next)
  }

  function moveDown(index) {
    if (index === stops.length - 1) return
    const next = [...stops]
    ;[next[index], next[index + 1]] = [next[index + 1], next[index]]
    onChange(next)
  }

  return (
    <div>
      <div className="overflow-x-auto">
        <table className="w-full text-xs">
          <thead>
            <tr className="border-b border-gray-700">
              <th className="py-2 px-2 text-left text-gray-500 font-medium w-8">#</th>
              <th className="py-2 px-1 text-left text-gray-500 font-medium">Station</th>
              <th className="py-2 px-1 text-left text-gray-500 font-medium w-24">Arrive</th>
              <th className="py-2 px-1 text-left text-gray-500 font-medium w-24">Depart</th>
              <th className="py-2 px-1 text-left text-gray-500 font-medium w-20">Platform</th>
              <th className="py-2 px-2 text-center text-gray-500 font-medium w-16">Pass</th>
              <th className="py-2 px-1 w-20" />
            </tr>
          </thead>
          <tbody>
            {stops.length === 0 && (
              <tr>
                <td colSpan={7} className="py-6 text-center text-gray-600 text-xs">
                  No stops yet — add one below
                </td>
              </tr>
            )}
            {stops.map((stop, i) => (
              <StopRow
                key={stop.id}
                stop={stop}
                index={i}
                total={stops.length}
                onUpdate={updateStop}
                onRemove={removeStop}
                onMoveUp={moveUp}
                onMoveDown={moveDown}
                routeId={routeId}
              />
            ))}
          </tbody>
        </table>
      </div>

      <button
        type="button"
        onClick={addStop}
        className="mt-3 w-full py-2 border border-dashed border-gray-700 rounded text-xs text-gray-500 hover:text-gray-300 hover:border-gray-500 transition-colors"
      >
        + Add Stop
      </button>
    </div>
  )
}

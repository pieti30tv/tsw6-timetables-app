import { DelayBadge } from '../ui/Badge.jsx'

export function CascadePanel({ results }) {
  if (results.length === 0) return null

  return (
    <div className="bg-gray-900 border border-gray-800 rounded-lg p-4">
      <h3 className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-3">
        Potentially Affected Connections ({results.length})
      </h3>

      <div className="space-y-2">
        {results.map(r => (
          <div key={r.trainId} className="flex items-center justify-between bg-gray-800 rounded px-3 py-2 text-xs">
            <div className="flex items-center gap-3">
              <span className="font-mono font-bold text-amber-400">{r.trainNumber}</span>
              {r.connectionStation && (
                <span className="text-gray-500">
                  connects at <span className="text-gray-300">{r.connectionStation}</span>
                  {r.connectionTime && <span className="font-mono ml-1">({r.connectionTime})</span>}
                </span>
              )}
            </div>
            <DelayBadge delayMinutes={r.delayMinutes} />
          </div>
        ))}
      </div>

      <p className="mt-3 text-xs text-gray-600 italic">
        Estimated cascade delays. Actual impact depends on dwell times and platform availability.
      </p>
    </div>
  )
}

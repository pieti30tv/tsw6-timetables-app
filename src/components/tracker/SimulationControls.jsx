import { useTrackerContext } from '../../context/TrackerContext.jsx'
import { Button } from '../ui/Button.jsx'
import { formatTime } from '../../utils/timeUtils.js'

const SPEED_OPTIONS = [1, 2, 5, 10, 60]

export function SimulationControls() {
  const {
    simulationActive, setSimulationActive,
    simulationSpeed, setSimulationSpeed,
    simulatedMinutes, setSimulatedMinutes,
    realMinutes, currentMinutes,
    resetSimulation,
  } = useTrackerContext()

  function handleStartStop() {
    if (simulationActive) {
      setSimulationActive(false)
    } else {
      if (simulatedMinutes === null) {
        setSimulatedMinutes(realMinutes)
      }
      setSimulationActive(true)
    }
  }

  return (
    <div className="bg-gray-900 border border-gray-800 rounded-lg p-4">
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs font-medium text-gray-400 uppercase tracking-wider">Simulation</span>
        <span className="text-xs text-gray-600">
          {simulatedMinutes !== null ? (
            <span className="text-amber-500">Sim: {formatTime(currentMinutes)}</span>
          ) : (
            <span>Real time: {formatTime(realMinutes)}</span>
          )}
        </span>
      </div>

      <div className="flex items-center gap-2 flex-wrap">
        <Button
          variant={simulationActive ? 'secondary' : 'primary'}
          size="sm"
          onClick={handleStartStop}
        >
          {simulationActive ? '⏸ Pause' : simulatedMinutes !== null ? '▶ Resume' : '▶ Start Sim'}
        </Button>

        <Button variant="ghost" size="sm" onClick={resetSimulation} disabled={simulatedMinutes === null}>
          Reset
        </Button>

        <div className="flex items-center gap-1 ml-2">
          <span className="text-xs text-gray-500">Speed:</span>
          {SPEED_OPTIONS.map(s => (
            <button
              key={s}
              onClick={() => setSimulationSpeed(s)}
              className={`
                px-2 py-1 text-xs rounded transition-colors
                ${simulationSpeed === s
                  ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                  : 'text-gray-500 hover:text-gray-300 hover:bg-gray-800'
                }
              `}
            >
              {s}×
            </button>
          ))}
        </div>
      </div>

      {simulationActive && (
        <p className="mt-2 text-xs text-gray-600">
          Running at {simulationSpeed}× speed — {simulationSpeed} sim-minute{simulationSpeed !== 1 ? 's' : ''} per real second
        </p>
      )}
    </div>
  )
}

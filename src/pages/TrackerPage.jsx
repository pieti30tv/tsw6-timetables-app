import { PageTransition } from '../components/layout/PageTransition.jsx'
import { TrainSelector } from '../components/tracker/TrainSelector.jsx'
import { LiveDisplay } from '../components/tracker/LiveDisplay.jsx'
import { RouteProgress } from '../components/tracker/RouteProgress.jsx'
import { SimulationControls } from '../components/tracker/SimulationControls.jsx'
import { useTrackerContext } from '../context/TrackerContext.jsx'

export function TrackerPage() {
  const { selectedTrainId } = useTrackerContext()

  return (
    <PageTransition>
      <div className="p-6 max-w-5xl mx-auto">
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-gray-100">Live Tracker</h2>
          <p className="text-sm text-gray-500 mt-0.5">Track a train in real time or simulation mode</p>
        </div>

        <TrainSelector />

        {selectedTrainId && (
          <div className="mt-6 space-y-4">
            <RouteProgress />
            <LiveDisplay />
            <SimulationControls />
          </div>
        )}

        {!selectedTrainId && (
          <div className="mt-12 text-center text-gray-600">
            <svg className="w-12 h-12 mx-auto mb-3 opacity-30" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1}
                d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
            </svg>
            <p className="text-sm">Select a timetable and train above to begin tracking</p>
          </div>
        )}
      </div>
    </PageTransition>
  )
}

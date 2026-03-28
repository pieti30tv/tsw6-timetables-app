import { PageTransition } from '../components/layout/PageTransition.jsx'
import { DelayInput } from '../components/delay/DelayInput.jsx'
import { DelayResult } from '../components/delay/DelayResult.jsx'
import { CascadePanel } from '../components/delay/CascadePanel.jsx'
import { useState } from 'react'
import { useTimetables } from '../hooks/useTimetables.js'
import { computeDelay, getDelaySeverity } from '../utils/timeUtils.js'
import { computeCascade } from '../utils/cascadeUtils.js'

export function DelayPage() {
  const { activeTimetable } = useTimetables()
  const [selectedTrainId, setSelectedTrainId] = useState('')
  const [plannedTime, setPlannedTime] = useState('')
  const [actualTime, setActualTime] = useState('')

  const delayMinutes = computeDelay(plannedTime, actualTime)
  const severity = delayMinutes != null ? getDelaySeverity(delayMinutes) : null

  const cascadeResults =
    selectedTrainId && delayMinutes > 0 && activeTimetable
      ? computeCascade(selectedTrainId, delayMinutes, activeTimetable)
      : []

  return (
    <PageTransition>
      <div className="p-6 max-w-3xl mx-auto">
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-gray-100">Delay Calculator</h2>
          <p className="text-sm text-gray-500 mt-0.5">Calculate delays and identify cascade effects</p>
        </div>

        <div className="space-y-4">
          <DelayInput
            selectedTrainId={selectedTrainId}
            onTrainChange={setSelectedTrainId}
            plannedTime={plannedTime}
            onPlannedTimeChange={setPlannedTime}
            actualTime={actualTime}
            onActualTimeChange={setActualTime}
          />

          {delayMinutes != null && (
            <DelayResult delayMinutes={delayMinutes} severity={severity} />
          )}

          {cascadeResults.length > 0 && (
            <CascadePanel results={cascadeResults} />
          )}
        </div>
      </div>
    </PageTransition>
  )
}

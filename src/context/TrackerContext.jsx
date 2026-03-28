import { createContext, useContext, useState, useEffect, useRef } from 'react'

const TrackerContext = createContext(null)

export function TrackerProvider({ children }) {
  const [selectedTimetableId, setSelectedTimetableId] = useState(null)
  const [selectedTrainId, setSelectedTrainId] = useState(null)
  const [currentStopIndex, setCurrentStopIndex] = useState(0)
  const [simulationActive, setSimulationActive] = useState(false)
  const [simulationSpeed, setSimulationSpeed] = useState(1) // multiplier
  const [simulatedMinutes, setSimulatedMinutes] = useState(null) // minutes since midnight
  const intervalRef = useRef(null)

  // Real clock (updates every second, not simulated)
  const [realMinutes, setRealMinutes] = useState(() => {
    const now = new Date()
    return now.getHours() * 60 + now.getMinutes() + now.getSeconds() / 60
  })

  useEffect(() => {
    const tick = setInterval(() => {
      const now = new Date()
      setRealMinutes(now.getHours() * 60 + now.getMinutes() + now.getSeconds() / 60)
    }, 1000)
    return () => clearInterval(tick)
  }, [])

  // Simulation clock — advances at simulationSpeed × real time
  useEffect(() => {
    if (intervalRef.current) clearInterval(intervalRef.current)

    if (simulationActive) {
      intervalRef.current = setInterval(() => {
        setSimulatedMinutes(prev => {
          const base = prev ?? realMinutes
          return base + (simulationSpeed / 60) // advance 1 real second = simulationSpeed sim-seconds
        })
      }, 1000)
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [simulationActive, simulationSpeed])

  function resetSimulation() {
    setSimulationActive(false)
    setSimulatedMinutes(null)
  }

  function selectTrain(timetableId, trainId) {
    setSelectedTimetableId(timetableId)
    setSelectedTrainId(trainId)
    setCurrentStopIndex(0)
    resetSimulation()
  }

  const currentMinutes = simulatedMinutes ?? realMinutes

  return (
    <TrackerContext.Provider
      value={{
        selectedTimetableId,
        selectedTrainId,
        currentStopIndex,
        setCurrentStopIndex,
        simulationActive,
        setSimulationActive,
        simulationSpeed,
        setSimulationSpeed,
        simulatedMinutes,
        setSimulatedMinutes,
        realMinutes,
        currentMinutes,
        resetSimulation,
        selectTrain,
      }}
    >
      {children}
    </TrackerContext.Provider>
  )
}

export function useTrackerContext() {
  const ctx = useContext(TrackerContext)
  if (!ctx) throw new Error('useTrackerContext must be used within TrackerProvider')
  return ctx
}

import { createContext, useContext, useReducer, useEffect } from 'react'
import { useLocalStorage } from '../hooks/useLocalStorage.js'
import sampleData from '../data/sampleTimetables.json'
import { normalizeTimetable } from '../utils/timetableUtils.js'

const TimetableContext = createContext(null)

const STORAGE_KEY = 'tsw6_timetables'
const ACTIVE_KEY = 'tsw6_active_timetable'

function reducer(state, action) {
  switch (action.type) {
    case 'CREATE_TIMETABLE':
      return {
        ...state,
        timetables: [...state.timetables, action.payload],
      }
    case 'UPDATE_TIMETABLE':
      return {
        ...state,
        timetables: state.timetables.map(t =>
          t.id === action.payload.id ? { ...action.payload, updatedAt: new Date().toISOString() } : t
        ),
      }
    case 'DELETE_TIMETABLE': {
      const newTimetables = state.timetables.filter(t => t.id !== action.payload)
      return {
        ...state,
        timetables: newTimetables,
        activeTimetableId:
          state.activeTimetableId === action.payload
            ? (newTimetables[0]?.id ?? null)
            : state.activeTimetableId,
      }
    }
    case 'SET_ACTIVE_TIMETABLE':
      return { ...state, activeTimetableId: action.payload }
    case 'IMPORT_TIMETABLES':
      return {
        ...state,
        timetables: [...state.timetables, ...action.payload],
      }
    case '_HYDRATE':
      return action.payload
    default:
      return state
  }
}

export function TimetableProvider({ children }) {
  const [storedTimetables, setStoredTimetables] = useLocalStorage(STORAGE_KEY, null)
  const [storedActiveId, setStoredActiveId] = useLocalStorage(ACTIVE_KEY, null)

  const initialTimetables = storedTimetables ?? sampleData.map(normalizeTimetable)

  const [state, dispatch] = useReducer(reducer, {
    timetables: initialTimetables,
    activeTimetableId: storedActiveId ?? initialTimetables[0]?.id ?? null,
  })

  // Sync reducer state back to localStorage whenever it changes
  useEffect(() => {
    setStoredTimetables(state.timetables)
  }, [state.timetables])

  useEffect(() => {
    setStoredActiveId(state.activeTimetableId)
  }, [state.activeTimetableId])

  const activeTimetable = state.timetables.find(t => t.id === state.activeTimetableId) ?? null

  return (
    <TimetableContext.Provider value={{ state, dispatch, activeTimetable }}>
      {children}
    </TimetableContext.Provider>
  )
}

export function useTimetableContext() {
  const ctx = useContext(TimetableContext)
  if (!ctx) throw new Error('useTimetableContext must be used within TimetableProvider')
  return ctx
}

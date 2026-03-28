import { useTimetableContext } from '../context/TimetableContext.jsx'
import { normalizeTimetable } from '../utils/timetableUtils.js'

export function useTimetables() {
  const { state, dispatch, activeTimetable } = useTimetableContext()

  function createTimetable(data) {
    const timetable = normalizeTimetable({ ...data, id: crypto.randomUUID() })
    dispatch({ type: 'CREATE_TIMETABLE', payload: timetable })
    return timetable
  }

  function updateTimetable(timetable) {
    dispatch({ type: 'UPDATE_TIMETABLE', payload: timetable })
  }

  function deleteTimetable(id) {
    dispatch({ type: 'DELETE_TIMETABLE', payload: id })
  }

  function setActive(id) {
    dispatch({ type: 'SET_ACTIVE_TIMETABLE', payload: id })
  }

  function importTimetables(rawList) {
    const normalized = (Array.isArray(rawList) ? rawList : [rawList]).map(item =>
      normalizeTimetable({ ...item, id: crypto.randomUUID() })
    )
    dispatch({ type: 'IMPORT_TIMETABLES', payload: normalized })
    return normalized
  }

  return {
    timetables: state.timetables,
    activeTimetableId: state.activeTimetableId,
    activeTimetable,
    createTimetable,
    updateTimetable,
    deleteTimetable,
    setActive,
    importTimetables,
  }
}

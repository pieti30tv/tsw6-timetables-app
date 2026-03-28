import { parseTime, getDelaySeverity } from './timeUtils.js'

/**
 * Given a delayed train and a full timetable, find all other trains
 * that are "potentially affected" — i.e., share a station within a
 * time window of the delayed train's arrival at that station.
 *
 * @param {string} delayedTrainId
 * @param {number} delayMinutes - positive = late
 * @param {import('../types').Timetable} timetable
 * @param {number} windowMinutes - connection window (default 15)
 * @returns {import('../types').DelayResult[]}
 */
export function computeCascade(delayedTrainId, delayMinutes, timetable, windowMinutes = 15) {
  if (!timetable || delayMinutes <= 0) return []

  const delayedTrain = timetable.trains.find(t => t.id === delayedTrainId)
  if (!delayedTrain) return []

  // Build a set of (stationName → delayed arrival time in minutes) for the delayed train
  const delayedArrivals = new Map()
  for (const stop of delayedTrain.stops) {
    const baseTime = parseTime(stop.arrival || stop.departure)
    if (baseTime == null) continue
    const newArrival = baseTime + delayMinutes
    delayedArrivals.set(stop.stationName.toLowerCase(), newArrival)
  }

  const affected = []

  for (const train of timetable.trains) {
    if (train.id === delayedTrainId) continue

    for (const stop of train.stops) {
      const stationKey = stop.stationName.toLowerCase()
      if (!delayedArrivals.has(stationKey)) continue

      const delayedArrivalTime = delayedArrivals.get(stationKey)
      const trainDeparture = parseTime(stop.departure || stop.arrival)
      if (trainDeparture == null) continue

      // Check if this train departs within the connection window after the delayed arrival
      const diff = trainDeparture - delayedArrivalTime
      // Wrap for overnight
      const normalizedDiff = diff < -720 ? diff + 1440 : diff > 720 ? diff - 1440 : diff

      if (normalizedDiff >= 0 && normalizedDiff <= windowMinutes) {
        const cascadeDelay = windowMinutes - normalizedDiff + 2 // estimated cascade delay
        affected.push({
          trainId: train.id,
          trainNumber: train.trainNumber,
          delayMinutes: cascadeDelay,
          severity: getDelaySeverity(cascadeDelay),
          affectedConnectionIds: [delayedTrainId],
          connectionStation: stop.stationName,
          connectionTime: stop.departure || stop.arrival,
        })
        break // one affected entry per train is enough
      }
    }
  }

  return affected
}

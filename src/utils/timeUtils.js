/**
 * Parse "HH:MM" to total minutes since midnight.
 * Returns null for empty/invalid strings.
 */
export function parseTime(str) {
  if (!str || typeof str !== 'string') return null
  const match = str.match(/^(\d{1,2}):(\d{2})$/)
  if (!match) return null
  const h = parseInt(match[1], 10)
  const m = parseInt(match[2], 10)
  if (h > 23 || m > 59) return null
  return h * 60 + m
}

/**
 * Format total minutes since midnight to "HH:MM".
 */
export function formatTime(totalMinutes) {
  if (totalMinutes == null) return ''
  const normalized = ((totalMinutes % 1440) + 1440) % 1440
  const h = Math.floor(normalized / 60)
  const m = normalized % 60
  return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`
}

/**
 * Compute delay in minutes (positive = late, negative = early).
 * Handles overnight wrap (e.g., planned 23:50, actual 00:10 = 20 min late).
 */
export function computeDelay(plannedStr, actualStr) {
  const planned = parseTime(plannedStr)
  const actual = parseTime(actualStr)
  if (planned == null || actual == null) return null
  let diff = actual - planned
  // Handle midnight wrap
  if (diff > 720) diff -= 1440
  if (diff < -720) diff += 1440
  return diff
}

/**
 * Returns delay severity label.
 * @param {number} delayMinutes
 * @returns {"on-time"|"minor"|"major"}
 */
export function getDelaySeverity(delayMinutes) {
  if (delayMinutes <= 1) return 'on-time'
  if (delayMinutes <= 10) return 'minor'
  return 'major'
}

/**
 * Get current wall-clock time as "HH:MM".
 */
export function getCurrentTime() {
  const now = new Date()
  return formatTime(now.getHours() * 60 + now.getMinutes())
}

/**
 * Add minutes to a "HH:MM" string, returns "HH:MM".
 */
export function addMinutes(timeStr, minutes) {
  const base = parseTime(timeStr)
  if (base == null) return timeStr
  return formatTime(base + minutes)
}

/**
 * Returns minutes until a target "HH:MM" from a reference "HH:MM".
 * Handles overnight (always returns positive, assuming target is in the future within 24h).
 */
export function minutesUntil(referenceStr, targetStr) {
  const ref = parseTime(referenceStr)
  const target = parseTime(targetStr)
  if (ref == null || target == null) return null
  let diff = target - ref
  if (diff < 0) diff += 1440
  return diff
}

/**
 * Format minutes as "Xh Ym" or "Ym" string.
 */
export function formatDuration(minutes) {
  if (minutes == null) return '--'
  const absMin = Math.abs(minutes)
  const h = Math.floor(absMin / 60)
  const m = absMin % 60
  const sign = minutes < 0 ? '-' : ''
  if (h === 0) return `${sign}${m}m`
  if (m === 0) return `${sign}${h}h`
  return `${sign}${h}h ${m}m`
}

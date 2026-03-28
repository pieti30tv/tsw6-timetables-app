/**
 * Download timetable(s) as a JSON file.
 * @param {import('../types').Timetable | import('../types').Timetable[]} data
 * @param {string} filename
 */
export function exportToJson(data, filename = 'timetable.json') {
  const json = JSON.stringify(data, null, 2)
  const blob = new Blob([json], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  a.click()
  URL.revokeObjectURL(url)
}

/**
 * Parse a JSON file from a File input event.
 * Returns parsed data or throws.
 * @param {File} file
 * @returns {Promise<any>}
 */
export function importFromJson(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = (e) => {
      try {
        resolve(JSON.parse(e.target.result))
      } catch {
        reject(new Error('Invalid JSON file'))
      }
    }
    reader.onerror = () => reject(new Error('Failed to read file'))
    reader.readAsText(file)
  })
}

/**
 * Validate that a parsed object looks like a Timetable.
 * Returns { valid: boolean, error?: string }
 */
export function validateTimetable(obj) {
  if (!obj || typeof obj !== 'object') return { valid: false, error: 'Not an object' }
  if (typeof obj.name !== 'string') return { valid: false, error: 'Missing name' }
  if (!Array.isArray(obj.trains)) return { valid: false, error: 'Missing trains array' }
  return { valid: true }
}

/**
 * Normalize an imported timetable — ensures all required fields exist.
 * Does NOT overwrite existing id if present.
 */
export function normalizeTimetable(obj) {
  return {
    id: obj.id ?? crypto.randomUUID(),
    name: obj.name ?? 'Imported Timetable',
    description: obj.description ?? '',
    createdAt: obj.createdAt ?? new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    trains: (obj.trains ?? []).map(normalizeTrain),
  }
}

function normalizeTrain(t) {
  return {
    id: t.id ?? crypto.randomUUID(),
    trainNumber: t.trainNumber ?? '',
    trainType: t.trainType ?? 'Other',
    route: t.route ?? '',
    direction: t.direction ?? 'northbound',
    stops: (t.stops ?? []).map(normalizeStop),
    notes: t.notes ?? '',
  }
}

function normalizeStop(s) {
  return {
    id: s.id ?? crypto.randomUUID(),
    stationName: s.stationName ?? '',
    arrival: s.arrival ?? '',
    departure: s.departure ?? '',
    platform: s.platform ?? '',
    passingStop: s.passingStop ?? false,
  }
}

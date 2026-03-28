/**
 * @typedef {Object} Stop
 * @property {string} id
 * @property {string} stationName
 * @property {string} arrival        - "HH:MM" or "" for origin
 * @property {string} departure      - "HH:MM" or "" for terminus
 * @property {string} platform       - e.g. "3", "3A", ""
 * @property {boolean} passingStop   - true = does not stop for passengers
 */

/**
 * @typedef {Object} Train
 * @property {string} id
 * @property {string} trainNumber    - e.g. "IC 1234"
 * @property {string} trainType      - key from TRAIN_TYPES
 * @property {string} route          - key from ROUTES
 * @property {string} direction      - key from DIRECTIONS
 * @property {Stop[]} stops
 * @property {string} notes
 */

/**
 * @typedef {Object} Timetable
 * @property {string} id
 * @property {string} name
 * @property {string} description
 * @property {string} createdAt      - ISO string
 * @property {string} updatedAt      - ISO string
 * @property {Train[]} trains
 */

/**
 * @typedef {"on-time"|"minor"|"major"} DelaySeverity
 */

/**
 * @typedef {Object} DelayResult
 * @property {string} trainId
 * @property {string} trainNumber
 * @property {number} delayMinutes
 * @property {DelaySeverity} severity
 * @property {string[]} affectedConnectionIds
 */

/**
 * @typedef {Object} ChatMessage
 * @property {"user"|"assistant"} role
 * @property {string} content
 * @property {number} timestamp
 */

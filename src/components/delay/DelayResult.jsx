const severityConfig = {
  'on-time': {
    bg: 'bg-emerald-900/20 border-emerald-700/30',
    text: 'text-emerald-400',
    label: 'On Time',
    icon: '✓',
  },
  minor: {
    bg: 'bg-amber-900/20 border-amber-700/30',
    text: 'text-amber-400',
    label: 'Minor Delay',
    icon: '⚠',
  },
  major: {
    bg: 'bg-red-900/20 border-red-700/30',
    text: 'text-red-400',
    label: 'Major Delay',
    icon: '✕',
  },
}

export function DelayResult({ delayMinutes, severity }) {
  const cfg = severityConfig[severity] ?? severityConfig['on-time']

  return (
    <div className={`rounded-lg border p-4 ${cfg.bg}`}>
      <div className="flex items-center gap-3">
        <span className={`text-2xl ${cfg.text}`}>{cfg.icon}</span>
        <div>
          <p className={`text-lg font-bold font-mono ${cfg.text}`}>
            {delayMinutes > 0 ? `+${delayMinutes}` : delayMinutes < 0 ? `${delayMinutes}` : '0'} min
          </p>
          <p className="text-xs text-gray-400">{cfg.label}</p>
        </div>
        {delayMinutes < 0 && (
          <p className="text-xs text-gray-500 ml-2">{Math.abs(delayMinutes)} minutes early</p>
        )}
      </div>
    </div>
  )
}

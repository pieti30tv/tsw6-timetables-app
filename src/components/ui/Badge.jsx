const severityStyles = {
  'on-time': 'bg-emerald-900/40 text-emerald-400 border border-emerald-700/50',
  minor:     'bg-amber-900/40 text-amber-400 border border-amber-700/50',
  major:     'bg-red-900/40 text-red-400 border border-red-700/50',
  neutral:   'bg-gray-800 text-gray-400 border border-gray-700',
  active:    'bg-amber-500/20 text-amber-400 border border-amber-500/40',
}

const severityLabels = {
  'on-time': 'On Time',
  minor:     'Minor Delay',
  major:     'Major Delay',
}

export function Badge({ variant = 'neutral', label, children, className = '' }) {
  const displayText = children ?? label ?? severityLabels[variant] ?? variant
  return (
    <span
      className={`
        inline-flex items-center px-2 py-0.5 rounded text-xs font-medium
        ${severityStyles[variant] ?? severityStyles.neutral}
        ${className}
      `}
    >
      {displayText}
    </span>
  )
}

export function DelayBadge({ delayMinutes }) {
  if (delayMinutes == null) return null
  if (delayMinutes <= 1) return <Badge variant="on-time" />
  if (delayMinutes <= 10) return <Badge variant="minor">{`+${delayMinutes}m`}</Badge>
  return <Badge variant="major">{`+${delayMinutes}m`}</Badge>
}

const dotColors = {
  'on-time': 'bg-emerald-400',
  minor:     'bg-amber-400',
  major:     'bg-red-400 animate-pulse',
  neutral:   'bg-gray-500',
  active:    'bg-amber-400 animate-pulse',
}

const textColors = {
  'on-time': 'text-emerald-400',
  minor:     'text-amber-400',
  major:     'text-red-400',
  neutral:   'text-gray-400',
  active:    'text-amber-400',
}

export function StatusIndicator({ status = 'neutral', label, className = '' }) {
  return (
    <span className={`inline-flex items-center gap-1.5 ${className}`}>
      <span className={`w-2 h-2 rounded-full ${dotColors[status] ?? dotColors.neutral}`} />
      {label && (
        <span className={`text-xs font-medium ${textColors[status] ?? textColors.neutral}`}>
          {label}
        </span>
      )}
    </span>
  )
}

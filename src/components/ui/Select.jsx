import { forwardRef } from 'react'

export const Select = forwardRef(function Select(
  { label, error, className = '', children, ...props },
  ref
) {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-xs font-medium text-gray-400 uppercase tracking-wider mb-1">
          {label}
        </label>
      )}
      <select
        ref={ref}
        className={`
          w-full bg-gray-800 border border-gray-700 text-gray-100 rounded-md px-3 py-2 text-sm
          focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent
          transition-colors cursor-pointer
          disabled:opacity-50 disabled:cursor-not-allowed
          ${error ? 'border-red-500' : ''}
          ${className}
        `}
        {...props}
      >
        {children}
      </select>
      {error && <p className="mt-1 text-xs text-red-400">{error}</p>}
    </div>
  )
})

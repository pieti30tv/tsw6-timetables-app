import { forwardRef } from 'react'

const variants = {
  primary: 'bg-amber-500 hover:bg-amber-600 text-gray-950 font-semibold',
  secondary: 'bg-gray-700 hover:bg-gray-600 text-gray-100',
  danger: 'bg-red-700 hover:bg-red-600 text-white',
  ghost: 'bg-transparent hover:bg-gray-800 text-gray-400 hover:text-gray-100',
  outline: 'bg-transparent border border-gray-600 hover:border-gray-400 text-gray-300 hover:text-gray-100',
}

const sizes = {
  sm: 'px-2.5 py-1.5 text-xs',
  md: 'px-4 py-2 text-sm',
  lg: 'px-5 py-2.5 text-base',
}

export const Button = forwardRef(function Button(
  { variant = 'primary', size = 'md', className = '', disabled, children, ...props },
  ref
) {
  return (
    <button
      ref={ref}
      disabled={disabled}
      className={`
        inline-flex items-center justify-center gap-2 rounded-md transition-colors
        focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 focus:ring-offset-gray-950
        disabled:opacity-40 disabled:cursor-not-allowed
        ${variants[variant] ?? variants.secondary}
        ${sizes[size] ?? sizes.md}
        ${className}
      `}
      {...props}
    >
      {children}
    </button>
  )
})

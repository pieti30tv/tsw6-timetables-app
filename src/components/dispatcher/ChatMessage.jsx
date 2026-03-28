import { motion } from 'framer-motion'

export function ChatMessage({ message }) {
  const isUser = message.role === 'user'

  return (
    <motion.div
      initial={{ opacity: 0, y: 4 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.15 }}
      className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-3`}
    >
      {!isUser && (
        <div className="w-7 h-7 rounded bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-400 text-xs font-bold mr-2 shrink-0 mt-0.5">
          D
        </div>
      )}

      <div
        className={`
          max-w-[80%] rounded-xl px-4 py-3 text-sm leading-relaxed
          ${isUser
            ? 'bg-amber-500/15 border border-amber-500/25 text-gray-100'
            : 'bg-gray-800 border border-gray-700 text-gray-200'
          }
        `}
      >
        {/* Render content with basic newline support */}
        {message.content.split('\n').map((line, i) => (
          <span key={i}>
            {line}
            {i < message.content.split('\n').length - 1 && <br />}
          </span>
        ))}

        {/* Streaming cursor */}
        {message.isStreaming && (
          <span className="inline-block w-1.5 h-4 bg-amber-500 ml-0.5 animate-pulse rounded-sm" />
        )}
      </div>
    </motion.div>
  )
}

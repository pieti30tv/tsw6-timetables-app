import { useState, useRef } from 'react'
import { Button } from '../ui/Button.jsx'

export function ChatInput({ onSend, disabled }) {
  const [text, setText] = useState('')
  const textareaRef = useRef(null)

  function handleSend() {
    if (!text.trim() || disabled) return
    onSend(text)
    setText('')
    textareaRef.current?.focus()
  }

  function handleKeyDown(e) {
    if ((e.metaKey || e.ctrlKey) && e.key === 'Enter') {
      e.preventDefault()
      handleSend()
    }
    // Shift+Enter inserts newline (default behavior)
  }

  return (
    <div className="flex items-end gap-2">
      <textarea
        ref={textareaRef}
        value={text}
        onChange={e => setText(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Ask the dispatcher… (⌘Enter to send)"
        disabled={disabled}
        rows={2}
        className="
          flex-1 bg-gray-800 border border-gray-700 text-gray-100 rounded-lg px-3 py-2.5 text-sm
          focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent
          placeholder-gray-500 resize-none transition-colors
          disabled:opacity-50
        "
      />
      <Button
        onClick={handleSend}
        disabled={disabled || !text.trim()}
        className="shrink-0"
      >
        {disabled ? (
          <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
        ) : (
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
              d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
          </svg>
        )}
      </Button>
    </div>
  )
}

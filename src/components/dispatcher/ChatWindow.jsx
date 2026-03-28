import { useEffect, useRef } from 'react'
import { ChatMessage } from './ChatMessage.jsx'

export function ChatWindow({ messages, isStreaming }) {
  const bottomRef = useRef(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  if (messages.length === 0) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center text-gray-600 p-8">
        <svg className="w-10 h-10 mb-3 opacity-30" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1}
            d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
        <p className="text-sm text-center">Ask about delays, connections, or scheduling.<br />The dispatcher knows your active timetable.</p>
        <div className="mt-4 space-y-1 text-xs text-gray-700 text-center">
          <p>"What happens if NJT 6601 is 15 minutes late?"</p>
          <p>"Which trains share Newark Broad Street?"</p>
          <p>"How should I handle a 10-minute delay on IC 2301?"</p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex-1 overflow-y-auto p-4">
      {messages.map((msg, i) => (
        <ChatMessage
          key={msg.timestamp + i}
          message={{
            ...msg,
            isStreaming: isStreaming && i === messages.length - 1 && msg.role === 'assistant',
          }}
        />
      ))}
      <div ref={bottomRef} />
    </div>
  )
}

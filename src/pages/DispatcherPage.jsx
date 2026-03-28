import { PageTransition } from '../components/layout/PageTransition.jsx'
import { ChatWindow } from '../components/dispatcher/ChatWindow.jsx'
import { ChatInput } from '../components/dispatcher/ChatInput.jsx'
import { ContextPanel } from '../components/dispatcher/ContextPanel.jsx'
import { useAnthropicChat } from '../hooks/useAnthropicChat.js'
import { useTimetables } from '../hooks/useTimetables.js'

export function DispatcherPage() {
  const { activeTimetable } = useTimetables()
  const { messages, sendMessage, isStreaming, error, clearHistory } = useAnthropicChat(activeTimetable)

  return (
    <PageTransition>
      <div className="flex flex-col h-[calc(100vh-3.5rem)]">
        {/* Top section: context + header */}
        <div className="p-4 border-b border-gray-800 shrink-0">
          <div className="max-w-4xl mx-auto flex items-start justify-between gap-4">
            <div>
              <h2 className="text-sm font-semibold text-gray-100">AI Dispatcher</h2>
              <p className="text-xs text-gray-500 mt-0.5">Ask about delays, connections, and scheduling</p>
            </div>
            <div className="flex items-center gap-2">
              <ContextPanel activeTimetable={activeTimetable} />
              {messages.length > 0 && (
                <button
                  onClick={clearHistory}
                  className="text-xs text-gray-500 hover:text-gray-300 transition-colors"
                >
                  Clear
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Chat area */}
        <div className="flex-1 overflow-hidden max-w-4xl w-full mx-auto flex flex-col">
          <ChatWindow messages={messages} isStreaming={isStreaming} />

          {error && (
            <div className="px-4 py-2 text-xs text-red-400 bg-red-900/20 border-t border-red-800/30">
              {error}
            </div>
          )}

          <div className="p-4 border-t border-gray-800">
            <ChatInput onSend={sendMessage} disabled={isStreaming} />
          </div>
        </div>
      </div>
    </PageTransition>
  )
}

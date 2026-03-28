import { useState, useCallback } from 'react'
import Anthropic from '@anthropic-ai/sdk'

const client = new Anthropic({
  apiKey: import.meta.env.VITE_ANTHROPIC_API_KEY,
  dangerouslyAllowBrowser: true,
})

function buildSystemPrompt(activeTimetable, activeTrainInfo) {
  const persona = `You are an experienced railway dispatcher assistant for Train Sim World 6 Special Edition.
You have deep knowledge of railway operations, timetabling, connections, and delay management.
You speak concisely and professionally, using railway terminology naturally.
When reasoning about delays, think through cascade effects systematically.`

  let timetableContext = 'No timetable currently loaded.'
  if (activeTimetable) {
    const trainLines = activeTimetable.trains.map(t => {
      const first = t.stops[0]
      const last = t.stops[t.stops.length - 1]
      const dep = first?.departure || first?.arrival || '--'
      const arr = last?.arrival || last?.departure || '--'
      const origin = first?.stationName || '?'
      const terminus = last?.stationName || '?'
      return `  - ${t.trainNumber} (${t.trainType}): ${origin} ${dep} → ${terminus} ${arr}, ${t.stops.length} stops`
    }).join('\n')

    timetableContext = `Active timetable: "${activeTimetable.name}"
${activeTimetable.description ? `Description: ${activeTimetable.description}` : ''}
Trains (${activeTimetable.trains.length}):
${trainLines}`
  }

  let trackingContext = ''
  if (activeTrainInfo) {
    trackingContext = `\nCurrently tracking: ${activeTrainInfo.trainNumber} at ${activeTrainInfo.currentStation}${activeTrainInfo.delayMinutes != null ? `, ${activeTrainInfo.delayMinutes > 0 ? activeTrainInfo.delayMinutes + ' minutes late' : 'on time'}` : ''}.`
  }

  const capabilities = `
You can help with:
- Analysing delay impacts on this specific timetable
- Identifying which trains need to be held for connections
- Explaining scheduling decisions
- Answering questions about specific train numbers in this timetable
- Suggesting delay management strategies

When a train number is mentioned, check the timetable context above first.
If information is not in the timetable, say so clearly.`

  return [persona, timetableContext + trackingContext, capabilities].join('\n\n')
}

export function useAnthropicChat(activeTimetable, activeTrainInfo = null) {
  const [messages, setMessages] = useState([])
  const [isStreaming, setIsStreaming] = useState(false)
  const [error, setError] = useState(null)

  const sendMessage = useCallback(async (userText) => {
    if (!userText.trim() || isStreaming) return

    setError(null)
    const userMessage = { role: 'user', content: userText.trim(), timestamp: Date.now() }

    setMessages(prev => [...prev, userMessage])

    const assistantMessage = { role: 'assistant', content: '', timestamp: Date.now() }
    setMessages(prev => [...prev, assistantMessage])

    setIsStreaming(true)

    try {
      const apiMessages = [...messages, userMessage].map(m => ({
        role: m.role,
        content: m.content,
      }))

      const stream = await client.messages.stream({
        model: 'claude-sonnet-4-6',
        max_tokens: 1024,
        system: buildSystemPrompt(activeTimetable, activeTrainInfo),
        messages: apiMessages,
      })

      for await (const chunk of stream) {
        if (chunk.type === 'content_block_delta' && chunk.delta?.type === 'text_delta') {
          setMessages(prev => {
            const updated = [...prev]
            const last = updated[updated.length - 1]
            if (last.role === 'assistant') {
              updated[updated.length - 1] = { ...last, content: last.content + chunk.delta.text }
            }
            return updated
          })
        }
      }
    } catch (err) {
      setError(err.message || 'API error')
      setMessages(prev => {
        const updated = [...prev]
        const last = updated[updated.length - 1]
        if (last.role === 'assistant' && last.content === '') {
          updated[updated.length - 1] = {
            ...last,
            content: `Error: ${err.message || 'Failed to get response'}`,
          }
        }
        return updated
      })
    } finally {
      setIsStreaming(false)
    }
  }, [messages, isStreaming, activeTimetable, activeTrainInfo])

  function clearHistory() {
    setMessages([])
    setError(null)
  }

  return { messages, sendMessage, isStreaming, error, clearHistory }
}

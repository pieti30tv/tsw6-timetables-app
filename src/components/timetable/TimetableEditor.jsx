import { useState } from 'react'
import { Modal } from '../ui/Modal.jsx'
import { Input } from '../ui/Input.jsx'
import { Button } from '../ui/Button.jsx'
import { TrainEntryForm } from './TrainEntryForm.jsx'

export function TimetableEditor({ open, onClose, timetable, onSave }) {
  const [name, setName] = useState(timetable?.name ?? '')
  const [description, setDescription] = useState(timetable?.description ?? '')
  const [trains, setTrains] = useState(timetable?.trains ?? [])
  const [addingTrain, setAddingTrain] = useState(false)
  const [editingTrainIndex, setEditingTrainIndex] = useState(null)

  // Reset when timetable prop changes
  useState(() => {
    setName(timetable?.name ?? '')
    setDescription(timetable?.description ?? '')
    setTrains(timetable?.trains ?? [])
    setAddingTrain(false)
    setEditingTrainIndex(null)
  })

  function handleSave() {
    if (!name.trim()) return
    onSave({ name: name.trim(), description: description.trim(), trains })
  }

  function handleSaveTrain(trainData) {
    if (editingTrainIndex !== null) {
      const updated = [...trains]
      updated[editingTrainIndex] = trainData
      setTrains(updated)
      setEditingTrainIndex(null)
    } else {
      setTrains(prev => [...prev, trainData])
      setAddingTrain(false)
    }
  }

  function handleDeleteTrain(index) {
    if (confirm('Remove this train?')) {
      setTrains(trains.filter((_, i) => i !== index))
    }
  }

  const showTrainForm = addingTrain || editingTrainIndex !== null
  const editingTrain = editingTrainIndex !== null ? trains[editingTrainIndex] : null

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={timetable ? 'Edit Timetable' : 'New Timetable'}
      size="lg"
    >
      <div className="p-6 space-y-5">
        {/* Name & Description */}
        <div className="space-y-3">
          <Input
            label="Timetable Name"
            value={name}
            onChange={e => setName(e.target.value)}
            placeholder="e.g. Morristown Line — Weekday"
            required
          />
          <Input
            label="Description (optional)"
            value={description}
            onChange={e => setDescription(e.target.value)}
            placeholder="Brief description…"
          />
        </div>

        {/* Trains */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="text-xs font-medium text-gray-400 uppercase tracking-wider">
              Trains ({trains.length})
            </label>
            {!showTrainForm && (
              <Button size="sm" variant="outline" onClick={() => setAddingTrain(true)}>
                + Add Train
              </Button>
            )}
          </div>

          {/* Train form (add or edit) */}
          {showTrainForm && (
            <div className="border border-gray-700 rounded-lg mb-3 bg-gray-950/50">
              <div className="px-4 pt-3 pb-0 text-xs font-medium text-amber-400">
                {editingTrain ? `Editing: ${editingTrain.trainNumber}` : 'New Train'}
              </div>
              <TrainEntryForm
                train={editingTrain}
                onSave={handleSaveTrain}
                onCancel={() => { setAddingTrain(false); setEditingTrainIndex(null) }}
              />
            </div>
          )}

          {/* Train list */}
          {trains.length === 0 && !showTrainForm && (
            <p className="text-xs text-gray-600 py-3 text-center border border-dashed border-gray-800 rounded">
              No trains yet
            </p>
          )}
          <div className="space-y-1.5">
            {trains.map((t, i) => {
              const first = t.stops[0]
              const last = t.stops[t.stops.length - 1]
              return (
                <div key={t.id} className="flex items-center justify-between bg-gray-800 rounded px-3 py-2 text-xs">
                  <div className="flex items-center gap-3">
                    <span className="font-mono font-bold text-amber-400">{t.trainNumber}</span>
                    <span className="text-gray-500">{t.trainType}</span>
                    {first && last && (
                      <span className="text-gray-400">
                        {first.stationName} → {last.stationName}
                      </span>
                    )}
                    <span className="text-gray-600">{t.stops.length} stops</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <button onClick={() => { setEditingTrainIndex(i); setAddingTrain(false) }}
                      className="text-gray-500 hover:text-gray-300 px-2 py-0.5">Edit</button>
                    <button onClick={() => handleDeleteTrain(i)}
                      className="text-red-700 hover:text-red-500 px-2 py-0.5">×</button>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Save button */}
        <div className="flex justify-end gap-2 pt-2 border-t border-gray-800">
          <Button variant="ghost" onClick={onClose}>Cancel</Button>
          <Button onClick={handleSave} disabled={!name.trim()}>
            {timetable ? 'Save Changes' : 'Create Timetable'}
          </Button>
        </div>
      </div>
    </Modal>
  )
}

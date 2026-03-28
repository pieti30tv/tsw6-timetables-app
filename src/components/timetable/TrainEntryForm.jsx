import { useState } from 'react'
import { Input } from '../ui/Input.jsx'
import { Select } from '../ui/Select.jsx'
import { Button } from '../ui/Button.jsx'
import { StopEditor } from './StopEditor.jsx'
import { ROUTES } from '../../constants/routes.js'
import { TRAIN_TYPES, DIRECTIONS } from '../../constants/trainTypes.js'

export function TrainEntryForm({ train, onSave, onCancel }) {
  const [form, setForm] = useState({
    trainNumber: train?.trainNumber ?? '',
    trainType: train?.trainType ?? 'Other',
    route: train?.route ?? '',
    direction: train?.direction ?? 'northbound',
    notes: train?.notes ?? '',
    stops: train?.stops ?? [],
  })

  function update(field, value) {
    setForm(prev => ({ ...prev, [field]: value }))
  }

  function handleSubmit(e) {
    e.preventDefault()
    if (!form.trainNumber.trim()) return
    onSave({ ...form, id: train?.id ?? crypto.randomUUID() })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4">
      <div className="grid grid-cols-2 gap-3">
        <Input
          label="Train Number"
          value={form.trainNumber}
          onChange={e => update('trainNumber', e.target.value)}
          placeholder="e.g. IC 1234"
          required
        />
        <Select
          label="Train Type"
          value={form.trainType}
          onChange={e => update('trainType', e.target.value)}
        >
          {TRAIN_TYPES.map(t => (
            <option key={t.id} value={t.id}>{t.label}</option>
          ))}
        </Select>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <Select
          label="Route"
          value={form.route}
          onChange={e => update('route', e.target.value)}
        >
          <option value="">— Select route —</option>
          {ROUTES.map(r => (
            <option key={r.id} value={r.id}>{r.name}</option>
          ))}
        </Select>
        <Select
          label="Direction"
          value={form.direction}
          onChange={e => update('direction', e.target.value)}
        >
          {DIRECTIONS.map(d => (
            <option key={d.id} value={d.id}>{d.label}</option>
          ))}
        </Select>
      </div>

      <Input
        label="Notes (optional)"
        value={form.notes}
        onChange={e => update('notes', e.target.value)}
        placeholder="Service notes…"
      />

      <div>
        <label className="block text-xs font-medium text-gray-400 uppercase tracking-wider mb-2">
          Stops
        </label>
        <StopEditor
          stops={form.stops}
          onChange={stops => update('stops', stops)}
          routeId={form.route}
        />
      </div>

      <div className="flex justify-end gap-2 pt-2 border-t border-gray-800">
        <Button type="button" variant="ghost" onClick={onCancel}>Cancel</Button>
        <Button type="submit" disabled={!form.trainNumber.trim()}>Save Train</Button>
      </div>
    </form>
  )
}

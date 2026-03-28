import { useState } from 'react'
import { PageTransition } from '../components/layout/PageTransition.jsx'
import { TimetableList } from '../components/timetable/TimetableList.jsx'
import { TimetableEditor } from '../components/timetable/TimetableEditor.jsx'
import { ImportExportPanel } from '../components/timetable/ImportExportPanel.jsx'
import { Button } from '../components/ui/Button.jsx'
import { useTimetables } from '../hooks/useTimetables.js'

export function TimetablePage() {
  const [editorOpen, setEditorOpen] = useState(false)
  const [editingTimetable, setEditingTimetable] = useState(null)
  const [importExportOpen, setImportExportOpen] = useState(false)
  const { createTimetable, updateTimetable } = useTimetables()

  function handleEdit(timetable) {
    setEditingTimetable(timetable)
    setEditorOpen(true)
  }

  function handleCreate() {
    setEditingTimetable(null)
    setEditorOpen(true)
  }

  function handleSave(data) {
    if (editingTimetable) {
      updateTimetable({ ...editingTimetable, ...data, updatedAt: new Date().toISOString() })
    } else {
      createTimetable(data)
    }
    setEditorOpen(false)
  }

  return (
    <PageTransition>
      <div className="p-6 max-w-5xl mx-auto">
        {/* Page header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-lg font-semibold text-gray-100">Timetables</h2>
            <p className="text-sm text-gray-500 mt-0.5">Create and manage TSW6 service timetables</p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={() => setImportExportOpen(v => !v)}>
              Import / Export
            </Button>
            <Button size="sm" onClick={handleCreate}>
              + New Timetable
            </Button>
          </div>
        </div>

        {/* Import/export panel */}
        {importExportOpen && (
          <div className="mb-6">
            <ImportExportPanel />
          </div>
        )}

        {/* List */}
        <TimetableList onEdit={handleEdit} />

        {/* Editor modal */}
        <TimetableEditor
          open={editorOpen}
          onClose={() => setEditorOpen(false)}
          timetable={editingTimetable}
          onSave={handleSave}
        />
      </div>
    </PageTransition>
  )
}

import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import { TimetableProvider } from './context/TimetableContext.jsx'
import { TrackerProvider } from './context/TrackerContext.jsx'
import { Sidebar } from './components/layout/Sidebar.jsx'
import { TopBar } from './components/layout/TopBar.jsx'
import { TimetablePage } from './pages/TimetablePage.jsx'
import { TrackerPage } from './pages/TrackerPage.jsx'
import { DelayPage } from './pages/DelayPage.jsx'
import { DispatcherPage } from './pages/DispatcherPage.jsx'

function AnimatedRoutes() {
  const location = useLocation()
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/"           element={<TimetablePage />} />
        <Route path="/tracker"    element={<TrackerPage />} />
        <Route path="/delay"      element={<DelayPage />} />
        <Route path="/dispatcher" element={<DispatcherPage />} />
      </Routes>
    </AnimatePresence>
  )
}

function AppLayout() {
  return (
    <div className="flex min-h-screen bg-gray-950">
      <Sidebar />
      <div className="flex flex-col flex-1 overflow-hidden">
        <TopBar />
        <main className="flex-1 overflow-y-auto">
          <AnimatedRoutes />
        </main>
      </div>
    </div>
  )
}

function App() {
  return (
    <BrowserRouter>
      <TimetableProvider>
        <TrackerProvider>
          <AppLayout />
        </TrackerProvider>
      </TimetableProvider>
    </BrowserRouter>
  )
}

export default App

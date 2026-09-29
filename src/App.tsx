import { HashRouter, Navigate, Route, Routes } from 'react-router-dom'
import { ProgressProvider } from './lib/ProgressContext'
import { Layout } from './components/Layout'
import { HomePage } from './pages/Home'
import { ExplorePage } from './pages/Explore'
import { LevelPage } from './pages/LevelPage'
import { AwardsPage } from './pages/Awards'
import { FeedbackPage } from './pages/Feedback'

export default function App() {
  return (
    <ProgressProvider>
      <HashRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/explore" element={<ExplorePage />} />
            <Route path="/explore/:levelId" element={<LevelPage />} />
            <Route path="/awards" element={<AwardsPage />} />
            <Route path="/feedback" element={<FeedbackPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Route>
        </Routes>
      </HashRouter>
    </ProgressProvider>
  )
}

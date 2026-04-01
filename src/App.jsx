import { useState } from 'react'
import LandingPage from './pages/LandingPage'
import MainPage from './pages/MainPage'
import './App.css'

function App() {
  const [currentPage, setCurrentPage] = useState('landing')
  const [soundMode, setSoundMode] = useState('piano')

  return (
    <div className="app">
      {currentPage === 'landing' ? (
        <LandingPage
          onPlay={() => setCurrentPage('main')}
          soundMode={soundMode}
          onToggleSound={() => setSoundMode(prev => prev === 'piano' ? 'cat' : 'piano')}
        />
      ) : (
        <MainPage
          soundMode={soundMode}
          onToggleSound={() => setSoundMode(prev => prev === 'piano' ? 'cat' : 'piano')}
          onBack={() => setCurrentPage('landing')}
        />
      )}
    </div>
  )
}

export default App

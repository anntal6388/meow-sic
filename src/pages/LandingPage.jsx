import SoundToggle from '../components/SoundToggle'
import './LandingPage.css'

function LandingPage({ onPlay, soundMode, onToggleSound }) {
  return (
    <div className="landing-page">
      <div className="bg-image" />
      <div className="bg-overlay" />

      <div className="toggle-wrapper">
        <SoundToggle soundMode={soundMode} onToggle={onToggleSound} />
      </div>

      <div className="landing-content">
        <h1 className="landing-title">Welcome to<br />Meow-sic</h1>
        <button className="play-btn" onClick={onPlay}>
          <span>Play now</span>
        </button>
      </div>
    </div>
  )
}

export default LandingPage

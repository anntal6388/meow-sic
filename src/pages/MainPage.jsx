import { useState } from 'react'
import SoundToggle from '../components/SoundToggle'
import { playNote } from '../utils/soundEngine'
import './MainPage.css'

// Cat positions matching the design mockup
// Cat_Re = top-left, Cat_So = top-right, Cat_Do = center, Cat_Fa = bottom-left, Cat_Mi = bottom-right
const CATS = [
  {
    id: 'Re',
    note: 'Re',
    image: '/assets/Cat_Re.png',
    label: 'Re',
    style: { top: '18%', left: '15%', width: '180px' },
  },
  {
    id: 'So',
    note: 'So',
    image: '/assets/Cat_So.png',
    label: 'So',
    style: { top: '12%', right: '20%', width: '140px' },
  },
  {
    id: 'Do',
    note: 'Do',
    image: '/assets/Cat_Do.png',
    label: 'Do',
    style: { top: '28%', left: '50%', transform: 'translateX(-50%)', width: '200px' },
  },
  {
    id: 'Fa',
    note: 'Fa',
    image: '/assets/Cat_Fa.png',
    label: 'Fa',
    style: { bottom: '12%', left: '14%', width: '190px' },
  },
  {
    id: 'Mi',
    note: 'Mi',
    image: '/assets/Cat_Mi.png',
    label: 'Mi',
    style: { bottom: '8%', right: '12%', width: '185px' },
  },
]

function MainPage({ soundMode, onToggleSound, onBack }) {
  const [activeNote, setActiveNote] = useState(null)

  const handleCatClick = (note, id) => {
    playNote(note, soundMode)
    setActiveNote(id)
    setTimeout(() => setActiveNote(null), 400)
  }

  return (
    <div className="main-page">
      <div className="bg-image" />
      <div className="bg-overlay" />

      <div className="toggle-wrapper">
        <SoundToggle soundMode={soundMode} onToggle={onToggleSound} />
      </div>

      <button className="back-btn" onClick={onBack}>← Back</button>

      <div className="mode-label">
        {soundMode === 'piano' ? '🎹 Piano Mode' : '🐱 Cat Mode'}
      </div>

      {CATS.map((cat) => (
        <button
          key={cat.id}
          className={`cat-btn ${activeNote === cat.id ? 'cat-active' : ''}`}
          style={cat.style}
          onClick={() => handleCatClick(cat.note, cat.id)}
          aria-label={`Play ${cat.note}`}
        >
          <img src={cat.image} alt={cat.label} className="cat-img" />
          <span className="note-label">{cat.label}</span>
        </button>
      ))}
    </div>
  )
}

export default MainPage

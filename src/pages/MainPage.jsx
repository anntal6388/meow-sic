import { useState } from 'react'
import SoundToggle from '../components/SoundToggle'
import { playNote } from '../utils/soundEngine'
import './MainPage.css'

const CATS = [
  {
    id: 'Re',
    note: 'Re',
    image: '/assets/Cat_Re.png',
    style: { top: '16%', left: '14%', width: '190px' },
  },
  {
    id: 'So',
    note: 'So',
    image: '/assets/Cat_So.png',
    style: { top: '10%', right: '18%', width: '145px' },
  },
  {
    id: 'Do',
    note: 'Do',
    image: '/assets/Cat_Do.png',
    style: { top: '26%', left: '50%', transform: 'translateX(-50%)', width: '205px' },
  },
  {
    id: 'Fa',
    note: 'Fa',
    image: '/assets/Cat_Fa.png',
    style: { bottom: '10%', left: '13%', width: '195px' },
  },
  {
    id: 'Mi',
    note: 'Mi',
    image: '/assets/Cat_Mi.png',
    style: { bottom: '6%', right: '10%', width: '188px' },
  },
]

function MainPage({ soundMode, onToggleSound, onBack }) {
  const [activeNote, setActiveNote] = useState(null)

  const handleCatClick = (note, id) => {
    playNote(note, soundMode)
    setActiveNote(id)
    setTimeout(() => setActiveNote(null), 320)
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
          <img src={cat.image} alt={cat.id} className="cat-img" />
          <span className="note-label">{cat.note}</span>
        </button>
      ))}
    </div>
  )
}

export default MainPage

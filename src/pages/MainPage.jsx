import { useState } from 'react'
import SoundToggle from '../components/SoundToggle'
import { playNote } from '../utils/soundEngine'
import './MainPage.css'

const CATS = [
  {
    id: 'Re',
    note: 'Re',
    image: '/assets/Cat_Re.png',
    label: 'Re',
    className: 'cat-pos-re',
  },
  {
    id: 'So',
    note: 'So',
    image: '/assets/Cat_So.png',
    label: 'So',
    className: 'cat-pos-so',
  },
  {
    id: 'Do',
    note: 'Do',
    image: '/assets/Cat_Do.png',
    label: 'Do',
    className: 'cat-pos-do',
  },
  {
    id: 'Fa',
    note: 'Fa',
    image: '/assets/Cat_Fa.png',
    label: 'Fa',
    className: 'cat-pos-fa',
  },
  {
    id: 'Mi',
    note: 'Mi',
    image: '/assets/Cat_Mi.png',
    label: 'Mi',
    className: 'cat-pos-mi',
  },
]

function MainPage({ soundMode, onToggleSound, onBack }) {
  const [activeNote, setActiveNote] = useState(null)

  const handleCatClick = (note, id) => {
    playNote(note, soundMode)
    setActiveNote(id)
    setTimeout(() => setActiveNote(null), 350)
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
          className={`cat-btn ${cat.className} ${activeNote === cat.id ? 'cat-active' : ''}`}
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

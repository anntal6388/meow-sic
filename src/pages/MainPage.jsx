import { useState, useRef, useCallback, useEffect } from 'react'
import SoundToggle from '../components/SoundToggle'
import { playNote } from '../utils/soundEngine'
import './MainPage.css'

// Default positions as percentages of screen (so they scale on any device)
const DEFAULT_POSITIONS = {
  Re: { x: 18, y: 18 },
  So: { x: 68, y: 12 },
  Do: { x: 43, y: 24 },
  Fa: { x: 14, y: 58 },
  Mi: { x: 70, y: 55 },
}

const CATS = [
  { id: 'Re', note: 'Re', image: '/assets/Cat_Re.png', label: 'Re' },
  { id: 'So', note: 'So', image: '/assets/Cat_So.png', label: 'So' },
  { id: 'Do', note: 'Do', image: '/assets/Cat_Do.png', label: 'Do' },
  { id: 'Fa', note: 'Fa', image: '/assets/Cat_Fa.png', label: 'Fa' },
  { id: 'Mi', note: 'Mi', image: '/assets/Cat_Mi.png', label: 'Mi' },
]

function MainPage({ soundMode, onToggleSound, onBack }) {
  const [positions, setPositions] = useState(DEFAULT_POSITIONS)
  const [activeNote, setActiveNote] = useState(null)
  const [draggingId, setDraggingId] = useState(null)
  const [zOrders, setZOrders] = useState({ Re: 5, So: 5, Do: 5, Fa: 5, Mi: 5 })
  const [zCounter, setZCounter] = useState(10)

  const dragState = useRef(null) // { id, startMouseX, startMouseY, startPctX, startPctY }
  const containerRef = useRef(null)

  const bringToFront = useCallback((id) => {
    setZCounter(prev => {
      const next = prev + 1
      setZOrders(zo => ({ ...zo, [id]: next }))
      return next
    })
  }, [])

  // ── MOUSE drag ──
  const onMouseDown = useCallback((e, id) => {
    e.preventDefault()
    bringToFront(id)
    const rect = containerRef.current.getBoundingClientRect()
    dragState.current = {
      id,
      startMouseX: e.clientX,
      startMouseY: e.clientY,
      startPctX: positions[id].x,
      startPctY: positions[id].y,
      moved: false,
    }
    setDraggingId(id)
  }, [positions, bringToFront])

  const onMouseMove = useCallback((e) => {
    if (!dragState.current) return
    const rect = containerRef.current.getBoundingClientRect()
    const dx = ((e.clientX - dragState.current.startMouseX) / rect.width) * 100
    const dy = ((e.clientY - dragState.current.startMouseY) / rect.height) * 100
    if (Math.abs(dx) > 1 || Math.abs(dy) > 1) dragState.current.moved = true
    const { id, startPctX, startPctY } = dragState.current
    setPositions(prev => ({
      ...prev,
      [id]: {
        x: Math.min(Math.max(startPctX + dx, 0), 85),
        y: Math.min(Math.max(startPctY + dy, 0), 82),
      }
    }))
  }, [])

  const onMouseUp = useCallback((e, id) => {
    if (!dragState.current) return
    const wasDrag = dragState.current.moved
    dragState.current = null
    setDraggingId(null)
    if (!wasDrag && id) {
      // It was a tap/click — play sound
      const cat = CATS.find(c => c.id === id)
      if (cat) {
        playNote(cat.note, soundMode)
        setActiveNote(id)
        setTimeout(() => setActiveNote(null), 350)
      }
    }
  }, [soundMode])

  // ── TOUCH drag ──
  const onTouchStart = useCallback((e, id) => {
    bringToFront(id)
    const touch = e.touches[0]
    const rect = containerRef.current.getBoundingClientRect()
    dragState.current = {
      id,
      startMouseX: touch.clientX,
      startMouseY: touch.clientY,
      startPctX: positions[id].x,
      startPctY: positions[id].y,
      moved: false,
    }
    setDraggingId(id)
  }, [positions, bringToFront])

  const onTouchMove = useCallback((e) => {
    if (!dragState.current) return
    e.preventDefault()
    const touch = e.touches[0]
    const rect = containerRef.current.getBoundingClientRect()
    const dx = ((touch.clientX - dragState.current.startMouseX) / rect.width) * 100
    const dy = ((touch.clientY - dragState.current.startMouseY) / rect.height) * 100
    if (Math.abs(dx) > 1 || Math.abs(dy) > 1) dragState.current.moved = true
    const { id, startPctX, startPctY } = dragState.current
    setPositions(prev => ({
      ...prev,
      [id]: {
        x: Math.min(Math.max(startPctX + dx, 0), 85),
        y: Math.min(Math.max(startPctY + dy, 0), 82),
      }
    }))
  }, [])

  const onTouchEnd = useCallback((e, id) => {
    if (!dragState.current) return
    const wasDrag = dragState.current.moved
    dragState.current = null
    setDraggingId(null)
    if (!wasDrag && id) {
      const cat = CATS.find(c => c.id === id)
      if (cat) {
        playNote(cat.note, soundMode)
        setActiveNote(id)
        setTimeout(() => setActiveNote(null), 350)
      }
    }
  }, [soundMode])

  // Attach global mousemove/mouseup so drag works even if cursor leaves cat
  useEffect(() => {
    const handleMove = (e) => onMouseMove(e)
    const handleUp = (e) => onMouseUp(e, null)
    window.addEventListener('mousemove', handleMove)
    window.addEventListener('mouseup', handleUp)
    return () => {
      window.removeEventListener('mousemove', handleMove)
      window.removeEventListener('mouseup', handleUp)
    }
  }, [onMouseMove, onMouseUp])

  return (
    <div
      className="main-page"
      ref={containerRef}
      onTouchMove={(e) => onTouchMove(e)}
    >
      <div className="bg-image" />
      <div className="bg-overlay" />

      <div className="toggle-wrapper">
        <SoundToggle soundMode={soundMode} onToggle={onToggleSound} />
      </div>

      <button className="back-btn" onClick={onBack}>← Back</button>

      <div className="mode-label">
        {soundMode === 'piano' ? '🎹 Piano Mode' : '🐱 Cat Mode'}
      </div>

      <div className="drag-hint">Hold & drag cats • tap to play</div>

      {CATS.map((cat) => (
        <div
          key={cat.id}
          className={`cat-btn ${draggingId === cat.id ? 'is-dragging' : ''} ${activeNote === cat.id ? 'cat-active' : ''}`}
          style={{
            left: `${positions[cat.id].x}%`,
            top: `${positions[cat.id].y}%`,
            zIndex: zOrders[cat.id],
            cursor: draggingId === cat.id ? 'grabbing' : 'grab',
          }}
          onMouseDown={(e) => onMouseDown(e, cat.id)}
          onMouseUp={(e) => onMouseUp(e, cat.id)}
          onTouchStart={(e) => onTouchStart(e, cat.id)}
          onTouchEnd={(e) => onTouchEnd(e, cat.id)}
        >
          <img
            src={cat.image}
            alt={cat.label}
            className="cat-img"
            draggable={false}
          />
          <span className="note-label">{cat.label}</span>
        </div>
      ))}
    </div>
  )
}

export default MainPage

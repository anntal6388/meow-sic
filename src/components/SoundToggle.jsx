import './SoundToggle.css'

// Cat face SVG (hand-drawn style matching the design)
const CatFaceIcon = () => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Ears */}
    <path d="M8 13 L5 7 L11 11 Z" fill="none" stroke="#2a2a2a" strokeWidth="1.4" strokeLinejoin="round"/>
    <path d="M24 13 L27 7 L21 11 Z" fill="none" stroke="#2a2a2a" strokeWidth="1.4" strokeLinejoin="round"/>
    {/* Face circle */}
    <circle cx="16" cy="17" r="9" fill="none" stroke="#2a2a2a" strokeWidth="1.4"/>
    {/* Eyes */}
    <path d="M12 15 Q12.5 14 13 15" stroke="#2a2a2a" strokeWidth="1.3" strokeLinecap="round" fill="none"/>
    <path d="M19 15 Q19.5 14 20 15" stroke="#2a2a2a" strokeWidth="1.3" strokeLinecap="round" fill="none"/>
    {/* Nose */}
    <path d="M15 17.5 L16 16.5 L17 17.5" fill="#2a2a2a" stroke="none"/>
    {/* Whiskers */}
    <line x1="7" y1="17" x2="12" y2="17.5" stroke="#2a2a2a" strokeWidth="1" strokeLinecap="round"/>
    <line x1="7" y1="19" x2="12" y2="18.5" stroke="#2a2a2a" strokeWidth="1" strokeLinecap="round"/>
    <line x1="25" y1="17" x2="20" y2="17.5" stroke="#2a2a2a" strokeWidth="1" strokeLinecap="round"/>
    <line x1="25" y1="19" x2="20" y2="18.5" stroke="#2a2a2a" strokeWidth="1" strokeLinecap="round"/>
    {/* Smile */}
    <path d="M14 19.5 Q16 21 18 19.5" fill="none" stroke="#2a2a2a" strokeWidth="1.2" strokeLinecap="round"/>
  </svg>
)

// Cat face filled (when active/covered by knob in cat mode)
const CatFaceFilledIcon = () => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M8 13 L5 7 L11 11 Z" fill="none" stroke="#fff" strokeWidth="1.4" strokeLinejoin="round"/>
    <path d="M24 13 L27 7 L21 11 Z" fill="none" stroke="#fff" strokeWidth="1.4" strokeLinejoin="round"/>
    <circle cx="16" cy="17" r="9" fill="none" stroke="#fff" strokeWidth="1.4"/>
    <path d="M12 15 Q12.5 14 13 15" stroke="#fff" strokeWidth="1.3" strokeLinecap="round" fill="none"/>
    <path d="M19 15 Q19.5 14 20 15" stroke="#fff" strokeWidth="1.3" strokeLinecap="round" fill="none"/>
    <path d="M15 17.5 L16 16.5 L17 17.5" fill="#fff" stroke="none"/>
    <line x1="7" y1="17" x2="12" y2="17.5" stroke="#fff" strokeWidth="1" strokeLinecap="round"/>
    <line x1="7" y1="19" x2="12" y2="18.5" stroke="#fff" strokeWidth="1" strokeLinecap="round"/>
    <line x1="25" y1="17" x2="20" y2="17.5" stroke="#fff" strokeWidth="1" strokeLinecap="round"/>
    <line x1="25" y1="19" x2="20" y2="18.5" stroke="#fff" strokeWidth="1" strokeLinecap="round"/>
    <path d="M14 19.5 Q16 21 18 19.5" fill="none" stroke="#fff" strokeWidth="1.2" strokeLinecap="round"/>
  </svg>
)

// Music note icon (hand-drawn style)
const MusicNoteIcon = ({ color = "#2a2a2a" }) => (
  <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Note 1 stem + head */}
    <line x1="11" y1="8" x2="11" y2="18" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
    <ellipse cx="9.5" cy="18.5" rx="2.5" ry="1.8" fill={color} transform="rotate(-15 9.5 18.5)"/>
    {/* Note 2 stem + head */}
    <line x1="18" y1="6" x2="18" y2="16" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
    <ellipse cx="16.5" cy="16.5" rx="2.5" ry="1.8" fill={color} transform="rotate(-15 16.5 16.5)"/>
    {/* Beam connecting them */}
    <line x1="11" y1="8" x2="18" y2="6" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
    {/* Sparkle lines */}
    <line x1="21" y1="10" x2="23" y2="8" stroke={color} strokeWidth="1.2" strokeLinecap="round"/>
    <line x1="22" y1="13" x2="25" y2="13" stroke={color} strokeWidth="1.2" strokeLinecap="round"/>
    <line x1="21" y1="16" x2="23" y2="18" stroke={color} strokeWidth="1.2" strokeLinecap="round"/>
  </svg>
)

function SoundToggle({ soundMode, onToggle }) {
  const isCat = soundMode === 'cat'

  return (
    <div
      className={`sound-toggle ${isCat ? 'cat-mode' : 'piano-mode'}`}
      onClick={onToggle}
      title={isCat ? 'Switch to Piano' : 'Switch to Cat sounds'}
    >
      {/* Left icon: cat face */}
      <div className="toggle-icon toggle-icon-left">
        {isCat ? <CatFaceFilledIcon /> : <CatFaceIcon />}
      </div>

      {/* Right icon: music note */}
      <div className="toggle-icon toggle-icon-right">
        <MusicNoteIcon color={isCat ? "#2a2a2a" : "#fff"} />
      </div>

      {/* Green sliding knob */}
      <div className={`toggle-knob ${isCat ? 'knob-left' : 'knob-right'}`} />
    </div>
  )
}

export default SoundToggle

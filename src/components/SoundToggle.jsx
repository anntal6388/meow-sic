import './SoundToggle.css'

function SoundToggle({ soundMode, onToggle }) {
  const isCat = soundMode === 'cat'

  return (
    <div
      className={`sound-toggle ${isCat ? 'cat-mode' : 'piano-mode'}`}
      onClick={onToggle}
      title={isCat ? 'Switch to Piano' : 'Switch to Cat sounds'}
    >
      {/* Left side: cat icon */}
      <div className="toggle-icon-left">
        <img
          src="/assets/Cat_icon.jpg"
          alt="cat"
          className="toggle-icon-img"
        />
      </div>

      {/* Right side: piano icon */}
      <div className="toggle-icon-right">
        <img
          src="/assets/Piano_music_icon.webp"
          alt="piano"
          className="toggle-icon-img"
        />
      </div>

      {/* Sliding knob */}
      <div className={`toggle-knob ${isCat ? 'knob-left' : 'knob-right'}`} />
    </div>
  )
}

export default SoundToggle

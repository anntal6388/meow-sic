import './SoundToggle.css'

function SoundToggle({ soundMode, onToggle }) {
  const isCat = soundMode === 'cat'

  return (
    <div
      className={`sound-toggle ${isCat ? 'cat-mode' : 'piano-mode'}`}
      onClick={onToggle}
      title={isCat ? 'Switch to Piano' : 'Switch to Cat sounds'}
    >
      {/* Cream pill background */}
      <div className="toggle-track">
        {/* Cat icon (left) */}
        <div className="toggle-icon toggle-icon-left">
          <img src="/assets/Cat_icon.png" alt="cat" className="icon-img" />
        </div>

        {/* Piano icon (right) */}
        <div className="toggle-icon toggle-icon-right">
          <img src="/assets/Piano_music_icon.png" alt="piano" className="icon-img piano-img" />
        </div>

        {/* Green sliding knob */}
        <div className={`toggle-knob ${isCat ? 'knob-left' : 'knob-right'}`} />
      </div>
    </div>
  )
}

export default SoundToggle

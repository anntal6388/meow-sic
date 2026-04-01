import './SoundToggle.css'

function SoundToggle({ soundMode, onToggle }) {
  const isCat = soundMode === 'cat'

  return (
    <div
      className={`sound-toggle ${isCat ? 'cat-mode' : 'piano-mode'}`}
      onClick={onToggle}
      title={isCat ? 'Switch to Piano' : 'Switch to Cat sounds'}
    >
      <div className={`toggle-knob ${isCat ? 'knob-right' : 'knob-left'}`}>
        <img
          src={isCat ? '/assets/Cat_icon.png' : '/assets/Cat_icon.png'}
          alt="cat"
          className="knob-icon cat-knob-icon"
          style={{ opacity: isCat ? 1 : 0.6 }}
        />
      </div>
      <div className="toggle-icon-right">
        <img
          src="/assets/Piano_music_icon.png"
          alt="piano"
          className="knob-icon piano-knob-icon"
          style={{ opacity: isCat ? 0.6 : 1 }}
        />
      </div>
    </div>
  )
}

export default SoundToggle

let audioCtx = null

function getAudioCtx() {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)()
  }
  return audioCtx
}

const NOTE_FREQUENCIES = {
  Do: 261.63,
  Re: 293.66,
  Mi: 329.63,
  Fa: 349.23,
  So: 392.00,
}

export function playPianoNote(note) {
  const ctx = getAudioCtx()
  const freq = NOTE_FREQUENCIES[note]
  if (!freq) return

  const oscillator = ctx.createOscillator()
  const gainNode = ctx.createGain()
  oscillator.connect(gainNode)
  gainNode.connect(ctx.destination)
  oscillator.type = 'triangle'
  oscillator.frequency.setValueAtTime(freq, ctx.currentTime)

  const osc2 = ctx.createOscillator()
  const gain2 = ctx.createGain()
  osc2.connect(gain2)
  gain2.connect(ctx.destination)
  osc2.type = 'sine'
  osc2.frequency.setValueAtTime(freq * 2, ctx.currentTime)

  gainNode.gain.setValueAtTime(0.5, ctx.currentTime)
  gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 1.5)
  gain2.gain.setValueAtTime(0.15, ctx.currentTime)
  gain2.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 1.0)

  oscillator.start(ctx.currentTime)
  oscillator.stop(ctx.currentTime + 1.5)
  osc2.start(ctx.currentTime)
  osc2.stop(ctx.currentTime + 1.0)
}

export function playCatNote(note) {
  const ctx = getAudioCtx()
  const baseFreq = NOTE_FREQUENCIES[note] * 0.5

  const oscillator = ctx.createOscillator()
  const gainNode = ctx.createGain()
  const filter = ctx.createBiquadFilter()

  oscillator.type = 'sawtooth'
  oscillator.frequency.setValueAtTime(baseFreq * 0.8, ctx.currentTime)
  oscillator.frequency.linearRampToValueAtTime(baseFreq * 1.4, ctx.currentTime + 0.15)
  oscillator.frequency.linearRampToValueAtTime(baseFreq * 1.1, ctx.currentTime + 0.35)
  oscillator.frequency.exponentialRampToValueAtTime(baseFreq * 0.7, ctx.currentTime + 0.7)

  filter.type = 'bandpass'
  filter.frequency.setValueAtTime(800, ctx.currentTime)
  filter.frequency.linearRampToValueAtTime(1200, ctx.currentTime + 0.15)
  filter.frequency.linearRampToValueAtTime(600, ctx.currentTime + 0.7)
  filter.Q.value = 3

  gainNode.gain.setValueAtTime(0, ctx.currentTime)
  gainNode.gain.linearRampToValueAtTime(0.35, ctx.currentTime + 0.05)
  gainNode.gain.setValueAtTime(0.35, ctx.currentTime + 0.3)
  gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.75)

  oscillator.connect(filter)
  filter.connect(gainNode)
  gainNode.connect(ctx.destination)

  oscillator.start(ctx.currentTime)
  oscillator.stop(ctx.currentTime + 0.8)
}

export function playNote(note, mode) {
  if (mode === 'piano') {
    playPianoNote(note)
  } else {
    playCatNote(note)
  }
}

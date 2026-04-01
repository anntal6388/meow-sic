let audioCtx = null

function getAudioCtx() {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)()
  }
  // Resume if suspended (browser autoplay policy)
  if (audioCtx.state === 'suspended') audioCtx.resume()
  return audioCtx
}

// Do Re Mi Fa So — C4, D4, E4, F4, G4
const NOTE_FREQUENCIES = {
  Do: 261.63,
  Re: 293.66,
  Mi: 329.63,
  Fa: 349.23,
  So: 392.00,
}

// ─── PIANO ───────────────────────────────────────────────────────────────────
export function playPianoNote(note) {
  const ctx = getAudioCtx()
  const freq = NOTE_FREQUENCIES[note]
  if (!freq) return

  const now = ctx.currentTime

  // Fundamental
  const osc1 = ctx.createOscillator()
  const g1   = ctx.createGain()
  osc1.type = 'triangle'
  osc1.frequency.value = freq
  g1.gain.setValueAtTime(0.45, now)
  g1.gain.exponentialRampToValueAtTime(0.001, now + 2.0)
  osc1.connect(g1).connect(ctx.destination)
  osc1.start(now); osc1.stop(now + 2.0)

  // 2nd harmonic
  const osc2 = ctx.createOscillator()
  const g2   = ctx.createGain()
  osc2.type = 'sine'
  osc2.frequency.value = freq * 2
  g2.gain.setValueAtTime(0.12, now)
  g2.gain.exponentialRampToValueAtTime(0.001, now + 1.2)
  osc2.connect(g2).connect(ctx.destination)
  osc2.start(now); osc2.stop(now + 1.2)

  // 3rd harmonic (brightness)
  const osc3 = ctx.createOscillator()
  const g3   = ctx.createGain()
  osc3.type = 'sine'
  osc3.frequency.value = freq * 3
  g3.gain.setValueAtTime(0.05, now)
  g3.gain.exponentialRampToValueAtTime(0.001, now + 0.8)
  osc3.connect(g3).connect(ctx.destination)
  osc3.start(now); osc3.stop(now + 0.8)
}

// ─── CAT MEOW ────────────────────────────────────────────────────────────────
// Strategy: layered approach
//   1. A "throat" oscillator — low sawtooth with formant filter (body of meow)
//   2. A "nasal" oscillator — higher sine, pitched glide (the "eow" vowel sweep)
//   3. Attack + decay shaped to sound like a real meow: soft open → bright peak → tail off
export function playCatNote(note) {
  const ctx  = getAudioCtx()
  const freq = NOTE_FREQUENCIES[note]
  if (!freq) return

  const now  = ctx.currentTime
  // Cats meow roughly an octave + a bit lower than the note they "represent"
  const base = freq * 0.55

  // ── Layer 1: throat/body ──────────────────────────────
  const throat    = ctx.createOscillator()
  const throatGain = ctx.createGain()
  const formant1  = ctx.createBiquadFilter()
  const formant2  = ctx.createBiquadFilter()

  throat.type = 'sawtooth'
  // Pitch glide: starts slightly below, rises to peak, settles
  throat.frequency.setValueAtTime(base * 0.85, now)
  throat.frequency.linearRampToValueAtTime(base * 1.35, now + 0.18)
  throat.frequency.setValueAtTime(base * 1.35, now + 0.25)
  throat.frequency.exponentialRampToValueAtTime(base * 0.9, now + 0.65)

  // "mee" formant ~900 Hz → sweeps to "ow" ~500 Hz
  formant1.type = 'bandpass'
  formant1.frequency.setValueAtTime(900, now)
  formant1.frequency.linearRampToValueAtTime(500, now + 0.65)
  formant1.Q.value = 4

  // Add a second formant for richness (~1800 Hz "ee" colour)
  formant2.type = 'bandpass'
  formant2.frequency.setValueAtTime(1800, now)
  formant2.frequency.linearRampToValueAtTime(900, now + 0.65)
  formant2.Q.value = 6

  throatGain.gain.setValueAtTime(0, now)
  throatGain.gain.linearRampToValueAtTime(0.32, now + 0.06)   // soft attack
  throatGain.gain.setValueAtTime(0.32, now + 0.25)
  throatGain.gain.exponentialRampToValueAtTime(0.001, now + 0.75)

  throat.connect(formant1)
  throat.connect(formant2)
  formant1.connect(throatGain)
  formant2.connect(throatGain)
  throatGain.connect(ctx.destination)

  throat.start(now); throat.stop(now + 0.8)

  // ── Layer 2: nasal / "eow" whine ─────────────────────
  const nasal     = ctx.createOscillator()
  const nasalGain = ctx.createGain()
  const nasalFilt = ctx.createBiquadFilter()

  nasal.type = 'sine'
  nasal.frequency.setValueAtTime(base * 1.5, now)
  nasal.frequency.linearRampToValueAtTime(base * 2.1, now + 0.15)
  nasal.frequency.exponentialRampToValueAtTime(base * 1.2, now + 0.7)

  nasalFilt.type = 'bandpass'
  nasalFilt.frequency.value = 1400
  nasalFilt.Q.value = 5

  nasalGain.gain.setValueAtTime(0, now)
  nasalGain.gain.linearRampToValueAtTime(0.14, now + 0.08)
  nasalGain.gain.setValueAtTime(0.14, now + 0.2)
  nasalGain.gain.exponentialRampToValueAtTime(0.001, now + 0.6)

  nasal.connect(nasalFilt)
  nasalFilt.connect(nasalGain)
  nasalGain.connect(ctx.destination)

  nasal.start(now); nasal.stop(now + 0.7)

  // ── Layer 3: breath noise (tiny puff at start) ────────
  const bufferSize = ctx.sampleRate * 0.08
  const buffer     = ctx.createBuffer(1, bufferSize, ctx.sampleRate)
  const data       = buffer.getChannelData(0)
  for (let i = 0; i < bufferSize; i++) data[i] = (Math.random() * 2 - 1) * 0.06
  const noise      = ctx.createBufferSource()
  const noiseGain  = ctx.createGain()
  const noiseFilt  = ctx.createBiquadFilter()
  noise.buffer = buffer
  noiseFilt.type = 'highpass'
  noiseFilt.frequency.value = 2000
  noiseGain.gain.setValueAtTime(0.18, now)
  noiseGain.gain.exponentialRampToValueAtTime(0.001, now + 0.08)
  noise.connect(noiseFilt)
  noiseFilt.connect(noiseGain)
  noiseGain.connect(ctx.destination)
  noise.start(now)
}

// ─── DISPATCHER ──────────────────────────────────────────────────────────────
export function playNote(note, mode) {
  if (mode === 'piano') {
    playPianoNote(note)
  } else {
    playCatNote(note)
  }
}

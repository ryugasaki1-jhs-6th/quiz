/** Sound effect types */
type SoundType = 'correct' | 'incorrect' | 'countdown' | 'button' | 'gameStart' | 'gameEnd' | 'ranking';

/** Audio context for generating sounds */
let audioContext: AudioContext | null = null;

function getAudioContext(): AudioContext {
  if (!audioContext) {
    audioContext = new AudioContext();
  }
  return audioContext;
}

/** Play a synthesized sound effect */
export function playSound(type: SoundType, enabled: boolean = true): void {
  if (!enabled) return;

  try {
    const ctx = getAudioContext();
    const oscillator = ctx.createOscillator();
    const gainNode = ctx.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(ctx.destination);

    const now = ctx.currentTime;

    switch (type) {
      case 'correct':
        oscillator.frequency.setValueAtTime(523, now);
        oscillator.frequency.setValueAtTime(659, now + 0.1);
        oscillator.frequency.setValueAtTime(784, now + 0.2);
        gainNode.gain.setValueAtTime(0.3, now);
        gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.4);
        oscillator.start(now);
        oscillator.stop(now + 0.4);
        break;

      case 'incorrect':
        oscillator.frequency.setValueAtTime(200, now);
        oscillator.frequency.setValueAtTime(150, now + 0.15);
        oscillator.type = 'sawtooth';
        gainNode.gain.setValueAtTime(0.3, now);
        gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.3);
        oscillator.start(now);
        oscillator.stop(now + 0.3);
        break;

      case 'countdown':
        oscillator.frequency.setValueAtTime(880, now);
        gainNode.gain.setValueAtTime(0.2, now);
        gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.1);
        oscillator.start(now);
        oscillator.stop(now + 0.1);
        break;

      case 'button':
        oscillator.frequency.setValueAtTime(600, now);
        gainNode.gain.setValueAtTime(0.1, now);
        gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.05);
        oscillator.start(now);
        oscillator.stop(now + 0.05);
        break;

      case 'gameStart':
        oscillator.frequency.setValueAtTime(440, now);
        oscillator.frequency.setValueAtTime(554, now + 0.15);
        oscillator.frequency.setValueAtTime(659, now + 0.3);
        oscillator.frequency.setValueAtTime(880, now + 0.45);
        gainNode.gain.setValueAtTime(0.3, now);
        gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.6);
        oscillator.start(now);
        oscillator.stop(now + 0.6);
        break;

      case 'gameEnd':
        oscillator.frequency.setValueAtTime(880, now);
        oscillator.frequency.setValueAtTime(784, now + 0.2);
        oscillator.frequency.setValueAtTime(659, now + 0.4);
        oscillator.frequency.setValueAtTime(523, now + 0.6);
        gainNode.gain.setValueAtTime(0.3, now);
        gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.8);
        oscillator.start(now);
        oscillator.stop(now + 0.8);
        break;

      case 'ranking':
        oscillator.frequency.setValueAtTime(523, now);
        oscillator.frequency.setValueAtTime(659, now + 0.15);
        oscillator.frequency.setValueAtTime(784, now + 0.3);
        oscillator.frequency.setValueAtTime(1047, now + 0.45);
        gainNode.gain.setValueAtTime(0.25, now);
        gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.6);
        oscillator.start(now);
        oscillator.stop(now + 0.6);
        break;
    }
  } catch {
    // Silently fail if audio is not available
  }
}

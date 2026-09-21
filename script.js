const playButton = document.querySelector('#playButton');
const audioPlayer = document.querySelector('#audioPlayer');
const trackTime = document.querySelector('.track-time');

const formatTime = (seconds) => {
  if (!Number.isFinite(seconds)) return '00:00';
  const minutes = Math.floor(seconds / 60);
  const remainder = Math.floor(seconds % 60).toString().padStart(2, '0');
  return `${minutes}:${remainder}`;
};

if (playButton) {
  playButton.addEventListener('click', () => {
    const icon = playButton.querySelector('.play-icon');
    if (!audioPlayer) return;
    if (audioPlayer.paused) {
      if (audioPlayer.readyState === 0) audioPlayer.load();
      audioPlayer.play().catch(() => {
        playButton.classList.remove('is-playing');
        playButton.setAttribute('aria-label', 'Audio non disponibile');
      });
    } else {
      audioPlayer.pause();
    }
  });
}

if (audioPlayer && playButton) {
  audioPlayer.addEventListener('play', () => {
    playButton.classList.add('is-playing');
    playButton.querySelector('.play-icon').textContent = 'Ⅱ';
    playButton.setAttribute('aria-label', 'Metti in pausa');
  });
  audioPlayer.addEventListener('pause', () => {
    playButton.classList.remove('is-playing');
    playButton.querySelector('.play-icon').textContent = '▶';
    playButton.setAttribute('aria-label', 'Riproduci anteprima');
  });
  audioPlayer.addEventListener('timeupdate', () => {
    if (trackTime) trackTime.textContent = `${formatTime(audioPlayer.currentTime)} / ${formatTime(audioPlayer.duration)}`;
  });
  audioPlayer.addEventListener('ended', () => {
    audioPlayer.currentTime = 0;
  });
  audioPlayer.addEventListener('error', () => {
    playButton.setAttribute('aria-label', 'Audio non disponibile');
  });
}

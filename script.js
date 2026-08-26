const playButton = document.querySelector('#playButton');
if (playButton) {
  playButton.addEventListener('click', () => {
    const icon = playButton.querySelector('.play-icon');
    const playing = playButton.classList.toggle('is-playing');
    icon.textContent = playing ? 'Ⅱ' : '▶';
    playButton.setAttribute('aria-label', playing ? 'Metti in pausa' : 'Riproduci anteprima');
  });
}

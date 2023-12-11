const pauseButton = document.querySelector('#js-pause');
const playButton = document.querySelector('#js-play');
const volumeControl = document.querySelector('#js-input-volume');

// Inicialização ao entrar
const audioUrl = 'https://radio.plaza.one/mp3';
const audioContext = new window.AudioContext();
let audioElement = createAudioElement();
audioElement.src = audioUrl;
audioElement.play();

function createAudioElement() {
  let audioElement = new Audio();
  let audioSource = audioContext.createMediaElementSource(audioElement);
  audioSource.connect(audioContext.destination);
  return audioElement;
}

const handleClickPause = () => {
  try {
    audioElement.pause();
    audioElement = null;
    pauseButton.classList.remove('active');
    playButton.classList.add('active');
  } catch (error) {
    console.log(error);
  }
};

const handleClickPlay = () => {
  if (!audioElement) {
    audioElement = createAudioElement();
    audioElement.src = audioUrl;
  }
  handleVolumeChange();
  audioElement.play();
  playButton.classList.remove('active');
  pauseButton.classList.add('active');
};

const handleVolumeChange = () => {
  if (audioElement) {
    audioElement.volume = volumeControl.value;
  }
};

pauseButton.addEventListener('click', handleClickPause);
playButton.addEventListener('click', handleClickPlay);
volumeControl.addEventListener('input', handleVolumeChange);

const listenersElement = document.querySelector('#js-listeners');
const totalTimeElement = document.querySelector('#js-total-time');
const currentTimeElement = document.querySelector('#js-current-time');
const albumCoverElement = document.querySelector('#js-album-image');
const songTitleElement = document.querySelector('#js-song-title');
const songAlbumElement = document.querySelector('#js-song-album');

const getStatus = async () => {
  const response = await fetch('https://api.plaza.one/status');
  const data = await response.json();
  return data;
};

const putZeroAtLeft = (n) => (String(n).length === 1 ? `0${n}` : n);

const updateData = async () => {
  const { song, listeners } = await getStatus();
  listenersElement.innerText = listeners;
  albumCoverElement.src = song?.artwork_sm_src;
  songTitleElement.innerText = song?.title;
  songTitleElement.title = song?.title;
  songAlbumElement.innerText = song?.album;
  songAlbumElement.title = song?.album;
  totalTimeElement.innerText = `${putZeroAtLeft(
    Math.floor(song['length'] / 60)
  )}:${putZeroAtLeft(Math.floor(song['length'] % 60))}`;

  startNewTimer(song?.position, song['length']);
};

let uniqueTimingInterval;
const startNewTimer = (actualPosition, audioLength) => {
  let counter = actualPosition >= audioLength - 1 ? 0 : actualPosition;

  if (uniqueTimingInterval) clearInterval(uniqueTimingInterval);
  uniqueTimingInterval = setInterval(() => {
    counter++;
    currentTimeElement.innerText = `${putZeroAtLeft(
      Math.floor(counter / 60)
    )}:${putZeroAtLeft(Math.floor(counter % 60))}`;

    if (counter >= audioLength - 1) {
      clearInterval(uniqueTimingInterval);
      updateData();
    }
  }, 1000);
};

const alwaysUpdating = () => {
  updateData();

  setInterval(() => {
    updateData();
  }, 300 * 1000);
};

alwaysUpdating();

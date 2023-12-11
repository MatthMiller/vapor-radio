const listElement = document.querySelector('#js-history');
const loadingElement = document.querySelector('#js-loading');
let isFirstRender = true;

const getHistory = async () => {
  activeLoading();
  if (isFirstRender) isFirstRender = false;
  const response = await fetch('https://api.plaza.one/history/');
  const data = await response.json();
  return data;
};

const putZeroAtLeft = (n) => (String(n).length === 1 ? `0${n}` : n);

const updateData = async () => {
  const { songs } = await getHistory();
  removeLoading();

  songs.map((actualSong) => {
    const playedAt = new Date(actualSong.played_at * 1000);
    const date = `${playedAt.getMonth()}/${playedAt.getDate()}/${playedAt.getFullYear()}`;
    const hours = `${putZeroAtLeft(playedAt.getHours())}:${putZeroAtLeft(
      playedAt.getMinutes()
    )}`;

    const newItem = document.createElement('li');
    newItem.classList.add('ph-item');
    newItem.innerHTML =
      '<div class="ph-left">' +
      '<p title="' +
      actualSong.title +
      '" class="ph-title">' +
      actualSong.title +
      '</p>' +
      '<p title="' +
      actualSong.title +
      '" class="ph-artist">' +
      actualSong.artist +
      '</p>' +
      '</div>' +
      '<div class="ph-right">' +
      '<p class="ph-date">' +
      date +
      '</p>' +
      '<p class="ph-hours">' +
      hours +
      '</p>' +
      '</div>';
    listElement.appendChild(newItem);
  });
};

const activeLoading = () => {
  if (isFirstRender) {
    loadingElement.classList.add('ph-active');
  }
};

const removeLoading = () => {
  loadingElement.classList.remove('ph-active');
};

const init = () => {
  updateData();

  setInterval(() => {
    updateData();
  }, 60 * 1000);
};

init();

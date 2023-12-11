function createBrowserWindow() {
  window.open(
    './components/play-history.html',
    '',
    "autoHideMenuBar=true, maxWidth=800, minHeight=300,width=400,height=600,minWidth=400,frame=true,center=true,icon='https://i.postimg.cc/Twp23KgY/icon.png',nodeIntegration=no"
  );
}

const playHistoryButton = document.querySelector('#js-play-history');
playHistoryButton.addEventListener('click', createBrowserWindow);

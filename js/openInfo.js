function createBrowserWindow() {
  window.open(
    './components/info.html',
    '',
    "nativeWindowOpen=false,autoHideMenuBar=true, maxWidth=500, minHeight=300, maxHeight=300,width=500,height=300,minWidth=400,frame=true,center=true,icon='https://i.postimg.cc/Twp23KgY/icon.png',nodeIntegration=no"
  );
}

const infoButton = document.querySelector('#js-info');
infoButton.addEventListener('click', createBrowserWindow);

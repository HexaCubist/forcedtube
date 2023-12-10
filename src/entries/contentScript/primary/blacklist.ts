const setupBlacklist = () => {
  setInterval(async () => {
    const blacklist = (await chrome.storage.sync.get({'blacklist': []})).blacklist;

    if (blacklist.includes(window.location.toString())) {
      window.location.replace("https://www.youtube.com/watch?v=dQw4w9WgXcQ");
    }
    
  }, 400)
}

export default setupBlacklist;

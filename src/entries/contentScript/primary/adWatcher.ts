const setupAdWatcher = (callback: (player: HTMLVideoElement) => void) => {
  console.log("setupAdWatcher");
  const player = document.querySelector("video");
  console.log(player);
  if (!player) {
    console.log("No video player found");
    window.setTimeout(() => {
      setupAdWatcher(callback);
    }, 100);
    return;
  }

  player.addEventListener("timeupdate", (event) => {
    if (player.currentTime + 0.5 > player.duration) {
      // show UI
      console.log("Ad nearing end, pausing video and displaying quiz");
      callback(player);
    }
  });
};

export default setupAdWatcher;

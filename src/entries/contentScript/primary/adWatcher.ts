type callback = (player: HTMLVideoElement) => void;
let lastURL = "";

let lastVideoSrc = "";
let lastVideo: HTMLVideoElement | undefined;

const watchVideo = (launchApp: callback) => {
  // Get the video player
  const player = document.querySelector("video");
  // Fail early if no player found
  if (!player) {
    console.log("No video player found");
    window.setTimeout(() => {
      watchVideo(launchApp);
    }, 100);
    return;
  }
  if (lastVideo === player) return;
  lastVideo = player;
  // Add function to check if skip button is available
  const checkSkipButton = () => {
    const skipButton =
      document.querySelector(".ytp-ad-skip-button") ||
      document.querySelector(".ytp-ad-skip-button-modern");
    if (skipButton) {
      skipButton.addEventListener("click", (event) => {
        launchApp(player);
      });
    } else {
      window.setTimeout(checkSkipButton, 100);
    }
  };
  // Add event listener to check if ad is ending
  player.addEventListener("timeupdate", (event) => {
    if (
      player.currentTime < 5 &&
      (document.querySelector(".ytp-ad-skip-ad-slot") ||
        document.querySelector(".ytp-ad-skip-button"))
    )
      checkSkipButton();
    if (player.currentTime + 0.5 > player.duration) {
      console.log(player);
      if (player.currentSrc !== lastVideoSrc) {
        lastVideoSrc = player.currentSrc;
        if (document.querySelector("#player .ad-showing")) launchApp(player);
      }
    }
  });
};

const setupAdWatcher = (launchApp: callback) => {
  const checkURL = () => {
    if (lastURL !== window.location.href) {
      lastURL = window.location.href;
      watchVideo(launchApp);
    }
  };
  window.setInterval(checkURL, 400);
};

export default setupAdWatcher;

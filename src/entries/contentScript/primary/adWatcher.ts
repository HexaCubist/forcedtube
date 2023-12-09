const setupAdWatcher = () => {
    console.log("setupAdWatcher");
    const player = document.querySelector("video");

    player.addEventListener("timeupdate", (event) => {
        if (player.currentTime + 0.25 > player.duration) {
            // show UI
            console.log("Ad nearing end, pausing video and displaying quiz");
            player.pause();
        }
    })
};

export default setupAdWatcher;

const setupNetworkListener = (callback) => {
    console.log("setupNetworkListener");

    // enable subtitles automatically
    setInterval(() => {
        const button = document.querySelector('button.ytp-subtitles-button[aria-pressed="false"]');

        if (button) {
            button.click();
        }
    }, 400);

    chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
        console.log("got message", msg);

        const el = document.querySelector("div.ytp-cued-thumbnail-overlay-image"); 
        const style = el.attributes["style"];
        const videoId = new RegExp("(?:vi|vi_webp)\/([\w\d_-]+)\/").exec(style)?.[1];
        console.log("found video id", videoId);

        const adPlaying = !!document.querySelector("div.ad-showing");
        console.log("ad playing", adPlaying);

        if (videoId === msg.id && adPlaying) {
            console.log("running callback with transcript");
            callback(msg.transcript);
        }
    });
}

export default setupNetworkListener;

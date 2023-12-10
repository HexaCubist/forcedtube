const setupNetworkListener = (callback) => {
    console.log("setupNetworkListener");

    // enable subtitles automatically
    setInterval(() => {
        const button = document.querySelector('button.ytp-subtitles-button[aria-pressed="false"]');

        if (button) {
            button.click();
        }
    }, 400);

    let seen: number[] = [];

    chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
        console.log("got message", msg);

        if (seen.includes(msg.id)) {
            console.log("skipping transcript processing (dupe)");
            return
        }
        seen.push(msg.id);

        const el = document.querySelector("div.ytp-cued-thumbnail-overlay-image"); 
        const style = el.attributes["style"]?.value;
        console.log("trying to parse video id from style attribute", style);
        const videoId = /(?:vi|vi_webp)\/([\w\d_-]+)\//.exec(style)?.[1];
        console.log("found video id", videoId);

        const adPlaying = !!document.querySelector("div.ad-showing");
        console.log("ad playing", adPlaying);

        if (videoId === msg.id && adPlaying) {
            console.log("running callback with transcript");
            callback(msg.id, msg.transcript);
        } else {
            if (!adPlaying) {
                console.log("ignoring transcript because an ad is not playing")
            } else {
                console.log("ignoring transcript because transcript video id", msg.id, "does not match page video id", videoId)
            }
        }
    });
}

export default setupNetworkListener;

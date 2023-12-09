const setupNetworkListener = (callback) => {
    console.log("setupNetworkListener");
    // send a dummy message to identify the tab to the background script
    chrome.runtime.sendMessage({}, (response) => {
        if (response && response.transcripts) {
            console.log("got background script transcript");
            if (response.transcripts.length > 0) {
                // todo, identify the ad transcript
                callback(response.transcripts[0]);
            }
        } else {
            console.error("failed to get transcript from background script", response);
        }
    });
}

export default setupNetworkListener;

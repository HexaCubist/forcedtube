const setupNetworkListener = (callback) => {
    console.log("setupNetworkListener");
    // send a dummy message to identify the tab to the background script
    chrome.runtime.sendMessage({}, (response) => {
        if (response && response.transcript) {
            console.log("got background script transcript");
            callback(response.transcript);
        } else {
            console.error("failed to get transcript from background script", response);
        }
    });
}

export default setupNetworkListener;

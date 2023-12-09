const setupNetworkListener = (callback) => {
    console.log("setupNetworkListener");

    chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
        console.log("got message", msg);
    });
}

export default setupNetworkListener;

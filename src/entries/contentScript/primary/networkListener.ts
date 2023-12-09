const setupNetworkListener = (callback) => {
    chrome.runtime.sendMessage({}, ({transcript}: {transcript: string}) => {
        callback(transcript);
    });
}

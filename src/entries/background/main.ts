import browser from "webextension-polyfill";

browser.runtime.onInstalled.addListener(() => {
  console.log("Extension installed");
});


chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {

  chrome.webRequest.onCompleted.addListener(async (details) => {
    const response = await fetch(details.url);
    const r = await response.json();
    const transcript = r.events.map(e => (e.segs ?? []).map(s => s.utf8));

    sendResponse({
      text: transcript
    });

  }, {urls: ['https://www.youtube.com/api/timedtext']})

})

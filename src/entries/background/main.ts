import browser from "webextension-polyfill";

browser.runtime.onInstalled.addListener(() => {
  console.log("Extension installed");
});


console.log("adding content script listener");
chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  console.log("got message", msg, "from", sender);
  console.log("adding webRequest listener");

  chrome.webRequest.onCompleted.addListener(async (details) => {
    if (details.tabId == sender.tab.id) {
      console.log("got timedtext request for correct tab");

      const response = await fetch(details.url);
      const r = await response.json();
      const transcript = r.events.map(e => (e.segs ?? []).map(s => s.utf8));

      sendResponse({
        transcript: transcript
      });
    } else {
      console.log("got timedtext request for incorrect tab");
    }
  }, {urls: ['https://www.youtube.com/api/timedtext']})

  // keep the script alive for an async response
  return true;
});

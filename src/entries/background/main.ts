import browser from "webextension-polyfill";

browser.runtime.onInstalled.addListener(() => {
  console.log("Extension installed");
});

chrome.webRequest.onCompleted.addListener(async (details) => {
  console.log("got timedtext request");

  const response = await fetch(details.url);
  const r = await response.json();
  const transcript = r.events.map(e => (e.segs ?? []).map(s => s.utf8));

  const previous = JSON.parse(localStorage.getItem(details.tabId.toString()) ?? "[]");

  previous.append(transcript)

  chrome.storage.local.set({[details.tabId.toString()]: JSON.stringify(previous)});
}, {urls: ['https://www.youtube.com/api/timedtext']})

chrome.runtime.onMessage.addListener(async (msg, sender, sendResponse) => {
  console.log("got message", msg, "from", sender);
  (async () => {
    try {
      console.log("trying to fetch transcripts");
      const r = await chrome.storage.local.get(sender.tab.id.toString());
      console.log("fetched transcripts");
      sendResponse({transcripts: []});
    } catch (err) {
      console.log("no stored transcripts");
      sendResponse({transcripts: []});
    }
  })();

  // persist the background script;
  return true;
});

console.log("ran background script");
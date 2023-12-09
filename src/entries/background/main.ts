chrome.webRequest.onCompleted.addListener(async (details) => {
  console.log("got timedtext request");

  const response = await fetch(details.url);
  const r = await response.json();
  const transcript = r.events.map(e => (e.segs ?? []).map(s => s.utf8));

  const previous = JSON.parse(localStorage.getItem(details.tabId.toString()) ?? "[]");

  previous.append(transcript);

  chrome.tabs.sendMessage(details.tabId, previous);
  console.log("send timedtext request");
}, {urls: ['https://www.youtube.com/api/timedtext']})

console.log("ran background script");

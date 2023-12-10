function parseQuery(queryString) {
    var query = {};
    var pairs = (queryString[0] === '?' ? queryString.substr(1) : queryString).split('&');
    for (var i = 0; i < pairs.length; i++) {
        var pair = pairs[i].split('=');
        query[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1] || '');
    }
    return query;
}

chrome.webRequest.onCompleted.addListener(
  async (details) => {
    console.log(details.tabId);
    if (!details.tabId || details.tabId === -1) {
      // not sure why this happens? request after a tab was disposed maybe?
      console.debug("got null tabId in timedtext listener")
      return;
    }

    console.log("got timedtext request");

    const response = await fetch(details.url);
    const r = await response.json();
    const transcript = r.events.map((e) => (e.segs ?? []).map((s) => s.utf8));

    const videoId = parseQuery(details.url.split("?")[1])["v"];

    console.log("parsed video id from timedtext query", videoId);

    chrome.tabs.sendMessage(details.tabId, {id: videoId, transcript: transcript});
    console.log("send timedtext request");
  },
  { urls: ["https://www.youtube.com/api/timedtext*"] }
);

console.log("ran background script");

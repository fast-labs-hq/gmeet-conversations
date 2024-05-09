chrome.runtime.onInstalled.addListener(function () {
  // Redirect to index.html when the extension is installed or refreshed
  chrome.tabs.create({ url: chrome.runtime.getURL("index.html") });
});

chrome.action.onClicked.addListener(function () {
  // Redirect to index.html when the extension icon is clicked
  chrome.tabs.create({ url: "index.html" });
});

document.getElementById("myButton").addEventListener("click", clickMe);


function clickMe() {
  chrome.storage.local.get('gmeet_chat_v1', function(result) {
    console.log("loaded data",result);

    var chatDataElement = document.getElementById("chat_data");
    if (result['gmeet_chat_v1']) {
      chatDataElement.innerText = JSON.stringify(result['gmeet_chat_v1']);
    } else {
      chatDataElement.innerText = 'No data found';
    }

  });
}
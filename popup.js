// show g-meet conversations on page load
window.onload = function () {
  chrome.storage.local.get("gmeet_chat_v1", function (result) {
    console.log("loaded data", result);

    let chatDataElement = document.getElementById("chat_data");
    if (result["gmeet_chat_v1"]) {
      const gMeets = Object.keys(result["gmeet_chat_v1"]);

      // Sort the gMeets array based on first_reported_time
      gMeets.sort((a, b) => {
        let timeA = result["gmeet_chat_v1"][a]["first_reported_time"];
        let timeB = result["gmeet_chat_v1"][b]["first_reported_time"];

        // Convert the timestamps to numbers for comparison
        timeA = timeA ? Number(timeA) : Infinity;
        timeB = timeB ? Number(timeB) : Infinity;

        return timeB - timeA;
      });

      gMeets.forEach((meet) => {
        
        let divElement = document.createElement("div");
        divElement.classList.add("chat-container");
        let first_reported_time = new Date(result["gmeet_chat_v1"][meet]["first_reported_time"]).toLocaleString();

        divElement.innerHTML = `
        <h2>${meet}</h2> <h3>(${first_reported_time})</h3>
        `;

        result["gmeet_chat_v1"][meet]["chat"].forEach((info) => {
          let innerDivElement = document.createElement("div");

          innerDivElement.innerHTML = `
          <h4>${info.from} at ${info.time}:</h4>
          <p>${info.message.join("<br /><br />")}</p>
          `;

          divElement.appendChild(innerDivElement);
        });

        chatDataElement.appendChild(divElement);
      });
    } else {
      chatDataElement.innerText = "No data found";
    }
  });
};

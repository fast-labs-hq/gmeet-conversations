let chatDataElement = document.getElementById("chat_data");
let meetIdContainerElement = document.getElementById("meet_id_container");
let meetDataContainerElement = document.getElementById("meet_data_container");

// show g-meet conversations on page load
window.onload = function () {
  chrome.storage.local.get("gmeet_chat_v1", function (result) {
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

      let selectedGMeet = gMeets[0];

      chrome.storage.local.get("chatterkeep_selected_meet_id", function (res) {
        if (chrome.runtime.lastError) {
          console.error(chrome.runtime.lastError);
        } else {
          if ("chatterkeep_selected_meet_id" in res) {
            //key is present
            selectedGMeet = res.chatterkeep_selected_meet_id;
          } else {
            //key is not present
            chrome.storage.local.set(
              { chatterkeep_selected_meet_id: selectedGMeet },
              function () {
                if (chrome.runtime.lastError) {
                  console.error(chrome.runtime.lastError);
                }
              }
            );
          }
        }
      });

      gMeets.forEach((meet) => {
        let divElement = document.createElement("div");

        // let first_reported_time = new Date(
        //   result["gmeet_chat_v1"][meet]["first_reported_time"]
        // ).toLocaleString();

        let buttonElement = document.createElement("button");
        buttonElement.classList.add("chat-id-btn");
        buttonElement.textContent = meet;
        buttonElement.addEventListener("click", () => {
          storeMeetIdInLocalstorage(meet);
        });

        setTimeout(() => {
          if (meet === selectedGMeet) {
            buttonElement.classList.add("selected-chat-id-btn");
          }
        }, 10);

        // divElement.innerHTML = `
        // <button id="meet-button" class="meet-button" data-meet-id="${meet}">${meet}</button> <h3>(${first_reported_time})</h3>
        // `;

        divElement.appendChild(buttonElement);

        meetIdContainerElement.appendChild(divElement);
      });

      setTimeout(() => {
        result["gmeet_chat_v1"][selectedGMeet]["chat"].forEach((info) => {
          let innerDivElement = document.createElement("div");
          innerDivElement.textContent = "";

          info.message.forEach((msg, index) => {
            const chatTextContainer = document.createElement("div");
            chatTextContainer.className =
              info.from === "You"
                ? "chat-text-container chat-text-right"
                : "chat-text-container chat-text-left";

            const fromParagraph = document.createElement("p");
            fromParagraph.className = "chat-text-from";
            fromParagraph.textContent = info.from;
            chatTextContainer.appendChild(fromParagraph);

            const msgParagraph = document.createElement("p");
            msgParagraph.className = "chat-text-msg";

            const textNode = document.createTextNode(msg);
            msgParagraph.appendChild(textNode);

            chatTextContainer.appendChild(msgParagraph);

            const timeParagraph = document.createElement("p");
            timeParagraph.className = "chat-text-time";
            timeParagraph.textContent = info.time;
            chatTextContainer.appendChild(timeParagraph);

            innerDivElement.appendChild(chatTextContainer);
            meetDataContainerElement.appendChild(innerDivElement);
          });

        });
      }, 10);
    } else {
      chatDataElement.innerText = "No data found";
    }
  });
};

function storeMeetIdInLocalstorage(gmeet_id) {
  chrome.storage.local.set({ chatterkeep_selected_meet_id: gmeet_id });
  window.location.reload();
}

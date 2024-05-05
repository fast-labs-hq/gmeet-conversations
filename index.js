var observer = new MutationObserver(() => {
    var all_messages = document.getElementsByClassName("Ss4fHf");
    chat = []
    for(let i=0;i<all_messages.length;i++) {
        message_list = []
        for (let j=0;j < all_messages[i].getElementsByClassName("beTDc").length; j++) {
            let contentDivs = all_messages[i].getElementsByClassName("beTDc")[j].querySelectorAll('div[jsaction="rcuQ6b:XZyPzc"]');
            for (let div of contentDivs) {
                message_list.push(div.innerText.trim());
            }
        }
        message = {
            "from": all_messages[i].getElementsByClassName("poVWob")[0].innerText,
            "time": all_messages[i].getElementsByClassName("MuzmKe").length > 0 ? all_messages[i].getElementsByClassName("MuzmKe")[0].innerText : "",
            "message": message_list
        }
        chat.push(message)
    };

    // to keep records of all gmeet conversation ids in sequence 
    chrome.storage.local.get(["all_gmeets"], function(result){
        const meeting_id = document.getElementsByClassName("u6vdEc")[0].innerText;
        
        // Initialize an empty object if gmeet_chat_v1 key doesn't exist
        if (!result.hasOwnProperty("all_gmeets")) {
            result["all_gmeets"] = [];
        }

        if(!result["all_gmeets"].includes(meeting_id)) {
            result["all_gmeets"].push(meeting_id)
        }

        // Update the storage with the modified result object
        chrome.storage.local.set({"all_gmeets": result["all_gmeets"]}, function() {
            console.log('Data has been appended to the `all_gmeets` array in local storage.');
            console.log(result["all_gmeets"])
        });

    });
    
    // to keep records of all gmeet conversations as a dictionary  
    chrome.storage.local.get(["gmeet_chat_v1"], function(result) {
        const meeting_id = document.getElementsByClassName("u6vdEc")[0].innerText;
        
        // Initialize an empty object if gmeet_chat_v1 key doesn't exist
        if (!result.hasOwnProperty("gmeet_chat_v1")) {
            result["gmeet_chat_v1"] = {};
        }
        
        // Initialize an empty array if meeting_id key doesn't exist
        if (!result["gmeet_chat_v1"].hasOwnProperty(meeting_id)) {
            result["gmeet_chat_v1"][meeting_id] = [];
        }
        
        // Push chat object to the array
        result["gmeet_chat_v1"][meeting_id] = chat;
    
        console.log(result);
        
        // Update the storage with the modified result object
        chrome.storage.local.set({"gmeet_chat_v1": result["gmeet_chat_v1"]}, function() {
            console.log('Data has been appended to the array in local storage.');
        }); 
    });
});


window.onload = async () => {
    var chat_button = document.getElementsByClassName("VfPpkd-Bz112c-LgbsSe yHy1rc eT1oJ JsuyRc boDUxc")
    // var chat = document.getElementsByClassName("z38b6")
    while(chat_button.length === 0) {
        await new Promise((resolve) => setTimeout(resolve, 4000));
        console.log("waiting for the meeting to start") 
        chat_button = document.getElementsByClassName("VfPpkd-Bz112c-LgbsSe yHy1rc eT1oJ JsuyRc boDUxc")
    }
    // console.log("chat size > 0")
    // console.log(chat_button)
    chat_button[2].click()

    var chat = document.getElementsByClassName("z38b6")
    while(chat.length === 0) {
        await new Promise((resolve) => setTimeout(resolve, 4000));
        // console.log("waiting for the chat to load") 
        chat = document.getElementsByClassName("z38b6")
    }
    var config = { attributes: true, childList: true, subtree: true };

    observer.observe(chat[0], config)
}

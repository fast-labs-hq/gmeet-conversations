// alert("taking note of all the conversations :D")

// function send_mail(to_email, meeting_chat){

//     var data = {
//         service_id: 'service_6ar5ioo',
//         template_id: 'template_h3tvqdj',
//         user_id: '2I8ka5tfwSy8zKte0',
//         template_params: {
//             to_name: "User",
//             meeting_title: "Meeting Title",
//             meeting_chat: meeting_chat,
//             to_email: to_email,
//         }
//     };

//     $.ajax('https://api.emailjs.com/api/v1.0/email/send', {
//         type: 'POST',
//         data: JSON.stringify(data),
//         contentType: 'application/json'
//     }).done(function() {
//         console.log('Your mail is sent!');
//     }).fail(function(error) {
//         console.log('Error... ' + JSON.stringify(error));
//     });
// }




// var chat = document.getElementsByClassName("z38b6")
// var config = { attributes: true, childList: true, subtree: true };

// var observer = new MutationObserver((list) => {
//     console.log("yes working on it");
//     console.log(list[0].target.textContent);
// });

// document.getElementsByClassName("VfPpkd-Bz112c-LgbsSe yHy1rc eT1oJ JsuyRc boDUxc")[2].click()

var observer = new MutationObserver(() => {
    var all_messages = document.getElementsByClassName("Ss4fHf")
    const meeting_id = document.getElementsByClassName("u6vdEc")[0].innerText
    chat = []
    for(let i=0;i<all_messages.length;i++) {
        message_list = []
        for (let j=0;j < all_messages[i].getElementsByClassName("beTDc").length; j++) {
            message_list.push(all_messages[i].getElementsByClassName("beTDc")[j].innerText)
        }
        message = {
            "from": all_messages[i].getElementsByClassName("poVWob")[0].innerText,
            "time": all_messages[i].getElementsByClassName("MuzmKe")[0].innerText,
            "message": message_list
        }
        chat.push(message)
    };
    console.log(JSON.stringify(chat))
    chrome.storage.local.set({ 'key': 'value' }, function() {
        console.log('Meeting data has been stored');
    }).then(
        chrome.storage.local.get(['key'], function(result){
            console.log(result)
        }
    ));          
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

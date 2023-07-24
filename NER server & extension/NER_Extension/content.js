// // recieve information from background script
// chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
//     console.log('from background script: ' + message )
//     sendResponse('message recieved')
//   });
  
//   (async () => {
//     // let background script know recieving end is loaded
//     await chrome.runtime.sendMessage(true);
//   })();


chrome.runtime.onMessage.addListener(function(request, sender, sendResponse){
    if(request.message == "getDOM"){
        console.log("received from background");
        console.log(document.body.innerText);
        sendResponse({content: document.body.innerText});
    }
    if(request.message == "highlight"){
        high_text = request.ner;
        result = high_text.summary;
        // (async () => {
        //     const src = chrome.extension.getURL('hightext.js');
        //     const contentScript = await import(src);
        //     contentScript.highlightKeyWords(result);
        // })();
	    const str = result.join(', ');
        console.log("highlight called");
        var s = document.body.innerHTML;
        for(let i = 0; i < result.length; i++){
            var replace = result[i];
            //var re = new RegExp(replace, "g");
            console.log(replace)
            s = s.replaceAll(replace, `<span class='highlight'>${result[i]}</span>`);
        }
        document.body.innerHTML = s;
        

        sendResponse({content: str});
    }
    // if(request.message == "highlight"){
    //     console.log("highlighting");
    //     var instance = new Mark(document.querySelectorAll("body"));
    //     instance.mark
    // }
        
});

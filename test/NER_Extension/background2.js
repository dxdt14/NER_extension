chrome.browserAction.onClicked.addListener(function() {
    chrome.tabs.sendMessage(tabs[0].id, {message: "getDOM"}, function(response){
        text = response.content;
        var url = serverhost + '/wiki/get_wiki_summary/?topic='+ encodeURIComponent(text) ;
        
        console.log(url);
        
        //var url = "http://127.0.0.1:8000/wiki/get_wiki_summary/?topic=%22COVID19%22"	
        fetch(url)
        .then(response => response.json())
        .then(response => createNotif(response))
        .catch(error => console.log(error))
            
        return true;  // Will respond asynchronously.
    })
});

function createNotif(response){
    result = response;
    alert(result.summary);
    
    var notifOptions = {
    type: "basic",
    iconUrl: "icon48.png",
    title: "WikiPedia Summary For Your Result",
    message: result.summary
    };
    
    chrome.notifications.create('WikiNotif', notifOptions);
}
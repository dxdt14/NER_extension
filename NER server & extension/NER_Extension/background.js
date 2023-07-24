var serverhost = 'http://127.0.0.1:8000';

// chrome.browserAction.onClicked.addListener((tab)=> {
// 	chrome.tabs.sendMessage(tab.id, {message: "getDOM"}, function(response){
// 		console.log("sent to content.js");
// 		console.log(response.content);
// 		text = response.content;
// 		var url = serverhost + '/wiki/get_wiki_summary/?topic='+ encodeURIComponent(text) ;
// 		console.log(url);
// 		fetch(url)
// 		.then(response => response.json())
// 		.then(response => createNotif(tab, response))
// 		.catch(error => console.log(error))
// 		return true;
// 	});
// });

// chrome.browserAction.onClicked.addListener((tab)=> {
// 	console.log(tab.url);
// 	var url = serverhost + '/wiki/get_wiki_summary/?topic='+ encodeURIComponent(tab.url);
// 	console.log(url);
// 	fetch(url)
// 	.then(response => response.json())
// 	.then(response => createNotif(tab, response))
// 	.catch(error => console.log(error))
	// chrome.tabs.sendMessage(tab.id, {message: "getDOM"}, function(response){
	// 	console.log("sent to content.js");
	// 	console.log(response.content);
	// 	text = response.content;
	// 	var url = serverhost + '/wiki/get_wiki_summary/?topic='+ encodeURIComponent(text) ;
	// 	console.log(url);
	// 	fetch(url)
	// 	.then(response => response.json())
	// 	.then(response => createNotif(tab, response))
	// 	.catch(error => console.log(error))
	// 	return true;
	// });
//});

chrome.browserAction.onClicked.addListener((tab) => {
	chrome.tabs.sendMessage(tab.id, {message: "getDOM"}, function(response){
		console.log("sent to content.js");
		console.log(response.content);
		text = response.content;
		//jsonText = `{"data":"${text}"}`;
		jsonText = JSON.stringify({"data": text});
		const json_file = JSON.parse(jsonText);
		$.ajax({
			url: serverhost + '/ner/get_ner/',
			dataType: "json",
			data: json_file,
			statusCode: {
				200: function(response){
					console.log(response)
					createNotif(tab, response)
					// var url = serverhost + '/wiki/get_wiki_summary/';
					// console.log(url);
					// fetch(url, {method: 'POST'})
					// .then(response => response.json())
					// .then(response => createNotif(tab, response))
					// .catch(error => console.log(error))
					// return true;
				}
			}
		});
		
		
		
	});
});


// chrome.browserAction.onClicked.addListener((tab)=> {
// 	setTimeout(()=>{
// 		chrome.tabs.sendMessage(tab.id, {message: "getDOM"}, function(response){
// 			console.log(response.content);
// 			return true;
// 		});
// 	}, 100);
	
	
// 	// setTimeout(()=>{
// 	// 	(async () => {
// 	// 		const response = await chrome.tabs.sendMessage(tab.id, {message: "getDOM"});
// 	// 		console.log(response);
// 	// 		// text = response.content;
// 	// 		// var url = serverhost + '/wiki/get_wiki_summary/?topic='+ encodeURIComponent(text) ;
// 	// 		// console.log(url);
// 	// 		// fetch(url)
// 	// 		// .then(response => response.json())
// 	// 		// .then(response => createNotif(response))
// 	// 		// .catch(error => console.log(error))
// 	// 		// return true;
// 	// 	}) ();
// 	// }, 100)
// });


// chrome.browserAction.onClicked.addListener(function(tabs) {
//     chrome.tabs.sendMessage(tabs.id, {message: "getDOM"}, function(response){
//         text = response.content;
//         var url = serverhost + '/wiki/get_wiki_summary/?topic='+ encodeURIComponent(text) ;
        
//         console.log(url);
        
//         //var url = "http://127.0.0.1:8000/wiki/get_wiki_summary/?topic=%22COVID19%22"	
//         fetch(url)
//         .then(response => response.json())
//         .then(response => createNotif(response))
//         .catch(error => console.log(error))
            
//         return true;  // Will respond asynchronously.
//     })
// });

function createNotif(tab, input){
	chrome.tabs.sendMessage(tab.id, {message: "highlight", ner: input}, function(response){
		console.log(response.content);
	});
	// result = input.summary;
	// const str = result.join(', ');
	// alert(str);
	// var notifOptions = {
	// 	type: "basic",
	// 	iconUrl: "icon48.png",
	// 	title: "Named Entities on page",
	// 	message: str
	// };
	// chrome.notifications.create('NERnotif', notifOptions);
    result = input.summary;
	console.log(input);
	const str = result.join(', ');
    alert(str);
    
    var notifOptions = {
    type: "basic",
    iconUrl: "icon48.png",
    title: "Named Entities in website",
    message: str
    };
    
    chrome.notifications.create('NER Notification', notifOptions);
}
// var serverhost = 'http://127.0.0.1:8000';

// 	chrome.runtime.onMessage.addListener(
// 		function(request, sender, sendResponse) {

			  
// 			var url = serverhost + '/wiki/get_wiki_summary/?topic='+ encodeURIComponent(request.topic) ;
			
// 			console.log(url);
			
// 			//var url = "http://127.0.0.1:8000/wiki/get_wiki_summary/?topic=%22COVID19%22"	
// 			fetch(url)
// 			.then(response => response.json())
// 			.then(response => sendResponse({farewell: response}))
// 			.catch(error => console.log(error))
				
// 			return true;  // Will respond asynchronously.
			
			
		  
// 	});

// openInNewTab = (firstTab) => {
// 	const {id, url} = firstTab;
// 	chrome.tabs.create({ url }, function(tab){
// 	  return tab
// 	});
//   }
  
//   chrome.tabs.onCreated.addListener((tab)=> {
// 	// wait for contenscript to load
// 	chrome.runtime.onMessage.addListener((isLoaded, sender, sendResponse) => {
// 	  if (isLoaded){
// 		(async () => {
// 		  const response = await chrome.tabs.sendMessage(tab.id, 'test');
// 		  console.log(response);
// 		})();
// 	  }
// 	});
//   })
  
//   chrome.action.onClicked.addListener(tab => { 
// 	openInNewTab(tab)
//   });



	
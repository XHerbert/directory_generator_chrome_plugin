
$('#open').click(() => {
	sendMessageToContentScript({cmd:'block'}, function(response){});
});

$('#close').click(() => {
	sendMessageToContentScript({cmd:'none'}, function(response){});
});



function sendMessageToContentScript(message, callback)
{
	getCurrentTabId((tabId) =>
	{
		chrome.tabs.sendMessage(tabId, message, function(response)
		{
			if(callback) callback(response);
		});
	});
}

function getCurrentTabId(callback)
{
	chrome.tabs.query({active: true, currentWindow: true}, function(tabs)
	{
		if(callback) callback(tabs.length ? tabs[0].id: null);
	});
}
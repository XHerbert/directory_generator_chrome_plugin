document.addEventListener('DOMContentLoaded', function () {
	injectCustomJs();
});

function injectCustomJs(jsPath) {
	jsPath = jsPath || 'js/inject.js';
	var temp = document.createElement('script');
	temp.setAttribute('type', 'text/javascript');
	temp.src = chrome.extension.getURL(jsPath);
	temp.onload = function () {
		this.parentNode.removeChild(this);
	};
	document.body.appendChild(temp);
};

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse)
{	
	if(request.cmd == 'block') {		
		let pan = document.getElementById('directoryPanel');
		pan.style.display = 'block';
	}
	else if(request.cmd == 'none'){
		let pan = document.getElementById('directoryPanel');
		pan.style.display = 'none';
	}
});

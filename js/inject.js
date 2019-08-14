function buildDirectory() {
	let attr = [];
	let desc = [];
	let apis = $('#wikiArticle >:header');
	let len = apis.length;
	let html = '<ul style="list-style:none;margin-left:15px;">'
	for (let ele = 0; ele < len; ele++) {
		let current_id = apis[ele].getAttribute('id');
		let current = apis[ele].innerText;
		if (!current_id) {
			continue;
		}

		// let h4sibling = '';
		// if (apis[ele].nextElementSibling.nextElementSibling) {
		// 	if (apis[ele].nextElementSibling.nextElementSibling.firstElementChild) {
		// 		h4sibling = apis[ele].nextElementSibling.nextElementSibling.firstElementChild.innerText;
		// 		console.log(h4sibling);
		// 	}
		// }

		// if (h4sibling) {
		// 	desc[current_id] = h4sibling;
		// }
		// current = current.anchor(current_id);
		apis[ele].innerHTML = current;
		attr.push(current_id);
	}

	for (let i = 0, len = attr.length; i < len; i++) {
		let attri = attr[i];
		if (desc[attri]) {
			html += '<li style="cursor:pointer;line-hight:1.2em" title=' + desc[attri] + '><a style="color:#EEE;" href=#' + attri + '>' + attr[i] + '</a></li>';
		} else {
			html += '<li style="cursor:pointer;line-hight:1.2em"><a style="color:#EEE;" href=#' + attri + '>' + attr[i] + '</a></li>';
		}
	}
	html += '</ul>';

	let panel = document.createElement('div');
	panel.className = 'chrome-plugin-panel';
	panel.innerHTML = `<h5>目录</h5>` + html;
	document.body.appendChild(panel);
}

// 通过postMessage调用content-script
function invokeContentScript(code) {
	window.postMessage({
		cmd: 'invoke',
		code: code
	}, '*');
}
// 发送普通消息到content-script
function sendMessageToContentScriptByPostMessage(data) {
	window.postMessage({
		cmd: 'message',
		data: data
	}, '*');
}

// 通过DOM事件发送消息给content-script
(function () {

	buildDirectory();

})();

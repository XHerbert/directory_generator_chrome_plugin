

function buildDirectory() {
	let attr = [];
	let text = [];
	let desc = [];
	let headers = $('#wikiArticle >:header');
	let len = headers.length;
	let html = '<ul style="list-style:none;margin-left:15px;">'
	for (let ele = 0; ele < len; ele++) {
		let current_id = headers[ele].getAttribute('id');
		//不管页面是否有Id，直接删除自己的ID，生成一个ID放进去就OK
		//如果影响原有页面的逻辑，可以考虑添加自定义属性 data- 代替id的功能
		headers[ele].setAttribute('id','0123');
		console.log(current_id);
		let current = headers[ele].innerText;
		if (!current_id) {
			continue;
		}

		// let h4sibling = '';
		// if (headers[ele].nextElementSibling.nextElementSibling) {
		// 	if (headers[ele].nextElementSibling.nextElementSibling.firstElementChild) {
		// 		h4sibling = headers[ele].nextElementSibling.nextElementSibling.firstElementChild.innerText;
		// 		console.log(h4sibling);
		// 	}
		// }

		// if (h4sibling) {
		// 	desc[current_id] = h4sibling;
		// }
		current = current.anchor(current_id);
		headers[ele].innerHTML = current;
		attr.push(current_id);
		text.push(current);
	}

	for (let i = 0, len = attr.length; i < len; i++) {
		let attri = attr[i];
		if (desc[attri]) {
			html += '<li style="cursor:pointer;line-hight:1.2em" title=' + desc[attri] + '><a style="color:#EEE;" href=#' + attri + '>' + attr[i] + '</a></li>';
		} else {
			html += '<li style="cursor:pointer;line-hight:1.2em"><a style="color:#EEE;" href=#' + encodeURI(attri) + '>' + text[i] + '</a></li>';
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
	
	if(typeof jQuery == 'undefined'){
		//检测是否存在JQuery，不存在则动态创建并引用
	}
	buildDirectory();

})();



function buildDirectory() {
	let attr = [];
	let text = [];
	let tags = [];
	//let headers = $('#wikiArticle >:header');
	let headers = document.querySelectorAll('h1,h2,h3,h4');
	let len = headers.length;
	let html = '<ul style="list-style:none;margin-left:15px;">'
	for (let ele = 0; ele < len; ele++) {
		let current_tag = headers[ele].tagName;
		console.log(current_tag);
		let data_id = getUUID();
		//不管页面是否有Id，直接删除自己的ID，生成一个ID放进去就OK
		//如果影响原有页面的逻辑，可以考虑添加自定义属性 data- 代替id的功能
		headers[ele].setAttribute('data-id', data_id);
		let innerText = headers[ele].innerText;
		//存储当前节点的TagName
		tags[data_id] = current_tag;
		// if (!current_id) {
		// 	continue;
		// }

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
		//创建空锚点
		let anchor = "".anchor(data_id);
		let dom = document.createElement("span");
		dom.innerHTML = anchor;

		headers[ele].appendChild(dom);
		attr.push(data_id);
		text.push(innerText);
	}

	for (let i = 0, len = attr.length; i < len; i++) {
		let attri = attr[i];
		//if (desc[attri]) {
		//html += '<li style="cursor:pointer;line-hight:1.2em" title=' + desc[attri] + '><a style="color:#EEE;" href=#' + attri + '>' + attr[i] + '</a></li>';
		//} else {
		html += '<li class=' + tags[attri] + ' style="cursor:pointer;line-hight:1.2em"><a style="color:#EEE;" href=#' + attri + '>' + text[i] + '</a></li>';
		//}
	}
	html += '</ul>';

	let panel = document.createElement('div');
	panel.className = 'chrome-plugin-panel';
	panel.innerHTML = `<h1 style='text-align: center;font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif'>目录</h1>` + html;
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


function getUUID() {
	return 'xxxxxxxx'.replace(/[xy]/g, function (c) {
		var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
		return v.toString(16);
	});
}


// 通过DOM事件发送消息给content-script
(function () {

	if (typeof jQuery == 'undefined') {
		//检测是否存在JQuery，不存在则动态创建并引用
		// let jsPath = 'jQuery-1.8.3.js'
		// let temp = document.createElement('script');
		// temp.setAttribute('type', 'text/javascript');
		// temp.src = jsPath;
		// temp.onload = function () {
		// 	// 放在页面不好看，执行完后移除掉
		// 	this.parentNode.removeChild(this);
		// };
		// document.body.appendChild(temp);
		alert('no jQuery');
	}
	buildDirectory();

})();

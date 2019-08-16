var init = true;
function buildDirectory() {
	let attr = [];
	let text = [];
	let tags = [];

	//let headers = $('#wikiArticle >:header');
	let headers = document.querySelectorAll('h1,h2,h3,h4,h5,h6');
	let len = headers.length;
	let html = '<ul style="list-style:none;margin-left:15px;">';
	for (let ele = 0; ele < len; ele++) {
		let current_tag = headers[ele].tagName;
		//生成UUID
		let data_id = getUUID();
		//不管页面是否有Id，直接删除自己的ID，生成一个ID放进去就OK
		//如果影响原有页面的逻辑，可以考虑添加自定义属性 data- 代替id的功能
		//headers[ele].setAttribute('data-id', data_id);
		let innerText = headers[ele].innerText;
		//存储当前节点的TagName


		//如果H标签下存在a标签且含有href属性，则采用自身的锚点，否则创建空锚点
		let a_tag = headers[ele].querySelector('a');
		if (a_tag && a_tag.hasAttribute('href')) {
			let tag_anchor = a_tag.getAttribute('href').replace('#', '');
			data_id = tag_anchor;
			headers[ele].setAttribute('data-id', data_id);
		} else {
			//创建空锚点
			let anchor = "".anchor(data_id);
			let dom = document.createElement("span");
			dom.innerHTML = anchor;
			headers[ele].prepend(dom);
		}
		tags[data_id] = current_tag;
		attr.push(data_id);
		text.push(innerText);
	}

	for (let i = 0, len = attr.length; i < len; i++) {
		let attri = attr[i];
		html += '<li class=' + tags[attri] + ' style="cursor:pointer;line-hight:1.2em"><a style="color:#EEE;" href=#' + attri + '>' + text[i] + '</a></li>';
	}
	html += '</ul>';

	if (init) {
		var panel = document.createElement('div');
		panel.className = 'chrome-plugin-panel';
		panel.id = 'directoryPanel';
		panel.innerHTML = html;
		document.body.appendChild(panel);
	} else {
		document.getElementById('directoryPanel').innerHTML = html;
	}
	init = false;
};

function getUUID() {
	return 'xxxxxxxx'.replace(/[xy]/g, function (c) {
		var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
		return v.toString(16);
	});
};


// 通过DOM事件发送消息给content-script
(function () {
	let title = document.title;
	if (typeof jQuery == 'undefined') {

	}
	buildDirectory();
	setInterval(function () {
		let currentTitle = document.title;
		if (title !== currentTitle) {
			title = currentTitle;
			buildDirectory();
		}
	}, 500);
})();

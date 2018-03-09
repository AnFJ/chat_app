//变换底部主菜单图标
function changeFocusIcon(id){
	var imgIndex=1;
	var titleIndex=3;
	var navDiv=document.getElementById(id);
	var topTitle=document.getElementById('top_nav_title');
	var middleIframe=document.getElementById('iframe_middle');
	var img=navDiv.childNodes[imgIndex];
	var title=navDiv.childNodes[titleIndex];

	var divs=navDiv.parentNode.getElementsByTagName("div");
	for(var i=0;i<divs.length;i++)
	{
		var imgi=divs[i].childNodes[imgIndex];
		var titlei=divs[i].childNodes[titleIndex];
		switch(i){
			case 0:
				imgi.src='image/icon/notice.png';
				titlei.style.color='#bfbfbf';
				break;
			case 1:
				imgi.src='image/icon/friend_chat.png';
				titlei.style.color='#bfbfbf';
				break;
			case 2:
				imgi.src='image/icon/group_chat.png';
				titlei.style.color='#bfbfbf';
				break;
			case 3:
				imgi.src='image/icon/my_info.png';
				titlei.style.color='#bfbfbf';
				break;
		}
	}
	for(var i=1;i<=4;i++)
	{
		if(id==('main_icon'+i))
		{
			switch(i)
			{
				case 1:
					img.src='image/icon/notice_focus.png';
					title.style.color='#1296db';
					topTitle.innerHTML='消息通知';
					middleIframe.src='html/notice.html';
					break;
				case 2:
					img.src='image/icon/friend_chat_focus.png';
					title.style.color='#1296db';
					topTitle.innerHTML='好友聊天';
					middleIframe.src='html/friend_chat.html';
					break;
				case 3:
					img.src='image/icon/group_chat_focus.png';
					title.style.color='#1296db';
					topTitle.innerHTML='群组聊天';
					middleIframe.src='html/group_chat.html';
					break;
				case 4:
					img.src='image/icon/my_info_focus.png';
					title.style.color='#1296db';
					topTitle.innerHTML='信息管理';
					middleIframe.src='html/my_info.html';
					break;
			}
		}
	}
}

//设置IFrame的高度
function getIframeHeight(top_id,middle_id,bottom_id)
{
	var top=document.getElementById(top_id);
	var middle=document.getElementById(middle_id);
	var bottom=document.getElementById(bottom_id);
	var middleParent=middle.parentNode;
	//alert(window.innerHeight+" "+top.clientHeight+" "+bottom.clientHeight);
	var height=window.innerHeight-top.clientHeight-bottom.clientHeight;
	middle.setAttribute("height",height);
	middleParent.style.height=height+'px';
	var width=window.innerWidth;
	middle.setAttribute("width",width);
}

//注册，登陆的输入框宽度设置
function setInputWidth(input,container)
{
	var input=document.getElementById(input);
	var container=document.getElementById(container);
	var inputStyle=	input.currentStyle ? input.currentStyle : document.defaultView.getComputedStyle(input, null);
	var containerStyle=container.currentStyle ? container.currentStyle : document.defaultView.getComputedStyle(container, null);
	//利用判断是否支持currentStyle（是否为ie）
	var a=containerStyle.width.replace(/px/,"");
	var b=inputStyle.paddingLeft.replace(/px/,"");
	//alert(a-b+"px");
	input.style.width=a-b+"px";
}

//设置搜索框宽度
function setSearchWidth(input,container,button)
{
	var input=document.getElementById(input);
	var container=document.getElementById(container);
	var button=document.getElementById(button);
	var buttonStyle=button.currentStyle ? button.currentStyle : document.defaultView.getComputedStyle(button, null);
	var inputStyle=	input.currentStyle ? input.currentStyle : document.defaultView.getComputedStyle(input, null);
	var containerStyle=container.currentStyle ? container.currentStyle : document.defaultView.getComputedStyle(container, null);
	//利用判断是否支持currentStyle（是否为ie）
	var a=containerStyle.width.replace(/px/,"");
	var b=inputStyle.paddingLeft.replace(/px/,"");
	var c=buttonStyle.width.replace(/px/,"");
	input.style.width=a-b-c+"px";
}
//设置群设置输入框
function setGroupInputWidth(containerClassName)
{
	var containers=document.getElementsByClassName(containerClassName);
	var container,input,button;
	for(var i=0;i<containers.length;i++)
	{
		var inputs=containers[i].getElementsByTagName("input");
		var buttons=containers[i].getElementsByTagName("button");
		button=buttons[0];
		container=containers[0];
		var buttonStyle=button.currentStyle ? button.currentStyle : document.defaultView.getComputedStyle(button, null);
		var containerStyle=container.currentStyle ? container.currentStyle : document.defaultView.getComputedStyle(container, null);
		var a=containerStyle.width.replace(/px/,"");
		var c=buttonStyle.width.replace(/px/,"");
		if(inputs.length>1)
		{
			input=inputs[0];
			var inputStyle=	input.currentStyle ? input.currentStyle : document.defaultView.getComputedStyle(input, null);
			var b=inputStyle.paddingLeft.replace(/px/,"");
			var d=inputStyle.borderRightWidth.replace(/px/,"");
			input.style.width=a-b-d*2+"px";
			input=inputs[1];
		}
		else
		{
			input=inputs[0];
		}		
		var inputStyle=	input.currentStyle ? input.currentStyle : document.defaultView.getComputedStyle(input, null);
		var b=inputStyle.paddingLeft.replace(/px/,"");
		var d=inputStyle.borderRightWidth.replace(/px/,"");
		input.style.width=a-b-c+"px";
	}
}
//设置作者声明的位置
function setAgreeUsePosition(id)
{
	var div=document.getElementById(id);
	var container=div.parentNode;
	var divStyle=div.currentStyle ? div.currentStyle : document.defaultView.getComputedStyle(div, null);
	var width=divStyle.width.replace(/px/,"");
	var containerStyle=container.currentStyle ? container.currentStyle : document.defaultView.getComputedStyle(container, null);
	var containerWidth=containerStyle.width.replace(/px/,"");
	if(window.innerHeight>window.innerWidth)
	{
		div.style.marginLeft=(window.innerWidth-width)/2+"px";
	}
	else{
		div.style.marginLeft=(containerWidth-width)/2+"px";
	}
}

//设置头像容器高度
function setUDPHeight(className)
{

	var container=document.getElementsByClassName(className)[0];
	var containerStyle=container.currentStyle ? container.currentStyle : document.defaultView.getComputedStyle(container, null);
	container.style.height=containerStyle.width;
}

//改变列表栏的状态 显示/隐藏
function changeListContanier(listHead)
{
	var listContainer=listHead.nextSibling.nextSibling;
	var divImg=listHead.getElementsByTagName("div")[0];
	if(listContainer.style.display=="none")
	{
		listContainer.style.display="block";
		divImg.style.background="url(../image/icon/retract_opition.png) no-repeat";
		divImg.style.backgroundSize="1.5rem";

	}else{
		listContainer.style.display="none";
		divImg.style.background="url(../image/icon/more_opition.png) no-repeat";
		divImg.style.backgroundSize="1.5rem";
	}

}
//点击改变聊天对象按钮
function showChatObjectContainer(thisEle)
{
	var chatContainer=thisEle.nextSibling.nextSibling;
	if(chatContainer.style.display=="none")
	{
		chatContainer.style.display="block";
	}else{
		chatContainer.style.display="none";
	}
}
// 聊天输入栏设置
function MaxMe(o) {
  o.style.height = o.scrollTop + o.scrollHeight + "px";
}
function Recover(o) {
	o.style.height="2.4rem";
}
//聊天输入框宽度设置
function setChatTextareaWindth(id)
{
	var chat=document.getElementById(id);
	var div=chat.nextSibling.nextSibling;
	var divStyle=div.currentStyle ? div.currentStyle : document.defaultView.getComputedStyle(div, null);
	var chatStyle=chat.currentStyle ? chat.currentStyle : document.defaultView.getComputedStyle(chat, null);
	var divWidth=divStyle.width.replace(/px/,"");
	var chatWidth=chatStyle.paddingLeft.replace(/px/,"");
	//alert(window.innerWidth);
	chat.style.width=window.innerWidth-chatWidth*2-divWidth/3*5+"px";
	//alert(window.innerWidth-htmlStyle.fontSize*16*5+"px");
}


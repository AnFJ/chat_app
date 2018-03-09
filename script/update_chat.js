// 更新好友列表
function updateFriendList(){
	// alert("ok");
	var friendList=JSON.parse(window.localStorage.friend_list);
	// alert(friendList[0].friend_account);
	var friendListContainer=document.getElementById('friend_list_container');
	friendListContainer.innerHTML="";
	var headDiv=document.createElement('div');
	headDiv.setAttribute('class','friend_list_head');
	friendListContainer.appendChild(headDiv);
	for(var i=0;i<friendList.length;i++)
	{
		var friend=document.createElement('div');
		friend.setAttribute('class','friend_list');
		var target=JSON.stringify(friendList[i]);
		//alert(target);
		friend.setAttribute('onclick',"targetFriend('"+target+"')");
		var friendImg=document.createElement('img');
		friendImg.src="../image/user_display_photo/udp.jpg";
		friend.appendChild(friendImg);
		var friendH3=document.createElement('h3');
		friendH3.innerHTML=friendList[i].friend_info.user_name;
		friend.appendChild(friendH3);
		var friendP=document.createElement('p');
		if(friendList[i].friend_info.user_info==null)
			friendP.innerHTML="该好友还没有正式的签名";
		else
			friendP.innerHTML=friendList[i].friend_info.user_info;
		friend.appendChild(friendP);
		var friendDiv=document.createElement('div');
		if(friendList[i].friend_state=='offline')
		{
			friendDiv.setAttribute('class','friend_offline_state');
		}else{
			friendDiv.setAttribute('class','friend_online_state');
		}
		friend.appendChild(friendDiv);
		friendListContainer.appendChild(friend);
	}
}
// 传递好友目标参数
function targetFriend(target)
{

	addChatObject('3',target);
	window.localStorage.target_friend=target;
	// window.location.href='chat_window.html';
	window.localStorage.target_friend_state="true";
	
}
// 更新群组列表
function updateGroupList(){
	var groupList=JSON.parse(window.localStorage.group_list);
	// alert(groupList[0].group_members[0]);
	// window.localStorage.user_info=
	// '{"user_id":"19","user_account":"1","user_name":"\u5c0f\u4e00","user_password":"1","login_date":"2017-04-29 02:07:09","user_info":null}';
	var user_info=JSON.parse(window.localStorage.user_info);
	var groupLord=document.getElementById('group_lord');
	groupLord.innerHTML="";
	var groupMember=document.getElementById('group_member');
	groupMember.innerHTML="";
	for(var i=0;i<groupList.length;i++)
	{
		var groupDiv=document.createElement('div');
		var groupImg=document.createElement('img');
		var groupH3=document.createElement('h3');
		var groupP=document.createElement('p');
		var target=JSON.stringify(groupList[i]);
		groupDiv.setAttribute('onclick',"targetGroup('"+target+"')");
		groupDiv.setAttribute('class','group_list');
		groupImg.src='../image/icon/group_display_photo.png';
		groupH3.innerHTML=groupList[i].group_info.group_name+"("+groupList[i].group_members.length+")";
		groupP.innerHTML=groupList[i].group_info.create_date;
		groupDiv.appendChild(groupImg);
		groupDiv.appendChild(groupH3);
		groupDiv.appendChild(groupP);
		if(groupList[i].group_info.group_lord==user_info.user_account)
		{
			groupLord.appendChild(groupDiv);
		}else{
			groupMember.appendChild(groupDiv);
		}
	}
}
//传递群组目标信息
function targetGroup(target)
{
	addChatObject('4',target);
	window.localStorage.target_group=target;
	window.localStorage.target_group_state="true";
	
	// alert(target);
}
// 获取用户信息
function getUserInfo(){
	var userInfo=JSON.parse(window.localStorage.user_info);
	var userDisplay=document.getElementsByClassName('user_info')[0];
	userDisplay.childNodes[1].innerHTML=userInfo.user_name;
	userDisplay.childNodes[3].innerHTML=userInfo.user_account;
	userDisplay.childNodes[5].innerHTML=userInfo.user_name+"的签名";
	var userAccount=document.getElementById('user_account');
	var userName=document.getElementById('user_name');
	var userSignature=document.getElementById('user_signature');
	userAccount.childNodes[3].innerHTML=userInfo.user_account;
	userName.childNodes[3].innerHTML=userInfo.user_name;
	userSignature.childNodes[3].innerHTML=userInfo.user_name+"的签名";

}
// 设置好友聊天信息
function setFriendChatInfo(){
	var targetFriend=JSON.parse(window.localStorage.target_friend);
	var chatObjectName=document.getElementsByClassName('chat_object_name')[0];
	chatObjectName.innerHTML=targetFriend.friend_info.user_name;
	if(targetFriend.friend_state=='offline')
	{
		chatObjectName.innerHTML+="(离线)";
	}
}
// 设置群聊天信息
function setGroupChatInfo(){
	var targetGroup=JSON.parse(window.localStorage.target_group);
	var chatObjectName=document.getElementsByClassName('chat_object_name')[0];
	chatObjectName.innerHTML=targetGroup.group_info.group_name+
	"("+targetGroup.group_members.length+")";
}
//发送消息
function sendChatMessage(thisID,type){
	var chatText=thisID.previousSibling.previousSibling;
	if(type=='friend')
	{
		showChatMessage(chatText.value,'source');
		window.localStorage.send_friend_state="true";
		window.localStorage.send_friend_message=chatText.value;
	}else if(type=='group'){
		showGroupChatMessage(chatText.value,'source');
		window.localStorage.send_group_state="true";
		window.localStorage.send_group_message=chatText.value;
	}
	
}
// 接受消息
function recvChatMessage(value,type)
{
	var targetFriend=JSON.parse(window.localStorage.target_friend);
	var targetGroup=JSON.parse(window.localStorage.target_group);
	if(targetFriend.friend_account==window.localStorage.recv_friend_account)
	{
		if(type=='3')
		{
			showChatMessage(value,'target');
		}
	}
	if(targetGroup.group_account==window.localStorage.recv_group_account)
	{
		if(type=='4')
		{	
			showGroupChatMessage(value,'target');
		}
	}
	
}
// 显示消息在好友聊天窗口
function showChatMessage(value,type)
{
	var chatWindow=document.getElementsByClassName('main_window')[0];
	var chatContainer=document.createElement('div');
	var chatImg=document.createElement('img');
	var chatDiv=document.createElement('div');
	var chatP=document.createElement('p');
	chatContainer.setAttribute('class','chat_list_container');
	chatP.innerHTML=value;
	chatDiv.setAttribute('class','chat_info_container');
	if(type=='source')
	{
		chatImg.setAttribute('name','right');
		chatImg.src='../image/user_display_photo/udp.jpg';
		chatDiv.setAttribute('name','right');
	}else{
		chatImg.setAttribute('name','left');
		chatImg.src='../image/user_display_photo/other_dp.jpg';
		chatDiv.setAttribute('name','left');
	}
	chatDiv.appendChild(chatP);
	chatContainer.appendChild(chatImg);
	chatContainer.appendChild(chatDiv);	
	chatWindow.appendChild(chatContainer);
}
// 显示消息在群聊天窗口
function showGroupChatMessage(value,type)
{
	var userInfo=JSON.parse(window.localStorage.user_info);
	var chatWindow=document.getElementsByClassName('main_window')[0];
	var chatContainer=document.createElement('div');
	var chatImg=document.createElement('img');
	var chatH4=document.createElement('h4');
	var chatDiv=document.createElement('div');
	var chatP=document.createElement('p');
	chatContainer.setAttribute('class','chat_list_container');
	chatP.innerHTML=value;
	chatDiv.setAttribute('class','chat_info_container');
	if(type=='source')
	{
		chatH4.setAttribute('name','right');
		chatH4.innerHTML=userInfo.user_name+":";
		chatImg.setAttribute('name','right');
		chatImg.src='../image/user_display_photo/udp.jpg';
		chatDiv.setAttribute('name','right');
	}else{
		chatH4.setAttribute('name','left');
		chatH4.innerHTML=":"+window.localStorage.recv_source_name;
		chatImg.setAttribute('name','left');
		chatImg.src='../image/user_display_photo/other_dp.jpg';
		chatDiv.setAttribute('name','left');
	}
	chatDiv.appendChild(chatP);
	chatContainer.appendChild(chatImg);
	chatContainer.appendChild(chatH4);
	chatContainer.appendChild(chatDiv);	
	chatWindow.appendChild(chatContainer);
}
// 底部选择栏消息通知显示
function showButtomMessageIcon()
{

	var icon=document.getElementById('notice_number_icon');
	// alert(window.localStorage.recvMessageJson);
	var recvMessageJson=JSON.parse(window.localStorage.recvMessageJson);
	var i=recvMessageJson.length;
	// alert(i);
	if(i>0)
	{	
		if(i>=10)
		{
			icon.src='image/notice_number/00.png';
		}else {
			icon.src='image/notice_number/0'+i+'.png';
		}
		icon.style.display='block';
	}else{
		icon.style.display='none';
	}
}
//通知窗口获取通知
function getNoticeMessage()
{
	var noticeContainer=document.getElementsByClassName('notice_list_container')[0];
	noticeContainer.innerHTML='';
	var recvMessageJson=JSON.parse(window.localStorage.recvMessageJson);
	var messageCountPool=[];
	// 合并重复账号的通知
	for(var i=0;i<recvMessageJson.length;i++)
	{	
		var find=false;
		if(recvMessageJson[i].type==3)
		{
			for(var j=0;j<messageCountPool.length;j++)
			{
				if(messageCountPool[j].type==3&&recvMessageJson[i].account==messageCountPool[j].account)
				{
					find=true;
					messageCountPool[j].count+=1;
					messageCountPool[j].message=recvMessageJson[i].message;
					var temp=messageCountPool[0];
					messageCountPool[0]=messageCountPool[j];
					messageCountPool[j]=temp;
				}
			}
			if(!find)
			{
				messageCountPool.unshift(recvMessageJson[i]);
				messageCountPool[0].count=1;
			}

		}
		if(recvMessageJson[i].type==4)
		{
			for(var j=0;j<messageCountPool.length;j++)
			{
				if(messageCountPool[j].type==4&&recvMessageJson[i].group_account==messageCountPool[j].group_account)
				{
					find=true;
					messageCountPool[j].count+=1;
					messageCountPool[j].message=recvMessageJson[i].message;
					var temp=messageCountPool[0];
					messageCountPool[0]=messageCountPool[j];
					messageCountPool[j]=temp;
				}
			}
			if(!find)
			{
				messageCountPool.unshift(recvMessageJson[i]);
				messageCountPool[0].count=1;
			}
		}
			
	}
	//添加通知
	// alert(JSON.stringify(messageCountPool));
	var friendList=JSON.parse(window.localStorage.friend_list);
	var groupList=JSON.parse(window.localStorage.group_list);
	for(var i=0;i<messageCountPool.length;i++)
	{
		var notice=document.createElement('div');
		notice.setAttribute('class','notice_container');
		var displayImg=document.createElement('img');
		displayImg.setAttribute('class','display_photo');
		var nameH3=document.createElement('h3');
		nameH3.setAttribute('class','notice_name');
		var infoDiv=document.createElement('div');
		infoDiv.setAttribute('class','lasted_info');
		var timeDiv=document.createElement('div');
		timeDiv.setAttribute('class','lasted_time');
		var numberImg=document.createElement('img');
		numberImg.setAttribute('class','notice_number');
		timeDiv.innerHTML=messageCountPool[i].time;
		if(messageCountPool[i].count>=10)
		{
			numberImg.src='../image/notice_number/00.png';
		}else{
			numberImg.src='../image/notice_number/0'+messageCountPool[i].count+'.png'
		}
		if(messageCountPool[i].type==3)
		{
			for(var j=0;j<friendList.length;j++)
			{
				if(messageCountPool[i].account==friendList[j].friend_account)
				{
					friendList[j].count=messageCountPool[i].count;
					var target=JSON.stringify(friendList[j]);
					notice.setAttribute('onclick',"setFriendNotice('"+target+"')");
					infoDiv.innerHTML=messageCountPool[i].message;
					nameH3.innerHTML=friendList[j].friend_info.user_name;
					displayImg.src='../image/user_display_photo/other_dp.jpg';
					// alert(friendList[j].friend_info.user_name);
					break;
				}
			}
		}
		if(messageCountPool[i].type==4)
		{
			for(var j=0;j<groupList.length;j++)
			{
				if(messageCountPool[i].group_account==groupList[j].group_account)
				{
					groupList[j].count=messageCountPool[i].count;
					var target=JSON.stringify(groupList[j]);
					notice.setAttribute('onclick',"setGroupNotice('"+target+"')");
					nameH3.innerHTML=groupList[j].group_info.group_name;
					infoDiv.innerHTML=messageCountPool[i].name+":"+messageCountPool[i].message;
					displayImg.src='../image/user_display_photo/group_udp.jpg';
					break;
				}
			}
		}

		notice.appendChild(displayImg);
		notice.appendChild(nameH3);
		notice.appendChild(infoDiv);
		notice.appendChild(timeDiv);
		notice.appendChild(numberImg);
		noticeContainer.appendChild(notice);
		// alert(noticeContainer.innerHTML);
	}
}
// 通知窗口点击功能：更新通知，进入聊天窗口
function setFriendNotice(target)
{

	deleteChatNotice('3',target);
	targetFriend(target);
}
function setGroupNotice(target)
{
	deleteChatNotice('4',target);
	targetGroup(target);
}
// 删除目标聊天通知
function deleteChatNotice(type,target)
{	
	var target=JSON.parse(target);
	var recvMessageJson=JSON.parse(window.localStorage.recvMessageJson);
	var i=0;
	while(i<recvMessageJson.length)
	{
		var find=false;
		if(recvMessageJson[i].type==type)
		{
			// alert(type+"|"+recvMessageJson[i].account+":"+target.friend_account);
			if(type=='3'&&recvMessageJson[i].account==target.friend_account)
			{
				// alert(type+"|"+recvMessageJson[i].account+":"+target.friend_account);
				recvMessageJson.splice(i,1);
				find=true;
			}
			if(type=='4'&&recvMessageJson[i].group_account==target.group_account)
			{
				
				// alert(type+"|"+recvMessageJson[i].group_account+":"+target.group_account);
				recvMessageJson.splice(i,1);
				find=true;
			}
		}
		if(!find)
			i++;
	}
	window.localStorage.recvMessageJson=JSON.stringify(recvMessageJson);
	window.localStorage.notice_state="true";
	window.localStorage.recv_state="true";
}
// 添加聊天对象
function addChatObject(type,target)
{
	var target=JSON.parse(target);
	var chatObjects=JSON.parse(window.localStorage.chatObjects);
	var find=false;
	for(var i=0;i<chatObjects.length;i++)
	{	
		// alert(i+"|"+chatObjects[i].target.friend_account+":"+target.friend_account);
		if(type=='3'&&chatObjects[i].target.friend_account==target.friend_account)
		{
			find=true;
			break;
		}
		if(type=='4'&&chatObjects[i].target.group_account==target.group_account)
		{
			find=true;
			break;
		}
	}
	if(!find)
	{
		var chatObject={
			"type":type,
			"target":target
		}
		chatObjects.unshift(chatObject);
		window.localStorage.chatObjects=JSON.stringify(chatObjects);
	}
}
// 聊天对象列表栏
function showChatObjectsList(chatType)
{
	var chatObjects=JSON.parse(window.localStorage.chatObjects);
	var targetFriend=JSON.parse(window.localStorage.target_friend);
	var targetGroup=JSON.parse(window.localStorage.target_group);
	var recvMessageJson=JSON.parse(window.localStorage.recvMessageJson);
	var objectList=document.getElementById('object_list_container');
	objectList.innerHTML="";
	// alert(JSON.stringify(chatObjects));
	for(var i=0;i<chatObjects.length;i++)
	{
		var find=false;
		chatObjects[i].target.count=0;
		var objectDiv=document.createElement('div');
		objectDiv.setAttribute('class','object_list');
		var numberImg=document.createElement('img');
		numberImg.setAttribute('class','notice_number');
		var infoP=document.createElement('p');
		infoP.setAttribute('class','other_object');
		var deleteImg=document.createElement('img');
		deleteImg.setAttribute('class','delete_temp_object');
		deleteImg.src='../image/icon/delete_friend.png';
		var target=JSON.stringify(chatObjects[i].target);
		// alert(chatType+"|"+chatObjects[i].target.friend_account+":"+targetFriend.friend_account);
		if(chatObjects[i].type=='3')
		{
			for(var j=0;j<recvMessageJson.length;j++)
			{	
				// alert(recvMessageJson[j].account+"->"+chatObjects[i].target.friend_account);
				if(recvMessageJson[j].type=='3'&&recvMessageJson[j].account==chatObjects[i].target.friend_account)
					chatObjects[i].target.count++;
			}
			// alert(chatObjects[i].target.count);
			if(chatObjects[i].target.count>0&&chatObjects[i].target.count<10)
				numberImg.src='../image/notice_number/0'+chatObjects[i].target.count+'.png';
			if(chatObjects[i].target.count>=10)
				numberImg.src='../image/notice_number/00.png';
			objectDiv.setAttribute('onclick',"setFriendNotice('"+target+"')");
			deleteImg.setAttribute('onclick','deleteChatObject('+'this'+',3,'+chatObjects[i].target.friend_account+')');
			infoP.innerHTML=chatObjects[i].target.friend_info.user_name;
			find=true;
			if(chatType=='3'&&chatObjects[i].target.friend_account==targetFriend.friend_account)
				find=false;
		}
		if(chatObjects[i].type=='4')
		{	
			for(var j=0;j<recvMessageJson.length;j++)
			{
				if(recvMessageJson[j].type=='4'&&recvMessageJson[j].group_account==chatObjects[i].target.group_account)
					chatObjects[i].target.count++;
			}
			if(chatObjects[i].target.count>0&&chatObjects[i].target.count<10)
				numberImg.src='../image/notice_number/0'+chatObjects[i].target.count+'.png';
			if(chatObjects[i].target.count>=10)
				numberImg.src='../image/notice_number/00.png';
			objectDiv.setAttribute('onclick',"setGroupNotice('"+target+"')");
			deleteImg.setAttribute('onclick','deleteChatObject('+'this'+',4,'+chatObjects[i].target.group_account+')');
			infoP.innerHTML=chatObjects[i].target.group_info.group_name;
			find=true;
			if(chatType=='4'&&chatObjects[i].target.group_account==targetGroup.group_account)
				find=false;
		}
		if(find)
		{
			// alert("find");
			objectDiv.appendChild(numberImg);
			objectDiv.appendChild(infoP);
			objectDiv.appendChild(deleteImg);
			objectList.appendChild(objectDiv);
		}
	}
}
// 删除聊天对象
function deleteChatObject(ele,type,objectAccount)
{
	// alert(ele+"->"+type+":"+objectAccount);
	
	ele.parentNode.style.display="none";
	var chatObjects=JSON.parse(window.localStorage.chatObjects);
	var length=chatObjects.length;
	for(var i=0;i<length;i++)
	{
		if(type=='3')
		{
			if(chatObjects[i].type==type&&chatObjects[i].target.friend_account==objectAccount)
			{
				chatObjects.splice(i,1);
				break;
			}	
		}
		if(type=='4')
		{
			if(chatObjects[i].type==type&&chatObjects[i].target.group_account==objectAccount)
			{
				chatObjects.splice(i,1);
				break;
			}	
		}
	}
	window.localStorage.chatObjects=JSON.stringify(chatObjects);
	// alert("ok");
}
// 退出登录
function exitAccount(Ele)
{
	window.localStorage.exit_state='true';
}
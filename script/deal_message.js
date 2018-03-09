var globalFriendListMessage;//朋友清单全局变量
var globalTargetAccount;//发送目标账号全局变量
var globalTargetName;//发送目标昵称全局变量
var globalTargetType;//发送目标类型（好友，群）变量
var globalGroupListMessage;//群组清单全局变量
var globalGroupTargetLord;//目标群主账号
var globalTargetInfo;//目标好友信息
/**
 * 添加好友
 * @param {string} account 好友账号
 */
function addFriend(account){
	if(!ws){
		alert("请先连接");
	}else
	{
		var friend_account=account;
		var xmlhttp=new XMLHttpRequest();
		xmlhttp.onreadystatechange=function()
		{
			if (xmlhttp.readyState==4 && xmlhttp.status==200)
			{
				var msg=xmlhttp.responseText;
				msg=JSON.parse(msg);
				if(msg.type==1)
				{
					alert(msg.info);
				}
				else
				{
					alert(msg.info);
					var msg={
						"type":5,
						"source_account":user_info.user_account,
						"target_account":friend_account
					};
					msg=JSON.stringify(msg)+"*";
					ws.send(msg);
				}
			}
		}
		xmlhttp.open("POST","php_server/add_friend.php",true);
		xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
		xmlhttp.send("friend_account="+friend_account);
	}
}

function agreeFriendRequest(msg){
	var source_account=msg['source_account'];
	var target_account=msg['target_account'];
	var xmlhttp=new XMLHttpRequest();
	xmlhttp.onreadystatechange=function()
	{
		if (xmlhttp.readyState==4 && xmlhttp.status==200)
		{
			if(xmlhttp.responseText=='1')
			{
				var responseMessage={
					"type":6,
			 		"source_account":user_info.user_account,
			 		"target_account":msg.source_account
				}
				responseMessage=JSON.stringify(responseMessage)+"*";
				ws.send(responseMessage);
				updateFriendList();
				updateOnlineState(msg.source_account,true);
			}
			else
				{
					alert("不能自己同意好友请求哦");
				}
		}
	}
	xmlhttp.open("POST","php_server/add_friend_response.php",true);
	xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
	xmlhttp.send("source_account="+source_account+"&target_account="+target_account);
}

function deleteFriend(account){
	var friend_account=account;
		var xmlhttp=new XMLHttpRequest();
		xmlhttp.onreadystatechange=function()
		{
			if (xmlhttp.readyState==4 && xmlhttp.status==200)
			{
				if(xmlhttp.responseText==1)
				{
					alert("您没有此好友!");
				}
				else{
					updateFriendList();
					var deleteMsg={
						"type":8,
				 		"source_account":user_info.user_account,
				 		"target_account":friend_account
					}
					deleteMsg=JSON.stringify(deleteMsg)+"*";
					ws.send(deleteMsg);
					alert("您已经成功删除了此人！");
				}
			}
		}
		xmlhttp.open("POST","php_server/delete_friend.php",true);
		xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
		xmlhttp.send("friend_account="+friend_account);
}

/**
 * 创建群组
 * @param  {[type]} account [群账号]
 * @param  {[type]} name    [群名称]
 * @return {[type]}         [description]
 */
function createGroup(account,name)
{
	var group_account=account;
	var group_name=name;
	var xmlhttp=new XMLHttpRequest();
	xmlhttp.onreadystatechange=function()
	{
		if (xmlhttp.readyState==4 && xmlhttp.status==200)
		{
			if(xmlhttp.responseText==1)
			{
				alert("创建群成功");
				updateGroupList();
			}
			else
			{
				alert("已经有人创建了群哦");
			}
		}
	}
	xmlhttp.open("POST","php_server/create_group.php",true);
	xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
	xmlhttp.send("group_account="+group_account+"&group_name="+
				 group_name+"&group_lord="+user_info.user_account);
}

/**
 * 入群请求
 * @param {[type]} account [入群的账号]
 */
function addGroup(account)
{
	var group_account=account;
	var xmlhttp=new XMLHttpRequest();
	xmlhttp.onreadystatechange=function()
	{
		if (xmlhttp.readyState==4 && xmlhttp.status==200)
		{
			var msg=xmlhttp.responseText;
			msg=JSON.parse(msg);
			if(msg.type==1)
			{
				alert(msg.info);
			}
			else
			{
				alert(msg.info);
				var addmsg={
					"type":9,
					"source_account":user_info.user_account,
					"source_name":user_info.user_name,
					"target_account":msg.group_lord,
					"group_account":group_account
				};
				addmsg=JSON.stringify(addmsg)+"*";
				ws.send(addmsg);
			}
		}
	}
	xmlhttp.open("POST","php_server/add_group.php",true);
	xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
	xmlhttp.send("group_account="+group_account);
}

/**
 * 同意别人的入群请求
 * @param  {[type]} msg [请求人发来的json数据]
 * @return {[type]}     [description]
 */
function agreeGroupRequest(msg){
	var source_account=msg['source_account'];
	var group_account=msg['group_account'];
	var xmlhttp=new XMLHttpRequest();
	xmlhttp.onreadystatechange=function()
	{
		if (xmlhttp.readyState==4 && xmlhttp.status==200)
		{
			if(xmlhttp.responseText=='1')
			{
				var responseMessage={
					"type":10,
			 		"source_account":user_info.user_account,
			 		"target_account":msg.source_account,
			 		"group_account":msg.group_account
				}
				responseMessage=JSON.stringify(responseMessage)+"*";
				ws.send(responseMessage);
				updateGroupList();
			}
			else
				{
					alert("没有入群的请求哦");
				}
		}
	}
	xmlhttp.open("POST","php_server/add_group_response.php",true);
	xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
	xmlhttp.send("source_account="+source_account+"&group_account="+group_account);
}

/**
 * 删除群
 * @param  {[type]} account [群账号]
 * @return {[type]}         [description]
 */
function deleteGroup(account)
{
	var group_account=account;
	var xmlhttp=new XMLHttpRequest();
	xmlhttp.onreadystatechange=function()
	{
		if (xmlhttp.readyState==4 && xmlhttp.status==200)
		{
			if(xmlhttp.responseText==1)
			{
				alert("删除群成功");
				var msg={
					"type":12,
			 		"source_account":user_info.user_account,
			 		"target_account":group_account
				}
				msg=JSON.stringify(msg)+"*";
				ws.send(msg);
				setTimeout(function(){
					updateGroupList();
				},1500);
			}
			else
			{
				alert("没有此群或者您不是群主");
			}
		}
	}
	xmlhttp.open("POST","php_server/delete_group.php",true);
	xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
	xmlhttp.send("group_account="+group_account+"&group_lord="+user_info.user_account);
}

/**
 * 退群
 * @param  {[type]} account [群账号]
 * @return {[type]}         [description]
 */
function exitGroup(account)
{
	var group_account=account;
	var xmlhttp=new XMLHttpRequest();
	xmlhttp.onreadystatechange=function()
	{
		if (xmlhttp.readyState==4 && xmlhttp.status==200)
		{
			if(xmlhttp.responseText==2)
			{
				alert("您没有此群哦!");
			}
			if(xmlhttp.responseText==3)
			{
				alert("天降大任于群主也，不能退群哦！");
			}
			if(xmlhttp.responseText==1){
				updateGroupList();
				var deleteMsg={
					"type":13,
			 		"source_account":user_info.user_account,
			 		"target_account":group_account,
			 		"source_name":user_info.user_name,
				}
				deleteMsg=JSON.stringify(deleteMsg)+"*";
				ws.send(deleteMsg);
			}
		}
	}
	xmlhttp.open("POST","php_server/exit_group.php",true);
	xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
	xmlhttp.send("group_account="+group_account);
}

function deleteGroupMember(member_account,group_account)
{
	// var member_account=document.getElementById(member_account).value;
	// var group_account=document.getElementById(group_account).value;
	var xmlhttp=new XMLHttpRequest();
	xmlhttp.onreadystatechange=function()
	{
		if (xmlhttp.readyState==4 && xmlhttp.status==200)
		{
			if(xmlhttp.responseText==1)
			{
				var deleteMsg={
					"type":14,
			 		"source_account":user_info.user_account,
			 		"target_account":member_account,
			 		"source_name":user_info.user_name,
			 		"group_account":group_account
				}
				deleteMsg=JSON.stringify(deleteMsg)+"*";
				ws.send(deleteMsg);
				alert("剔除成员成功");
				setTimeout(function(){
					updateGroupList();
				},1500);
			}
			if(xmlhttp.responseText==2)
			{
				alert("您不是此群的群主");
			}
			if(xmlhttp.responseText==3)
			{
				alert("群里没有此人");
			}
			if(xmlhttp.responseText==4)
			{
				alert("群主不能踢自己哦！");
			}
		}
	}
	xmlhttp.open("POST","php_server/delete_group_member.php",true);
	xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
	xmlhttp.send("group_account="+group_account+"&member_account="+member_account);
}

/**
 * 更新好友列表
 * @param  {[type]} list [description]
 * @return {[type]}      [description]
 */
function updateFriendList(){
	var userInfo=JSON.parse(window.localStorage.user_info);
	// alert(user_info.user_account);
	var xmlhttp=new XMLHttpRequest();
	xmlhttp.onreadystatechange=function()
	{
		if (xmlhttp.readyState==4 && xmlhttp.status==200)
		{
			var message=xmlhttp.responseText;
			window.localStorage.friend_list=message;
			// alert(message);
			window.localStorage.friend_state="true";
			// message=JSON.parse(message);
			
			// alert(window.localStorage.friend_list);
		}
	}
	xmlhttp.open("POST","php_server/update_friend_list.php",true);
	xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
	xmlhttp.send("user_account="+userInfo.user_account);
}

function updateGroupList()
{
	var userInfo=JSON.parse(window.localStorage.user_info);
	var xmlhttp=new XMLHttpRequest();
		xmlhttp.onreadystatechange=function()
		{
			if (xmlhttp.readyState==4 && xmlhttp.status==200)
			{
				var message=xmlhttp.responseText;
				window.localStorage.group_list=message;
				window.localStorage.group_state='true';
				// alert(message);
			}
		}
		xmlhttp.open("POST","php_server/update_group_list.php",true);
		xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
		xmlhttp.send("user_account="+userInfo.user_account);
}
function getuLi(uLi,a,b,c)
{
	uLi.onclick=function(){
		getChatWindow(a,b,c,"4");
	};
}
/**
 * 获取好友在线状态
 * @param  {[type]} friendAccount [好友的账号]
 * @param  {[type]} bool          [true:在线，false：离线]
 * @return {[type]}               [description]
 */
function updateOnlineState(friendAccount,typeState)
{

	var friendList=JSON.parse(window.localStorage.friend_list);
	for(var i=0;i<friendList.length;i++)
	{
		// alert(friendList[i].friend_account+"+"+friendAccount);
		if(friendList[i].friend_account==friendAccount)
		{	
			// alert(typeState);
			if(typeState == true)
			{	
				// alert(friendList[i].friend_state);
				friendList[i].friend_state='online';
				// alert(friendList[i].friend_state);
			}
			else
			{
				friendList[i].friend_state='offline';
			}
			window.localStorage.friend_list=JSON.stringify(friendList);
			window.localStorage.friend_state='true';
			break;
		}
	}

}


/**
 * 消息发送
 * @param  {[type]} target_account [目标账户]
 * @param  {[type]} type           [群||好友]
 * @return {[type]}                [description]
 */
function sendMessage(value,type){
		if(ws){
			if(value!='')
			{
				// alert(window.localStorage.target_friend);
				var targetFriend=JSON.parse(window.localStorage.target_friend);
				var targetGroup=JSON.parse(window.localStorage.target_group);
				var targetAccount=type=='4'?targetGroup.group_account:targetFriend.friend_account;
				// alert(targetAccount);
				var msg={
					"type":type,
			 		"source_account":user_info.user_account,
			 		"source_name":user_info.user_name,
			 		"target_account":targetAccount,
			 		"time":"",
			 		"message":value
				}
				msg=JSON.stringify(msg)+"*";
				ws.send(msg);
			}
			else
				alert("输入的值不能为空！");
		}
		else
		{
			alert("离线状态不能发送消息");
		}
	}

//接收消息	
function recvMessage(msg)
{
	if(msg.type==3)
	{
		window.localStorage.recv_friend_state="true";
		window.localStorage.notice_state="true";
		window.localStorage.recv_state="true";
		var recvMessageJson=JSON.parse(window.localStorage.recvMessageJson);
		var recvMessage={
			"type":"3",
			"account":msg.source_account,
			"time":msg.time,
			"message":msg.message
		}
		recvMessageJson.push(recvMessage);
		window.localStorage.recvMessageJson=JSON.stringify(recvMessageJson);
		window.localStorage.recv_friend_account=msg.source_account;
		window.localStorage.recv_friend_message=msg.message;
		
		// alert(window.localStorage.recvMessageJson);	
	}
	if(msg.type==4)
	{
		window.localStorage.recv_group_state="true";
		window.localStorage.notice_state="true";
		window.localStorage.recv_state="true";
		window.localStorage.recv_source_account=msg.source_account;
		window.localStorage.recv_source_name=msg.source_name;
		window.localStorage.recv_group_account=msg.group_account;
		window.localStorage.recv_group_message=msg.message;
		var recvMessageJson=JSON.parse(window.localStorage.recvMessageJson);
		var recvMessage={
			"type":"4",
			"account":msg.source_account,
			"name":msg.source_name,
			"group_account":msg.group_account,
			"time":msg.time,
			"message":msg.message
		}
		recvMessageJson.push(recvMessage);
		window.localStorage.recvMessageJson=JSON.stringify(recvMessageJson);
		// alert(msg.source_account+":("+msg.group_account+msg.message);
	}
}

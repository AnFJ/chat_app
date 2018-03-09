function addFriendChoose(ele,type){
	var friendInput=document.getElementById('friend_setting_input');
	var friendBtn=document.getElementById('friend_button');	
	if(type=='add')
	{
		friendInput.setAttribute('placeholder','请输入要添加的好友账号');
		friendBtn.setAttribute('onclick','addFriend("'+'friend_setting_input'+'")');
	}else if(type=='delete'){
		friendInput.setAttribute('placeholder','请输入要删除的好友账号');
		friendBtn.setAttribute('onclick','deleteFriend("'+'friend_setting_input'+'")');
	}
}
function addFriend(id){
	var friendInput=document.getElementById(id);
	window.localStorage.addFriendState="true";
	window.localStorage.Input1=friendInput.value;
	// alert(friendInput.value);
}
function deleteFriend(id){
	var friendInput=document.getElementById(id);
	// alert(id+":"+friendInput.value);
	window.localStorage.deleteFriendState="true";
	window.localStorage.Input1=friendInput.value;
}
function createGroup(ele){
	var accountName=ele.previousSibling.previousSibling;
	var account=accountName.previousSibling.previousSibling;
	alert(account.value+":"+accountName.value);
	window.localStorage.createGroupState="true";
	window.localStorage.Input1=account.value;
	window.localStorage.Input2=accountName.value;
}
function addGroup(ele){
	var account=ele.previousSibling.previousSibling;
	alert(account.value);
	window.localStorage.addGroupState="true";
	window.localStorage.Input1=account.value;
}
function deleteGroup(ele){
	var account=ele.previousSibling.previousSibling;
	alert(account.value);
	window.localStorage.deleteGroupState="true";
	window.localStorage.Input1=account.value;
}

function exitGroup(ele){
	var account=ele.previousSibling.previousSibling;
	alert(account.value);
	window.localStorage.exitGroupState="true";
	window.localStorage.Input1=account.value;

}
function deleteGroupMember(ele){
	var accountMember=ele.previousSibling.previousSibling;
	var account=accountMember.previousSibling.previousSibling;
	alert(account.value+":"+accountMember.value);
	window.localStorage.deleteGroupMemberState="true";
	window.localStorage.Input1=accountMember.value;
	window.localStorage.Input2=account.value;
}

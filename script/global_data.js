
// 用户数据
var user_info={
	'user_account':"<?php echo $_SESSION['user_info']['user_account']?>",
	'user_name':"<?php echo $_SESSION['user_info']['user_name']?>",
	'user_info':"<?php echo $_SESSION['user_info']['user_info']?>",
	'login_date':"<?php echo $_SESSION['user_info']['login_date']?>"
};
//Type:1.上线，2.下线，3.发送好友信息，4.发送群消息。
var message={
	"type":1,
	"source_account":user_info.user_account,
	"target_account":"",
	"message":""
}
//获取用户数据
function getUserData(){
	var xmlhttp=new XMLHttpRequest();
	xmlhttp.onreadystatechange=function()
	{
		if (xmlhttp.readyState==4 && xmlhttp.status==200)
		{
			var msg=xmlhttp.responseText;
			user_info=JSON.parse(msg);
			alert(user_info);
		}
	}
	xmlhttp.open("POST","php_server/get_user_data.php",true);
	xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
	xmlhttp.send();
}

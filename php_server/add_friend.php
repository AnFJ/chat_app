<?php
session_start();
require_once('connect.php');
require_once('chatan_function.php');
$friend_account=$_POST['friend_account'];
//echo $_POST['add_friend_type'];
$user_account=$_SESSION['user_info']['user_account'];
$msg=[
	    "type"=>1,//默认错误
	    "info"=>""
	];

if($friend_account==$user_account)
{
	$msg['info']="不能添加自己为好友";
	echo json_encode($msg);
	die();
}
if(!isAccountExist($connection,$friend_account))
{
	$msg['info']="账号不存在";
	echo json_encode($msg);
	die();
}
$sql="select * from user_friends where user_account='{$user_account}' and friend_account='{$friend_account}'";
$add_result=mysqli_query($connection,$sql);
if(!$add_result)//查询检测
	die("query failed: ".mysqli_error($connection));
$row=mysqli_fetch_assoc($add_result);
if($row!=null)
{
	$msg['info']="好友已经存在啦";
	echo json_encode($msg);
	die();                    
}
$sql="select source_account from friend_request where source_account='{$user_account}' and target_account='{$friend_account}'";
$add_result=mysqli_query($connection,$sql);
$row=mysqli_fetch_assoc($add_result);
if($row==null)
{
	$sql="insert into friend_request(source_account,target_account) values ('{$user_account}','{$friend_account}');";
	$add_result=mysqli_query($connection,$sql);
	if(!$add_result)//查询检测
		die("query failed: ".mysqli_error($connection));
}
$msg['info']="好友请求发送中。。。";
$msg['type']=2;//可以发送好友请求
echo json_encode($msg);	
mysqli_close($connection);
?>
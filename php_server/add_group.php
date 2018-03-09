<?php
session_start();
require_once('connect.php');
$group_account=$_POST['group_account'];
//echo $_POST['add_friend_type'];
$user_account=$_SESSION['user_info']['user_account'];
$msg=[
	    "type"=>1,//默认错误
	    "info"=>"",
	    "group_lord"=>""
	];
$sql="select * from group_members where group_account='{$group_account}' and member_account='{$user_account}'";
$add_result=mysqli_query($connection,$sql);
if(!$add_result)//查询检测
	die("query failed: ".mysqli_error($connection));
$row=mysqli_fetch_assoc($add_result);
if($row!=null)
{
	$msg['info']="你已经是这个群的成员了";
	echo json_encode($msg);
	die();                    
}

$sql="select * from group_info where group_account='{$group_account}'";
$add_result=mysqli_query($connection,$sql);
if(!$add_result)//查询检测
	die("query failed: ".mysqli_error($connection));
$row=mysqli_fetch_assoc($add_result);
if($row==null)
{
	$msg['info']="加入的群账号还没有建立哦！";
	echo json_encode($msg);
	die();                    
}
else
{
	$msg['group_lord']=$row['group_lord'];
}

$sql="select * from group_request where request_account='{$user_account}' and group_account='{$group_account}'";
$add_result=mysqli_query($connection,$sql);
$row=mysqli_fetch_assoc($add_result);
if($row==null)
{
	$sql="insert into group_request(request_account,group_account) values ('{$user_account}','{$group_account}');";
	$add_result=mysqli_query($connection,$sql);
	if(!$add_result)//查询检测
		die("query failed: ".mysqli_error($connection));
}
$msg['info']="入群请求发送中。。。";
$msg['type']=2;//可以发送好友请求
echo json_encode($msg);	
mysqli_close($connection);
?>
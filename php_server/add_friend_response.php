<?php
require_once('connect.php');
$user_account=$_POST['source_account'];
$friend_account=$_POST['target_account'];
$sql="select source_account from friend_request where source_account='{$user_account}' and target_account='{$friend_account}'";
$add_result=mysqli_query($connection,$sql);
if(!$add_result)//查询检测
	die("query failed: ".mysqli_error($connection));
$row=mysqli_fetch_assoc($add_result);
if($row!=null)//做这样的判定是避免客户端主动执行确认请求函数出错。
{
	$sql="delete from friend_request where source_account='{$user_account}' and target_account='{$friend_account}'";
	$add_result=mysqli_query($connection,$sql);
	if(!$add_result)//查询检测
		die("query failed: ".mysqli_error($connection));
	$sql="insert into user_friends(user_account,friend_account) values('{$user_account}','{$friend_account}');";
	$add_result=mysqli_query($connection,$sql);
	if(!$add_result)//查询检测
		die("query failed: ".mysqli_error($connection));
	$sql="insert into user_friends(user_account,friend_account) values('{$friend_account}','{$user_account}');";
	$add_result=mysqli_query($connection,$sql);
	if(!$add_result)//查询检测
		die("query failed: ".mysqli_error($connection));
	echo "1";//同意添加成功
}
else
{
	echo "2";//同意添加失败
}
mysqli_close($connection);
?>
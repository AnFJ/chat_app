<?php
session_start();
require_once('connect.php');
require_once('chatan_function.php');
$friend_account=$_POST['friend_account'];
$user_account=$_SESSION['user_info']['user_account'];

$sql="select * from user_friends where user_account='{$user_account}' and friend_account='{$friend_account}';";
$add_result=mysqli_query($connection,$sql);
if(!$add_result)//查询检测
	die("query failed: ".mysqli_error($connection));
$row=mysqli_fetch_assoc($add_result);
if($row!=null)
{
	$sql="delete from user_friends where user_account='{$user_account}' and friend_account='{$friend_account}';";
	$add_result=mysqli_query($connection,$sql);
	if(!$add_result)//查询检测
		die("query failed: ".mysqli_error($connection));
	$sql="delete from user_friends where user_account='{$friend_account}' and friend_account='{$user_account}';";
	$add_result=mysqli_query($connection,$sql);
	if(!$add_result)//查询检测
		die("query failed: ".mysqli_error($connection));
	echo "2";
}
else
{
	echo "1";
}
mysqli_close($connection);
?>
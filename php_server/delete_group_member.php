<?php
session_start();
require_once('connect.php');
$group_account=$_POST['group_account'];
$member_account=$_POST['member_account'];
//echo $_POST['add_friend_type'];
$user_account=$_SESSION['user_info']['user_account'];
if($user_account==$member_account)
{
	echo "4";
	die();
}
$sql="select * from group_info where group_account='{$group_account}' and group_lord='{$user_account}'";
$add_result=mysqli_query($connection,$sql);
if(!$add_result)//查询检测
	die("query failed: ".mysqli_error($connection));
$row=mysqli_fetch_assoc($add_result);
if($row==null)
{
	echo "2";
	die();
}
$sql="select * from group_members where group_account='{$group_account}' and member_account='{$member_account}'";
$add_result=mysqli_query($connection,$sql);
if(!$add_result)//查询检测
	die("query failed: ".mysqli_error($connection));
$row=mysqli_fetch_assoc($add_result);
if($row==null)
{
	echo "3";
	die();
}
else{
	$sql="delete from group_members where group_account='{$group_account}' and member_account='{$member_account}'";
	$add_result=mysqli_query($connection,$sql);
	if(!$add_result)//查询检测
		die("query failed: ".mysqli_error($connection));
	echo "1";
}
?>
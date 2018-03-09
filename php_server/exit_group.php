<?php
session_start();
require_once('connect.php');
$group_account=$_POST['group_account'];
$user_account=$_SESSION['user_info']['user_account'];

$sql="select * from group_members where group_account='{$group_account}' and member_account='{$user_account}'";
$add_result=mysqli_query($connection,$sql);
if(!$add_result)//查询检测
	die("query failed: ".mysqli_error($connection));
$row=mysqli_fetch_assoc($add_result);
if($row!=null)
{
	$sql="select * from group_info where group_account='{$group_account}' and group_lord='{$user_account}'";
	$add_result=mysqli_query($connection,$sql);
	if(!$add_result)//查询检测
		die("query failed: ".mysqli_error($connection));
	$row=mysqli_fetch_assoc($add_result);
	if($row!=null)
	{
		echo "3";
	}
	else{
		$sql="delete from group_members where group_account='{$group_account}' and member_account='{$user_account}'";
		$add_result=mysqli_query($connection,$sql);
		if(!$add_result)//查询检测
			die("query failed: ".mysqli_error($connection));
		echo "1";
	}
}
else
{
	echo "2";
}
mysqli_close($connection);
?>
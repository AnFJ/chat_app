<?php
require_once('connect.php');
$request_account=$_POST['source_account'];
$group_account=$_POST['group_account'];
$sql="select * from group_request where request_account='{$request_account}' and group_account='{$group_account}'";
$add_result=mysqli_query($connection,$sql);
if(!$add_result)//查询检测
	die("query failed: ".mysqli_error($connection));
$row=mysqli_fetch_assoc($add_result);
if($row!=null)//做这样的判定是避免客户端主动执行确认请求函数出错。
{
	$sql="delete from group_request where request_account='{$request_account}' and group_account='{$group_account}'";
	$add_result=mysqli_query($connection,$sql);
	if(!$add_result)//查询检测
		die("query failed: ".mysqli_error($connection));
	$sql="insert into group_members(group_account,member_account) values('{$group_account}','{$request_account}');";
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
<?php
require_once('connect.php');
$user_account=$_POST['user_account'];
$sql="select group_account from group_members where member_account='{$user_account}'";
$result=mysqli_query($connection,$sql);
if(!$result)//查询检测
	die("query failed: ".mysqli_error($connection));
//$row=mysqli_fetch_assoc($online_result);
$row=mysqli_fetch_all($result,MYSQLI_ASSOC);

for($i=0;$i<count($row);$i++)
{
	$sql="select * from group_info where group_account='{$row[$i]['group_account']}'";
	$result=mysqli_query($connection,$sql);
	if(!$result)//查询检测
		die("query failed: ".mysqli_error($connection));
	$row[$i]['group_info']=mysqli_fetch_assoc($result);
	$sql="select member_account from group_members where group_account='{$row[$i]['group_account']}'";
	$result=mysqli_query($connection,$sql);
	if(!$result)//查询检测
		die("query failed: ".mysqli_error($connection));
	$row[$i]['group_members']=mysqli_fetch_all($result);
	
}
echo json_encode($row);
mysqli_close($connection);
?>
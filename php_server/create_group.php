<?php
require_once('connect.php');//连接数据库
$group_account=$_POST['group_account'];
$group_name=$_POST['group_name'];
$group_lord=$_POST['group_lord'];
$create_date=date('Y-m-d H:i:s');
$sql="select * from group_info where group_account='{$group_account}'";
$add_result=mysqli_query($connection,$sql);
$row=mysqli_fetch_array($add_result,MYSQLI_ASSOC);
if($row==null)
{
	$sql="insert into group_info(group_account,group_name,group_lord,create_date)
		values ('{$group_account}','{$group_name}','{$group_lord}','{$create_date}')";
	$add_result=mysqli_query($connection,$sql);
	$sql="insert into group_members(group_account,member_account)
		values ('{$group_account}','$group_lord')";
	$add_result=mysqli_query($connection,$sql);
	echo "1";
}
else
{
	echo "2";
}
mysqli_close($connection);
?>
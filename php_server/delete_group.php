<?php
require_once('connect.php');//连接数据库
$group_account=$_POST['group_account'];
$group_lord=$_POST['group_lord'];
$sql="select * from group_info where group_account='{$group_account}' and group_lord='{$group_lord}'";
$add_result=mysqli_query($connection,$sql);
$row=mysqli_fetch_array($add_result,MYSQLI_ASSOC);
if($row!=null)
{
	echo "1";	
}
else
{
	echo "2";
}
mysqli_close($connection);
?>
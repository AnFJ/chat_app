<?php
//判断是否存在用户账号
function isAccountExist($connection,$account)
{
	$sql="select user_account from user_info";
	$add_result=mysqli_query($connection,$sql);
	if(!$add_result)//查询检测
		die("query failed: ".mysqli_error($connection));
	$row=mysqli_fetch_all($add_result,MYSQLI_ASSOC);
	for($i=0;$i<count($row);$i++)
	{
//		echo " {".$row[$i]['user_account']."} ";//检测所有账号数据
		if($row[$i]['user_account']==$account)
		{
			mysqli_free_result($add_result);
			return true;
		}
	}
	mysqli_free_result($add_result);
	return false;
}
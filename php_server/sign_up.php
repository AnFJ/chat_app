<?php
session_start();
require_once('connect.php');
$user_account=$_POST['user_account'];
$user_password=$_POST['user_password'];
$date=date('Y-m-d H:i:s');
$sql="update user_info set login_date='{$date}' where user_account='{$user_account}'";//更新登陆时间
$sign_up_result=mysqli_query($connection,$sql);
$sql="select * from user_info where user_account='{$user_account}'
	  and user_password='{$user_password}'";//查询存在的用户信息
$sign_up_result=mysqli_query($connection,$sql);

// if(!$sign_up_result)//查询信息
// 	die("query failed: ".mysqli_error($connection));
// else
// 	echo("query successfully//signup.php"."<br>");

$row=mysqli_fetch_assoc($sign_up_result);
if($row==null)
	echo "<script>alert('账号或密码错误，请重新登陆!');window.location.href='../html/login.html'</script>";
else
{
	$_SESSION["user_info"]=$row;
	setcookie("user_account",$row['user_account'],time()+60*60*24);
	// echo "账号：".$row['user_account']."<br>密码：".$row['user_password'];
	echo "<script>window.localStorage.user_info='".json_encode($row)."'</script>";

	echo "<script>setTimeout(function(){window.location.href='../socket_backstage.html'},2000);</script>";
	//$url = "index.html";header( "Location: $url" ); //php跳转
	exit;
}
?>
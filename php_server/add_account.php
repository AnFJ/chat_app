<?php
require_once('connect.php');//连接数据库
$user_account=$_POST['user_account'];
$user_name=$_POST['user_name'];
$user_password=$_POST['user_password'];
$user_confirm=$_POST['user_confirm'];
$date=date('Y-m-d H:i:s');
$sql="select user_account from user_info where user_account='{$user_account}'";
$add_result=mysqli_query($connection,$sql);
$row=mysqli_fetch_array($add_result,MYSQLI_ASSOC);
if($user_password!=$user_confirm)
{
	echo "<script>alert('密码输入不一致，是不是手速太快了？');window.location.href='../html/register.html'</script>";
	die();
}
if($row!=null)
{
	echo "<script>alert('账号已被注册，大侠来晚了一步哦!');window.location.href='../html/register.html'</script>";
	die();
}

$sql="select user_name from user_info where user_name='{$user_name}'";
$add_result=mysqli_query($connection,$sql);
$row=mysqli_fetch_array($add_result,MYSQLI_ASSOC);
if($row!=null)
{
	echo "<script>alert('昵称已经有人用啦，好气啊!');window.location.href='../html/register.html'</script>";
	die();
}

$sql="insert into user_info(user_account,user_name,user_password,login_date)".
	 "values('{$user_account}','{$user_name}','{$user_password}','{$date}')";//添加用户指令
$add_result=mysqli_query($connection,$sql);
// if(!$add_result)//查询检测
// 	die("query failed: ".mysqli_error($connection));
// else
// 	echo("query successfully//add_account.php"."<br>");


//测试账号信息
$sql="select * from user_info where user_account='{$user_account}'
	  and user_password='{$user_password}'";
$add_result=mysqli_query($connection,$sql);
$row=mysqli_fetch_array($add_result,MYSQLI_ASSOC);
foreach ($row as $key => $value) {
	echo $key."=>".$value." || ";
}
mysqli_free_result($add_result);
mysqli_close($connection);
echo "<script>setTimeout(function(){alert('注册成功');window.location.href='../html/login.html';},1000);</script>";
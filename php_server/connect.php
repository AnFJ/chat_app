<?php
$localhost="localhost:3306";
$user="root";
$password="afj1043146498";
$database="chatan";
$connection=mysqli_connect($localhost,$user,$password,$database);


// if(!$connection)//连接检测
// 	die("connection failed:".mysqli_error($connection));
// else
// 	echo("connection successful!//connect.php"."<br>");

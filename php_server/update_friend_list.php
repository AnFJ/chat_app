<?php
require_once('connect.php');
$user_account=$_POST['user_account'];
$sql="select friend_account from user_friends where user_account='{$user_account}'";
$result=mysqli_query($connection,$sql);
if(!$result)//查询检测
	die("query failed: ".mysqli_error($connection));
//$row=mysqli_fetch_assoc($online_result);
$row=mysqli_fetch_all($result,MYSQLI_ASSOC);

for($i=0;$i<count($row);$i++)
{
	$sql="select user_name,user_info from user_info where user_account='{$row[$i]['friend_account']}'";
	$result=mysqli_query($connection,$sql);
	if(!$result)//查询检测
		die("query failed: ".mysqli_error($connection));
	$row[$i]['friend_info']=mysqli_fetch_assoc($result);
	$row[$i]['friend_state']='offline';
}
echo json_encode($row);
mysqli_close($connection);



//JSON测试
// $json='{"type":1,"user_info":'.'{"user_account":"12334","user_name":"小红"}}';
// $message=json_decode($json);
// $message=json_encode($message);
// echo $message;
// foreach ( $testJSON as $key => $value ) {  
//         $testJSON[$key] = urlencode ( $value );  
//     } 

?>
<?php
include 'config.php';
if(stripos($_SERVER['HTTP_USER_AGENT'], 'MicroMessenger') === false){
	header('Location:'.$notwxlink);
	exit();
}
$safe_link = $safe_link[mt_rand(0, count($safe_link)-1)];
$curr_host = parse_url($safe_link);
$curr_host = $curr_host['host'];
if($_SERVER['HTTP_HOST'] != $curr_host){
	header('Location:http://'.$safe_link.$mulu.'read-page-19-152-1.html');
	exit();
}
?>
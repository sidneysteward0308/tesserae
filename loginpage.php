<?php
// database connection code
// $con = mysqli_connect('localhost', 'database_user', 'database_password','database');

$con = mysqli_connect('localhost', 'root', '','db_login');

// get the post records
$uname = $_POST['uname'];
$pwd = $_POST['pwd'];

// database insert SQL code
$sql = "INSERT INTO `tbl_login` (`Id`, `flduname`, `fldpwd`) VALUES ('0', 'uname', 'pwd')";

// insert in database 
$rs = mysqli_query($con, $sql);

if($rs)
{
	echo "Login Entered";
}

?>
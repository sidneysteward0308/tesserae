<?php
// database connection code
// $con = mysqli_connect('localhost', 'database_user', 'database_password','database');

$con = mysqli_connect('localhost', 'root', '','db_register');

// get the post records
$txtuname = $_POST['txtuname'];
$txtpwd = $_POST['txtpwd'];

// database insert SQL code
$sql = "INSERT INTO tbl_register (Id, flduname, fldpwd) VALUES ('0', '$txtuname', '$txtpwd')";

// insert in database 
$rs = mysqli_query($con, $sql);

if($rs)
{
	echo "User Registered";
}

?>
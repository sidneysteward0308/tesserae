<?php
// database connection code
// $con = mysqli_connect('localhost', 'database_user', 'database_password','database');

$con = mysqli_connect('localhost', 'root', '','db_security');

// get the post records
$txtq1 = $_POST['txtq1'];
$txtq2 = $_POST['txtq2'];
$txtq3 = $_POST['txtq3'];

// database insert SQL code
$sql = "INSERT INTO tbl_security (Id, fldq1, fldq2, fldq3) VALUES ('0', '$txtq1', '$txtq2', '$txtq3')";

// insert in database 
$rs = mysqli_query($con, $sql);

if($rs)
{
	echo "Security Questions Updated";
}

?>
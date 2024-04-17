<?php
// Database connection code
$con = mysqli_connect('localhost', 'root', 'root', 'Users');

if ($_SERVER["REQUEST_METHOD"] == "POST") {
  $username = $_POST['username'];

  // Check if the username exists in the database
  $query = "SELECT * FROM tbl_register WHERE username = '$username'";
  $result = mysqli_query($con, $query);

  if (mysqli_num_rows($result) > 0) {
    // Username exists
    $response = array('status' => 'success');
    echo json_encode($response);
    exit();
  } else {
    // Username not found
    $response = array('status' => 'error');
    echo json_encode($response);
    exit();
  }
}
?>
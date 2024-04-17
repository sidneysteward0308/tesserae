<?php
// Database connection code
$con = mysqli_connect('localhost', 'root', 'root', 'Users');

if ($_SERVER["REQUEST_METHOD"] == "POST") {
  $username = $_POST['username'];
  $newPassword = $_POST['newPassword'];

  // Hash the new password
  $hashedPassword = password_hash($newPassword, PASSWORD_DEFAULT);

  // Update the password in the database
  $query = "UPDATE tbl_register SET password = '$hashedPassword' WHERE username = '$username'";
  $result = mysqli_query($con, $query);

  if ($result) {
    // Password reset successful
    $response = array('status' => 'success');
    echo json_encode($response);
    exit();
  } else {
    // Failed to reset password
    $response = array('status' => 'error');
    echo json_encode($response);
    exit();
  }
}
?>
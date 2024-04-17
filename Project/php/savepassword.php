<?php
session_start();

// Check if the user is logged in
if (isset($_SESSION['user_id'])) {
  $userId = $_SESSION['user_id'];
  $password = $_POST['password'];
  $identifier = $_POST['identifier'];

  // Database connection code
  $con = mysqli_connect('localhost', 'root', 'root', 'Users');

  // Insert the password into the tbl_passwords table
  $query = "INSERT INTO tbl_passwords (user_id, password, identifier) VALUES ('$userId', '$password', '$identifier')";
  $result = mysqli_query($con, $query);

  if ($result) {
    // Password saved successfully
    $response = array('status' => 'success');
    echo json_encode($response);
    exit();
  } else {
    // Failed to save the password
    $response = array('status' => 'error', 'message' => 'Failed to save the password.');
    echo json_encode($response);
    exit();
  }
} else {
  // User is not logged in
  $response = array('status' => 'error', 'message' => 'User not logged in.');
  echo json_encode($response);
  exit();
}
?>
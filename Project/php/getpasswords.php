<?php
session_start();

// Check if the user is logged in
if (isset($_SESSION['user_id'])) {
  $userId = $_SESSION['user_id'];

  // Database connection code
  $con = mysqli_connect('localhost', 'root', 'root', 'Users');

  // Retrieve the generated passwords for the logged-in user
  $query = "SELECT p.password, p.identifier, p.creation_date
          FROM tbl_passwords p
          INNER JOIN tbl_register u ON p.user_id = u.user_id
          WHERE u.user_id = '$userId'";
  $result = mysqli_query($con, $query);

  $passwords = array();
  while ($row = mysqli_fetch_assoc($result)) {
  $passwordData = array(
    'password' => $row['password'],
    'identifier' => $row['identifier'],
    'creation_date' => $row['creation_date']
  );
  $passwords[] = $passwordData;
}
  // Return the passwords as a JSON response
  $response = array('status' => 'success', 'passwords' => $passwords);
  echo json_encode($response);
  exit();
} else {
  // User is not logged in
  $response = array('status' => 'error', 'message' => 'User not logged in.');
  echo json_encode($response);
  exit();
}
?>
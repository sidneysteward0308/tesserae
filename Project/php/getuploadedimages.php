<?php
session_start();

// Check if the user is logged in
if (isset($_SESSION['user_id'])) {
  $userId = $_SESSION['user_id'];

  // Database connection code
  $con = mysqli_connect('localhost', 'root', 'root', 'Users');

  // Retrieve the uploaded images for the logged-in user
  $query = "SELECT image_path FROM user_images WHERE user_id = '$userId'";
  $result = mysqli_query($con, $query);

  $images = array();
  while ($row = mysqli_fetch_assoc($result)) {
    $imagePath = $row['image_path'];
    $imageUrl = 'uploads/' . $imagePath;
    $images[] = $imageUrl;
  }

  // Return the image URLs as a JSON response
  $response = array('status' => 'success', 'images' => $images);
  echo json_encode($response);
  exit();
} else {
  // User is not logged in
  $response = array('status' => 'error', 'message' => 'User not logged in.');
  echo json_encode($response);
  exit();
}
?>
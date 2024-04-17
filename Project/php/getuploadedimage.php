<?php
session_start();

if (isset($_SESSION['user_id'])) {
  $userId = $_SESSION['user_id'];

  // Retrieve the uploaded image filename or path from the database based on the user ID
  $con = mysqli_connect('localhost', 'root', 'root', 'Users');
  $query = "SELECT image_path FROM user_images WHERE user_id = '$userId' ORDER BY id DESC LIMIT 1";
  $result = mysqli_query($con, $query);

  if (mysqli_num_rows($result) > 0) {
    $row = mysqli_fetch_assoc($result);
    $imagePath = $row['image_path'];
    $imageUrl = 'uploads/' . $imagePath;

    $response = array('status' => 'success', 'imageUrl' => $imageUrl);
    echo json_encode($response);
    exit();
  } else {
    // No uploaded image found for the user
    $response = array('status' => 'error');
    echo json_encode($response);
    exit();
  }
} else {
  // User not logged in
  $response = array('status' => 'error');
  echo json_encode($response);
  exit();
}
?>
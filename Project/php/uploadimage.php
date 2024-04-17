<?php
session_start();

if (isset($_SESSION['user_id']) && isset($_FILES['imageFile'])) {
  $userId = $_SESSION['user_id'];
  $imageFile = $_FILES['imageFile'];

  // Specify the directory to store the uploaded images
  $uploadDirectory = '../uploads/';

  // Generate a unique filename for the uploaded image
  $filename = uniqid() . '_' . $imageFile['name'];
  $targetPath = $uploadDirectory . $filename;

  // Move the uploaded image to the specified directory
  if (move_uploaded_file($imageFile['tmp_name'], $targetPath)) {
    // Image uploaded successfully
    // Store the image filename or path in the database associated with the user
    $con = mysqli_connect('localhost', 'root', 'root', 'Users');
    $imagePath = $filename;
    $query = "INSERT INTO user_images (user_id, image_path) VALUES ('$userId', '$imagePath')";
    mysqli_query($con, $query);

    $response = array('status' => 'success');
    echo json_encode($response);
    exit();
  } else {
    // Failed to upload the image
    $response = array('status' => 'error');
    echo json_encode($response);
    exit();
  }
} else {
  // User not logged in or no image file found
  $response = array('status' => 'error');
  echo json_encode($response);
  exit();
}
?>
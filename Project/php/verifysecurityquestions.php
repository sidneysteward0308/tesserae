<?php
// Database connection code
$con = mysqli_connect('localhost', 'root', 'root', 'Users');

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $username = $_POST['username'];
  $question1 = $_POST['question1'];
  $question2 = $_POST['question2'];
  $question3 = $_POST['question3'];

  // Retrieve the security question answers for the user from the database
  $query = "SELECT question1, question2, question3 FROM tbl_register WHERE username = '$username'";
  $result = mysqli_query($con, $query);

  if (mysqli_num_rows($result) > 0) {
    $row = mysqli_fetch_assoc($result);
    $storedQuestion1 = $row['question1'];
    $storedQuestion2 = $row['question2'];
    $storedQuestion3 = $row['question3'];

    // Compare the provided answers with the stored answers
    if ($question1 === $storedQuestion1 && $question2 === $storedQuestion2 && $question3 === $storedQuestion3) {
      // Security question answers are correct
      $response = array('status' => 'success');
      echo json_encode($response);
      exit();
    } else {
      // Incorrect answers
      $response = array('status' => 'error');
      echo json_encode($response);
      exit();
    }
  } else {
    // User not found
    $response = array('status' => 'error');
    echo json_encode($response);
    exit();
  }
}
?>
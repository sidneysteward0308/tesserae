<?php
// loginpage.php

// Start the session
session_start();

// Database connection code
$con = mysqli_connect('localhost', 'root', 'root','Users');

// Check if the form is submitted
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Get the post records
    $txtuname = $_POST['txtuname'];
    $txtpwd = $_POST['txtpwd'];

    // Check if the username and password combination exists in the tbl_register table
    $query = "SELECT user_id, username, password FROM tbl_register WHERE username = '$txtuname'";
    $result = mysqli_query($con, $query);

    if (mysqli_num_rows($result) > 0) {
        $row = mysqli_fetch_assoc($result);
        $storedPassword = $row['password'];

           // Verify the entered password with the stored hashed password
           if (password_verify($txtpwd, $storedPassword)) {
            // Password is correct, store the user_id and username in the session
            $_SESSION['user_id'] = $row['user_id'];
            $_SESSION['username'] = $row['username'];

            // Return success response
            $response = array('status' => 'success');
            echo json_encode($response);
            exit();
        } else {
            // Password is incorrect
            $response = array('status' => 'error', 'message' => 'Invalid username or password.');
            echo json_encode($response);
            exit();
        }

    } else {
        // User is not registered
        $response = array('status' => 'error', 'message' => 'Invalid username or password. Please register first.');
        echo json_encode($response);
        exit();
    }
}

mysqli_close($con);
?>
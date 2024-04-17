<?php
// registerpage.php
error_reporting(E_ALL);
ini_set('display_errors', 1);


// database connection code
$con = mysqli_connect('localhost', 'root', 'root', 'Users');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Get the post records
    $txtuname = $_POST['txtuname'];
    $txtpwd = $_POST['txtpwd'];
    $txtq1 = $_POST['txtq1'];
    $txtq2 = $_POST['txtq2'];
    $txtq3 = $_POST['txtq3'];

    // Check if the username already exists
    $query = "SELECT * FROM tbl_register WHERE username = '$txtuname'";
    $result = mysqli_query($con, $query);

    if (mysqli_num_rows($result) > 0) {
        // Username already exists
        echo "Username already taken. Please choose a different username.";
        exit();
    }

    $hashedPassword = password_hash($txtpwd, PASSWORD_DEFAULT);

     // database insert SQL code with auto-increment Id
     $sql = "INSERT INTO tbl_register (username, password, question1, question2, question3)
     VALUES ('$txtuname', '$hashedPassword', '$txtq1', '$txtq2', '$txtq3')";

    // insert in database
    $rs = mysqli_query($con, $sql);

    if ($rs) {
        // Registration successful, start a session and store user's information
        session_start();
        session_regenerate_id(true); // Regenerate session ID for security
        $_SESSION['user_id'] = mysqli_insert_id($con);
        $_SESSION['username'] = $txtuname;

        // Return success response
        $response = array('status' => 'success');
        echo json_encode($response);
        exit();
    } else {
        // Registration failed
        $response = array('status' => 'error', 'message' => 'Registration failed. Please try again.');
        echo json_encode($response);
        exit();
    }
}

mysqli_close($con);
?>
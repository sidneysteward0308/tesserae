<?php
session_start();

if (isset($_SESSION['user_id'])) {
  $response = array('status' => 'loggedin');
} else {
  $response = array('status' => 'loggedout');
}

echo json_encode($response);
?>
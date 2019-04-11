<?php

require_once('functions.php');
set_exception_handler('handleError');
require_once('config.php');
require_once('mysqlconnect.php');

$output = [
    "success" => false
];

$json_input = file_get_contents("php://input"); //is the main input string
//should get the raw string of the body
//if there was a header in POST, remember a header is a string due to URL encoding
//how to code multiple pieces of data into a string?
//axios sends jsonencoded, php cannot read this by default
//note, AJAX sends it urlencoded making it sometihng php can understand
//php takes these encodings and then converts it into a POST
//when using axios and POST need to send the data in the body using raw text instead of x-www-form-urlencoded

$input = json_decode($json_input, true);
//this will turn the file back into url encode so php can read it
//the true is used to make any nested objects associative arrays so it will be usable by php

if(empty($input['email'])){
    throw new Exception('Email/Username is a required value');
}

if(empty($input['password'])){
    throw new Exception('Password is a required value');
}

$email = $input['email'];
$password = $input['password'];

$hashed_password = sha1($password);

unset($input['password']);

$query ="SELECT `id`, `name` FROM `users` 
WHERE `email` = '$email' AND `password` = '$hashed_password'
";

$result = mysqli_query($conn, $query);
//result is the reference to the result to the databse for that query
//reference to the data that lets you get the data later on

if(!$result){
    throw new Exception(mysqli_error($conn));
}

if(mysqli_num_rows($result) !== 1){
    throw new Exception('Invalid Username or Password!');
}

$data = mysqli_fetch_assoc($result);

$token = $email . $data['id'] . microtime();
$token = sha1($token);

$connect_query = "INSERT INTO `user_connections` SET
    `token` = '$token',
    `users_id` = {$data['id']},
    `created` = NOW(),
    `ip_address` = '{$_SERVER['REMOTE_ADDR']}' 
"; 
//the token is from the username + id value + the microseconds and then hashed
//data[id] is the id from the database
//created is the current time of the database
//the client address, 

$connect_result = mysqli_query($conn, $connect_query);

if(!$connect_result){
    throw new Exception(mysqli_error($conn));
}

if(mysqli_affected_rows($conn) !== 1){
    throw new Exception('Could not og you inL connection not saved');
}
//can only have one affected row at a time so it uses connection
//num rows can have multiple affected so uses the result

$_SESSION['user_data'] = [
    'id' => $data['id'],
    'handlename' => $data['name'],
    'token' => $token
]; //can be used as long as the session exists

$output['success'] = true;
$output['handlename'] = $data['name'];
$output['token'] = $token;
//token is a oneoff key, work sofr a particular door at a particular time

$json_ouput = json_encode($output);

print($json_ouput);

?>

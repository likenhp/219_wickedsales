<?php
require_once('functions.php');
set_exception_handler('handleError');
require_once('config.php');
require_once('mysqlconnect.php');

$output = [
    "success" => false
];

//check if there is a session and user_data 
//if there is not then throw exception where user is not logged in
//if user is logged in check the token from session[userdata]
//if there is no session[userdata] check the url for a token
    //if user is logged in with a token from url
//write a query to delete that token
//once the token has been deleted
//destroy the session using session_unset() or session_destroy()
//tell user that they have logged out



if(!empty($_SESSION['user_data'])){
    $token = $_SESSION['user_data']['token'];

}else{ 
    $json_input = file_get_contents("php://input");
    $input = json_decode($json_input, true);

    if(empty($input['token'])){
        throw new Exception("already logged out");
    }

    $token = addslashes($input['token']);
}

$delete_query = "DELETE FROM `user_connections`
WHERE `token` = '$token'
";

$delete_result = mysqli_query($conn, $delete_query);

if(!$delete_result){
    throw new Exception(mysqli_error($conn));
}

if(mysqli_affected_rows($conn) !==1){
    throw new Exception('could not logout in current section');
}

unset($_SESSION['user_data']);

$output['success'] = true;

$json_ouput = json_encode($output);
print($json_ouput);

?>

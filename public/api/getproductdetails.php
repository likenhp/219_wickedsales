<?php

require_once('functions.php');

set_exception_handler('handleError');

require_once('config.php');

require_once('mysqlconnect.php');


if(empty($_GET['productId'])){
    throw new Exception('productId is a required value');
}
$id = (int)$_GET['productId'];
//the (int) makes it a numeric literal which sanitizes it

$query = "SELECT `p`.`id`, `p`.`name`, `p`.`price`, `p`.`description`, `p`.`misc_details` AS `miscDetails`,
    GROUP_CONCAT(`i`.`url`) AS images
    FROM `products` AS `p`
    JOIN `images` AS `i`
    ON `p`.`id`= `i`.`products_id` 
    WHERE `p`.`id` = $id
    GROUP BY `p`.`id`
";


$result = mysqli_query($conn, $query);
//the connection to database, the query is thw way we affect the dataase 
//result is an object that is a reference to the data, a pointer to the data

//print_r($result);
//print_r is for mostly debugging purposes, it will not be used in production purposes
//will show the fields inside
//will work for objects and arrays
//echo and print only do strings, echo only takes one param

if(!$result){
    throw new Exception(mysqli_error($conn));
    //throw is basically the same as saying there is an error, even if it is not a real error
    //throwing an exception is giving a string of why there is an error 
    //the mysqli_error returns an object
    //when an error exception is thrown, the function set_exception_handler will run and take that string
}

$data = mysqli_fetch_assoc($result);

$data['price'] = intval($data['price']);
$data['miscDetails'] = json_decode($data['miscDetails']);
//we decode the miscDetails to remove the \ since miscDetails was already in json
$data['images'] = explode(',', $data['images']);

if(mysqli_num_rows($result) === 0){
    throw new Exception('no data available for product id');
}

$output = [
    'success'=>true,
    'productInfo'=> $data 
];

$json_output = json_encode($output);

print_r($json_output);
?>

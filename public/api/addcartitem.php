<?php

require_once('functions.php');

set_exception_handler('handleError');

require_once('config.php');

require_once('mysqlconnect.php');

$product_id = 1;
//hardcode for now
$product_quantity = 1;
//setting this up for future functionality, for now hardcode a value
//$cart_id = 1;
//setting up for future, for now hardcoded
$user_id = 1;
//setting up for future, for now hardcoded

$query = "SELECT `price` FROM `products` WHERE `id` = $product_id
";

$result = mysqli_query($conn, $query);

if(!$result){
    throw new Exception(mysqli_error($conn));
}

if(mysqli_num_rows($result) === 0){
    throw new Exception("no product matches product id $product_id");
}

$product_data = mysqli_fetch_assoc($result);

$product_price = (int)$product_data['price'];

$product_total = $product_price * $product_quantity;

if(empty($cart_id)){ //empty checks if the variable exists and whether it is undefined, empty string, etc.
    $cart_create_query = "INSERT INTO `carts` SET
        `item_count` = $product_quantity, 
        `total_price` = $product_total,
        `created` = NOW(),
        `users_id` = $user_id,
        `changed` = NOW()
        ";
    $cart_result = mysqli_query($conn, $cart_create_query);
    if(!$cart_result){
        throw new Exception(mysqli_error($conn));
    }
    if(mysqli_affected_rows($conn)===0){
        throw new Exception("data was not inserted to cart table");
    }
    $cart_id = mysqli_insert_id($conn);
}

$cart_item_query = "INSERT INTO `cart_items` SET
    `products_id` = $product_id,
    `quantity` = $product_quantity,
    `carts_id` = $cart_id
";

$cart_item_result = mysqli_query($conn, $cart_item_query);

if(!$cart_item_result){
    throw new Exception(mysqli_error($conn));
}
if(!mysqli_affected_rows($conn)){
    throw new Exception("failed to insert into cart_items");
}

$output = [
    'success'=>true,
    'cartCount'=>$product_quantity,
    'cartTotal'=>$product_total
];

$json_output = json_encode($output);

print($json_output);

?>
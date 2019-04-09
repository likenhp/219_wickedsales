<?php

require_once('functions.php');

set_exception_handler('handleError');

require_once('config.php');

require_once('mysqlconnect.php');

if(empty($_GET['product_id'])){
    throw new Exception('You must send a Product ID with your request');
}

$product_id = (int)$_GET['product_id'];
//comes from the query string in the request url from the client
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

if(empty($_SESSION['cart_id'])){ 
    //empty checks if the variable exists and whether it is undefined, empty string, etc.
    //if there is no cart_id in the session, we have to make one
    //checks the session data from the cookie data to see if there is a cart id
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
    $_SESSION['cart_id'] = $cart_id;
    //if we have not cart id we make one
} else{
    $cart_id = $_SESSION['cart_id'];
    //if there is a cart id we pull it out

    $update_cart_query = "UPDATE `carts` SET 
    `item_count` = `item_count` + $product_quantity,
    `total_price` = `total_price` + $product_total
    WHERE `id` = $cart_id
    ";

    $update_result = mysqli_query($conn, $update_cart_query);

    if(!$update_result){
        throw new Exception(mysqli_error($conn));
    }
    if(mysqli_affected_rows($conn) === 0){
        throw new Exception("Cart data was not updated");
    }
}

$cart_item_query = "INSERT INTO `cart_items` SET
    `products_id` = $product_id,
    `quantity` = $product_quantity,
    `carts_id` = $cart_id
    ON DUPLICATE KEY UPDATE
    `quantity` = `quantity` + $product_quantity
";
//ON DUPLICATE KEY UPDATE it will look for a key that uses carts_id and products_id
//then if there is a key already it just adds one
//essentially this query will either add from INSERT INTO or update something existing based on the UPDATE

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
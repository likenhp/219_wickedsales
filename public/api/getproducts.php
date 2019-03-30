<?php


// readfile("./data/getproducts.json");
require_once('functions.php');
//can now use the error handling function from functions.php

set_exception_handler('handleError');//designed to handle errors

require_once('mysqlconnect.php'); 
//db and conn are now available from mysqlconnect.php, 
//will throw an error if the php file does not exist

$query = "SELECT `p`.`id`, `p`.`name`, `p`.`price`,
`i`.`url` AS images
FROM `products` AS `p`
JOIN `images` AS `i`
    ON `p`.`id`= `i`.`products_id` 
    ORDER BY `p`.`id`
";

//the ON corrsesponds the product table's id field and the images table's products_id in a one to one ratio, meaning they must be the same
//the ORDER BY sorts the query based on the product table's id field

/* procedural */
//   talk to this connection, then send this query
$result = mysqli_query($conn, $query);

//if result is a falsey value the query failed somehow
if(!$result){
    throw new Exception('invalid query: '. mysqli_error($conn));
    //this error message goes into the constructor of Exception
}

//$row = mysqli_fetch_assoc($result); 

$data = [];
//$images = [];

while($row = mysqli_fetch_assoc($result)){
    $currentID = $row["id"];
    $currentID = intval($currentID);
    $image = $row["images"]; 
    //grabbing an image at rowimages and then adding it to a variable image
    //the images from the alias images from i.url in the $query
    if(isset($data[$currentID])){
        $data[$currentID]["images"][] = $image;
        //in the current id looking for the key images and then pushing in rowimages into the array
        //array_push($data[$currentID]["images"], $image) <--the old array push way
    }else{
        unset ($row["images"]);
        //then get rid of the key images at rowimages, 
        //basically removing the images from the alias images from i.url
        //more specifically the image table in 
        $row["images"] = [$image];//then pushing in an array of the variable image into the array row wihich has a subarray of images
        $row["price"] = intval($row["price"]);
        //key price in the array row, 
        //using  intval to target those key values and turning it into a number instead of a string

        //$row["price"] = (int)$row["price"]; <--type casting, saying that it should be an integer value and not string
        $data[$currentID] = $row;
    };
}

$pureData = [];
foreach($data as $value){
    //looping through $data and pushing each key:value into the array $pureData
    $pureData[] = $value;
}

$output = [
    "success" => true,
    "products" => $pureData
];

$json_output = json_encode($output);
//json_encode returns a string
print($json_output);
//print just returns a value in the form of a string

/* OOP */
?>
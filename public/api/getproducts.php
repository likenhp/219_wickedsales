<?php


// readfile("./data/getproducts.json");
require_once('mysqlconnect.php'); //db and conn are now available

$query = "SELECT `p`.`id`, `p`.`name`, `p`.`price`,
`i`.`url` AS images
FROM `products` AS `p`
JOIN `images` AS `i`
    ON `p`.`id`= `i`.`products_id` 
    ORDER BY `p`.`id`
    
";

/* procedural */
//   talk to this connection, then send this query
$result = mysqli_query($conn, $query);

//$row = mysqli_fetch_assoc($result); 

$data = [];
//$images = [];

while($row = mysqli_fetch_assoc($result)){
    $currentID = $row["id"];
    $image = $row["images"]; //grabbing an image at rowimages and then adding it to a variable image
    if(isset($data[$currentID])){
        $currentID = $row["id"];
        $data[$currentID]["images"][] = $image;
        //array_push($data[$currentID]["images"], $image) <--the old array push way

    }else{
        unset ($row["images"]);//then get rid of images key at rowimages, basically removing the images in the object from mysqlconnect.ph
        $row["images"] = [$image];//then pushing in an array of the variable image into rowimages
        
        $row["price"] = intval($row["price"]);
        //$row["price"] = (int)$row["price"]; <--type casting, saying that it should be an integer value and not string

        $data[$currentID] = $row;
    };
}

$pureData = [];
foreach($data as $value){
    $pureData[] = $value;
}

$output = [
    "success" => true,
    "products" => $pureData
];

$json_output = json_encode($output);

print($json_output);

/* OOP */
?>
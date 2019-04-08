<?php
session_start();

$output = [
    'auth' => false
];

if(!empty($_SESSION['user'])){
    $output['auth'] = true;
}

print(json_encode($output));
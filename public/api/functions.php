<?php

//if there is ever an error of some sort, call this function
if(!function_exists('handleError')){
    function handleError($error){
        $output = [
            'success' => false,
            'error'=> $error -> getMessage()
        ];
        $json_output = json_encode($output);
        print ($json_output);
    }
}

if(!function_exists('handleCORS')){
    function handleCORS(){
        header("Access-Control-Allow-Origin: *");
        if($_SERVER['REQUEST_METHOD']==='OPTIONS'){
            header('Access-Control-Allow-Methods: POST, GET, OPTIONS'); //if true allow all these methods only
            exit();
        }
    }
}


?>
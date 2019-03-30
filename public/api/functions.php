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



?>
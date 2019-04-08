<?php

session_start();

unset($_SESSION['user']); //to make sure the session user is removed

session_destroy(); //safest way to remove session

print(json_encode(['success' => true]));

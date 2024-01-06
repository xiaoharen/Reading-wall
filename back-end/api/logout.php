<?php
include "../tools/header.php";

include "../services/userService.php";
include "../tools/log.php";

if ($_SERVER["REQUEST_METHOD"] == "GET") {
    userLogout();
    echo json_encode("success");
}

<?php
include "../tools/header.php";

include "../tools/mysql.php";
include "../services/userService.php";
include "../tools/log.php";

$conn = connectMySQL();

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $postData = file_get_contents('php://input');
    $requestData = json_decode($postData, true); // 将JSON字符串解析为关联数组
    $username = $requestData["username"];
    $password = $requestData["password"];

    $savePassword = password_hash($password, PASSWORD_DEFAULT);
    $res = userRegister($conn,$username,$savePassword);
    if($res) {
        echo json_encode("success");
    }else {
        echo json_encode("error");
    }
}

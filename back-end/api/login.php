<?php
include "../tools/header.php";

include "../tools/mysql.php";
include "../services/userService.php";
include "../tools/log.php";

session_start();
$conn = connectMySQL();

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $postData = file_get_contents('php://input');
    $requestData = json_decode($postData, true); // 将JSON字符串解析为关联数组
    $username = $requestData["username"];
    $password = $requestData["password"];

    $res = userLogin($conn, $username, $password);
    if ($res) {
        $_SESSION["username"] = $username;
        echo json_encode("success");
    } else {
        echo json_encode("error");
    }
}
if ($_SERVER["REQUEST_METHOD"] == "GET") {
    if ($_SESSION["username"]) {
        echo json_encode("success");
    } else {
        echo json_encode("error");
    }
}

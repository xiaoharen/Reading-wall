<?php
function connectMySQL(){
    $mysql_host = 'localhost:3306';
    $mysql_user = 'root';
    $mysql_psw = '12345678';
    $mysql_database = 'xhr';
    $conn = mysqli_connect($mysql_host, $mysql_user, $mysql_psw, $mysql_database);

    if (!$conn) {
        die("连接失败: " . mysqli_error($conn));
    }

    mysqli_set_charset($conn, "utf8"); // 设置字符集为 utf8

    return $conn;
}
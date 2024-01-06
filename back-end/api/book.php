<?php
include "../tools/header.php";

include "../tools/mysql.php";
include "../services/bookService.php";
include "../tools/log.php";

$conn = connectMySQL();

if ($_SERVER["REQUEST_METHOD"] == "GET") {
    $type = $_GET['type'];

    if ($type === 'search') {
        $rows = search($conn, $_GET['content']);
        echo json_encode($rows);
    } elseif ($type === 'delete') {
        $res = deleteById($conn, $_GET['id']);
        if ($res) {
            echo json_encode("success");
        } else {
            echo json_encode("error");
        }
    }
}

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    //file_get_contents 是一个PHP函数，用于读取文件的内容。
    //'php://input' 是一个特殊的流，它提供了请求的原始数据。当使用POST方法发送数据时，这些数据通常位于 php://input 流中。
    //所以，这行代码的目的是从POST请求中读取原始数据并存储在 $postData 变量中。
    $postData = file_get_contents('php://input');
    $requestData = json_decode($postData, true); // 将JSON字符串解析为关联数组

    // 访问嵌套的属性
    $type = $requestData['type'];
    $id = $requestData['id'];
    $bookName = $requestData['bookName'];
    $author = $requestData['author'];
    $xhrURL = $requestData['xhrURL'];
    $imageURL = $requestData['imageURL'];
    $lid = $requestData['lid'];

    if ($type === 'update') {
        $res = updateBook($conn, $id, $bookName, $author, $xhrURL, $imageURL, $lid);
        if ($res) {
            echo json_encode("success");
        } else {
            echo json_encode("error");
        }
    } elseif ($type === 'add') {
        $res = addBook($conn, $bookName, $author, $xhrURL, $imageURL, $lid);
        if ($res) {
            echo json_encode("success");
        } else {
            echo json_encode("error");
        }
    }
}
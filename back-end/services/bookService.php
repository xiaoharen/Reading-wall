<?php

function addBook($conn, $bookName, $author, $xhrURL, $imageURL, $labelId)
{
    $sql = "INSERT INTO book (bookname,author,xhrurl,imageurl,lid) VALUES (?,?,?,?,?)";
    $stmt = mysqli_prepare($conn, $sql);

    if ($stmt) {
        mysqli_stmt_bind_param($stmt, "ssssi", $bookName, $author, $xhrURL, $imageURL, $labelId);
        if (mysqli_stmt_execute($stmt)) {
            return true;
        }
    }

    mysqli_stmt_close($stmt);
    return false;
}

function deleteById($conn,$id)
{
    $sql = "DELETE FROM book WHERE id=?";

    $stmt = mysqli_prepare($conn, $sql);
    if ($stmt) {
        mysqli_stmt_bind_param($stmt, "i", $id);
        if (mysqli_stmt_execute($stmt)) {
            return true;
        }
    }
    mysqli_stmt_close($stmt);
    return false;
}

function updateBook($conn, $id, $bookName, $author, $xhrURL, $imageURL, $labelId)
{
    $sql = "UPDATE book SET bookname=?, author=?, xhrurl=?, imageurl=?, lid=? WHERE id=?";
    $stmt = mysqli_prepare($conn, $sql);

    if ($stmt) {
        mysqli_stmt_bind_param($stmt, "sssssi", $bookName, $author, $xhrURL, $imageURL, $labelId, $id);
        if (mysqli_stmt_execute($stmt)) {
            return true;
        }
    }

    mysqli_stmt_close($stmt);
    return false;
}

function search($conn, $searchContent) {
    // if searchContent is null,then search all rows
    if(!$searchContent) {
        $sql = "select * from book";
        $result = mysqli_query($conn, $sql);
        $rows = array();
        if (mysqli_num_rows($result) > 0) {
            while ($row = mysqli_fetch_assoc($result)) {
                $rows[] = $row;
            }
        }
        return $rows;
    }
    $stmt = mysqli_prepare($conn, "SELECT * FROM book WHERE bookname like ? or author like ?");
    mysqli_stmt_bind_param($stmt, "ss", $searchContent,$searchContent);
    if (mysqli_stmt_execute($stmt)) {
        $result = mysqli_stmt_get_result($stmt);
        $rows = array();
        if (mysqli_num_rows($result) > 0) {
            while ($row = mysqli_fetch_assoc($result)) {
                $rows[] = $row;
            }
        } else {
            return null;
        }
    } else {
        die("查询执行失败: " . mysqli_stmt_error($stmt));
    }
    mysqli_stmt_close($stmt);
    return $rows;
}

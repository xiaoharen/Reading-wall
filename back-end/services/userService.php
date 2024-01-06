<?php
function userLogin($conn, $username, $password) {
    $sql = "SELECT password,state FROM user WHERE username = ?";
    $stmt = mysqli_prepare($conn, $sql);

    if ($stmt) {
        mysqli_stmt_bind_param($stmt, "s", $username);
        if (mysqli_stmt_execute($stmt)) {
            $result = mysqli_stmt_get_result($stmt);
            if (mysqli_num_rows($result) > 0) {
                $row = mysqli_fetch_assoc($result);
                $savedPassword = $row['password'];
                $state = $row['state'];
                if(password_verify($password,$savedPassword) && $state === 1) {
                    return true;
                }
            }
        }
    }

    mysqli_stmt_close($stmt);
    return false;
}

function userRegister($conn, $username, $password) {
    $sql = "INSERT INTO user (username,password) VALUES (?,?)";
    $stmt = mysqli_prepare($conn, $sql);

    if ($stmt) {
        mysqli_stmt_bind_param($stmt, "ss", $username, $password);
        if (mysqli_stmt_execute($stmt)) {
            return true;
        }
    }

    mysqli_stmt_close($stmt);
    return false;
}

function userLogout() {
    session_start();
    unset($_SESSION['username']);
    session_destroy();
}
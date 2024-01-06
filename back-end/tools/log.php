<?php
header('Content-Type: text/html; charset=utf-8');
function xhrLog($text)
{
    $file = '../log.txt';
    $file = fopen($file, 'a');
    fwrite($file, $text);
    fclose($file);
}

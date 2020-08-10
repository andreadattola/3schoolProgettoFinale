<?php 
header('Content-Type: application/json');
header('Access-Control-Allow-Origin:*');
$conn = mysqli_connect('localhost', 'root', ' ', 'dbtravel')or die ('server not working');
$query = "INSERT INTO(`email`, `hashcode`, `salt`) values ('');";
$res = mysqli_query($conn, $query) or die ("ERRORE NELLA QUERY" . mysqli_error($conn)); /* . SAREBBE LA  CONCATENAZIONE */

$conn = mysqli_connect('localhost', 'root', ' ', 'dbtravel')or die ('server not working');
$query = "SELECT * FROM UTENTE";
$res = mysqli_query($conn, $query) or die ("ERRORE NELLA QUERY" . mysqli_error($conn));

$array = array();
while($row = mysqli_fetch_assoc($res))
$array[]=$row;

$json = json_encode($array);
echo $json;
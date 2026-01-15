<?php
$host = "localhost";
$user = "root";
$pass = "";
$db   = "school_db";

$conn = mysqli_connect($host, $user, $pass, $db);

if (!$conn) {
  die("Connection failed");
}

$firstName = "dushime";
$SecondName = "john";
$email = "john@gmail.com";

$sql = "INSERT INTO students (firstName, secondName, email) VALUES ('$firstName','$secondName', '$email')";
mysqli_query($conn, $sql);


//FETCHING DATA
$result = mysqli_query($conn, "SELECT * FROM students");

while ($row = mysqli_fetch_assoc($result)) {
  echo $row['name'];
}

//UPDATE DATA
$sql = "UPDATE students SET firstName='Mike' WHERE id=1";
mysqli_query($conn, $sql);

//Delete DATA 
$sql = "DELETE FROM students WHERE id=1";
mysqli_query($conn, $sql);


?>
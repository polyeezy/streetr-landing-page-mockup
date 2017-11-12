<?php
header('Content-Type: application/json');

$invalid_mail = '{"success": false, "message" : "Email invalide."}';
$invalid_link = '{"success": true, "message" : "Erreur. Veuillez réessayer."}';
$mail = "";

if (!isset($_POST['mail']) || ( isset($_POST['mail']) && empty($_POST['mail']) ) ) {

    $res = new stdClass();
    $res->status = 403;
    $res->success= false;
    $res->message = "Email invalide.";

    echo json_encode($res);
    return;
}

$link = $_POST['link'];

$success = '{"success": true, "message" : "Trajet envoyé!", "link": "'.$link.'"}';


$curl = curl_init();

curl_setopt_array($curl, array(
    CURLOPT_URL => "https://us17.api.mailchimp.com/3.0/lists/6b0ff1cd23/members",
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_ENCODING => "",
    CURLOPT_MAXREDIRS => 10,
    CURLOPT_TIMEOUT => 30,
    CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
    CURLOPT_CUSTOMREQUEST => "POST",
    CURLOPT_POSTFIELDS => "{\n    \"email_address\": \" ".$_POST['mail'] . "  \",\n    \"status\": \"subscribed\"\n}",
    CURLOPT_HTTPHEADER => array(
        "authorization: apikey 1500d175fe4981b4bffd53c97bbadadc-us17",
        "cache-control: no-cache",
        "content-type: application/json",
        "postman-token: 9a867a88-3d3b-5f41-07bf-c3244218cb9b"
    ),
));

$response = curl_exec($curl);
$err = curl_error($curl);

curl_close($curl);

$res = new stdClass();
$res->status = 200;
$res->success= true;
$res->message = "Trajet envoyé";
$res->link = $link;

echo json_encode($res);
return;?>
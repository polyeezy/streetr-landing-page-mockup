function sendPath(){
    $('.modal-send').append('<div class="progress"><div class="indeterminate"></div></div>');


    var email = $('#email').val();

    var data = {
        "mail" : email,
        "link" : "test"
    };


    $.ajax({
        type: "POST",
        url: "sendPathByMail.php",
        data: data,
        success: path_send_success,
        error : path_send_error
    });
}

function path_send_success(data){
    data = JSON.parse(data);
    var color = data.success ? "green" : "red";
    Materialize.toast(data.message, 4000,  color);
    $('.modal-content').empty();
    $('.modal-content').append('<h4>Merci d\'utiliser Streetr !</h4>\n' +
        '        <p>Vous pouvez maintenant accéder au parcours : <a target="_blank" href="'+data.link+'">Lien du parcours</a>' +
        '       </p>');

    $('.modal-send').append('<a href="test">test</a>');
    $('.progress').remove();
}
function path_send_error(data){
    data = JSON.parse(data);

    Materialize.toast(data.message);
    $('.progress').remove();
}

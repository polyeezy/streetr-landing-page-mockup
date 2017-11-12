function sendPath(){
    $('.modal-send').append('<div class="progress"><div class="indeterminate"></div></div>');


    var email = $('#email').val();

    var data = {
        "mail" : email,
        "link" : currentLink
    };


    var host = "http://www.streetr.eu";
    //var host = "http://www.streetr.eu";

    $.ajax({
        type: "POST",
        url: host + '/sendPathByMail.php',
        data: data,
        dataType: 'json',
        crossDomain: true,
        success: path_send_success,
        error : path_send_error
    });
}

function path_send_success(data){
    var color = data.success ? "green" : "red";
    Materialize.toast(data.message, 4000,  color);
    if (data.success){
        $('.modal-content').empty();
        $('.modal-content').append('<h4>Merci d\'utiliser Streetr !</h4>\n' +
            '        <p>Vous pouvez maintenant accéder au parcours : <a target="_blank" href="'+data.link+'">Lien du parcours</a>' +
            '       </p>');

        $('.modal-send').append('<a href="test">test</a>');
    }

    $('.progress').remove();
}
function path_send_error(data){
    //data = JSON.parse(data);

    Materialize.toast(data.message);
    $('.progress').remove();
}

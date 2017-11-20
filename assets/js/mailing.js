function sendPath(){
    $('.modal-send').append('<div class="progress"><div class="indeterminate"></div></div>');


    console.log(currentIdx);

    var email = $('#email').val();

    var data = {
        "mail" : email,
        "link" : getPathLink()[currentIdx],
        "id" : currentIdx
    };


    //var host = "http://www.streetr.eu";
    var host = "http://localhost:8888/streetr-landing-page-mockup/";

    $.ajax({
        type: "POST",
        url: 'sendPathByMail.php',
        data: data,
        dataType:'JSON',
        crossDomain: true,
        success: path_send_success,
        error : path_send_error
    });
}

function path_send_success(data){
    var color = data.success ? "green" : "red";
    Materialize.toast(data.message, 4000,  color);



    if (data.success){
        document.location.href="trajet-" + (parseInt(data.id) + 1) + ".html";
        /*
             console.log(data);
             $('.modal-content').empty();
             $('.modal-content').append('<h4>Merci d\'utiliser Streetr !</h4>\n' +
                 '        <p>Vous pouvez maintenant accéder au parcours : <a target="_blank" href="'+data.link+'">Lien du parcours</a>' +
                 '       </p>');

             $('.modal-send').append('<a href="test">test</a>');
                */
         }



    $('.progress').remove();
}
function path_send_error(data){
    //data = JSON.parse(data);
    console.log(data);
    Materialize.toast(data.message);
    $('.progress').remove();
}

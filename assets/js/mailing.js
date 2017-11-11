function sendPath(){

    $('.modal-send').append('<div class="progress"><div class="indeterminate"></div></div>');


    var email = $('#email').val();

    var data = {
        "mail" : email,
        "link" : currentPath.link
    };

    function path_send_success(data){
        data = JSON.parse(data);
        var color = data.success ? "green" : "red";
        Materialize.toast(data.message, 4000,  color);
        $('.progress').remove();
    }
    function path_send_error(data){
        data = JSON.parse(data);

        Materialize.toast(data.message);
        $('.progress').remove();
    }

    $.ajax({
        type: "POST",
        url: "sendPathByMail.php",
        data: data,
        success: path_send_success,
        error : path_send_error
    });


}


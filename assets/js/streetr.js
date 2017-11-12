
var PATHS_DIRECTORY = 'assets/Paths/';
var THEME_ID = 'street-art';


createPath('1', true);
update_sliders(1);

function getPathDirectory(path_id){
    return (PATHS_DIRECTORY + THEME_ID + '/' + THEME_ID + '_' + path_id);
}

function getPathData(path_id) {
    return (PATHS_DIRECTORY + THEME_ID + '/' + THEME_ID + '_' + path_id + '/' + THEME_ID + '_' + path_id + '_data.json');
}

function getPathScreenshots(path_id){
    return[
        getPathDirectory(path_id) + '/screenshot1.jpg',
        getPathDirectory(path_id) + '/screenshot2.jpg',
        getPathDirectory(path_id) + '/screenshot3.jpg'
    ]
}

function getPathLink(){
    return[
        'https://goo.gl/3AHCwq',
        'https://goo.gl/dAK5ad',
        'https://goo.gl/Z2RcRJ',
        'https://goo.gl/yNhNJt'

    ]
}

function getPathPreview(path_id){
    return getPathDirectory(path_id) + '/preview.png';
}

function createPath(path_id, active) {
    active = active || false;

    $.getJSON(getPathData(path_id))
        .then(function (data) {
            data.paths.forEach(function(elem, index ){
                index += 1;
                var path = index == 1 ? '<a onclick="active_path('+index+')" id="' + index + '" href="#!" class="path collection-item avatar active">' : '<a onclick="active_path('+index+')" id="' + (index) + '" href="#!" class="path collection-item avatar">';
                path += '<span class="title bold">' + elem.name + '</span>';
                path += '<p class="body">' + elem.description + '</p>';
                path += '</a>';
                $('.' + THEME_ID).append(path);
            });
        })
        .fail(function () {

        });
}

function active_path(id){
    $('.path').removeClass('active');
    $('#' + id).addClass('active');
    update_sliders(id);
}

function update_sliders(id){
    $('.slider').remove();
    var path = {};

    $.getJSON(getPathData(1))
        .then(function (data) {
            data.paths.forEach(function(elem, index ){
                index += 1;

                var screens = getPathScreenshots(id);

                if (index == id){
                    path = elem.steps;
                    currentIdx = index - 1;
                    var myvar = '   <div class="slider">\n' +
                        '            <ul class="slides">';


                    elem.steps.forEach(function (step, idx){
                        myvar +=  '<li class="streetr-slide">'+
                            '    <img src="'+ screens[idx]+'"> <!-- random image -->'+
                            '    <div class="caption center-align card">'+
                            '        <h3 class="black-text">'+step.name+'</h3>'+
                            '        <h5 class="black-text">'+step.comment+'</h5>'+

                            '    </div>'+
                            '    </li>';
                    });
                    myvar +=
                        '    <li class="streetr-slide">'+
                        '    <img src="'+getPathPreview(id)+'"> <!-- random image -->'+
                        '    <div class="caption center-align card">'+
                        '        <h3 class="black-text">À vous de jouer!</h3>'+
                        '    <p>                   <button onclick="sendPath()" id="btn_send_path" class="waves-effect waves-light red btn"><i class="material-icons right">send</i>Envoyer</button> </p>'+
                        '    </div>'+
                        '    </li>    </ul>\n' +
                        '        </div>';

                    $('.theme_container').append(myvar);
                    $('.slider').slider();


                }
            });
        })
        .fail(function () {
        });
}

function addPathToTheme(theme_title, path_title, creator_name)
{
var path_list = document.getElementById(theme_title + "_paths");
var new_path = document.createElement("a");
new_path.className = "collection-item avatar";
new_path.href = "#!";

var innerSpan = document.createElement("span");
innerSpan.className = "title";
innerSpan.innerHTML = path_title;
new_path.appendChild(innerSpan);

var innerP = document.createElement("p");
innerP.innerHTML = "By " + creator_name;
new_path.appendChild(innerP);
path_list.appendChild(new_path);
}


function createThemeTitle(theme_title, theme_icon, new_items) {
    var themes_list = document.getElementById("themes_list");
    var new_theme_list = document.createElement("li");
    var headerDiv = document.createElement("div");
    headerDiv.className = "collapsible-header active";

    var icon = document.createElement('i');
    icon.className = "material-icons";
    icon.innerHTML = theme_icon;
// Bug : title is before icon
    headerDiv.innerHTML = theme_title;
    headerDiv.appendChild(icon);
    var badgeSpan = document.createElement("span");
    badgeSpan.className = "new badge blue";
    badgeSpan.innerHTML = new_items;
    headerDiv.appendChild(badgeSpan);

    var path_list = document.createElement("div");
    path_list.className = "collapsible-body";
    var path_collection = document.createElement("ul");
    path_collection.id = theme_title + "_paths";
    path_collection.className = "collection";
    path_list.appendChild(path_collection);
// This will give an id to search for when adding paths
    new_theme_list.appendChild(path_list);

// Bug : Collapse is done upside
    new_theme_list.appendChild(headerDiv);
    themes_list.appendChild(new_theme_list);
}
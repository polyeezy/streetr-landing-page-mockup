
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
    return {
        'screenshot1' : getPathDirectory(path_id) + '/screenshot1.jpg',
        'screenshot2' : getPathDirectory(path_id) + '/screenshot2.jpg',
        'screenshot3' : getPathDirectory(path_id) + '/screenshot3.jpg'
    }
}

function getPathPreview(path_id){
    return getPathDirectory(path_id) + '/preview.png';
}

function createPath(path_id, active) {
    active = active || false;


    $.getJSON(getPathData(path_id))
        .then(function (data) {

            console.log(data);

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
            console.log('error')
        });


}

function active_path(id){
    $('.path').removeClass('active');
    $('#' + id).addClass('active');
    update_sliders(id);
}

function update_sliders(id){
    $('.slider').remove();

    var screens = getPathScreenshots(id);

    var myvar = '   <div class="slider">\n' +
        '            <ul class="slides"><li class="streetr-slide">'+
        '    <img src="'+ screens.screenshot1+'"> <!-- random image -->'+
        '    <div class="caption center-align card">'+
        '        <h3 class="black-text">Illustration vieil homme sur facade</h3>'+
        '    <h5 class="light blue-text white">On remarque sur la facade d\'un mur à gauche le portrait d\'un vieil homme.</h5>'+
        '    </div>'+
        '    </li>'+
        '    <li class="streetr-slide">'+
        '    <img src="'+ screens.screenshot2 +'"> <!-- random image -->'+
        '    <div class="caption center-align card">'+
        '        <h3 class="black-text">illustration oiseau facade</h3>'+
        '    <h5 class="light blue-text white">Si vous êtes placé vers le parking de taxis, en faisant face au rond point, vous remarquerez l\'illustration d\'un oiseau sur la facade en fond.</h5>'+
        '    </div>'+
        '    </li>'+
        '    <li class="streetr-slide">'+
        '    <img src="'+ screens.screenshot3+'"> <!-- random image -->'+
        '    <div class="caption center-align card">'+
        '        <h3 class="black-text">Free wall</h3>'+
        '    <h5 class="light blue-text white">Aprés avoir déscendu la première session d\'escaliers, sur votre gauche, sous l\'arc, se trouve un mur dédié au graffiti.</h5>'+
        '    </div>'+
        '    </li>'+
        '    <li class="streetr-slide">'+
        '    <img src="assets/Paths/street-art/street-art_1/preview.png"> <!-- random image -->'+
        '    <div class="caption center-align card">'+
        '        <h3 class="black-text">À vous de jouer!</h3>'+
        '    <p>       <a class="waves-effect waves-light blue btn-large">'+
        '        <i class="material-icons right">send</i>'+
        '    Envoyer ce trajet sur mon téléphone'+
        '    </a></p>'+
        '    </div>'+
        '    </li>    </ul>\n' +
        '        </div>';

    $('.theme_container').append(myvar);
    $('.slider').slider();

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
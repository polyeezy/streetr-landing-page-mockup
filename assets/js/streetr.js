
var PATHS_DIRECTORY = 'assets/Paths/';
var THEME_ID = 'street-art';



createPath('1', true);
createPath('1', false);

function openJson(json){
    $.getJSON( pathPath, function( data ) {
        createPath(theme, data);
    });
}

function getPathDirectory(path_id){
    return (PATHS_DIRECTORY + THEME_ID + '/' + THEME_ID + '_' + path_id);
}

function getPathData(path_id) {
    return PATHS_DIRECTORY + THEME_ID + '/' + THEME_ID + '_' + path_id + '/' + THEME_ID + '_' + path_id + '_data.json';
}

function getPathScreenshots(path_id){
    return {
        'screenshot1' : getPathDirectory(path_id) + '/screenshot1.png',
        'screenshot2' : getPathDirectory(path_id) + '/screenshot2.png',
        'screenshot3' : getPathDirectory(path_id) + '/screenshot3.png'
    }
}

function getPathPreview(path_id){
    return getPathDirectory(path_id) + '/preview.png';
}

function createPath(path_id, active){
    active = active || false;
    $.getJSON(getPathData(path_id), function( data ) {

        var path = active ? '<a id="'+path_id+'" href="#!" class="path collection-item avatar active">' : '<a id="'+path_id+'" href="#!" class="path collection-item avatar">';
        path += '<span class="title">'+data.name + '</span>';
        path += '<p class="title">'+data.description + '</p>';

        path += '</a>';


        $('.' + THEME_ID).append(path);
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
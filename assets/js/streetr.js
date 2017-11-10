/*var data = {
  themes [
    {
      name Street-art,
      description  description,
      material_icon  create,
      paths [
        {
          name Path name,
          description desc,
          google_map_screenshot pathtoscreenshot,
          steps [
            {
              address Address,
              comment comment,
              screenshot pathtoscreenshot
            }
          ]
        }
      ]
    }
  ]
};
*/

//Parse JSon here

createThemeTitle("Settings", "arrow_forward", "1");
addPathToTheme("Settings", "test_path", "creator");
addPathToTheme("Settings", "test_path2", "creator2");


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
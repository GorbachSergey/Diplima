import { sendRequest } from "./request.js";
document.addEventListener("DOMContentLoaded", DOMLoaded);

let sidebar = document.getElementById("sidebar");
let toggleButton = document.getElementById("sidebarCollapse");
toggleButton.addEventListener("click", toggleSideBar);
let sidebarMenu = document.getElementById("sidebarMenu");
sidebarMenu.addEventListener("click", onSidebarMenuClick);

function DOMLoaded() {
    sendRequest("GET", "institut").then(instituts => {
        displayInstitutList(instituts);
        document.getElementsByClassName("loader")[0].remove();
    });
}

function displayInstitutList(instituts) {
    let menu = document.getElementById("sidebarMenu");
    instituts.forEach(element => {
        let item = getMenuItem("institut", element);
        menu.appendChild(item);
    });
}

function displaySpecialtyList(institut, specialties) {
    let ul = document.createElement("ul");
    ul.className = "list-unstyled";
    ul.id = institut.dataset.type + institut.dataset.id;
    specialties.forEach(element => {
        let item = getMenuItem("specialty", element);
        ul.appendChild(item);
    });
    institut.after(ul);
}

function getMenuItem(href, item) {
    let li = document.createElement("li");
    li.innerHTML = `<a href="#${href}${item.id}" data-type="${href}" data-id="${item.id}" data-toggle="collapse" aria-expanded="false" class="dropdown-toggle">${item.name}</a>`;
    return li;
}

function onSidebarMenuClick(event) {
    let target = event.target;
    if (target.hasAttribute("aria-expanded")) {
        let visible = target.getAttribute("aria-expanded");
        if (visible == "false") {
            let loader = document.createElement("div");
            loader.className = "loader";
            target.after(loader);
            let loadType = null;
            switch (target.dataset.type) {
                case "institut":
                    loadType = "specialty";
                    break;
            }

            sendRequest("GET", `${loadType}?id=${target.dataset.id}`).then(result => {
                displaySpecialtyList(target, result);
            //displayInstitutList(instituts);
            //document.getElementsByClassName("loader")[0].remove();
            });
        
        } else {
            let loader = document.getElementsByClassName("loader");
            loader[0].remove();
        }
    }
}

function toggleSideBar() {
    sidebar.classList.toggle("active");
}

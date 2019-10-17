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
    ul.className = "submenu";
    ul.id = institut.dataset.type + institut.dataset.id;
    specialties.forEach(element => {
        let item = getMenuItem("specialty", element);
        ul.appendChild(item);
    });
    institut.appendChild(ul);
}

function getMenuItem(type, item) {
    let li = document.createElement("li");
    li.setAttribute("aria-expanded", "false");
    li.setAttribute("data-type", type);
    li.setAttribute("data-id", item.id);
    li.innerHTML = item.name;
    return li;
}

function onSidebarMenuClick(event) {
    let target = event.target;
    if (target.hasAttribute("aria-expanded")) {
        let visible = target.getAttribute("aria-expanded");
        if (visible == "false") {
            target.setAttribute("aria-expanded", "true");
            if (target.firstElementChild) {
                target.firstElementChild.style.display = "";
            } else {
                let loadType = null;
                switch (target.dataset.type) {
                    case "institut":
                        loadType = "specialty";
                        break;
                }

                sendRequest("GET", `${loadType}?id=${target.dataset.id}`).then(
                    result => {
                        displaySpecialtyList(target, result);
                        //displayInstitutList(instituts);
                        //document.getElementsByClassName("loader")[0].remove();
                    }
                );
            }
        } else {
            target.setAttribute("aria-expanded", "false");
            target.firstElementChild.style.display = "none";
        }
    }
}

function toggleSideBar() {
    sidebar.classList.toggle("active");
}

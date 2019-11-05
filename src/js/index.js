import { sendRequest } from './request.js';
document.addEventListener('DOMContentLoaded', DOMLoaded);

const USER = 'guest';
let sidebar = document.getElementById('sidebar');
let toggleButton = document.getElementById('sidebarCollapse');
toggleButton.addEventListener('click', toggleSideBar);
let sidebarMenu = document.getElementById('sidebarMenu');
sidebarMenu.addEventListener('click', onSidebarMenuClick);
let table = document.getElementById('table_content');

function DOMLoaded() {
    sendRequest('GET', 'institut').then(instituts => {
        displayInstitutList(instituts);
    });
}

function displayInstitutList(instituts) {
    let menu = document.getElementById('sidebarMenu');
    instituts.forEach(element => {
        let item = getMenuItem('institut', element);
        menu.appendChild(item);
    });
}

// function displaySpesialtyList(institut, speciaties){
//     let ul = document.createElement("ul");
//     ul.className = "submenu";
//     ul.id = institut.dataset.type + institut.dataset.id;
//     items.forEach(element => {
//         let item = getMenuItem(loadType, element);
//         ul.appendChild(item);
//     });
//     menu.appendChild(ul);
// }

function displaySubMenu(menu, items, loadType) {
    let ul = document.createElement('ul');
    ul.className = 'submenu';
    ul.id = menu.dataset.type + menu.dataset.id;
    ul.setAttribute('data-parentId', menu.dataset.id);
    items.forEach(element => {
        let item = getMenuItem(loadType, element);
        ul.appendChild(item);
    });
    menu.appendChild(ul);
}

function displayCourses(menu) {
    let courses = ['1 курс', '2 курс', '3 курс', '4 курс', 'Магістр'];
    let ul = document.createElement('ul');
    ul.className = 'submenu';
    ul.id = menu.dataset.type + menu.dataset.id;
    ul.setAttribute('data-parentId', menu.dataset.id);
    for (let i = 1; i <= courses.length; i++) {
        let item = getMenuItem('course', { id: i, name: courses[i - 1] });
        ul.appendChild(item);
    }
    menu.appendChild(ul);
}

function getMenuItem(type, item) {
    let li = document.createElement('li');
    // li.className = "menu_item";
    li.setAttribute('aria-expanded', 'false');
    li.setAttribute('data-type', type);
    li.setAttribute('data-id', item.id);
    if (type == 'specialty') {
        li.innerHTML = `${item.code}-${item.name}`;
    } else {
        li.innerHTML = item.name;
    }
    return li;
}

function onSidebarMenuClick(event) {
    let target = event.target;
    let url = '';
    if (target.hasAttribute('aria-expanded')) {
        let visible = target.getAttribute('aria-expanded');
        if (visible == 'false') {
            target.setAttribute('aria-expanded', 'true');
            if (target.firstElementChild) {
                target.firstElementChild.style.display = '';
            } else {
                let loadType = null;
                switch (target.dataset.type) {
                    case 'institut':
                        loadType = 'specialty';
                        url = `${loadType}?id=${target.dataset.id}`;
                        break;
                    case 'specialty':
                        loadType = 'course';
                        displayCourses(target);
                        return;
                        break;
                    case 'course':
                        loadType = 'group';
                        let specId = target.parentElement.dataset.parentid;
                        url = `${loadType}?specId=${specId}&course=${target.dataset.id}`;
                        break;
                    case 'group':
                        loadType = 'subject';
                        url = `${loadType}?groupId=${target.dataset.id}`;
                        break;
                    case 'subject':
                        loadType = 'student';
                        let groupId = target.parentElement.dataset.parentid;
                        url = `${loadType}?groupId=${groupId}&subjectId=${target.dataset.id}`;
                        break;
                }

                sendRequest('GET', url).then(result => {
                    if (loadType === 'student') {
                        showStudentsList(result, target.dataset.id);
                    } else {
                        displaySubMenu(target, result, loadType);
                    }
                    //displayInstitutList(instituts);
                    //document.getElementsByClassName("loader")[0].remove();
                });
            }
        } else {
            target.setAttribute('aria-expanded', 'false');
            target.firstElementChild.style.display = 'none';
        }
    }
}

function showStudentsList(students, subjectId) {
    table.tHead.innerHTML = '';
    table.tBodies[0].innerHTML = '';
    table.tHead.appendChild(getTableHead());
    table.setAttribute('data-subject_id', subjectId);
    students.forEach(student => {
        let tr = getTabelRow(student, subjectId);
        table.tBodies[0].appendChild(tr);
    });
}

function getTableHead() {
    let tr = document.createElement('tr');
    let thLastName = document.createElement('th');
    thLastName.innerHTML = 'Прізвище';
    tr.appendChild(thLastName);
    let thFirstName = document.createElement('th');
    thFirstName.innerHTML = "Ім'я";
    tr.appendChild(thFirstName);
    let thMiddleName = document.createElement('th');
    thMiddleName.innerHTML = 'По батькові';
    tr.appendChild(thMiddleName);
    let thMark = document.createElement('th');
    thMark.innerHTML = 'Оцінка';
    tr.appendChild(thMark);
    let thPass = document.createElement('th');
    thPass.innerHTML = 'Н/б';
    tr.appendChild(thPass);
    return tr;
}

function getTabelRow(student, subjectId) {
    let tr = document.createElement('tr');
    tr.setAttribute('data-student_id', student.student_id);
    let tdLastName = document.createElement('td');
    tdLastName.innerHTML = student.lastName;
    tr.appendChild(tdLastName);
    let tdFirstName = document.createElement('td');
    tdFirstName.innerHTML = student.firstName;
    tr.appendChild(tdFirstName);
    let tdMiddleName = document.createElement('td');
    tdMiddleName.innerHTML = student.middleName;
    tr.appendChild(tdMiddleName);
    let tdMark = document.createElement('td');
    tdMark.className = 'mark';
    let tdPass = document.createElement('td');
    tdPass.className = 'pass';

    for (let i = 0; i < student.marks.length; i++) {
        if (student.marks[i].subject_id == subjectId) {
            tdMark.innerHTML = student.marks[i].mark;
            tdPass.innerHTML = student.marks[i].pass;
            break;
        }
    }
    tr.appendChild(tdMark);
    tr.appendChild(tdPass);

    return tr;
}

function toggleSideBar() {
    sidebar.classList.toggle('active');
}

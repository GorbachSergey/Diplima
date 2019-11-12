import { sendRequest } from './request.js';
document.addEventListener('DOMContentLoaded', DOMLoaded);

let USER = null;
if (localStorage.getItem('token')) {
    USER = {
        name: localStorage.getItem('user'),
        id: localStorage.getItem('user_id'),
        token: localStorage.getItem('token')
    };
}

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
                        url = `${loadType}?groupId=${groupId}`;
                        break;
                }

                sendRequest('GET', url).then(result => {
                    if (loadType === 'student') {
                        showStudentsList(result, target.dataset.id);
                    } else {
                        displaySubMenu(target, result, loadType);
                    }
                });
            }
        } else {
            target.setAttribute('aria-expanded', 'false');
            target.firstElementChild.style.display = 'none';
        }
    }
}

async function showStudentsList(students, subjectId) {
    let permission = false;
    table.tHead.innerHTML = '';
    table.tBodies[0].innerHTML = '';
    if (USER) {
        let data = await checkTeacherPermission(subjectId);
        permission = data.permission;
    }
    table.tHead.appendChild(getStudentsTableHead(permission));
    table.setAttribute('data-subject-id', subjectId);
    students.forEach(student => {
        let tr = getTabelRow(student, subjectId, permission);
        table.tBodies[0].appendChild(tr);
    });
}

async function checkTeacherPermission(subjectId) {
    let body = { teacherId: USER.id, subjectId: subjectId };
    let result = await sendRequest('POST', 'teacher/check', body);
    return result;
}

function getStudentsTableHead(permission) {
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
    if (permission) {
        let thAction = document.createElement('th');
        thAction.innerHTML = 'Операції';
        thAction.setAttribute('colspan', 2);
        tr.appendChild(thAction);
    }
    return tr;
}

function getTabelRow(student, subjectId, permission) {
    let tr = document.createElement('tr');
    tr.setAttribute('data-student-id', student.student_id);
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

    if (permission) {
        let inputMark = document.createElement('input');
        inputMark.type = 'text';
        inputMark.className = 'input';
        tdMark.appendChild(inputMark);
        let inputPass = document.createElement('input');
        inputPass.type = 'text';
        inputPass.className = 'input';
        tdPass.appendChild(inputPass);
    }

    for (let i = 0; i < student.marks.length; i++) {
        if (student.marks[i].subject_id == subjectId) {
            if (permission) {
                tdMark.firstElementChild.value = student.marks[i].mark;
                tdPass.firstElementChild.value = student.marks[i].pass;
            } else {
                tdMark.innerHTML = student.marks[i].mark;
                tdPass.innerHTML = student.marks[i].pass;
            }
            break;
        }
    }
    tr.appendChild(tdMark);
    tr.appendChild(tdPass);

    if (permission) {
        let tdAdd = document.createElement('td');
        tdAdd.className = 'table-button-container';
        tdAdd.innerHTML =
            "<button title='Зберегти' type='button' class='table-button add-btn'><img class='table-button-icon' alt='' src='../images/save.png'> </button>";
        tr.appendChild(tdAdd);
        let tdClean = document.createElement('td');
        tdClean.className = 'table-button-container';
        tdClean.innerHTML =
            "<button title='Очистити' type='button' class='table-button clean-btn'><img class='table-button-icon' alt='' src='../images/clean.png'> </button>";
        tr.appendChild(tdClean);
    }

    return tr;
}

function toggleSideBar() {
    sidebar.classList.toggle('active');
}

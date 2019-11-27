let loginForm = document.forms.loginForm;
loginForm.addEventListener("submit", login);
let guestLogin = document.getElementById('guestBtn');
guestLogin.addEventListener('click', event => {
    localStorage.removeItem('user_data');
    document.location.href = window.location.origin + "/src/public/index.html";
});

function login(event) {
    event.preventDefault();
    let data = {
        login: loginForm.elements.login.value,
        password: loginForm.elements.password.value
    };

    fetch(`http://localhost:3000/teacher/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })
        .then(res => {
            if(res.ok)
                return res.json();
            else{
                throw new Error('Error');
            }
        })
        .then(data => {
            localStorage.setItem('user_data', JSON.stringify(data));
            document.location.href = window.location.origin + "/src/public/index.html";
        }).catch(err => {
            displayError();
        });
}

function displayError(){
    let error = document.getElementsByClassName('error')[0];
    error.style.display = 'block';
    error.innerHTML = 'Логін або пароль введено не вірно! Спробуйте ще раз.'
}
let loginForm = document.forms.loginForm;
loginForm.addEventListener("submit", login);

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
        .then(res => res.json())
        .then(data => {
            localStorage.setItem('token', data.token);
            document.location.href = window.location.origin + "/src/public/index.html";
        });
}

export async function sendRequest(method, url, body) {
    let response;
    if (method == "GET") {
        response = await fetch(`http://localhost:3000/${url}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            }
        });
    } else {
        response = await fetch(`http://localhost:3000/${url}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " +  JSON.parse(localStorage.getItem('user_data')).token
            },
            body: JSON.stringify(body)
        });
    }

    if (response.ok) {
        let data = await response.json();
        return await Promise.resolve(data);
    } else {
        return await Promise.reject("error");
    }
}

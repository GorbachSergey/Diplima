export async function sendRequest(method, url, body) {
    //return new Promise(function(resolve, reject) {
    let response;
    if (method == "GET") {
        response = await fetch(`http://localhost:3000/${url}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + localStorage.getItem('token')
            }
        });
    } else {
        response = await fetch(`http://localhost:3000/${url}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " +  localStorage.getItem('token')
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

let status = document.getElementById('status')


addEventListener("submit", (event => {
    event.preventDefault();

    let ssid = document.getElementById("ssid").value
    let password = document.getElementById("password").value

    let data = {
        ssid: document.getElementById("ssid").value,
        password: document.getElementById("password").value
    }

    console.log(data);

    fetch('wifi_submit', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },

        body: JSON.stringify(data)
    })
}))
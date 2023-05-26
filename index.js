document.getElementById("myForm").addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent form from submitting
    sendData();
});


function sendData() {
    var name = document.getElementById("name").value;
    var email = document.getElementById("email").value;

    var data = {
        "name": name,
        "email": email
    }

    localStorage.setItem("UserData", JSON.stringify(data));

    var xhr = new XMLHttpRequest();
    xhr.open("POST", 'http://localhost:3000/process-form', true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

    xhr.onreadystatechange = function () {
        if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
            // Redirect to the new page
            window.location.href = "data.html";
        }
    };

    // Prepare the data to be sent
    var data = "name=" + encodeURIComponent(name) + "&email=" + encodeURIComponent(email);

    // Send the request
    xhr.send(data);
}
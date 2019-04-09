let forget_button = document.getElementById("forget");
let login_div2 = document.getElementById("login");


forget_button.addEventListener("click", (event) => {
    event.preventDefault();
    forget()

})



function forget() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200||this.status == 204) {
            if (this.response) {
                document.getElementById("wrong").style.display = "none"
                document.getElementById("error").style.display = "none"
                document.getElementById("done").style.display = "table"
                
              }
              else {
                document.getElementById("wrong").style.display = "none"
                document.getElementById("done").style.display = "none"
                document.getElementById("error").style.display = "table"
              }
        }
    };
    xhttp.open("POST", "http://127.0.0.1:3000/users/forgot");
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send(JSON.stringify({
        email: login_div2.getElementsByTagName("input")[0].value
    }))
};
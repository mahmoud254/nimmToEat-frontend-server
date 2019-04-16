let signup_div = document.getElementById("signup");
let signup_button = signup_div.getElementsByTagName("button")[0];
let user_image


signup_button.addEventListener("click", (event) => {
    event.preventDefault();
    let password = signup_div.getElementsByTagName("input")[3].value;
    let repassword = signup_div.getElementsByTagName("input")[4].value;
    if (password === repassword) {
        request_response();
    }

})



function request_response() {


    // fetch("http://192.168.1.90:5000/admin", {
    //     method: 'post',
    //     headers: {
    //       "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
    //     },
    //     body: JSON.stringify({
    //             first_name: signup_div.getElementsByTagName("input")[0].value,
    //             last_name: signup_div.getElementsByTagName("input")[1].value,
    //             email: signup_div.getElementsByTagName("input")[2].value,
    //             password: signup_div.getElementsByTagName("input")[3].value
    //         })
    //   })
    //   .then(json)
    //   .then(function (data) {
    //     console.log('Request succeeded with JSON response', data);
    //   })
    //   .catch(function (error) {
    //     console.log('Request failed', error);
    //   });

    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200 || this.status == 204) {
            if (this.response) {
                let response = JSON.parse(this.response)
                localStorage.setItem("userId", response.user_id)
                console.log(user_image)
                // window.location.href = "./index.html";
            }
            else {
                document.getElementById("emailSignup").value = ""
                document.getElementById("passwordSignup").value = ""
                document.getElementById("repasswordSignup").value = ""
                document.getElementById("wrong2").style.display = "table"
            }
        }
    };
    xhttp.open("POST", "http://127.0.0.1:3000/users/signup");
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send(JSON.stringify({
        first_name: signup_div.getElementsByTagName("input")[0].value,
        last_name: signup_div.getElementsByTagName("input")[1].value,
        email: signup_div.getElementsByTagName("input")[2].value,
        password: md5(signup_div.getElementsByTagName("input")[3].value).toLowerCase(),
        image:user_image
    })
    )
};

// console.log(JSON.parse(Object.keys(req.body)[0]).first_name)
let uploadButtons = document.getElementsByClassName("uploadImage")
uploadButtons[0].addEventListener('change', function (event) {
    let files = event.target.files;
    var file = files[0];
    var reader = new FileReader();
    reader.onloadend = function () {
        user_image = reader.result
    }
    reader.readAsDataURL(file);
})
let friends_div = document.getElementsByClassName("thumbnails")[1]
let friend_div = document.getElementById("friend_div")
let add_friendBtn = document.getElementById("addFriendBtn")
let orderMembersArr = []
let publishBtn=document.getElementById("publish")

let menu_image
publishBtn.addEventListener("click",(evt)=>{
publish();
})
function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}
add_friendBtn.addEventListener("click", (evt) => {
    let textArea = document.getElementsByTagName("textarea")[1]
    let emailOrGroup = textArea.value
    if (validateEmail(emailOrGroup))
        getFriend(emailOrGroup)
    else {
        getFriends(emailOrGroup)
    }
})


function listFriends(orderMembersArr) {
    orderMembersArr.forEach(friend => {
        let div = document.createElement("div")
        //rate(div)
        friends_div.appendChild(div)
        div.innerHTML = friend_div.innerHTML
        div.setAttribute("class", "box")
        div .setAttribute("style","width:25%")
        div.getElementsByTagName("h3")[0].innerText = friend.name
        // div.getElementsByTagName("h3")[1].innerText=book.author_id.first_name
        div.style.display = true
        // add event listeners to send you to author page
        div.getElementsByTagName('button')[0].addEventListener('click', () => {
            Removefriend(friend.id,div)
        })

        let friendImage = div.getElementsByTagName("img")[0]
        // getImage(friend.picture,friendImage)

    });
}


function getFriend(email) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            let response = JSON.parse(this.response)
            let condition=orderMembersArr.filter((elem)=>{
                return elem.id==response.id
            })
            if (condition.length==0){    
            orderMembersArr.push(response)}
            friends_div.innerHTML=""
            listFriends(orderMembersArr)
        }
    };
    xhttp.open("POST", `http://127.0.0.1:3000/orders/${localStorage.getItem("userId")}/getfriend`);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send(JSON.stringify({
        email: email
    }))
};

function getFriends(group) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            let response = JSON.parse(this.response)
            response.forEach(friend => {
                let condition=orderMembersArr.filter((elem)=>{
                    return elem.id==friend.member_id
                })
                if (condition.length==0){
                orderMembersArr.push({ id: friend.member_id, name: friend.name })}
                
            }
            )
            friends_div.innerHTML=""
            listFriends(orderMembersArr)
        }
    };
    xhttp.open("POST", `http://127.0.0.1:3000/orders/${localStorage.getItem("userId")}/getmembers`);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send(JSON.stringify({
        group_name: group
    }))
};


function Removefriend(id,div){
    orderMembersArr=orderMembersArr.filter((elem)=>{
        return elem.id!=id
    })
    div.remove()
};



function publish() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            let response = JSON.parse(this.response)
            console.log("done")
        }
    };
    let meal=document.getElementsByTagName("span")[1].innerText
    let restaurant_name=document.getElementsByTagName("textarea")[0].value
    let creator_id=localStorage.getItem("userId")
    
    xhttp.open("POST", `http://127.0.0.1:3000/orders`);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send(JSON.stringify({
        meal: meal,
        restaurant_name: restaurant_name,
        status: "invited",
        creator_id: creator_id,
        menu_image: menu_image,
        ordermembers:orderMembersArr
    }))
};



let uploadButtons=document.getElementsByClassName("uploadImage")
uploadButtons[0].addEventListener('change', function(event) {
  let files = event.target.files;
  var file = files[0];
  var reader = new FileReader();
  reader.onloadend = function() {
    menu_image=reader.result
  }
  reader.readAsDataURL(file);
})


let friends_div = document.getElementsByClassName("thumbnails")[1]
let friend_div = document.getElementById("friend_div")
let add_friendBtn=document.getElementById("addFriendBtn")
window.addEventListener("load", (evt) => {
  listFriends();
})
add_friendBtn.addEventListener("click",(evt)=>{
  let textArea = document.getElementsByTagName("textarea")[0]
  let email = textArea.value
  addFriend(email)
})



function listFriends() {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      let response = JSON.parse(this.response)
      response.forEach(friend => {
        let div = document.createElement("div")
        //rate(div)
        friends_div.appendChild(div)
        div.innerHTML = friend_div.innerHTML
        div.setAttribute("id", friend.friend_id)
        div.setAttribute("class", "box")
        div.getElementsByTagName("h3")[0].innerText = friend.name
        // div.getElementsByTagName("h3")[1].innerText=book.author_id.first_name
        div.getElementsByTagName('button')[0].setAttribute('id', friend.friend_id)

        // add event listeners to send you to author page
        div.getElementsByTagName('button')[0].addEventListener('click', () => {
          unfriend(friend.friend_id)
        })

        let friendImage=div.getElementsByTagName("img")[0]
        // getImage(friend.picture,friendImage)
      });
    }
  };
  xhttp.open("GET", `http://127.0.0.1:3000/friends/${localStorage.getItem("userId")}`);
  xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xhttp.send()
};

function addFriend(email) {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200||this.status == 204) {
      if (this.response){
        window.location.reload()
      }
    }
  };
  xhttp.open("post", "http://127.0.0.1:3000/friends");
  xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xhttp.send(JSON.stringify({
    user_id:localStorage.getItem("userId"),
    email:email
  }))
};


function unfriend(id) {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200||this.status == 204) {
      if (this.response){
        window.location.reload()
      }
    }
  };
  xhttp.open("post", `http://127.0.0.1:3000/friends/${id}/delete`);
  xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xhttp.send(JSON.stringify({
    user_id:localStorage.getItem("userId")
  }))
};

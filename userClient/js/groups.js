let groups_div = document.getElementsByClassName("thumbnails")[1]
let group_div = document.getElementById("group_div")
let friends_div = document.getElementsByClassName("thumbnails")[2]
let friend_div = document.getElementById("friend_div")
let add_friendBtn=document.getElementById("addFriendBtn")
let add_groupBtn=document.getElementById("addGroupBtn")
window.addEventListener("load", (evt) => {
  listGroups();
})
add_friendBtn.addEventListener("click",(evt)=>{
  let textArea = document.getElementsByTagName("textarea")[1]
  let email = textArea.value
  addMember(email)
})

add_groupBtn.addEventListener("click",(evt)=>{
  let textArea = document.getElementsByTagName("textarea")[0]
  let name = textArea.value
  addGroup(name)
})

function listGroups() {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      let response = JSON.parse(this.response)
      response.forEach(group => {
        let div = document.createElement("div")
        //rate(div)
        groups_div.appendChild(div)
        div.innerHTML = group_div.innerHTML
        div.setAttribute("id", group.group_id)
        div.setAttribute("class", "box")
        div.getElementsByTagName("h3")[0].innerText = group.name
        // div.getElementsByTagName("h3")[1].innerText=book.author_id.first_name
        div.style.display = true
        div.getElementsByTagName('button')[0].setAttribute('id', group.group_id)

        // add event listeners to send you to author page
        div.getElementsByTagName('button')[0].addEventListener('click', () => {
          Remove(group.group_id)
        })
        div.getElementsByTagName('button')[1].addEventListener('click', () => {
          listGroupMembers(group.group_id)
        })
        let groupImage=div.getElementsByTagName("img")[0]
        // getImage(friend.picture,friendImage)
      });
    }
  };
  xhttp.open("GET", `http://127.0.0.1:3000/groups/${localStorage.getItem("userId")}`);
  xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xhttp.send()
};


function listGroupMembers(id) {
  localStorage.setItem("groupId",id)
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
        div.style.display = true
        // add event listeners to send you to author page
        div.getElementsByTagName('button')[0].addEventListener('click', () => {
          RemoveFromGroup(friend.friend_id)
        })
        let friendImage=div.getElementsByTagName("img")[0]
        friends_div.style.display= true
        // getImage(friend.picture,friendImage)
      });
    }
  };
  xhttp.open("POST", `http://127.0.0.1:3000/groups/${id}`);
  xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xhttp.send(SON.stringify({
    user_id:localStorage.getItem("userId"),
  }))
};

function addGroup(name) {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200||this.status == 204) {
      if (this.response){
        window.location.reload()
      }
    }
  };
  xhttp.open("post", `http://127.0.0.1:3000/groups`);
  xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xhttp.send(JSON.stringify({
    user_id:localStorage.getItem("userId"),
    name:name
  }))
};

function addMember(email) {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200||this.status == 204) {
      if (this.response){
        window.location.reload()
      }
    }
  };
  xhttp.open("post", `http://127.0.0.1:3000/groups/${localStorage.getItem("groupId")}`);
  xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xhttp.send(JSON.stringify({
    user_id:localStorage.getItem("userId"),
    email:email
  }))
};


function Remove(id) {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200||this.status == 204) {
      if (this.response){
        window.location.reload()
      }
    }
  };
  xhttp.open("post", `http://127.0.0.1:3000/groups/${id}/delete`);
  xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xhttp.send(JSON.stringify({
    user_id:localStorage.getItem("userId")
  }))
};

function RemoveFromGroup(id) {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200||this.status == 204) {
      if (this.response){
        window.location.reload()
      }
    }
  };
  xhttp.open("post", `http://127.0.0.1:3000/groups/members/${id}/delete`);
  xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xhttp.send(JSON.stringify({
    user_id:localStorage.getItem("userId"),
    group_id:localStorage.getItem("groupId")
  }))
};
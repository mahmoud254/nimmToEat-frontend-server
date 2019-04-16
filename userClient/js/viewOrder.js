
// When the user clicks on div, open the popup
function myFunction() {
    var popup = document.getElementById("myPopup");
    popup.classList.toggle("show");
}

function myFunction2() {
    var popup = document.getElementById("myPopup2");
    popup.classList.toggle("show");
}
function myFunction3() {
    var popup = document.getElementById("myPopup3");
    popup.classList.toggle("show");
}
document.getElementsByClassName("popup2")[0].addEventListener("click", (evt) => {
    document.getElementById("myPopup").style.display = "none"
    document.getElementById("myPopup2").style.display = "none"
    document.getElementById("myPopup3").style.display = "block"
    myFunction3()
})
document.getElementsByClassName("popup")[0].addEventListener("click", (evt) => {
    document.getElementById("myPopup2").style.display = "none"
    document.getElementById("myPopup3").style.display = "none"
    document.getElementById("myPopup").style.display = "block"
    myFunction()
})

document.getElementsByClassName("popup")[1].addEventListener("click", (evt) => {
    document.getElementById("myPopup3").style.display = "none"
    document.getElementById("myPopup").style.display = "none"
    document.getElementById("myPopup2").style.display = "block"
    myFunction2()
})



let orders_table = document.getElementById("mytable")
let order_row = document.getElementById("order_div")
let add_orderBtn = document.getElementById("addOrderBtn")
let input_div = document.getElementById("input")
let addItemBtn = document.getElementById("addItem")
let joined_div = document.getElementsByClassName("thumbnails")[2]
let invited_div = document.getElementsByClassName("thumbnails")[1]
let friend_div = document.getElementById("friend_div")
window.addEventListener("load", (evt) => {
    listDetails();
    getImage()
})

addItemBtn.addEventListener("click", (evt) => {
    addItem()
})
function listDetails() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            let response = JSON.parse(this.response)
            console.log(response)
            response.forEach(member => {
                if (member.status=="accepted"){
                let row = document.createElement("tr")
                orders_table.appendChild(row)
                row.innerHTML = order_row.innerHTML
                row.style.textAlign = "center"
                row.getElementsByTagName('button')[0].addEventListener('click', () => {
                    deleteOrder(member.id)
                })
                row.getElementsByTagName("td")[0].innerText = member.name
                row.getElementsByTagName("td")[1].innerText = member.item
                row.getElementsByTagName("td")[2].innerText = member.amount
                row.getElementsByTagName("td")[3].innerText = member.price
                row.getElementsByTagName("td")[4].innerText = member.comment

                let div = document.createElement("div")
                invited_div.appendChild(div)
                div.innerHTML = friend_div.innerHTML
                div.setAttribute("class", "box")
                div.getElementsByTagName("h3")[0].innerText = member.name
                // div.getElementsByTagName("h3")[1].innerText=book.author_id.first_name
                // add event listeners to send you to author page
                div.getElementsByTagName('button')[0].addEventListener('click', () => {
                removeMember(member.member_id)
                })
            }
////////////////////////joined list
            else{
                let div = document.createElement("div")
                joined_div.appendChild(div)
                div.innerHTML = friend_div.innerHTML
                div.setAttribute("class", "box")
                div.getElementsByTagName("h3")[0].innerText = member.name
                // div.getElementsByTagName("h3")[1].innerText=book.author_id.first_name
                // add event listeners to send you to author page
                div.getElementsByTagName('button')[0].addEventListener('click', () => {
                removeMember(member.member_id)
                })
            }
            });
        }
    };
    xhttp.open("GET", `http://127.0.0.1:3000/orders/${localStorage.getItem("orderId")}`);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send()
};


function deleteOrder(id) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            let response = JSON.parse(this.response)
            window.location.reload()
        }
    };
    xhttp.open("get", `http://127.0.0.1:3000/orders/${id}/deleteItem`);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send()
};
function removeMember(id) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            let response = JSON.parse(this.response)
            window.location.reload()
        }
    };
    xhttp.open("get", `http://127.0.0.1:3000/orders/${localStorage.getItem("orderId")}/removeMember/${id}`);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send()
};



function addItem() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            let response = JSON.parse(this.response)
            window.location.reload()
        }
    };
    xhttp.open("POST", `http://127.0.0.1:3000/orders/${localStorage.getItem("orderId")}/add_item`);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send(JSON.stringify({
        member_id: localStorage.getItem("userId"),
        item: input_div.getElementsByTagName("input")[0].value,
        amount: document.getElementsByTagName("span")[1].innerText,
        price: document.getElementsByTagName("span")[2].innerText,
        comment: input_div.getElementsByTagName("input")[1].value
    }))
};



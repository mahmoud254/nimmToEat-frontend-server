let latest_orders_div = document.getElementById("latest_orders")
let order_div = document.getElementById("order_div")

let friends_activity_div = document.getElementById("friends_activity")
let activity_div = document.getElementById("activity_div")

window.addEventListener("load", (evt) => {
    listLatestOrders();
    listFriendsActivity()
})

function listLatestOrders() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            let response = JSON.parse(this.response)
            console.log(response)
            response.forEach(order => {
                let order_elem = document.createElement("div")
                latest_orders_div.appendChild(order_elem)
                order_elem.innerHTML = order_div.innerHTML
                order_elem.style.textAlign = "center"
                order_elem.getElementsByTagName('button')[0].addEventListener('click', () => {
                    window.location.href = "./orderlist.html?orderId?"+ order.id
                })
                order_elem.getElementsByTagName("h3")[0].innerText=order.meal
                order_elem.getElementsByTagName("h3")[1].innerText=order.created_at
                // order_elem.getElementsByTagName("td")[3].innerText=order.joined
                // order_elem.getElementsByTagName("td")[4].innerText=order.status
            });
        }
    };
    xhttp.open("POST", `http://127.0.0.1:3000/orders/latest`);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send(JSON.stringify({
        user_id: localStorage.getItem("userId"),
    }))
};

function listFriendsActivity() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            let response = JSON.parse(this.response)
            console.log(response)
            response.forEach(activity => {
                let activity_elem = document.createElement("div")
                friends_activity_div.appendChild(activity_elem)
                activity_elem.innerHTML = activity_div.innerHTML
                activity_elem.style.textAlign = "center"
                // order_elem.getElementsByTagName('button')[0].addEventListener('click', () => {
                //     window.location.href = "./orderlist.html";
                // })
                activity_elem.getElementsByTagName("h3")[0].innerText=activity.creator_name
                activity_elem.getElementsByTagName("h3")[1].innerText=activity.meal
                activity_elem.getElementsByTagName("h3")[2].innerText=activity.restaurant_name
                // order_elem.getElementsByTagName("td")[4].innerText=order.status
            });
        }
    };
    xhttp.open("POST", `http://127.0.0.1:3000/friends/activity`);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send(JSON.stringify({
        user_id: localStorage.getItem("userId"),
    }))
};

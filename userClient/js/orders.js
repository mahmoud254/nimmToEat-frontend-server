let orders_table = document.getElementById("mytable")
let order_row = document.getElementById("order_div")
let add_orderBtn = document.getElementById("addOrderBtn")
window.addEventListener("load", (evt) => {
    listOrders();
})
add_orderBtn.addEventListener("click", (evt) => {
    window.location.href = "./addOrder.html";
})

function listOrders() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            let response = JSON.parse(this.response)
            response.forEach(order => {
                console.log(order)
                let row = document.createElement("tr")
                orders_table.appendChild(row)
                row.innerHTML = order_row.innerHTML
                row.style.textAlign = "center"
                row.getElementsByTagName('button')[0].addEventListener('click', () => {
                    if (order.status=="finished"){
                        localStorage.setItem("orderStatus","false")    
                    }
                    localStorage.setItem("orderId",order.id)
                    localStorage.setItem("creatorId",order.creator_id)
                    window.location.href = "./orderlist.html";
                })
                row.getElementsByTagName('button')[1].addEventListener('click', () => {
                    finish(order.id)

                })
                row.getElementsByTagName('button')[2].addEventListener('click', () => {
                    cancel(order.id)
                })
                if (order.creator_id==false || order.status=="finished"){
                    row.getElementsByTagName('button')[1].disabled=true
                    row.getElementsByTagName('button')[2].disabled=true
                }
                row.getElementsByTagName("td")[0].innerText=order.meal
                row.getElementsByTagName("td")[1].innerText=order.restaurant
                row.getElementsByTagName("td")[2].innerText=order.invited
                row.getElementsByTagName("td")[3].innerText=order.joined
                row.getElementsByTagName("td")[4].innerText=order.status
            });
        }
    };
    xhttp.open("POST", `http://127.0.0.1:3000/orders/show`);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send(JSON.stringify({
        user_id: localStorage.getItem("userId"),
    }))
};

function finish(id) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            let response = JSON.parse(this.response)
            window.location.reload() 
        }
    };
    xhttp.open("GET", `http://127.0.0.1:3000/orders/${id}/finish`);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send()
};

function cancel(id) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            let response = JSON.parse(this.response)
            window.location.reload() 
        }
    };
    xhttp.open("GET", `http://127.0.0.1:3000/orders/${id}/cancel`);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send()
};
function getImage(){
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        let response = JSON.parse(this.response)
        document.getElementById("test").setAttribute("src", response.menu_image)
      }
    };
    xhttp.open("GET", `http://127.0.0.1:3000/orders/${localStorage.getItem("orderId")}/getimage`);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send()
  
  }

var xhr = new XMLHttpRequest();
xhr.onreadystatechange = function() {
    if (xhr.readyState === XMLHttpRequest.DONE) {
        if (xhr.status === 200) {
            var json = xhr.responseText;
            var business = JSON.parse(json);
           showBiz(business);
        } else {
            console.log('Something went wrong');
        }
    }
};

var id = window.location.pathname;
id = id.slice(id.lastIndexOf("/")+1);
xhr.open('GET', '/api/' + id);
xhr.send();

function showBiz(business){
    div = document.getElementById("business");
    div.innerHTML = `Name: ${business.name}<br>Address: ${business.address}<br> Phone:${business.phone}<br> Email:${business.email}`;
}
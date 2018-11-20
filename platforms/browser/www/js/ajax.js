ar xhr = new XMLHttpRequest();
    xhr.open('GET', 'http://hackcheats.top/probno2/ispis.php', true);
   xhr.onload = function () {
        
      
        document.getElementById("div1").innerHTML = this.responseText;
    };

xhr.send(null);  
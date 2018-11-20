/*lokacija*/
function locate() {
    var startPos;
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
              startPos = position;
              document.getElementById("startLat").innerHTML = startPos.coords.latitude.toPrecision(8);
              document.getElementById("startLon").innerHTML = startPos.coords.longitude.toPrecision(8);
            }, function (error) {
                  switch (error.code) {
                  case error.TIMEOUT:
                    document.getElementById("currentLat").innerHTML = "NOTOK"
                    break;
                  case error.POSITION_UNAVAILABLE:
                    document.getElementById("currentLat").innerHTML = "NOTOK"
                    break;
                  case error.PERMISSION_DENIED:
                    document.getElementById("currentLat").innerHTML = "NOTOK"
                    break;
                  case error.UNKNOWN_ERROR:
                    document.getElementById("currentLat").innerHTML = "NOTOK"
                    break;
            }
        });

        navigator.geolocation.watchPosition(function (position) {
            document.getElementById("currentLat").innerHTML = position.coords.latitude.toPrecision(8);
            document.getElementById("currentLon").innerHTML = position.coords.longitude.toPrecision(8);
        });
      } else {
          document.getElementById("currentLat").innerHTML = "NOTOK"
      }
}   



function loadMapscript() {
  var script = document.createElement("script");
  script.type = "text/javascript";
  script.src = "https://maps.googleapis.com/maps/api/js?key=AIzaSyDsMWlF2p0hZsjPosp9pPuWDq85oA5gY9Q&sensor=true&callback=locate";
  document.body.appendChild(script);
}

window.addEventListener("load", function () {
  loadMapscript();
  setTimeout(function () {
    window.scrollTo(0, 1);
  }, 0);
});

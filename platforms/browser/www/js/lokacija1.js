  var watchID = null;
        
        document.addEventListener("deviceready", function(){
            watchID = navigator.geolocation.watchPosition(function(position){
                document.getElementById("currentLat").innerHTML = position.coords.latitude;
                 document.getElementById("currentLon").innerHTML = position.coords.longitude;
                document.getElementById("timestamp").innerHTML = position.timestamp ;
             
                console.log('Latitude: '          + position.coords.latitude          + '\n' +
                      'Longitude: '         + position.coords.longitude         + '\n' +
                      'Altitude: '          + position.coords.altitude          + '\n' +
                      'Accuracy: '          + position.coords.accuracy          + '\n' +
                      'Altitude Accuracy: ' + position.coords.altitudeAccuracy  + '\n' +
                      'Heading: '           + position.coords.heading           + '\n' +
                      'Speed: '             + position.coords.speed             + '\n' +
                      'Timestamp: '         + position.timestamp                + '\n');
            }, function(error){
                if(error.code == PositionError.PERMISSION_DENIED)
                {
                    alert("App doesn't have permission to use GPS");
                }
                else if(error.code == PositionError.POSITION_UNAVAILABLE)
                {
                    alert("No GPS device found");
                }
                else if(error.code == PositionError.TIMEOUT)
                {
                    alert("Its taking to find user location");
                }
                else
                {
                    alert("An unknown error occured");
                }
            }, { maximumAge: 3000, timeout: 30000, enableHighAccuracy: true });
        }, false);

document.addEventListener("deviceready", onDeviceReady, false);
function onDeviceReady() {
   document.getElementById("uuid").innerHTML = device.uuid;
}
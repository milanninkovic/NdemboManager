(function() {
    'use strict';

    var battery;

    function readBattery(b) {
        battery = b || battery;
        var percentage = parseFloat((battery.level * 100).toFixed(2)), fully, remaining;
        if (percentage <= 30){
            document.getElementById("csschange").href="lowbatstyle.css";
        }
        if (percentage >= 31){
            document.getElementById("csschange").href="style.css";
        }
        document.querySelector('.battery-level').innerHTML = percentage;
    }
   

    if (navigator.battery) {
        readBattery(navigator.battery);
    } else if (navigator.getBattery) {
        navigator.getBattery().then(readBattery);
    } else {
        document.querySelector('.not-support').removeAttribute('hidden');
    }

    window.onload = function () {
        battery.addEventListener('chargingchange', function() {
            readBattery();
        });

        battery.addEventListener("levelchange", function() {
            readBattery();
        });
    };
}());

$("#cticketb").click(function(){
    location.href = '#';
    document.getElementById("cticket").value = "";
});
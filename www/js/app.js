function myEventHandler() {
    "use strict";

    var ua = navigator.userAgent;
    var str;

    if (window.Cordova && dev.isDeviceReady.c_cordova_ready__) {
        str = "It worked! Cordova device ready detected at " + dev.isDeviceReady.c_cordova_ready__ + " milliseconds!";
    } else if (window.intel && intel.xdk && dev.isDeviceReady.d_xdk_ready______) {
        str = "It worked! Intel XDK device ready detected at " + dev.isDeviceReady.d_xdk_ready______ + " milliseconds!";
    } else {
        str = "Bad device ready, or none available because we're running in a browser.";
    }

    //console.log(str);
}


// ...additional event handlers here...

function thirdPartyEmulator() {
    //alert("This feature uses a third party barcode scanner plugin. Third party plugins are not supported on emulator or app preview. Please build app to test.");
}

function scan() {
    "use strict";
    var fName = "scan():";
    console.log(fName, "entry");
    try {
        if (window.tinyHippos) {
            thirdPartyEmulator();
            console.log(fName, "emulator alert");
        } else {
            cordova.plugins.barcodeScanner.scan(
                function (result) {
                    console.log(fName, "Scanned result found!");
                    broj = result.text;
                    ticketno = broj.substr(0,7);
                    pinno = broj.substr(8);
                    PretragaTiketa(ticketno,pinno);
                   //document.getElementById("TicketNumber").innerHTML = result.text;
                    
                },
                function (error) {
                    alert("Scanning failed: " + error);
                },
      {
         
          
          showTorchButton : true, 
         
          prompt : "NgeNge SCAN TICKET", 
          
          orientation : "portrait",
        
      }
   );
        }
    } catch (e) {
        console.log(fName, "catch, failure");
    }

    console.log(fName, "exit");
}



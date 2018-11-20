function ReceiverKeyUp(e){
	var evtobj=window.event? event : e
	kcode = evtobj.keyCode;
	if (kcode == 13){
		document.getElementById("Amount").focus();
	}	
}
function AmountKeyUp(e){
	var evtobj=window.event? event : e
	kcode = evtobj.keyCode;
	if (kcode == 13){
		document.getElementById("Receiver").focus();
	}
}
//izlaz aplikacije
document.addEventListener("deviceready", onDeviceReady, false);
function onDeviceReady() {
   document.addEventListener("backbutton", backButtonPressed, false);
}
function backButtonPressed() {
    DisconnectPrinter();
    navigator.app.exitApp();
}
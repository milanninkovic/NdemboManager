var glavnisadrzaj = "";
var lokoponudaarr = new Array();
var igre_orig = new Array();
var igre_konv = new Array();
var svekratice = "";
var sveponude = "";
var kldp_lst = "";
var maxparovausistemu = 0;
var maxparovanalisticu = 0;
var maxevdobitak = 0;
var minuplatanalisticu = 0;
var minuplatapos = 0;
var uplata = 0;
var jzk_arr = new Array();
var novitiket = "";
var tiketstatus = "";
var valuta = "FC";
var intOdobrenje = null;
var intLokBat = null;
var printanje = "Ne";
var sadrzajzaprint = "";
var printinit = 0;
var lokopondudaarr = new Array();

function GdjeSamJa(){
	koord_x = document.getElementById("currentLat").innerHTML;
	koord_y = document.getElementById("currentLon").innerHTML;
	batlevel = document.getElementById("baterijaa").innerHTML;
	batlevel = 32.05;
	GiveMeValues("gdjesamja","x="+koord_x+"&y="+koord_y+"&b="+batlevel+"&u="+uuid,"gdjesamja");
}
function SkenirajOdobrenja(){
	GiveMeValues("skenirajodobrenja","u="+uuid,"skenirajodobrenja");
}
function NoviTiket(){
	if (novitiket == ""){
		document.getElementById("Loader").className = "Loader";	
        var data = new FormData();
        data.append('u', uuid);
        var xhr = new XMLHttpRequest();
        xhr.open('POST', 'https://www.ngenge.cd/mshop/novitiket.php', true);
        xhr.onload = function () {
          document.getElementById("Loader").className = "HiddenDiv";
          retinfo = this.responseText;
		  document.getElementById("Sadrzaj").innerHTML = retinfo;
          novitiket = retinfo;
        };
        xhr.send(data);
	} else {
		document.getElementById("Sadrzaj").innerHTML = novitiket;
		listic = kldp_lst;
		listic = unescape(listic);
		if (listic == ""){
			document.getElementById("BrParova").innerHTML = "0";
		} else {
			sistemi = GetVal(listic,"_SIS=","=SIS_");
			fiksevi = GetVal(listic,"_FIX=","=FIX_");
			brparova = 0;
			if (sistemi != ""){
				sarr = sistemi.split("^^");
				for(sx in sarr){	
					sistemdata = GetVal(sarr[sx],"_ds=","=ds_");
					arr = sistemdata.split("<>");
					brparova = brparova + arr.length;
				}
			}
			if (fiksevi != ""){
				arr = fiksevi.split("<>");
				brparova = brparova + arr.length;			
			}
			document.getElementById("BrParova").innerHTML = brparova;
		}
	}
}
function TiketStatus(){
	if (tiketstatus == ""){
		document.getElementById("Loader").className = "Loader";	
		GiveMeValues("tiketstatus","u="+uuid,"tiketstatus");
	} else {
		document.getElementById("Sadrzaj").innerHTML = tiketstatus;
	}
}
function UcitajLokoPonudu(){
	GiveMeValues("lokoponuda","u="+uuid,"lokoponuda");
}
function PovratakNaGlavniMeni(){
	document.getElementById("Sadrzaj").innerHTML = glavnisadrzaj;	
}
function GetVal (strx, strs, stre)
{	stra = strx.indexOf(strs);
	strb = strx.indexOf(stre);
	strc = strs.length;
	strd = strx.substr(stra+strc,strb-stra-strc);
	return strd;
}
function trim(stringToTrim){return stringToTrim.replace(/^\s+|\s+$/g,"")}
function Taster(broj){
	sifra = document.getElementById("SifraHolder").innerHTML;
	sifra = sifra + String(broj);
	document.getElementById("SifraHolder").innerHTML = sifra;
	if (sifra.length == 4){
		linija = lokoponudaarr[sifra];
		document.getElementById("LokoPonuda").innerHTML = linija;
		obj = document.getElementById("pon"+sifra+"_domacin");
		if (obj == null){
			document.getElementById("Loader").className = "Loader";
			sifra = sifra.replace(/\+/g,"");
            var data = new FormData();
            data.append('u', uuid);
            data.append('s', sifra);
            var xhr = new XMLHttpRequest();
            xhr.open('POST', 'https://www.ngenge.cd/mshop/trazinaserveru.php', true);
            xhr.onload = function () {
                document.getElementById("Loader").className = "HiddenDiv";
                retinfo = this.responseText;
                if (retinfo.substr(0,6) == "GRESKA"){
                    document.getElementById("SifraHolder").innerHTML = "";
                } else {
                    sifra = GetVal(retinfo,"_SF=","=SF_");
                    linija = GetVal(retinfo,"_LN=","=LN_");
                    lokoponudaarr[sifra] = linija;
                    document.getElementById("LokoPonuda").innerHTML = linija;
                    obj = document.getElementById("pon"+sifra+"_domacin");
                    domacin = obj.innerHTML;
                    gost = document.getElementById("pon"+sifra+"_gost").innerHTML;
                    domacingost = domacin;
                    if (trim(gost) != ""){
                        domacingost = domacin + " - " + gost;
                    }    
                    document.getElementById("NadjeniPar").innerHTML = domacingost;
                    document.getElementById("tastatura").className = "HiddenDiv";
                    document.getElementById("tastatura2").className = "HiddenDiv2";	
                    document.getElementById("SifraBack").className = "HiddenDiv";		
                    a = "<br><table style='font-size:8vw'>";
                    a = a + "<tr><td>Game : </td><td><div id=IgraHolder></div></td>";
                    a = a + "<td><div id=IgraBack><img src='img/back.png' style='width:15vw' onClick=IgraDel()></div></td>";
                    a = a + "</tr></table>";
                    document.getElementById("Igra").innerHTML = a;
                }
            };
            xhr.send(data);			
			return;
		} else {
			domacin = obj.innerHTML;
			gost = document.getElementById("pon"+sifra+"_gost").innerHTML;
			domacingost = domacin;
			if (trim(gost) != ""){
				domacingost = domacin + " - " + gost;
			}
			document.getElementById("NadjeniPar").innerHTML = domacingost;
			document.getElementById("tastatura").className = "HiddenDiv";
			document.getElementById("tastatura2").className = "HiddenDiv2";	
			document.getElementById("SifraBack").className = "HiddenDiv";		
			a = "<br><table style='font-family:Verdana;font-size:8vw'>";
			a = a + "<tr><td>Jeu : </td><td><div id=IgraHolder></div></td>";
			a = a + "<td><div id=IgraBack><img src='img/back.png' style='width:15vw' onClick=IgraDel()></div></td>";
			a = a + "</tr></table>";
			document.getElementById("Igra").innerHTML = a;
		}
	}
}
function SifraDel(){
	sifra = document.getElementById("SifraHolder").innerHTML;
	if (sifra == ""){
		return;
	}
	a = sifra.length;
	a = a - 1;
	sifra = sifra.substr(0,a);
	document.getElementById("SifraHolder").innerHTML = sifra;
}
function IgraDel(){
	igra = document.getElementById("IgraHolder").innerHTML;
	if (igra == ""){
		return;
	}
	a = igra.length;
	a = a - 1;
	igra = igra.substr(0,a);
	document.getElementById("IgraHolder").innerHTML = igra;	
}
function Taster2(tast_igra,opt){
	igra = document.getElementById("IgraHolder").innerHTML;
	if (opt == 1){
		igra = igra + String(tast_igra);
		document.getElementById("IgraHolder").innerHTML = igra;
	}
	if (opt == 2){
		document.getElementById("IgraHolder").innerHTML = tast_igra;
	}
	if (opt == 3){
		TraziParIgru();
	}
}
function TraziParIgru(){
	sifra = trim(document.getElementById("SifraHolder").innerHTML);
	igra = trim(document.getElementById("IgraHolder").innerHTML);
	if (igra == "H" || igra == "h"){
		document.getElementById("IgraHolder").innerHTML = "";
		return;
	}
    igra = igra.toUpperCase();
	igrapr = KonvertujIgruUnos(igra);
	if (igrapr != undefined){
		igra = igrapr;
	}
    igra = igra.replace(/ /g,"aaa");
	igra = igra.replace(/-/g,"bbb");
	igra = igra.replace(/\+/g,"ccc");
	igra = igra.replace(/>/g,"ddd");
	igra = igra.replace(/</g,"eee");
	igra = igra.replace(/=/g,"fff");
	igra = igra.replace(/&/g,"ggg");
	
    obj = document.getElementById("pon"+sifra+"_"+igra);
    if (obj == null){
		pos = svekratice.indexOf(igra);
		if (pos == -1){
			document.getElementById("IgraHolder").innerHTML = "";
			return;
		} else {
			igra = sveponude[pos];
			obj = document.getElementById("pon"+sifra+"_"+igra);
			if (obj == null){
				document.getElementById("Loader").className = "Loader";
				sifra = sifra.replace(/\+/g,"");
                var data = new FormData();
                data.append('u', uuid);
                data.append('s', sifra);
                data.append('i', igra);
                var xhr = new XMLHttpRequest();
                xhr.open('POST', 'https://www.ngenge.cd/mshop/trazinaserveru.php', true);
                xhr.onload = function () {
                    document.getElementById("Loader").className = "HiddenDiv";
                    retinfo = this.responseText;
                    document.getElementById("Loader").className = "HiddenDiv";		
                    if (retinfo.substr(0,6) == "GRESKA"){
                        document.getElementById("IgraHolder").innerHTML = "";
                    } else {
                        sifra = GetVal(retinfo,"_SF=","=SF_");
                        linija = GetVal(retinfo,"_LN=","=LN_");
                        lokoponudaarr[sifra] = linija;
                        TraziParIgru();
                    }
                };
                xhr.send(data);
				return;
			} else {
				iznos = document.getElementById("pon"+sifra+"_"+igra).innerHTML;
				if (iznos == "0.00"){
					document.getElementById("IgraHolder").innerHTML = "";
					return;
				} else {
					dkey = document.getElementById("pon"+sifra+"_dkey").innerHTML;
					zpigra = "";
					zpkvota = 0;
					if (document.getElementById("zi"+sifra+"_"+igra) != null){
						zpigra = document.getElementById("zi"+sifra+"_"+igra).innerHTML;
						zpkvota = document.getElementById("zk"+sifra+"_"+igra).innerHTML;
					}
					bonus = "";
					if (document.getElementById("bo"+sifra) != null){
						bonus = document.getElementById("bo"+sifra).innerHTML;
					}
					vrijeme = document.getElementById("vr"+sifra).innerHTML;
					DodajNaListic(dkey,sifra,igra,zpigra,zpkvota,bonus,vrijeme);
				}
			}
		}
	} else {
		iznos = document.getElementById("pon"+sifra+"_"+igra).innerHTML;
		if (iznos == "0.00"){
			document.getElementById("IgraHolder").innerHTML = "";
			return;
		} else {
			dkey = document.getElementById("pon"+sifra+"_dkey").innerHTML;
			zpigra = "";
			zpkvota = 0;
			if (document.getElementById("zi"+sifra+"_"+igra) != null){			
				zpigra = document.getElementById("zi"+sifra+"_"+igra).innerHTML;
				zpkvota = document.getElementById("zk"+sifra+"_"+igra).innerHTML;
			}
			bonus = "";			
			if (document.getElementById("bo"+sifra) != null){
				bonus = document.getElementById("bo"+sifra).innerHTML;
			}
			vrijeme = document.getElementById("vr"+sifra).innerHTML;
            DodajNaListic(dkey,sifra,igra,zpigra,zpkvota,bonus,vrijeme);						
		}
	}
}
function KonvertujIgru(nazivigre){
	nazivigre = nazivigre.replace(/&lt/g,"<");
	nazivigre = nazivigre.replace(/&gt/g,">");
	pozicija = igre_orig.indexOf(nazivigre);
	nazivigre = igre_konv[pozicija];
	return nazivigre;
}

function KonvertujIgruUnos(nazivigre){
	nazivigre = nazivigre.replace(/&lt/g,"<");
	nazivigre = nazivigre.replace(/&gt/g,">");
	pozicija = igre_konv.indexOf(nazivigre);
	nazivigre = igre_orig[pozicija];
	return nazivigre;
}
function PostojiUSistemu(dkey){
	listic = kldp_lst;
	listic = unescape(listic);	
	if (listic == ""){
		return "Ne";
	}
	sistemi = GetVal(listic,"_SIS=","=SIS_");
	if (sistemi == ""){
		return "Ne";
	}
	sarr = sistemi.split("^^");
	for(sx in sarr){	
		sistemdata = GetVal(sarr[sx],"_ds=","=ds_");
		arr = sistemdata.split("<>");
		for (x in arr){
			ldkey = GetVal(arr[x],"_dk=","=dk_");		
			if (ldkey == dkey){
				return "Da";
			}
		}
	}
	return "Ne";
}
function IzbrisiAkoPostoji(dkey){
	listic = kldp_lst;
	listic = unescape(listic);		
	if (listic == ""){return};
	sistemi = GetVal(listic,"_SIS=","=SIS_");
	fiksevi = GetVal(listic,"_FIX=","=FIX_");
	novilistic = "";
	arr = fiksevi.split("<>");
	for (x in arr){
		ldkey = GetVal(arr[x],"_dk=","=dk_");
		if (ldkey != dkey){
			novilistic = novilistic + "<>" + arr[x];
		} else {
			lkvota = GetVal(arr[x],"_kv=","=kv_");
		}
	}
	if (novilistic.substr(0,2) == "<>"){
		novilistic = novilistic.substr(2);
	}
	novilistic = "_SIS="+sistemi+"=SIS_FIX="+novilistic+"=FIX_";
	kldp_lst = novilistic;
}
function DodajNaListic(dkey,sifra,kvota,zpigra,zpkvota,bonus,vrijeme){
	if (document.getElementById("IgraHolder").innerHTML == ""){
		return;
	}
	vrijeme = vrijeme.replace(/aaa/g," ");
	brojacneaktivnosti = 0;
	pkvota = kvota.replace(/aaa/g," ");
	pkvota = pkvota.replace(/bbb/g,"-");
	pkvota = pkvota.replace(/ccc/g,"+");
	pkvota = pkvota.replace(/ddd/g,">");
	pkvota = pkvota.replace(/eee/g,"<");
	pkvota = pkvota.replace(/fff/g,"=");
	pkvota = pkvota.replace(/ggg/g,"&");
	pkvota = pkvota.replace(/</g,"&lt");
	pkvota = pkvota.replace(/>/g,"&gt");
	pkvota = KonvertujIgru(pkvota);
	usistemu = PostojiUSistemu(dkey);
	if (usistemu == "Da"){
		document.getElementById("IgraHolder").innerHTML = "";
		return;
	}
    IzbrisiAkoPostoji(dkey);
	listic = kldp_lst;
	listic = unescape(listic);		
	sistemi = "";
	fiksevi = "";
	if (listic != ""){
		sistemi = GetVal(listic,"_SIS=","=SIS_");
		fiksevi = GetVal(listic,"_FIX=","=FIX_");
		brparova = 0;
		if (sistemi != ""){
			sarr = sistemi.split("^^");
			for(sx in sarr){	
				sistemdata = GetVal(sarr[sx],"_ds=","=ds_");
				arr = sistemdata.split("<>");
				brparova = brparova + arr.length;
			}
		}
		if (fiksevi != ""){
			arr = fiksevi.split("<>");
			brparova = brparova + arr.length;			
		}
		if (brparova == maxparovanalisticu){return};
		
		if (fiksevi != ""){
			fiksevi = fiksevi + "<>";
		}
	}
	linija = lokoponudaarr[sifra];
	document.getElementById("LokoPonuda").innerHTML = linija;	
	obj = document.getElementById("domaci_"+dkey);
	if (obj != null){
		document.getElementById("domaci_"+dkey).className = "oKvota";
		if (document.getElementById("gosti_"+dkey) != null){
			document.getElementById("gosti_"+dkey).className = "oKvota";
		}
	}
	if (document.getElementById("pon"+sifra+"_domacin") == null){
		//document.getElementById("Loader").className = "Loader";	
		//UcitajLokoPonudu();
		return;
	}
	domaci = document.getElementById("pon"+sifra+"_domacin").innerHTML;
	gosti = document.getElementById("pon"+sifra+"_gost").innerHTML;
	gosti = trim(gosti);
	iznoskvote = document.getElementById("pon"+sifra+"_"+kvota).innerHTML;
	fiksevi = fiksevi + "_dk="+dkey+"=dk_kv="+kvota+"=kv_ik="+iznoskvote+"=ik_d="+escape(domaci)+"=d_g="+escape(gosti)+"=g_s="+sifra+"=s_zi="+zpigra+"=zi_zk="+zpkvota+"=zk_bo="+bonus+"=bo_vr="+vrijeme+"=vr_";
	listic = "_SIS="+sistemi+"=SIS_FIX="+fiksevi+"=FIX_";
	kldp_lst = listic;
	NoviTiket();	
}
function MojFakt(broj){
	var rval=1;
    for (var i = 2; i <= broj; i++){
    	rval = rval * i;
	}
    return rval;
}
function Kombinacije(sve, broj) {
	var i, j, komb, pocetak, kraj;
	if (broj == 1) {
		komb = [];
		for (i = 0; i < sve.length; i++) {
			komb.push([sve[i]]);
		}
		return komb;
	}
	komb = [];
	for (i = 0; i < sve.length - broj + 1; i++) {
		pocetak = sve.slice(i, i+1);
		kraj = Kombinacije(sve.slice(i + 1), broj - 1);
		for (j = 0; j < kraj.length; j++) {
			rez = pocetak * kraj[j];
			rez = Number(rez.toFixed(6));
			komb.push(rez);
		}
	}
	return komb;
}
function StrZaPrikaz(xstr){
	xstr = xstr.replace(/aaaa/g,"a ");
	xstr = xstr.replace(/bbbb/g,"b-");
	xstr = xstr.replace(/cccc/g,"c+");
	xstr = xstr.replace(/dddd/g,"d>");
	xstr = xstr.replace(/eeee/g,"e<");
	xstr = xstr.replace(/ffff/g,"f=");
	xstr = xstr.replace(/gggg/g,"g&");
			
	xstr = xstr.replace(/aaa/g," ");
	xstr = xstr.replace(/bbb/g,"-");
	xstr = xstr.replace(/ccc/g,"+");
	xstr = xstr.replace(/ddd/g,">");
	xstr = xstr.replace(/eee/g,"<");
	xstr = xstr.replace(/fff/g,"=");
	xstr = xstr.replace(/ggg/g,"&");
	return xstr;
}
function OtvoriMojListic(opt){
	mls = "<table><tr><td><div class=tipka onClick=NoviTiket()>Back</div></td></tr></table>";
	mls = mls + "<div style='url(img/siva2.jpg) repeat;font-family:Verdana;font-size:3.5vw;color:white'>";
	
	listic = kldp_lst;
	listic = unescape(listic);
	listic = unescape(listic);
	if (listic == ""){
		mls = mls + "<br><span style='font-size:5vw'><center>Le ticket est vide.</center></span><br><br>"; //Listić je prazan
		document.getElementById("Sadrzaj").innerHTML = mls;
		return;
	} else {
		mls = mls + "<table width=100%>";
		sistemi = GetVal(listic,"_SIS=","=SIS_");
		if (sistemi != ""){
			sarr = sistemi.split("^^");
			brsistema = 0;
			for (sx in sarr){
				tipsistema = GetVal(sarr[sx],"_ts=","=ts_");
				pos = tipsistema.indexOf("_");
				tipovi = tipsistema.substr(0,pos);
				brojb = tipsistema.substr(pos+1);
				trr = tipovi.split(",");
				ukupnokombinacija = 0;
				for(tx in trr){
					broja = trr[tx];
					brojkombinacija = MojFakt(brojb)/(MojFakt(broja)*MojFakt((brojb-broja)));
					ukupnokombinacija = ukupnokombinacija + brojkombinacija;
				}
				tipsistema = tipsistema.replace(/,/g,", ");
				tipsistema = tipsistema.replace(/_/g," / ");
				sistemdata = GetVal(sarr[sx],"_ds=","=ds_");
				mls = mls + "<tr style='background:-webkit-gradient(linear,left bottom,left top,color-stop(0.39, rgb(189,189,189)),color-stop(0.7, rgb(224,224,224)));'>";
				mls = mls + "<td colspan=5><table width=100%><tr><td width=50% style='font-weight:bold;font-family:Verdana;font-size:4vw;color:black'>Système : "+tipsistema+"<br>"; //Sistem
				mls = mls + " de : " + ukupnokombinacija + "</td>";
				mls = mls + "<td width=50%><div class=tipka style='width:auto;font-size:3.9vw;padding-top:3px' onClick=PonistiSistem("+brsistema+")>Sup. le système</div></td></tr></table></td></tr>";
				brsistema++;
				arr = sistemdata.split("<>");
				for(x in arr){
					dkey = GetVal(arr[x],"_dk=","=dk_");
					kvota = GetVal(arr[x],"_kv=","=kv_");
					pkvota = StrZaPrikaz(kvota);
					pkvota = KonvertujIgru(pkvota);
					iznoskvote = GetVal(arr[x],"_ik=","=ik_");
					domaci = GetVal(arr[x],"_d=","=d_");
					gosti = GetVal(arr[x],"_g=","=g_");
					domaci = StrZaPrikaz(domaci);
					gosti = StrZaPrikaz(gosti);
					zpigra = GetVal(arr[x],"_zi=","=zi_");
					zpkvota = GetVal(arr[x],"_zk=","=zk_");
					bonus = GetVal(arr[x],"_bo=","=bo_");
					bonusp = bonus;
					if (bonus == 'B.Fud.'){
						bonusp = "B.Foot.";
					}
					if (bonus == 'B.Koš.'){
						bonusp = "B.Bask.";
					}
					if (bonus == 'B.Am.Fud.'){
						bonusp = "B.F.am.";
					}
					if (bonus == 'B.Bejz.'){
						bonusp = "B.Base.";
					}
					if (bonus == 'B.Hok.'){
						bonusp = "B.Hock.";
					}
					if (bonus == 'B.Odb.'){
						bonusp = "B.Vol.";
					}
					if (bonus == 'B.Ruk.'){
						bonusp = "B.Han.";
					}
					if (bonus == 'B.Ten.'){
						bonusp = "B.Ten.";
					}
					if (bonus == 'B.Vat.'){
						bonusp = "B.WPol";
					}					
					sifra = GetVal(arr[x],"_s=","=s_");
					mls = mls + "<tr style='background: url(img/siva2.jpg) repeat;'>";
					mls = mls + "<td><table width=100%><tr><td rowspan=2 width=10%></td>";
					mls = mls + "<td style='width:10%;font-size:3vw;padding-right:10px'>"+sifra+"</td>";
					mls = mls + "<td colspan=3 style='width:80%;color:#fcd52f'>";
					if (bonus != ""){
						mls = mls + "(<span style='color:white'>"+bonusp+"</span>) ";
					}
					mls = mls + domaci;
					if (gosti != ""){
						mls = mls +" - "+gosti;
					}
					mls = mls + "</td></tr>";
					mls = mls + "<tr><td></td><td style='width:30%'>"+pkvota+"</td><td style='width:30%'></td><td style='width:20%;text-align:right'>"+iznoskvote+"</td></tr></table></td></tr>";				
				}
			}
		}		
		fiksevi = GetVal(listic,"_FIX=","=FIX_");
		if (fiksevi != ""){
			mls = mls + "<tr style='background:-webkit-gradient(linear,left bottom,left top,color-stop(0.39, rgb(189,189,189)),color-stop(0.7, rgb(224,224,224)));'>";
			mls = mls + "<td colspan=5 style='font-weight:bold;font-family:Verdana;font-size:5vw;color:black'>Standard</td></tr>"; //Fiksni
			arr = fiksevi.split("<>");
			for(x in arr){
				dkey = GetVal(arr[x],"_dk=","=dk_");
				kvota = GetVal(arr[x],"_kv=","=kv_");
				pkvota = StrZaPrikaz(kvota);
				pkvota = KonvertujIgru(pkvota);
				iznoskvote = GetVal(arr[x],"_ik=","=ik_");
				domaci = GetVal(arr[x],"_d=","=d_");
				gosti = GetVal(arr[x],"_g=","=g_");
				domaci = StrZaPrikaz(domaci);
				gosti = StrZaPrikaz(gosti);
				zpigra = GetVal(arr[x],"_zi=","=zi_");
				zpkvota = GetVal(arr[x],"_zk=","=zk_");
				bonus = GetVal(arr[x],"_bo=","=bo_");
				bonusp = bonus;
				if (bonus == 'B.Fud.'){
                    bonusp = "B.Foot.";
                }
                if (bonus == 'B.Koš.'){
                    bonusp = "B.Bask.";
                }
                if (bonus == 'B.Am.Fud.'){
                    bonusp = "B.F.am.";
                }
                if (bonus == 'B.Bejz.'){
                    bonusp = "B.Base.";
                }
                if (bonus == 'B.Hok.'){
                    bonusp = "B.Hock.";
                }
                if (bonus == 'B.Odb.'){
                    bonusp = "B.Vol.";
                }
                if (bonus == 'B.Ruk.'){
                    bonusp = "B.Han.";
                }
                if (bonus == 'B.Ten.'){
                    bonusp = "B.Ten.";
                }
                if (bonus == 'B.Vat.'){
                    bonusp = "B.WPol";
                }				
				sifra = GetVal(arr[x],"_s=","=s_");
				mls = mls + "<tr style='background: url(img/siva2.jpg) repeat;'>";
				mls = mls + "<td><table width=100%><tr><td rowspan=2 width=10%><input id=cb"+dkey+" type=checkbox style='min-height:5vh;min-width:5vh' onChange=ParOznacen()></td>";
				mls = mls + "<td style='width:10%;font-size:3vw;padding-right:10px'>"+sifra+"</td>";
				mls = mls + "<td colspan=3 style='width:80%;color:#fcd52f'>";
				if (bonus != ""){
					mls = mls + "(<span style='color:white'>"+bonusp+"</span>) ";
				}				
				mls = mls + domaci;
				if (gosti != ""){
					mls = mls +" - "+gosti;
				}
				mls = mls + "</td></tr>";
				mls = mls + "<tr><td></td><td style='width:30%'>"+pkvota+"</td><td style='width:30%'></td><td style='width:20%;text-align:right'>"+iznoskvote+"</td></tr></table></td></tr>";
			}
		}
		mls = mls + "</table>";
	}
	mls = mls + "</div><br>";
	mls = mls + "<div class=MojListicSadrzaj2 style='background: url(img/siva2.jpg) repeat;'>";
	mls = mls + "<div id=MojListicBtns></div>";
	mls = mls + "<div class=RacunListica>";
	mls = mls + "<div id=PodaciOListicu style='font-family:Verdana;font-size:5vw'></div>";
	mls = mls + "<table width=100% style='color:white;font-family:Verdana;font-size:5vw'><tr><td width=50%>Enjeu : </td>";
	mls = mls + "<td width=45% style='text-align:right' id=UplataHolder>" + uplata;
	mls = mls + "</td><td width=5%> "+valuta+"</td></tr></table>";
	mls = mls + "<table width=100%><tr>";
	mls = mls + "<td><div class=taster3 onClick=DodajNaUplatu(10000)>10K</div></td>";
	mls = mls + "<td><div class=taster3 onClick=DodajNaUplatu(1000)>1K</div></td>";
	mls = mls + "<td><div class=taster3 onClick=DodajNaUplatu(100)>100</div></td>";
	mls = mls + "<td><div class=taster3 onClick=DodajNaUplatu(10)>10</div></td>";
	mls = mls + "<td><div class=taster3 onClick=DodajNaUplatu(1)>1</div></td>";
	mls = mls + "<td><div class=taster3 style='padding-top:1vh'>";
	mls = mls + "<img src='img/back.png' style='width:10vw;vertical-align:top' onClick=UplataDel()></div></td>";
	mls = mls + "</tr></table>";
	mls = mls + "<div id=DobitakDiv style='font-family:Verdana;font-size:5vw'></div>";
	mls = mls + "</div><br>";
	mls = mls + "<div class=MojListicSadrzaj2 style='background: url(img/siva2.jpg) repeat;'>";	
	mls = mls + "<center><div id=MojListicGreska class=HiddenDiv></div></center>";
	mls = mls + "<table width=100%><tr><td width=50% style='height:5vh'>";
	mls = mls + "<center><div class=tipka style='width:45vw' onClick=OdigrajListic()>Placer un pari</div></center>"; //Odigraj
	mls = mls + "<td width=50% style='text-align:center'><center><div class=tipka style='width:45vw' onClick=IzbrisiListic()>Sup. le ticket</div></center></td></tr>"; //Izbriši

	mls = mls + "</table>";
	mls = mls + "</div>";
	document.getElementById("Sadrzaj").innerHTML = mls;
	ProracunajListic();
}
function DodajNaUplatu(iznos){
	uplata = uplata + iznos;
	document.getElementById("UplataHolder").innerHTML = uplata;
	ProracunajListic();	
}
function UplataDel(){
	uplata = 0;
	document.getElementById("UplataHolder").innerHTML = uplata;
	ProracunajListic();
}
function ProracunajListic(){
	listic = kldp_lst;
	listic = unescape(listic);
	listic = unescape(listic);		
	if (listic == "" || listic == "_SIS==SIS_FIX==FIX_"){
		mls = mls + "<br><span style='font-size:5vw'><center>Le ticket est vide.</center></span><br><br>"; //Listić je prazan
		document.getElementById("Sadrzaj").innerHTML = mls;
		return;
	}
	sistemi = GetVal(listic,"_SIS=","=SIS_");
	fiksevi = GetVal(listic,"_FIX=","=FIX_");
	if (sistemi == ""){
		a = "<table width=100% style='font-size:5vw'>";
		a = a + "<tr><td width=50%>Gains possibles : </td>"; //Eventualni dobitak
		a = a + "<td style='text-align:right;width:50%'><span id=EvDobitak style='font-family:Arial;font-weight:bold'>0.00</span> "+valuta+"</td></tr></table>";
		document.getElementById("DobitakDiv").innerHTML = a;
	} else {
		a = "<table width=100% style='font-size:5vw'>";
		a = a + "<tr><td width=50%>Gains maxi : </td>"; //Maksimalni dobitak
		a = a + "<td style='text-align:right;width:50%'><span id=MaxDobitak style='font-family:Arial;font-weight:bold'>0.00</span> "+valuta+"</td></tr>";
		a = a + "<tr><td>Gains mini : </td><td style='text-align:right;width:50%'><span id=MinDobitak style='font-family:Arial;font-weight:bold'>0.00</span> "+valuta+"</td></tr></table>"; //Minimalni dobitak
		document.getElementById("DobitakDiv").innerHTML = a;
	}
	ukupnakvota = 1;
	if (fiksevi != ""){
		parr = fiksevi.split("<>");
		brojfikseva = parr.length;
		for (px in parr){
			iznos = GetVal(parr[px],"_ik=","=ik_");
			ukupnakvota = ukupnakvota * parseFloat(iznos);
		}
	}
	uplataiznos = uplata;
	if (sistemi == ""){
		ukupnakvota = ukupnakvota.toFixed(2);
		evdobitak = (ukupnakvota * uplataiznos).toFixed(2);
		if (evdobitak > Number(maxevdobitak)){
			evdobitak = Number(maxevdobitak).toFixed(2);
		}
		evdobitak = Number(evdobitak).toFixed(2);				
		document.getElementById("EvDobitak").innerHTML = evdobitak;
	} else {
		kombinacijenalisticu = 1;
		sarr = sistemi.split("^^");
		for(sx in sarr){
			tipsistema = GetVal(sarr[sx],"_ts=","=ts_");
			pos = tipsistema.indexOf("_");
			tipovi = tipsistema.substr(0,pos);
			brojb = tipsistema.substr(pos+1);
			trr = tipovi.split(",");
			ukupnokombinacija = 0;
			for(tx in trr){
				broja = trr[tx];
				brojkombinacija = MojFakt(brojb)/(MojFakt(broja)*MojFakt((brojb-broja)));
				ukupnokombinacija = ukupnokombinacija + brojkombinacija;
			}
			kombinacijenalisticu = kombinacijenalisticu * ukupnokombinacija;			
		}
		uplatapokomb = uplataiznos / kombinacijenalisticu;
		uplatapokomb = Number(uplatapokomb.toFixed(6));
		mindobitaknalisticu = 1;
		maxdobitaknalisticu = 1;
		for(sx in sarr){
			tipsistema = GetVal(sarr[sx],"_ts=","=ts_");
			pos = tipsistema.indexOf("_");
			tipovi = tipsistema.substr(0,pos);		
			sistemdata = GetVal(sarr[sx],"_ds=","=ds_");
			arr = sistemdata.split("<>");			
			trr = tipovi.split(",");
			ukupnimindobitak = 0;
			ukupnimaxdobitak = 0;
			for(tx in trr){
				broja = trr[tx];			
				svevrijednosti = [];
				for(x in arr){
					siznoskvote = parseFloat(GetVal(arr[x],"_ik=","=ik_"));
					svevrijednosti.push(siznoskvote);
				}
				karr = Kombinacije(svevrijednosti,broja);
				mindobitak = parseFloat(karr[0]);
				maxdobitak = 0;
				for(k in karr){
					maxdobitak = maxdobitak + parseFloat(karr[k]);
					if (karr[k] < mindobitak){
						mindobitak = parseFloat(karr[k]);
					}
				}
				if (ukupnimindobitak > mindobitak || ukupnimindobitak == 0){
					ukupnimindobitak = mindobitak;
				}
				ukupnimaxdobitak = ukupnimaxdobitak + parseFloat(maxdobitak);
			}
			mindobitaknalisticu = mindobitaknalisticu * ukupnimindobitak;
			maxdobitaknalisticu = maxdobitaknalisticu * ukupnimaxdobitak;
		}
		mindobitaknalisticu = mindobitaknalisticu * ukupnakvota * uplatapokomb;
		maxdobitaknalisticu = maxdobitaknalisticu * ukupnakvota * uplatapokomb;
		mindobitaknalisticu = Number(mindobitaknalisticu.toFixed(2));
		maxdobitaknalisticu = Number(maxdobitaknalisticu.toFixed(2));
		if (mindobitaknalisticu > Number(maxevdobitak)){
			mindobitaknalisticu = Number(maxevdobitak).toFixed(2);
		}
		if (maxdobitaknalisticu > Number(maxevdobitak)){
			maxdobitaknalisticu = Number(maxevdobitak).toFixed(2);
		}
		mindobitaknalisticu = Number(mindobitaknalisticu).toFixed(2);
		maxdobitaknalisticu = Number(maxdobitaknalisticu).toFixed(2);
		document.getElementById("MinDobitak").innerHTML = mindobitaknalisticu;
		document.getElementById("MaxDobitak").innerHTML = maxdobitaknalisticu;
	}
	if (fiksevi != "" && sistemi == ""){
		a = "<table width=100% style='font-size:5vw'><tr><td width=50%>No de lignes : </td>"; //Broj stavki
		a = a + "<td style='width:50%;font-family:Arial;text-align:right;font-weight:bold'>"+brojfikseva+"</td></tr>";
		a = a + "<tr><td width=45%>Cotes totales : </td><td style='text-align:right;width:45%'><span id=UkupnaKvota style='font-family:Arial;text-align:right;font-weight:bold'>0.00</span></td>"; //Ukupna kvota
		a = a + "</tr></table>";
		document.getElementById("PodaciOListicu").innerHTML = a;		
		document.getElementById("UkupnaKvota").innerHTML = ukupnakvota;
	}
	if (fiksevi != "" && sistemi != ""){
		a = "<table width=100% style='font-size:5vw'>";
		a = a + "<tr><td>Nbre de comb. : </td><td style='width:50%;font-family:Arial;text-align:right;font-weight:bold'><div id=BrKombinacijaDiv>"+kombinacijenalisticu+"</div>"; //Broj kombinacija
		a = a + "</td></tr>";
		a = a + "<tr><td>No de standard : </td><td style='width:50%;font-family:Arial;text-align:right;font-weight:bold'>"+brojfikseva+"</td></tr></table>"; //Broj fiksnih
		document.getElementById("PodaciOListicu").innerHTML = a;		
	}
	if (fiksevi == "" && sistemi != ""){
		a = "<table width=100% style='font-size:5vw'>";
		a = a + "<tr><td>Nbre de comb. : </td><td style='width:50%;font-family:Arial;text-align:right;font-weight:bold'><div id=BrKombinacijaDiv>"+kombinacijenalisticu+"</div></td>"; //Broj kombinacija
		a = a + "</tr></table>";
		document.getElementById("PodaciOListicu").innerHTML = a;		
	}
	
	obj = document.getElementById("UplataPoKombinacijiDiv");
	if (obj != null){
		IzracunajBrojKombinacija();
	}	
}
function IzracunajBrojKombinacija(){
	listic = kldp_lst;
	listic = unescape(listic);
	listic = unescape(listic);
	sistem = GetVal(listic,"_SIS=","=SIS_");
	if (sistem == ""){
		kombinacijenalisticu = 0;
	} else {
		kombinacijenalisticu = 1;
		sarr = sistemi.split("^^");
		for(sx in sarr){
			tipsistema = GetVal(sarr[sx],"_ts=","=ts_");
			pos = tipsistema.indexOf("_");
			tipovi = tipsistema.substr(0,pos);
			brojb = tipsistema.substr(pos+1);
			trr = tipovi.split(",");
			ukupnokombinacija = 0;
			for(tx in trr){
				broja = trr[tx];
				brojkombinacija = MojFakt(brojb)/(MojFakt(broja)*MojFakt((brojb-broja)));
				ukupnokombinacija = ukupnokombinacija + brojkombinacija;
			}
			kombinacijenalisticu = kombinacijenalisticu * ukupnokombinacija;			
		}
	}
	cnt = 1;
	ukupnokombinacija = 0;
	while(document.getElementById("TipSistema"+cnt) != null){
		obj = document.getElementById("TipSistema"+cnt);
		if (obj.checked == true){
			opt = obj.value;
			pos = opt.indexOf(" ");
			broja = parseInt(opt.substr(0,pos));
			brojb = parseInt(opt.substr(pos+4));
			brojkombinacija = MojFakt(brojb)/(MojFakt(broja)*MojFakt((brojb-broja)));
			ukupnokombinacija = ukupnokombinacija + brojkombinacija;
		}
		cnt++;
	}
	if (kombinacijenalisticu == 0){
		kombinacijenalisticu = 1;
	}
	kombinacijenalisticu = kombinacijenalisticu * ukupnokombinacija;
	document.getElementById("BrojKombinacijaDiv").innerHTML = ukupnokombinacija + " ( " + kombinacijenalisticu + " au ticket)"; //na cijelom listiću
	uplataiznos = uplata;
	uplatapokomb = 0;
	if (ukupnokombinacija > 0){
		if (uplataiznos != 0){
			uplatapokomb = uplataiznos / kombinacijenalisticu;
		}
		uplatapokomb = Number(uplatapokomb.toFixed(6));
	}
	document.getElementById("UplataPoKombinacijiDiv").innerHTML = uplatapokomb + " " + valuta;
}
function ParOznacen(){
	listic = kldp_lst;
	listic = unescape(listic);
	listic = unescape(listic);		
	cnt = 0;
	fiksevi = GetVal(listic,"_FIX=","=FIX_");
	if (fiksevi != ""){
		arr = fiksevi.split("<>");
		for(x in arr){
			dkey = GetVal(arr[x],"_dk=","=dk_");
			if (document.getElementById("cb"+dkey).checked == true){
				cnt = cnt + 1;
			}
		}
	}
	if (cnt > 0){
		a = "<b><span style='font-family:Arial'>Lignes sélectionnées : </span></b><br>"; //Označene parove
		a = a + "<div class=tipka onClick=IzbrisiOznaceneParove() style='width:auto;margin-top:5px;margin-bottom:5px'>Supprimer</div>"; //Izbriši
		if (cnt > 1){
			a = a + "<b>ou ajouter à un système : </b><br><div id=SistemOpts class=SistemOpts></div>"; //ili dodaj u sistem
			a = a + "<div class=tipka onClick=NapraviSistem() style='width:auto;margin-top:5px;margin-bottom:5px'>Créer le système</div>"; //Napravi sistem
		}
		a = a + "<hr>";
		document.getElementById("MojListicBtns").innerHTML = a;
		if (cnt > 1){
			IscrtajSistemOpcije();
		}		
	} else {
		a = "";
		document.getElementById("MojListicBtns").innerHTML = a;
	}
}
function IscrtajSistemOpcije(){
	listic = kldp_lst;
	listic = unescape(listic);
	listic = unescape(listic);		
	cnt = 0;
	cntsis = 0;
	fiksevi = GetVal(listic,"_FIX=","=FIX_");
	arr = fiksevi.split("<>");
	for(x in arr){
		dkey = GetVal(arr[x],"_dk=","=dk_");
		if (document.getElementById("cb"+dkey).checked == true){
			cnt = cnt + 1;
		}
	}
	a = "<table><tr><td style='vertical-align:top'>Type de système : </td><td>"; //Tip sistema
	for (i=1;i<cnt;i++){
		if (cnt<=maxparovausistemu){
			a = a + "<input id=TipSistema"+i+" type=checkbox  style='min-height:5vh;min-width:5vh;vertical-align:middle' value='"+i+" od "+cnt+"' onChange=IzracunajBrojKombinacija()> "+i+" de "+cnt+"<br>";
		}
	}
	a = a + "</td></tr>";
	a = a + "<tr><td>Nbre de comb. : </td><td><div id=BrojKombinacijaDiv style='font-family:Arial'></div></td></tr>"; //Broj kombinacija
	a = a + "<tr><td>Montant par combinaison : </td><td><div id=UplataPoKombinacijiDiv style='font-family:Arial'></div></td></table>";	//Uplata po komb.
	document.getElementById("SistemOpts").innerHTML = a;
	IzracunajBrojKombinacija();
}
function NapraviSistem(){
	listic = kldp_lst;
	listic = unescape(listic);
	listic = unescape(listic);		
	sistem = GetVal(listic,"_SIS=","=SIS_");
	fiksevi = GetVal(listic,"_FIX=","=FIX_");
	cnt = 1;
	tipsistema = "";
	while(document.getElementById("TipSistema"+cnt) != null){
		obj = document.getElementById("TipSistema"+cnt);
		if (obj.checked == true){
			opt = obj.value;
			pos = opt.indexOf(" ");
			broja = parseInt(opt.substr(0,pos));
			brojb = parseInt(opt.substr(pos+4));
			tipsistema = tipsistema + "," + broja;
		}
		cnt++;
	}
	if (tipsistema == ""){return};
	if (tipsistema.substr(0,1) == ","){
		tipsistema = tipsistema.substr(1);
	}
	tipsistema = tipsistema + "_" + brojb;
	arr = fiksevi.split("<>");
	novifiksevi = "";
	novisistem = "";
	for(x in arr){
		dkey = GetVal(arr[x],"_dk=","=dk_");
		if (document.getElementById("cb"+dkey).checked == true){
			novisistem = novisistem + "<>" + arr[x];
		} else {
			novifiksevi = novifiksevi + "<>" + arr[x];
		}
	}
	if (novisistem.substr(0,2) == "<>"){novisistem = novisistem.substr(2)};
	if (novifiksevi.substr(0,2) == "<>"){novifiksevi = novifiksevi.substr(2)};
	if (sistem == ""){
		sistem = "_ts="+tipsistema+"=ts_ds="+novisistem+"=ds_";
		
	} else {
		sistem = sistem + "^^_ts="+tipsistema+"=ts_ds="+novisistem+"=ds_";
	}
	listic = "_SIS="+sistem+"=SIS_FIX="+novifiksevi+"=FIX_";
	kldp_lst = listic;
	OtvoriMojListic(0);
}
function IzbrisiOznaceneParove(){
	listic = kldp_lst;
	listic = unescape(listic);
	listic = unescape(listic);		
	fiksevi = GetVal(listic,"_FIX=","=FIX_");
	arrx = fiksevi.split("<>");
	cnt = 0;
	for(ax in arrx){
		dkey = GetVal(arrx[ax],"_dk=","=dk_");
		kvota = GetVal(arrx[ax],"_kv=","=kv_");
		if (document.getElementById("cb"+dkey).checked == true){
			IzbrisiSaListica(dkey,kvota);
		}
	}
	MemDump = "";
	OtvoriMojListic(1);
}
function PonistiSistem(brsistema){
	listic = kldp_lst;
	listic = unescape(listic);
	listic = unescape(listic);		
	sistem = GetVal(listic,"_SIS=","=SIS_");
	fiksevi = GetVal(listic,"_FIX=","=FIX_");
	srr = sistem.split("^^");
	novisistem = "";
	for(sx in srr){
		if (srr[sx] != ""){
			if (sx != brsistema){
				novisistem = novisistem + "^^" + srr[sx];
			} else {
				sisdata = GetVal(srr[sx],"_ds=","=ds_");
				fiksevi = fiksevi + "<>" + sisdata;
			}
		}
	}
	if (fiksevi.substr(0,2) == "<>"){fiksevi = fiksevi.substr(2)};
	if (novisistem.substr(0,2) == "^^"){novisistem = novisistem.substr(2)};
	listic = "_SIS="+novisistem+"=SIS_FIX="+fiksevi+"=FIX_";
	kldp_lst = listic;
	OtvoriMojListic(0);
}
function IzbrisiListic(){
	listic = kldp_lst;
	listic = unescape(listic);
	listic = unescape(listic);		
	if (listic == ""){
		document.getElementById("MojListicGreska").innerHTML = "";
		document.getElementById("MojListicGreska").className = "HiddenDiv";
		return;
	}
	kldp_lst = "";
	OtvoriMojListic(0);
}
function IzbrisiSaListica(ildkey,ilkvota){
	listic = kldp_lst;
	listic = unescape(listic);
	listic = unescape(listic);		
	sistemi = GetVal(listic,"_SIS=","=SIS_");
	fiksevi = GetVal(listic,"_FIX=","=FIX_");
	if (fiksevi != ""){
		iarr = fiksevi.split("<>");
		novilistic = "";
		for(ix in iarr){
			ldkey = GetVal(iarr[ix],"_dk=","=dk_");
			lkvota = GetVal(iarr[ix],"_kv=","=kv_");
			if (ildkey != ldkey){
				novilistic = novilistic + "<>" + iarr[ix];
			}
		}
		if (novilistic.substr(0,2) == "<>"){novilistic = novilistic.substr(2)};
	}
	fiksevi = novilistic;
	novilistic = "_SIS="+sistemi+"=SIS_FIX="+fiksevi+"=FIX_";
	if (novilistic == "_SIS==SIS_FIX==FIX_"){
		novilistic = "";
	}
	kldp_lst = novilistic;
	OtvoriMojListic(0);
}
function OdigrajListic(){
	document.getElementById("MojListicGreska").innerHTML = "";
	document.getElementById("MojListicGreska").className = "HiddenDiv";	
	listic = kldp_lst;
	listic = unescape(listic);
	listic = unescape(listic);		
	if (listic == ""){
		document.getElementById("MojListicGreska").className = "GreskaM2";
		document.getElementById("MojListicGreska").innerHTML = "Le ticket est vide"; //"Listić je prazan";
		return;
	}
	sistemi = GetVal(listic,"_SIS=","=SIS_");
	fiksevi = GetVal(listic,"_FIX=","=FIX_");
	if (sistemi == "" && fiksevi == ""){
		document.getElementById("MojListicGreska").className = "GreskaM2";		
		document.getElementById("MojListicGreska").innerHTML = "Le ticket est vide"; //"Listić je prazan";
		return;
	}
	if (uplata == 0){
		document.getElementById("MojListicGreska").className = "GreskaM2";		
		document.getElementById("MojListicGreska").innerHTML = "L'enjeu doit être supérieur à zéro"; //"Uplata mora biti veća od nule";
		return;
	}
	if (uplata < minuplatanalisticu){
		document.getElementById("MojListicGreska").className = "GreskaM2";			
		document.getElementById("MojListicGreska").innerHTML = "Le montant minimum est "+minuplatanalisticu+" " + valuta; //Minimum amount is 
		return;
	}
    
	var data = new FormData();
	data.append('u', uuid);
	data.append('lst', listic);
	data.append('upl', uplata);

	document.getElementById("Loader").className = "Loader";	
	var xhr = new XMLHttpRequest();
	xhr.open('POST', 'https://www.ngenge.cd/mshop/odigrajlistic.php', true);
	xhr.onload = function () {
		document.getElementById("Loader").className = "HiddenDiv";
		vrijednost = this.responseText;
        if (vrijednost == "ODJAVA"){
			navigator.app.exitApp();
			return;
		}
		if (vrijednost == "NERADIMO"){
			document.getElementById("MojListicGreska").className = "GreskaM2";
			document.getElementById("MojListicGreska").innerHTML = "Vous pouvez placer des paris de 10 heures à minuit";//Uplata listica je moguca od 10:00 do 23:59
			return;			
		}		
		if (vrijednost.substr(0,7) == "VRIJEME"){
			vrijednost = vrijednost.substr(7);
			document.getElementById("MojListicGreska").className = "GreskaM2";
			document.getElementById("MojListicGreska").innerHTML = vrijednost;
			return;
		}
		if (vrijednost.substr(0,12) == "MINDOGADJAJA"){
			vrijednost = vrijednost.substr(12);
			document.getElementById("MojListicGreska").className = "GreskaM2";
			document.getElementById("MojListicGreska").innerHTML = vrijednost;
			return;			
		}
		if (vrijednost.substr(0,8) == "ZAPOCETE"){
			vrijednost = vrijednost.substr(8);
			document.getElementById("MojListicGreska").className = "GreskaM2";
			document.getElementById("MojListicGreska").innerHTML = vrijednost;
			return;	
		}
		if (vrijednost.substr(0,4) == "ODOB"){
			dkey = vrijednost.substr(4);
			IzbrisiListic();
			OtvoriListic(dkey);
		}
		if (vrijednost.substr(0,2) == "OK"){
			dkey = vrijednost.substr(2);
			PrintanjeListica(dkey);
			IzbrisiListic();
			return;			
		}
	};
	xhr.send(data);	
}
function OtvoriListic(dkey){
	document.getElementById("Loader").className = "Loader";
    var data = new FormData();
    data.append('d', dkey);
    data.append('u', uuid);
    var xhr = new XMLHttpRequest();
    xhr.open('POST', 'https://www.ngenge.cd/mshop/otvorilistic.php', true);
    xhr.onload = function () {
        retinfo = this.responseText;
        if (retinfo == "ODJAVA"){
            navigator.app.exitApp();
            return;
        }
		document.getElementById("Loader").className = "HiddenDiv";
		document.getElementById("Sadrzaj").innerHTML = retinfo;
    };
    xhr.send(data);  
}
function TicketNoDel(){
	ticketno = document.getElementById("TicketNumber").innerHTML;
	if (ticketno == "Numéro de ticket"){
		return;
	}
	a = ticketno.length;
	a = a - 1;
	ticketno = ticketno.substr(0,a);
	if (ticketno == ""){
		ticketno = "Numéro de ticket";
	}
	document.getElementById("TicketNumber").innerHTML = ticketno;
}
function TiketTaster(broj){
	ticketno = document.getElementById("TicketNumber").innerHTML;
	if (ticketno == "Numéro de ticket"){
		ticketno = "";
	}
	ticketno = ticketno + String(broj);
	ticketno = ticketno.substr(0,7);
	document.getElementById("TicketNumber").innerHTML = ticketno;
	if (ticketno.length == 7){
		document.getElementById("tastatura1").className = "HiddenDiv";
		document.getElementById("TicketNoBack").innerHTML = "";
		document.getElementById("PINHolder").className = "PINHolder";
	}
}
function PINDel(){
	pinno = document.getElementById("PIN").innerHTML;
	if (pinno == "Code PIN"){
		return;
	}
	a = pinno.length;
	a = a - 1;
	pinno = pinno.substr(0,a);
	if (pinno == ""){
		pinno = "Code PIN";
	}
	document.getElementById("PIN").innerHTML = pinno;
}
function PINTaster(broj){
	pinno = document.getElementById("PIN").innerHTML;
	if (pinno == "Code PIN"){
		pinno = "";
	}
	pinno = pinno + String(broj);
	pinno = pinno.substr(0,4);
	document.getElementById("PIN").innerHTML = pinno;
	if (pinno.length == 4){
		ticketno = document.getElementById("TicketNumber").innerHTML;
		PretragaTiketa(ticketno,pinno);
	}
}
function PretragaTiketa(ticketno,pinno){
	document.getElementById("Greska").innerHTML = "";
	document.getElementById("Loader").className = "Loader";	
	GiveMeValues("pretragatiketa","t="+ticketno+"&p="+pinno+"&u="+uuid,"pretragatiketa");	
}
function BlagajnaPos(){
	document.getElementById("Loader").className = "Loader";	
	GiveMeValues("blagajnamobposlovnice","u="+uuid,"blagajnamobposlovnice");		
}
function MoneyTransfer(){
	document.getElementById("Loader").className = "Loader";	
	GiveMeValues("moneytransfer","u="+uuid,"moneytransfer");
}
function CancelLastTicket(){
	a = "<div style='color:white'>";
	a = a + "<table><tr><td><div class=tipka onClick=PovratakNaGlavniMeni()>Back</div></td></tr></table>";
	a = a + "<br><br><span style='font-family:Verdana;font-size:7vw'>Cancel last ticket ?</span><br><br><br>";
	a = a + "<div id=PINHolder>";
	a = a + "<table width=100%><tr><td width=50%>";
	a = a + "<div id=PIN style='border-style:solid;border-color:white;font-family:Verdana;font-size:8vw;text-align:center'>Code PIN</div>";
	a = a + "</td><td>";
	a = a + "<div><img src='img/back.png' style='width:15vw' onClick=PINDel()></div>";
	a = a + "</td></tr></table>";
	a = a + "<div id=tastatura2>";
	a = a + "<br><table width=100%>";
	a = a + "<tr>";
	for(i=1;i<6;i++){
		a = a + "<td><div class=taster onMouseDown=PINTaster2("+i+")>"+i+"</div></td>";
	}
	a = a + "</tr><tr>";
	for(i=6;i<10;i++){
		a = a + "<td><div class=taster onClick=PINTaster2("+i+")>"+i+"</div></td>";
	}
	a = a + "<td><div class=taster onClick=PINTaster2(0)>0</div></td>";
	a = a + "</tr>";
	a = a + "</table>";
	a = a + "</div>";
	a = a + "</div><br><br>";	
	a = a + "<div id=Greska style='width:100%;font-family:Verdana;font-size:6vw'></div>";
	document.getElementById("Sadrzaj").innerHTML = a;
}
function PosaljiCancelLastTicket(){
	pinno = document.getElementById("PIN").innerHTML;
	if (pinno == "" || pinno == "Code PIN"){
		return;
	}
	document.getElementById("Loader").className = "Loader";	
	GiveMeValues("cancellastticket","p="+pinno+"&u="+uuid,"cancellastticket");	
}
function PonistiTiket(dkey,pinno){
	document.getElementById("Loader").className = "Loader";	
	GiveMeValues("ponistilistic","d="+dkey+"&p="+pinno+"&u="+uuid,"ponistilistic");	
}
function PINTaster2(broj){
	pinno = document.getElementById("PIN").innerHTML;
	if (pinno == "Code PIN"){
		pinno = "";
	}
	pinno = pinno + String(broj);
	pinno = pinno.substr(0,4);
	document.getElementById("PIN").innerHTML = pinno;
	if (pinno.length == 4){
		PosaljiCancelLastTicket();
	}
}
function PrintanjeListica(dkey){
	document.getElementById("Loader").className = "Loader";
	InitPrintera();
    var data = new FormData();
	data.append('d', dkey);
	data.append('u', uuid);

	var xhr = new XMLHttpRequest();
	xhr.open('POST', 'https://www.ngenge.cd/mshop/printlistica.php', true);
	xhr.onload = function () {
		document.getElementById("Loader").className = "HiddenDiv";
		retinfo = this.responseText;
        if (retinfo == "ODJAVA"){
			navigator.app.exitApp();
			return;
		}
		sadrzajzaprint = retinfo;
		PokreniPrintanje();        
    }
}
function PokreniPrintanje(){
	printanje = "Da";
	InitPrintera();
	if (printinit == 0){
		setTimeout("PokreniPrintanje",100);
		return;
	}
	brlistica = GetVal(sadrzajzaprint,"_B=","=B_");
	sadrzajzaprint = GetVal(sadrzajzaprint,"_D=","=D_");
	arr = sadrzajzaprint.split(";");
	komanda = "1B 44 0A 19 00h"
	POSKomanda(komanda);
	for(x in arr){
		linija = arr[x] + "\n";	
		if (linija.indexOf("^") != -1){
			brr = linija.split("^");
			for(y in brr){
				ln = brr[y];
				if (ln != ""){
					IzvrsiPrintanje(ln);
				}
				if (y < brr.length-1){
					POSKomanda("09");
				}
			}
		} else {
			if (linija.substr(0,1) == "~"){
				komanda = "1B 4D 01";
				POSKomanda(komanda);
				linijaprn = linija.substr(1);
			} else {
				linijaprn = linija;
			}
			IzvrsiPrintanje(linijaprn);
			if (linija.substr(0,1) == "~"){
				komanda = "1B 4D 00";
				POSKomanda(komanda);
			}			
		}
	}
	IzvrsiPrintanje("\n");
	
	brlisticahex = "";
	for(i=0;i<12;i++){
		znak = brlistica[i];
		if (znak == "Z"){
			hexznak = "5A";
		} else {
			hznak = 30 + parseInt(znak);
			hexznak = String(hznak);
		}
		brlisticahex = brlisticahex + " " + hexznak;
	}
	komanda = "1D 48 32"; //GS H 0 = HRI position 0=no print, 1=above, 2=below, 3=above & below
	POSKomanda(komanda);
		
	komanda = "1D 68 64"; // GS h 32 = height of the barcode in points (1 <= n <= 255)
	POSKomanda(komanda);
	
	komanda = "1D 77 02"; //GS w 1 = sets barcode width, module = 1-6
	POSKomanda(komanda);
	//komanda = "1D 6B 45 0C 33 33 33 33 33 33 33 33 33 33 33 33"; //GS k, barcode type 0-6, barcode length, barcode, 0
	komanda = "1D 6B 45 0C" + brlisticahex; //GS k, barcode type 0-6, barcode length, barcode, 0
	POSKomanda(komanda);

	IzvrsiPrintanje("\n\n");
	
	komanda = "1D 56 30"; //GS V
	POSKomanda(komanda);
	
	printanje = "Ne";
}
function InitPrintera(){
	if (printinit == 1){
		return;
	}
	BTPrinter.list(function(data){
        printername = "BlueTooth Printer";
		if(data.indexOf(printername) == -1){
			a = "<div class=blinkavac style='border-style:solid;border-color:white;";
			a = a + "padding-top:5px;padding-bottom:5px;color:#ff0000;font-family:Verdana;font-size:5vw;text-align:center' ";
			a = a + ">PRINTER NOT FOUND</div><br>";
			document.getElementById("Obavjestenja").innerHTML = a;
			setTimeout("OcistiPrintanje",3000);
			DisconnectPrinter();			
		} else {
			BTPrinter.connect(function(data){
				printinit = 1;
				return;
			},function(err){
				a = "<div class=blinkavac style='border-style:solid;border-color:white;";
				a = a + "padding-top:5px;padding-bottom:5px;color:#ff0000;font-family:Verdana;font-size:5vw;text-align:center' ";
				a = a + ">CANNOT CONNECT PRINTER</div><br>";
				document.getElementById("Obavjestenja").innerHTML = a;
				setTimeout("OcistiPrintanje",3000);	
				DisconnectPrinter();			
				return;				
			}, printername)
		}
    },function(err){
		a = "<div class=blinkavac style='border-style:solid;border-color:white;";
		a = a + "padding-top:5px;padding-bottom:5px;color:#ff0000;font-family:Verdana;font-size:5vw;text-align:center' ";
		a = a + ">PRINTER NOT FOUND</div><br>";
		document.getElementById("Obavjestenja").innerHTML = a;
		setTimeout("OcistiPrintanje",3000);	
		DisconnectPrinter();		
    })
}
function IzvrsiPrintanje(linija){
	BTPrinter.printText(function(data){
		a = "<div class=blinkavac style='border-style:solid;border-color:white;";
		a = a + "padding-top:5px;padding-bottom:5px;color:#18ff00;font-family:Verdana;font-size:5vw;text-align:center' ";
		a = a + ">Printing ticket</div><br>";
		document.getElementById("Obavjestenja").innerHTML = a;
	},function(err){
		a = "<div class=blinkavac style='border-style:solid;border-color:white;";
		a = a + "padding-top:5px;padding-bottom:5px;color:#ff0000;font-family:Verdana;font-size:5vw;text-align:center' ";
		a = a + ">PRINTER NOT FOUND</div><br>";
		document.getElementById("Obavjestenja").innerHTML = a;
		setTimeout("OcistiPrintanje",3000);	
	}, linija)
}
function POSKomanda(komanda){
	BTPrinter.printPOSCommand(function(data){
		a = "<div class=blinkavac style='border-style:solid;border-color:white;";
		a = a + "padding-top:5px;padding-bottom:5px;color:white;font-family:Verdana;font-size:5vw;text-align:center' ";
		a = a + ">POS KOMANDA</div><br>";
		document.getElementById("Obavjestenja").innerHTML = a;
	},function(err){
		a = "<div class=blinkavac style='border-style:solid;border-color:white;";
		a = a + "padding-top:5px;padding-bottom:5px;color:#ff0000;font-family:Verdana;font-size:5vw;text-align:center' ";
		a = a + ">POS COMM PROBLEM</div><br>";
		document.getElementById("Obavjestenja").innerHTML = a;
	}, komanda)
}
function DisconnectPrinter(){
	printinit = 0;
	BTPrinter.disconnect(function(data){
		printinit = 0;
	},function(err){
		a = "<div class=blinkavac style='border-style:solid;border-color:white;";
		a = a + "padding-top:5px;padding-bottom:5px;color:#ff0000;font-family:Verdana;font-size:5vw;text-align:center' ";
		a = a + ">PRINTER PROBLEM</div><br>";
		document.getElementById("Obavjestenja").innerHTML = a;
		setTimeout("OcistiPrintanje",3000);
	})	
}
function OcistiPrintanje(){
	printanje = "Ne";
}
function UcitajIgreKonv(){
    var data = new FormData();
    data.append('u', uuid);
    var xhr = new XMLHttpRequest();
    xhr.open('POST', 'https://www.ngenge.cd/mshop/ucitajigrekonv.php', true);
    xhr.onload = function () {
        retinfo = this.responseText;
        if (retinfo == "ODJAVA"){
            navigator.app.exitApp();
            return;
        }
        orig_arr = GetVal(retinfo,"_O=","=O_");
        konv_arr = GetVal(retinfo,"_K=","=K_");
        igre_orig = orig_arr.split(";");
        igre_konv = konv_arr.split(";");
        LokoKratice();
    };
    xhr.send(data);
}
function LokoKratice(){
    var data = new FormData();
    data.append('u', uuid);
    var xhr = new XMLHttpRequest();
    xhr.open('POST', 'https://www.ngenge.cd/mshop/lokokratice.php', true);
    xhr.onload = function () {
        retinfo = this.responseText;
        if (retinfo == "ODJAVA"){
            navigator.app.exitApp();
            return;
        }
		sp = GetVal(retinfo,"_SP=","=SP_");
		sk = GetVal(retinfo,"_SK=","=SK_");
		sveponude = sp.split(";");
		svekratice = sk.split(";");
        UcitajParametre();
    };
    xhr.send(data);
}
function UcitajParametre(){
    var data = new FormData();
    data.append('u', uuid);
    var xhr = new XMLHttpRequest();
    xhr.open('POST', 'https://www.ngenge.cd/mshop/ucitajparametre.php', true);
    xhr.onload = function () {
        retinfo = this.responseText;
        if (retinfo == "ODJAVA"){
            navigator.app.exitApp();
            return;
        }
		maxparovausistemu = GetVal(retinfo,"_MPS=","=MPS_");
		maxparovanalisticu = GetVal(retinfo,"_MPL=","=MPL_");
		maxevdobitak = GetVal(retinfo,"_MED=","=MED_");
		minuplatanalisticu = GetVal(retinfo,"_MUL=","=MUL_"); 
        document.getElementById("Sadrzaj").innerHTML = glavnisadrzaj;
    };
    xhr.send(data);
}
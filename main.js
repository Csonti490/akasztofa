
function CimCsere(){

    let c = document.getElementById("cim");
    c.innerHTML = "__________"; c.innerHTML = "Akasztófa";
    const a = "Akasztófa";
    const abc = ['A', 'Á', 'B', 'C', 'D', 'E', 'É', 'F', 'G', 'H', 'I', 'Í', 'J', 'K', 'L', 'M', 'N', 'O', 'Ó', 'Ö', 'Ő', 'P', 'Q', 'R', 'S', 'T', 'U', 'Ú', 'Ü', 'Ű', 'V', 'W', 'X', 'Y', 'Z'];
    
}
var betumeret = 10;

var alapok = document.getElementById("alapok");
var jatekter = document.getElementById("jatekter");
var kijelzes = document.getElementById("kijelzes");
var bevitel = document.getElementById("bevitel");
var kerdes = document.getElementById("kerdes");
var kepallas = document.getElementById("kepallas");
var eredmeny = document.getElementById("eredmeny");
var eredmenykiir = document.getElementById("eredmenykiir");
var tovabbmegyek = false;

/* Alaphelyzetbe állítás, ha frissülne az oldal */
window.onload = function() {
    document.querySelectorAll('input[type="text"]').forEach(function(input) {
      input.value = '';
    });
    document.querySelectorAll('input[name="nehezseg"]')[0].checked = true;
    document.getElementById("b_meret").value = betumeret;
    document.getElementById("start").disabled = true;
    Gyari();
};

/* Kitalálandó szó mutatása bekérésnél */
var szo = document.getElementById("szo");
var szem = document.getElementById("mutate");
var sz = ['<i class="fa-solid fa-eye"></i>','<i class="fa-solid fa-eye-slash"></i>'];

function Mutat(){
    if(szem.innerHTML == sz[0]){
        document.getElementById("szo").type = "password";
        szem.innerHTML = sz[1];
        document.getElementById("szo").placeholder = "Kitalálandó szó (rejtve)";
    }else{
        document.getElementById("szo").type = "text";
        szem.innerHTML = sz[0];
        document.getElementById("szo").placeholder = "Kitalálandó szó (mutatva)";
    }
}

/* Általános információk */
var nemtalalt = "";
var ujszo = "";
var elet = 16; //16 v 12 v 8
var szo = "";
var eddigi = "";
var seged = 0;
var szam = 0;

/* Játék kezdése */
function Kezdes(){
    bevitel.classList.remove("d-none");
    kijelzes.classList.remove("d-none");
    var megjelenito = document.getElementById("megjelenito");
    var eletpont = document.getElementById("eletpont");
    var selectedRadio = document.querySelector('input[name="nehezseg"]:checked');
    document.getElementById("emberkep").src = "img/man0-512_gray.png";

    szo = document.getElementById("szo");
    elet = selectedRadio.value;
    
    if(!/[A-Za-z0-9áéíóöőúüűÁÉÍÓÖŐÚÜŰ]/.test(szo) ){
        alert("HIBA! Nincsen beírva kitalálandó szó!");
    }else if(/[A-Za-z0-9áéíóöőúüűÁÉÍÓÖŐÚÜŰ]/.test(szo)){

        szo = szo.value.toUpperCase();
        elet = selectedRadio.value;
        eddigi = szo.replace(/[A-Za-z0-9áéíóöőúüűÁÉÍÓÖŐÚÜŰ]/g, '_');

        if(!eddigi.includes('_')){
            alert("HIBA! Nincsen kitalálandó betű/szám!");
        }else{
            megjelenito.innerHTML = szo.replace(/[A-Za-z0-9áéíóöőúüűÁÉÍÓÖŐÚÜŰ]/g, '_');
            alapok.classList.add("d-none");
            jatekter.classList.remove("d-none");
            eletpont.innerHTML = "Életpont: "+elet;
        }
    }
}

var y = '<i class="fa-solid fa-check text-success"></i>';
var n = '<i class="fa-solid fa-xmark text-danger"></i>';

document.getElementById('szo').addEventListener('input', function (e) {
    // Cseréljük le az összes "_" karaktert üres stringre
    e.target.value = e.target.value.replace(/_/g, '');
    if (e.target.value.length == 0){
        document.getElementById("hibaellenorzes1").innerHTML = n + " Nincs beírva semmi.";
        StartEngedelyezes(true);
    }else if(e.target.value.length != 0 && !/[A-Za-z0-9áéíóöőúüűÁÉÍÓÖŐÚÜŰ]/.test(e.target.value)){
        document.getElementById("hibaellenorzes1").innerHTML = n + " Nincs benne kitalálható karakter.";
        StartEngedelyezes(true);
    }
    else if(/[A-Za-z0-9áéíóöőúüűÁÉÍÓÖŐÚÜŰ]/.test(e.target.value)){
        document.getElementById("hibaellenorzes1").innerHTML = y + " Gomb engedélyezve.";
        StartEngedelyezes(false);
    }
});

function StartEngedelyezes(yn){
    document.getElementById("start").disabled = yn;
}

/* Csak a megfelelő karakterek elfogadása */
document.getElementById('betuinput').addEventListener('input', function (e) {
    let pattern = /^[A-Za-z0-9ÁÉÍÓÖŐÚÜŰáéíóöőúüű]+$/;
    
    if (!pattern.test(e.target.value)) {
        e.target.value = e.target.value.replace(/[^A-Za-z0-9ÁÉÍÓÖŐÚÜŰáéíóöőúüű]/g, '');
    }
});

/* Játékmenet */
function Ellenoriz(){
    let begepeltbetu = document.getElementById("betuinput").value.toUpperCase();
    let nemtalaltbetuk = document.getElementById("betuk");
    let visszajelzes = document.getElementById("visszajelzes");
    
    ujszo = "";
    for (let i = 0; i < eddigi.length; i++) {
        ujszo += szo[i]===begepeltbetu?begepeltbetu:eddigi[i];
        visszajelzes.innerHTML = "<br>";
    }

    
    if(begepeltbetu.length == 0 || begepeltbetu == null || begepeltbetu == " "){ //Üres
        visszajelzes.innerHTML = "Nincs mit leellenőrizni.";return;
    }
    if(!nemtalalt.includes(begepeltbetu) && !ujszo.includes(begepeltbetu) && !tovabbmegyek){ //Elbírálás
        visszajelzes.innerHTML = "<br>";
        if(szo.includes(begepeltbetu)){//Van a szóban ilyen karakter
            nemtalalt+="";
            elet-=0;
        }else{
            nemtalalt += begepeltbetu;
            elet-=1;
            EmberValt();
        }
    }else if(nemtalalt.includes(begepeltbetu)){ //Felhasználtad már és nem volt jó
        visszajelzes.innerHTML = "Ezt a betűt már felhasználtad: "+begepeltbetu;
    }else if(!nemtalalt.includes(begepeltbetu) && !ujszo.includes(begepeltbetu) && tovabbmegyek){ //Elbírálás élet nélkül
        visszajelzes.innerHTML = "<br>";
        if(szo.includes(begepeltbetu)){//Van a szóban ilyen karakter
            nemtalalt+="";
        }else{
            nemtalalt += begepeltbetu;
        }
    }

    if(eddigi.includes(begepeltbetu) && ujszo.includes(begepeltbetu)){//Felhasználtad már és jó volt
        visszajelzes.innerHTML="Ezt a betűt már felhasználtad: "+begepeltbetu;
    }

    nemtalaltbetuk.innerHTML = "&nbsp;"+nemtalalt.split("").join(", ");
    eletpont.innerHTML = "Életpont: "+elet;
    megjelenito.innerHTML = "";
    megjelenito.innerHTML = ujszo;
    eddigi = ujszo;
    document.getElementById("betuinput").value = "";
    TheEnd();
}

/* Akasztófa kinézete */
function EmberValt(){
    let maxelet = parseInt(document.querySelector('input[name="nehezseg"]:checked').value);
    let emberkiir = document.getElementById("emberkep");
    
    switch (maxelet) {
        case 16:
            szam += 1;
            emberrajz = "img/man"+szam+"-512_gray.png";
            emberkiir.src = emberrajz;
            break;
        case 12:
            if(seged == 1){
                szam += 2;
                seged = 0;
            }else{
                szam += 1;
                seged += 0.5;
            }
            emberrajz = "img/man"+szam+"-512_gray.png";
            emberkiir.src = emberrajz;
            break;
        case 8:
            szam += 2;
            emberrajz = "img/man"+szam+"-512_gray.png";
            emberkiir.src = emberrajz;
            break;
        default:
            console.log("Hiba");
            break;
    }
}

/* Játék vége */
function TheEnd(){
    //let kep = document.getElementById('emberkep').src;
    if(elet == 0 && tovabbmegyek == false){

        bevitel.classList.add("d-none");
        kerdes.classList.remove("d-none");

    } else if(!eddigi.includes("_")){
        bevitel.classList.add("d-none");
        eredmenykiir.innerHTML += elet > 0 ? "Sikeresen kitaláltad a szót.<br>Maradék életek száma: "+elet+"":"Sikeresen kitaláltad a szót.<br>Bár kiskrapek pórul járt. :/";
        //document.getElementById("emberkep").src = kep;
        eredmeny.classList.remove("d-none");
        console.log("Itt a vége");
    }
}

/* Nem találta ki a szavat, de folytani akarja-e */
function TovabbE(tovabbmesz){
    //let kep = document.getElementById('emberkep').src;
    if(!tovabbmesz){
        kerdes.classList.add("d-none");
        eredmenykiir.innerHTML += "Sajnos nem sikerült kitalálni a szavat. :(";
        //document.getElementById("emberkep").src = kep;
        eredmeny.classList.remove("d-none");
        MegoldasMutatasa();
    }else{
        tovabbmegyek = true;
        kerdes.classList.add("d-none");
        kijelzes.classList.remove("d-none");
        bevitel.classList.remove("d-none");
    }
}

function MegoldasMutatasa(){
    var szoveg = szo;
    var hianyos = eddigi;
    var eredmeny = [];

    for (var i = 0; i < hianyos.length; i++) {
        if (hianyos[i] === '_') {
            eredmeny.push('<span class="text-danger">' + szoveg[i] + '</span>');
        } else {
            eredmeny.push(hianyos[i]);
        }
    }
    megjelenito.innerHTML = eredmeny.join('');
}

/* Beállításokhoz navigálás */
const legomb = document.getElementById("beallitasok");
legomb.addEventListener("click", function(e) {
  e.preventDefault();
  //IranyLefele();
  Megnyit();
});

function IranyLefele() {
    window.scrollTo({
      top: document.body.scrollHeight,
      behavior: "smooth"
    });
}

var sttngs = document.getElementById("sttngs");
function Megnyit(){
    sttngs.classList.remove("d-none");
}
function Becsuk(){
    sttngs.classList.add("d-none");
}



/* Beállítások betűméret */
var cim = document.getElementById("megjelenito");
var b_meret = document.getElementById("b_meret");
b_meret.addEventListener("input", function() {
    var meret = b_meret.value;
    cim.style.fontSize = meret + "vw";
    document.getElementById("ertek").innerText = meret+" vw";
});

/* Ideiglenes téma */
function TemaValtas(n){
    let gomb = document.getElementsByClassName("temagomb");
    let temakiir = document.getElementById("temakiir");
    if(n%2==0){
        gomb[0].disabled = true;
        gomb[1].disabled = false;
        temakiir.innerHTML = "világos";
        document.documentElement.style.colorScheme = 'light';
    }else{
        gomb[0].disabled = false;
        gomb[1].disabled = true;
        temakiir.innerHTML = "sötét";
        document.documentElement.style.colorScheme = 'dark';
    }
}

/* Alaphelyzet */
function UjJatek(){
    document.getElementById("hibaellenorzes1").innerHTML = n + " Nincs beírva semmi.";
    StartEngedelyezes(true);

    tovabbmegyek = false;
    kerdes.classList.add("d-none");
    kijelzes.classList.add("d-none");
    bevitel.classList.add("d-none");
    eredmenykiir.innerHTML = "";
    eredmeny.classList.add("d-none");

    alapok.classList.remove("d-none");
    jatekter.classList.add("d-none");

    document.getElementById("betuinput").value = "";
    //document.querySelectorAll('input[name="nehezseg"]')[0].checked = true;
    document.getElementById("szo").value = "";
    document.getElementById("betuk").innerHTML = "&nbsp;";
    document.getElementById("megjelenito").innerHTML = "Akasztófa";

    szo = "";
    ujszo = "";
    nemtalalt = "";
    elet = 16;

    szo.type = "text";
    seged = 0;
    szam = 0;
}

/* Beállítások alaphelyzete */
function Gyari(){
    document.getElementById("megjelenito").style.fontSize = betumeret + "vw";
    document.getElementById("b_meret").value = betumeret;
    document.getElementById("ertek").innerHTML = betumeret + " vw";
    let gomb = document.getElementsByClassName("temagomb");
    gomb[0].disabled = true;
    gomb[1].disabled = false;
    temakiir.innerHTML = "világos";
    document.documentElement.style.colorScheme = 'light';
}


/*Felugró infó*/
var popoverTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'))
var popoverList = popoverTriggerList.map(function (popoverTriggerEl) {
    return new bootstrap.Popover(popoverTriggerEl)
})
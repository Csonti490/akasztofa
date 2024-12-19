
function CimCsere(){

    var c = document.getElementById("cim");
    c.innerHTML = "__________"; c.innerHTML = "Akasztófa";
    const a = "Akasztófa";
    const abc = ['A', 'Á', 'B', 'C', 'D', 'E', 'É', 'F', 'G', 'H', 'I', 'Í', 'J', 'K', 'L', 'M', 'N', 'O', 'Ó', 'Ö', 'Ő', 'P', 'R', 'S', 'T', 'U', 'Ú', 'Ü', 'Ű', 'V', 'Z'];
    
}

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
    document.getElementById("b_meret").value = 96;
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
    }else{
        szem.innerHTML = sz[0];
        document.getElementById("szo").type = "text";
    }
    /*szem.innerHTML = szem.innerHTML==sz[0]?sz[1]:sz[0];
    document.getElementById("szo").type = szem.innerHTML==sz[0]?"text":"password";*/
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
    
    if(szo.value == "" ){
        alert("HIBA! Nincsen beírva kitalálandó szó!");
    }else{

        szo = szo.value.toUpperCase();
        elet = selectedRadio.value;
        //console.log("Ezt találd ki: "+szo.value+" Élet: "+elet); //Ellenőrzésre
        megjelenito.innerHTML = szo.replace(/[A-Za-z0-9áéíóöőúüűÁÉÍÓÖŐÚÜŰ]/g, '_');
        eddigi = szo.replace(/[A-Za-z0-9áéíóöőúüűÁÉÍÓÖŐÚÜŰ]/g, '_');

        if(!eddigi.includes('_')){
            alert("HIBA! Nincsen kitalálandó betű/szám!");
        }else{
            alapok.classList.add("d-none");
            jatekter.classList.remove("d-none");
            eletpont.innerHTML = "Életpont: "+elet;
            //document.getElementById("cim").classList.add("d-none");
        }
    }
}

/* Csak a megfelelő karakterek elfogadása */
document.getElementById('betuinput').addEventListener('input', function (e) {
    var pattern = /^[A-Za-z0-9ÁÉÍÓÖŐÚÜŰáéíóöőúüű]+$/;
    
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
    var maxelet = parseInt(document.querySelector('input[name="nehezseg"]:checked').value);
    var emberkiir = document.getElementById("emberkep");
    
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
    let kep = '<img src="'+document.getElementById('emberkep').src+'" alt="" width="256" id="emberkep" class="d-block mx-auto">';
    if(elet == 0 && tovabbmegyek == false){
        //alert("Nem sikerült kitalálni a szót. Megfejtés: "+szo);

        bevitel.classList.add("d-none");
        kerdes.classList.remove("d-none");

    } else if(!eddigi.includes("_")){
        //alert("A szó sikeresen kitalálva. ( Maradék élet: "+elet+" )");
        kijelzes.classList.add("d-none");
        bevitel.classList.add("d-none");
        eredmenykiir.innerHTML = kep;
        eredmenykiir.innerHTML += elet > 0 ? "<h3 class='text-center'>Sikeresen kitaláltad a szót.<br>Maradék életek száma: "+elet+"</h3>":"<h3 class='text-center'>Sikeresen kitaláltad a szót.<br>Bár kiskrapek pórul járt. :/</h3>";
        eredmeny.classList.remove("d-none");
        console.log("Itt a vége");
    }
}

/* Nem találta ki a szavat, de folytani akarja-e */
function TovabbE(tovabbmesz){
    let kep = '<img src="'+document.getElementById('emberkep').src+'" alt="" width="256" id="emberkep" class="d-block mx-auto">';
    if(!tovabbmesz){
        kijelzes.classList.add("d-none");
        kerdes.classList.add("d-none");
        eredmenykiir.innerHTML = kep;
        eredmenykiir.innerHTML += "<h3 class='text-center'>Sajnos nem sikerült kitalálni a szavat. :(</h3>";
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
            eredmeny.push('<span class="off">' + szoveg[i] + '</span>');
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
    cim.style.fontSize = meret + "px";
    document.getElementById("ertek").innerText = meret+" px";
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
    document.getElementById("megjelenito").style.fontSize = 96 + "px";
    document.getElementById("b_meret").value = 96;
    document.getElementById("ertek").innerHTML = 96 + " px";
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
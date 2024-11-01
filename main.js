
function CimCsere(){

    var c = document.getElementById("cim");
    c.innerHTML = "__________"; c.innerHTML = "Akasztófa";
    const a = "Akasztófa";
    const abc = ['A', 'Á', 'B', 'C', 'D', 'E', 'É', 'F', 'G', 'H', 'I', 'Í', 'J', 'K', 'L', 'M', 'N', 'O', 'Ó', 'Ö', 'Ő', 'P', 'R', 'S', 'T', 'U', 'Ú', 'Ü', 'Ű', 'V', 'Z'];
    
}

/* Alaphelyzetbe állítás, ha frissülne az oldal */
window.onload = function() {
    document.querySelectorAll('input[type="text"]').forEach(function(input) {
      input.value = '';
    });
    document.querySelectorAll('input[name="nehezseg"]')[0].checked = true;
    document.getElementById("b_meret").value = 96;
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
var seged = 0;
var szam = 0;

/* Játék kezdése */
function Kezdes(){
    var megjelenito = document.getElementById("megjelenito");
    var eletpont = document.getElementById("eletpont");
    var selectedRadio = document.querySelector('input[name="nehezseg"]:checked');

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
            document.getElementById("nehezseg").classList.add("d-none");
            document.getElementById("jatekter").classList.remove("d-none");
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
    var begepeltbetu = document.getElementById("betuinput").value.toUpperCase();
    var nemtalaltbetuk = document.getElementById("betuk");
    var visszajelzes = document.getElementById("visszajelzes");
    
    ujszo = "";
    for (let i = 0; i < eddigi.length; i++) {
        ujszo += szo[i]===begepeltbetu?begepeltbetu:eddigi[i];
        visszajelzes.innerHTML = "<br>";
    }

    
    if(begepeltbetu.length == 0 || begepeltbetu == null || begepeltbetu == " "){ //Üres
        visszajelzes.innerHTML = "Nincs mit leellenőrizni.";return;
    }/* else */if(!nemtalalt.includes(begepeltbetu) && !ujszo.includes(begepeltbetu)){ //Elbírálás
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
    if(elet == 0){
        alert("Nem sikerült kitalálni a szót. Megfejtés: "+szo);
        Lezaras(1);
    } else if(!eddigi.includes("_")){
        alert("Sikeresen kitaláltad a szót. ( Maradék élet: "+elet+" )");
        Lezaras(0);
    }
}

/* Játékfelület lezárása */
function Lezaras(n){
    // Még nincsen készen!!!
    document.getElementById("betuinput").classList.add("d-none");
    document.getElementById("bekuld").classList.add("d-none");
    document.getElementById("ujjatek").classList.remove("d-none");

    var tartalom = document.getElementById("tartalom");
    var eredmeny = document.getElementById("eredmeny");
    var e1 = document.getElementById("e1");
    var e2 = document.getElementById("e2");
    var t1 = document.getElementById("t1");

    t1.classList.add("d-none");
    e2.innerHTML = tartalom.innerHTML;
    e1.innerHTML = n==1?"<p>Nem sikerült kitalálni. Megfejtés: "+szo+"</p>":"Sikeresen kitalálva";
    if(n!=1){
        
    }
    eredmeny.classList.remove("d-none");
}

/* Beállításokhoz navigálás */
const legomb = document.getElementById("beallitasok");
legomb.addEventListener("click", function(event) {
  event.preventDefault(); // Megakadályozza a link alapértelmezett viselkedését
  IranyLefele();
});

function IranyLefele() {
  window.scrollTo({
    top: document.body.scrollHeight,
    behavior: "smooth"
  });
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
    document.getElementById("eredmeny").classList.add("d-none");
    document.getElementById("t1").classList.remove("d-none");

    document.getElementById("betuinput").classList.remove("d-none");
    document.getElementById("betuinput").value = "";
    document.getElementById("bekuld").classList.remove("d-none");
    document.getElementById("ujjatek").classList.add("d-none");
    //document.querySelectorAll('input[name="nehezseg"]')[0].checked = true;
    document.getElementById("szo").value = "";
    document.getElementById("nehezseg").classList.remove("d-none");
    document.getElementById("jatekter").classList.add("d-none");
    document.getElementById("emberkep").src = "img/man0-512_gray.png";
    document.getElementById("betuk").innerHTML = "";
    document.getElementById("megjelenito").innerHTML = "Akasztófa";

    szo = "";
    ujszo = "";
    nemtalalt = "";
    elet = 16;

    szo.type = "text";
    seged = 0;
    szam = 0;

    document.getElementsByClassName("temagomb")[0].disabled = false;
    document.getElementsByClassName("temagomb")[1].disabled = true;
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

/*

Létrehozni egy kérdést, mikor az élet 0-ra csökken és megkérdezni a játékost, hogy "Az életeid száma elfogyott és szegény bob is fel lett lógatva a diófára, de akarod tovább folytatni a találgatást, vagy szabad-e a gazda?", ha szabad a gazda, akkor ugye megjelenítjük a megoldást, viszont ha tovább akar játszani az emberünk, akkor továbbtalálgathat életek nélkül is.
Most így rögtön lenne egy elméleti megoldásom, de kódban még nem igazán állt össze a fejemben, de már fáradt vagyok... majd holnap meglátjuk vagy valamikor megllátjuk még, hogy ebből az ötletből mi fog megvalósulni és mikor...

*/
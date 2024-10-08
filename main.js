
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

    nemtalaltbetuk.innerHTML = nemtalalt.split("").join(", ");
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

    if(n == 1){
        //Nem sikerült kitalálni a szavat...
    }else{
        //Sikerült kitalálni
    }

    document.getElementById("betuinput").classList.add("d-none");
    document.getElementById("bekuld").classList.add("d-none");
    document.getElementById("ujjatek").classList.remove("d-none");
    /*if(elet == 0){
        console.log(ujszo);
    }*/

   var tartalom = document.getElementById("tartalom");
   var eredmeny = document.getElementById("eredmeny");
   var e1 = document.getElementById("e1");
   var e2 = document.getElementById("e2");
   var t1 = document.getElementById("t1");

   t1.classList.add("d-none");
   e2.innerHTML = tartalom.innerHTML;
   e1.innerHTML = n==1?"<p>Nem sikerült kitalálni. Megfejtés: "+szo+"</p>":"Sikeresen kitalálva";
   eredmeny.classList.remove("d-none");

}

/* Beállítások */
var cim = document.getElementById("megjelenito");
var b_meret = document.getElementById("b_meret");
b_meret.addEventListener("input", function() {
    var meret = b_meret.value;
    cim.style.fontSize = meret + "px";
    document.getElementById("ertek").innerText = meret;
});

/* Alaphelyzet */
function UjJatek(){
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

    document.getElementById("b_meret").value = 96;
    document.getElementById("ertek").innerText = 96;

    szo = "";
    ujszo = "";
    nemtalalt = "";
    elet = 16;

    szo.type = "text";
    seged = 0;
    szam = 0;
}

/* Ideiglenes téma */
function TemaValtas(){
    var asd = document.getElementById("tema");
    document.documentElement.style.colorScheme = document.documentElement.style.colorScheme === 'dark' ? 'light' : 'dark';
}


function CimCsere(){
    var c = document.getElementById("cim");
    c.innerHTML = "__________"; c.innerHTML = "Akasztófa";
    const a = "Akasztófa";
    const abc = ['A', 'Á', 'B', 'C', 'D', 'E', 'É', 'F', 'G', 'H', 'I', 'Í', 'J', 'K', 'L', 'M', 'N', 'O', 'Ó', 'Ö', 'Ő', 'P', 'R', 'S', 'T', 'U', 'Ú', 'Ü', 'Ű', 'V', 'Z'];
    
}

/* Alaphelyzetbe állítás, ha frissítve lesz az oldal */
window.onload = function() {
    document.querySelectorAll('input[type="text"]').forEach(function(input) {
      input.value = '';
    });
    document.querySelectorAll('input[name="nehezseg"]')[0].checked = true;
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
var elet = 16; //16-12-8
var szo = "";
var seged = 0;
var szam = 0;

/* Játék kezdése */
function Kezdes(){
    let selectedRadio = document.querySelector('input[name="nehezseg"]:checked');
    elet = selectedRadio.value;
    szo = document.getElementById("szo");
    if(szo.value == ""){
        alert("Nincsen beírva kitalálandó szó!");
    }else{
        elet = selectedRadio.value;
        //console.log("Ezt találd ki: "+szo.value+" Élet: "+elet);
        document.getElementById("nehezseg").classList.add("d-none");
        document.getElementById("jatekter").classList.remove("d-none");
    }
    szo = szo.value.toUpperCase();

    var megjelenito = document.getElementById("megjelenito");

    megjelenito.innerHTML = szo.replace(/[A-Za-z0-9áéíóöőúüűÁÉÍÓÖŐÚÜŰ]/g, '_');//szo.replace(/[A-Za-z0-9]/g, '_');
    eddigi = szo.replace(/[A-Za-z0-9áéíóöőúüűÁÉÍÓÖŐÚÜŰ]/g, '_');//szo.replace(/[A-Za-z0-9]/g, '_');


    var eletpont = document.getElementById("eletpont");
    eletpont.innerHTML = "Életpont: "+elet;
}


/* Játék */
function Ellenoriz(){
    var begepeltbetu = document.getElementById("betuinput").value.toUpperCase();
    var nemtalaltbetuk = document.getElementById("betuk");
    var visszajelzes = document.getElementById("visszajelzes");
    
    ujszo = "";
    for (let i = 0; i < eddigi.length; i++) {
        ujszo += szo[i]===begepeltbetu?begepeltbetu:eddigi[i];
        visszajelzes.innerHTML = "<br>";
    }

    
    if(begepeltbetu.length == 0 || begepeltbetu == null || begepeltbetu == " "){ //üres
        visszajelzes.innerHTML = "Nincs mit leellenőrizni.";
    } else if(!nemtalalt.includes(begepeltbetu) && !ujszo.includes(begepeltbetu)){ //elbírálás
        visszajelzes.innerHTML = "<br>";
        if(szo.includes(begepeltbetu)){//van a szóban
            nemtalalt+="";
            elet-=0;
        }else{
            nemtalalt += begepeltbetu;
            elet-=1;
            EmberValt();
        }
    }else if(nemtalalt.includes(begepeltbetu)){ //Volt már ilyen betű
        visszajelzes.innerHTML = "Ezt a betűt már felhasználtad: "+begepeltbetu;
    }
    if(eddigi.includes(begepeltbetu) && ujszo.includes(begepeltbetu)){
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

    /*szam += 2;
            emberrajz = "img/man"+szam+"-512_gray.png";
            emberkiir.src = emberrajz;
            console.log(szam);*/
    
    switch (maxelet) {
        case 16:
            szam = 16-elet;
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
        Lezaras();
    } else if(!eddigi.includes("_")){
        alert("Sikeresen kitaláltad a szót. ( Maradék élet: "+elet+" )");
        Lezaras();
    }
}

function Lezaras(){
    document.getElementById("betuinput").classList.add("d-none");
    document.getElementById("bekuld").classList.add("d-none");
    document.getElementById("ujjatek").classList.remove("d-none");
}

function UjJatek(){
    document.getElementById("betuinput").classList.remove("d-none");
    document.getElementById("betuinput").value = "";
    document.getElementById("bekuld").classList.remove("d-none");
    document.getElementById("ujjatek").classList.add("d-none");
    document.querySelectorAll('input[name="nehezseg"]')[0].checked = true;
    document.getElementById("szo").value = "";
    //document.getElementById("szo").type = "text";
    //document.getElementById("mutate").innerHTML = "<i class='fa-solid fa-eye'></i>";//HIBA
    document.getElementById("nehezseg").classList.remove("d-none");
    document.getElementById("jatekter").classList.add("d-none");
    document.getElementById("emberkep").src = "img/man0-512_gray.png";
    document.getElementById("betuk").innerHTML = "";

    szo = "";
    ujszo = "";
    nemtalalt = "";
    elet = 16;

    szem.innerHTML = sz[1];
    szo.type = "text";
    seged = 0;
    szam = 0;
}

/*document.getElementById('szo').addEventListener('input', function (e) {
    // Csak betűk engedélyezése
    var pattern = /^[A-Za-zÁÉÍÓÖŐÚÜŰáéíóöőúüű]+$/;
    
    // Ha a bevitt érték nem felel meg a mintának, eltávolítjuk
    if (!pattern.test(e.target.value)) {
        e.target.value = e.target.value.replace(/[^A-Za-zÁÉÍÓÖŐÚÜŰáéíóöőúüű]/g, '');
    }
   console.log("a");
});*/

/*document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('betuinput').addEventListener('input', function (e) {
        console.log("a"); // Kiírja a "a" szót a konzolra minden input eseménynél
    });
});*/
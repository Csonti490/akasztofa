
function CimCsere(){
    var c = document.getElementById("cim");
    c.innerHTML = "__________"; c.innerHTML = "Akasztófa";
    const a = "Akasztófa";
    const abc = ['A', 'Á', 'B', 'C', 'D', 'E', 'É', 'F', 'G', 'H', 'I', 'Í', 'J', 'K', 'L', 'M', 'N', 'O', 'Ó', 'Ö', 'Ő', 'P', 'R', 'S', 'T', 'U', 'Ú', 'Ü', 'Ű', 'V', 'Z'];
    
}

/*
const szo = "Valami";

function Kezdes(n){
    var nehezseg = document.getElementById("nehezseg");
    var jatekter = document.getElementById("jatekter");

    nehezseg.classList.add("d-none");
    jatekter.classList.remove("d-none");
}

function Ellenoriz(){
    var betu = document.getElementById("");
}
*/

// Kitalálandó szó mutatása bekérésnél
function Mutat(){
    var szo = document.getElementById("szo");
    var szem = document.getElementById("mutate");

    var sz = ['<i class="fa-solid fa-eye"></i>','<i class="fa-solid fa-eye-slash"></i>'];
    szem.innerHTML = szem.innerHTML==sz[0]?sz[1]:sz[0];
    szo.type = szem.innerHTML==sz[0]?"text":"password";
}

function Kezdes(){
    let selectedRadio = document.querySelector('input[name="nehezseg"]:checked');
    let value = selectedRadio.value;
    console.log("Kiválasztott nehézségi szint: " + value);
    var szo = document.getElementById("szo");
    if(szo.value == ""){
        
    }else{
        console.log("Ezt találd ki: "+szo.value);
    }
}
szo = "alma - 1";
szo = szo.toUpperCase();

var megjelenito = document.getElementById("megjelenito");

megjelenito.innerHTML = szo.replace(/[A-Za-z0-9]/g, '_');
eddigi = szo.replace(/[A-Za-z0-9]/g, '_');

var nemtalalt = "";
var ujszo = "";
var elet = 16; //16
var eletpont = document.getElementById("eletpont");
eletpont.innerHTML = "Életpont: "+elet;

/* Játék */
function Ellenoriz(){
    var begepeltbetu = document.getElementById("betuinput").value.toUpperCase();
    var nemtalaltbetuk = document.getElementById("betuk");
    var visszajelzes = document.getElementById("visszajelzes");

    if(eddigi.includes(begepeltbetu)){
        visszajelzes.innerHTML="Ezt a betűt már felhasználtad: "+begepeltbetu;
    }
    
    ujszo = "";
    for (let i = 0; i < eddigi.length; i++) {
        ujszo += szo[i]===begepeltbetu?begepeltbetu:eddigi[i];
        visszajelzes.innerHTML = "<br>";
    }

    
    if(begepeltbetu == ""){ //üres
        visszajelzes.innerHTML = "Nincs mit leellenőrizni.";
    } else if(!nemtalalt.includes(begepeltbetu) && !ujszo.includes(begepeltbetu)){ //elbírálás
        visszajelzes.innerHTML = "<br>";
        if(szo.includes(begepeltbetu)){
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
    

    //nemtalalt += szo.includes(begepeltbetu)?"":begepeltbetu;
    //elet -= szo.includes(begepeltbetu)?0:1;
    nemtalaltbetuk.innerHTML = nemtalalt.split("").join(", ");
    eletpont.innerHTML = "Életpont: "+elet;
    megjelenito.innerHTML = "";
    megjelenito.innerHTML = ujszo;
    eddigi = ujszo;
    document.getElementById("betuinput").value = "";
    TheEnd();
}

function EmberValt(){
    var emberkiir = document.getElementById("ember");
    
}

function TheEnd(){
    if(elet == 0){
        alert("Nem sikerült kitalálni a szót. Megfejtés: "+szo);
        Lezaras();
    } else if(!eddigi.includes("_")){
        alert("Sikeresen kitaláltad a szavat. ( Maradék élet: "+elet+" )");
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
    document.getElementById("bekuld").classList.remove("d-none");
    document.getElementById("ujjatek").classList.add("d-none");
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
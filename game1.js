let mutatrejt = document.getElementById("mutatrejt"); // Kitalálandó szó "szeme"
let kitalalando = document.getElementById("kitalalando"); // Kitalálandó szó
let visszajelzes = document.getElementById("visszajelzes"); // Kitalálandó szó "hangja"
let mehet = document.getElementById("mehet"); // Játékindító

/* Kitalálandó szó rejtése/mutatása */
mutatrejt.addEventListener("click", function () {
    if (mutatrejt.innerHTML.includes("-slash")){
        mutatrejt.innerHTML = '<i class="fa-solid fa-eye"></i>';
        kitalalando.setAttribute("type",'text');
        kitalalando.placeholder = "Kitalálandó szó (mutatva)";
    }else{
        mutatrejt.innerHTML =  '<i class="fa-solid fa-eye-slash"></i>';
        kitalalando.setAttribute("type",'password');
        kitalalando.placeholder = "Kitalálandó szó (rejtve)";
    }
});

/* Játék engedélyezése */
kitalalando.addEventListener("input", function () {
    kitalalando.value = kitalalando.value.replace(/['"`_]/g, '');
    const valid = /[A-Za-z0-9áéíóöőúüűÁÉÍÓÖŐÚÜŰ]/;
    if(kitalalando.value.length == 0 || !valid.test(kitalalando.value)){
        visszajelzes.innerHTML = `<i class="fa-solid fa-xmark text-danger"></i> Még nincs beírva szó a mezőbe.`;
        mehet.disabled = true;
    }else{
        visszajelzes.innerHTML = `<i class="fa-solid fa-check text-success"></i> Mehet a játék!`;
        mehet.disabled = false;
    }
});

let megjelenito = document.getElementById("megjelenito"); // Kijelző
let beallitasok = document.getElementById("beallitasok"); // Beállítások
let jatekter = document.getElementById("jatekter"); // Játéktér

let kitalalando_szo = ""; // Mit kell kitalálni
let jelenlegi_szo = ""; // Mi van eddig kitalálva

//Hiba
let hibaok = document.getElementById("info");
let myModal = new bootstrap.Modal(document.getElementById('ErrorInfo'));

mehet.addEventListener("click", function () {

    if(!/[A-Za-z0-9áéíóöőúüűÁÉÍÓÖŐÚÜŰ]/.test(kitalalando.value) ){
        hibaok.innerHTML = `Nincsen beírva kitalálandó szó!`;
        myModal.show();
    }else if(/[A-Za-z0-9áéíóöőúüűÁÉÍÓÖŐÚÜŰ]/.test(kitalalando.value) && !/_/.test(kitalalando.value)){

        // Alap adatok elmentése
        kitalalando_szo = kitalalando.value.toUpperCase();
        jelenlegi_szo = kitalalando_szo.replace(/[A-Za-z0-9áéíóöőúüűÁÉÍÓÖŐÚÜŰ]/g, '_');

        if(!jelenlegi_szo.includes('_')){
            hibaok.innerHTML = `Nincsen kitalálandó kifejezés!`;
            myModal.show();
        }else{
            megjelenito.innerHTML = jelenlegi_szo;
            beallitasok.classList.add("d-none");
            jatekter.classList.remove("d-none");
            bevitel.classList.remove("d-none");
            JatekKezdese();
        }
    }else{
        hibaok.innerHTML = `Nem szerepelhet "_" (alulvonás) karakter a kifejezésben!`;
        myModal.show();
    }

});
maxelet = 16;
let eletpont = 16; //16 v 12 v 8
let eletpont_kijelzo = document.getElementById("eletpontok"); // Életpont kijelzés
let szam = 0;

function JatekKezdese(){
    maxelet = parseInt(document.querySelector('input[name="nehezseg"]:checked').value);
    eletpont = maxelet;
    eletpont_kijelzo.textContent = eletpont;
}

let ellenorzes = document.getElementById("ellenorzes"); // Ellenőrző gomb
let nemtalaltbetuk = [];
let tippeltbetu = document.getElementById("tippelt");

tippeltbetu.addEventListener("input", function () {
    const engedelyezett = /[A-Za-z0-9áéíóöőúüűÁÉÍÓÖŐÚÜŰ]/;
    if (!engedelyezett.test(tippeltbetu.value)) {
        tippeltbetu.value = '';
    }
});

let nincsbenne = document.getElementById("nincsbenne");
let ellenorzes_visszajelzes = document.getElementById("ellenorzes_visszajelzes");
let folytatas = false;
ellenorzes.addEventListener("click", function () {
    if(tippeltbetu.value.length == 0 || tippeltbetu.value == null){
        // Nem írtam be semmit
        ellenorzes_visszajelzes.innerHTML = "Nincs mit ellenőrizni.";
    }else if(jelenlegi_szo.includes(tippeltbetu.value.toUpperCase()) || nemtalaltbetuk.includes(tippeltbetu.value.toUpperCase())){
        // Már próbálkoztam vele
        ellenorzes_visszajelzes.innerHTML = "Ezzel már próbálkoztál: "+tippeltbetu.value.toUpperCase();
        tippeltbetu.value = "";
    }else if(!jelenlegi_szo.includes(tippeltbetu.value.toUpperCase()) && !nemtalaltbetuk.includes(tippeltbetu.value.toUpperCase())){
        // Eddig még nem tippeltem egyáltalán
        if(kitalalando_szo.includes(tippeltbetu.value.toUpperCase())){
            //Benne van
            let betu = tippeltbetu.value.toUpperCase();
            let ujszoTomb = jelenlegi_szo.split('').map((char, i) =>
                kitalalando_szo[i] === betu ? betu : char
            );
            let ujszo = ujszoTomb.join('');

            if (ujszo !== jelenlegi_szo) {
                jelenlegi_szo = ujszo;
                megjelenito.innerHTML = jelenlegi_szo;
                ellenorzes_visszajelzes.innerHTML = `Eltaláltál egy betűt: ${betu}`;

                if (jelenlegi_szo === kitalalando_szo) {
                    JatekVege();
                }
            }

            tippeltbetu.value = "";

        }else{
            //Nincsen benne
            let betu = tippeltbetu.value.toUpperCase();

            nemtalaltbetuk.push(betu);
            nincsbenne.innerHTML = nemtalaltbetuk.join(', ');

            eletpont--;
            eletpont_kijelzo.innerHTML = eletpont;
            ellenorzes_visszajelzes.innerHTML = `Ezt a betűt nem tartalmazza: ${betu}`;

            if (eletpont > 0) {
                EmberValt();
            } else if (!folytatas) {
                JatekVege();
            }

            tippeltbetu.value = "";
        }
    }
});

function Gyari(){
    document.querySelectorAll('input[type="text"]').forEach(function(input) {
      input.value = '';
    });
    document.querySelectorAll('input[type="password"]').forEach(function(input) {
      input.value = '';
    });
    document.querySelectorAll('input[name="nehezseg"]')[0].checked = true;
    mehet.disabled = true;
}

let bevitel = document.getElementById("bevitel");
let kerdes = document.getElementById("kerdes");
let eredmeny = document.getElementById("eredmeny");
function JatekVege(){
    if(eletpont == 0 && kitalalando_szo != jelenlegi_szo){
        // Ha tovább lehet vinni élet nélkül
        bevitel.classList.add("d-none");
        kerdes.classList.remove("d-none");
    }else if(kitalalando_szo == jelenlegi_szo){
        // Kitaláltad a szót
        bevitel.classList.add("d-none");
        eredmeny.classList.remove("d-none");
        eredmenykiir.innerHTML += eletpont > 0 ? "Sikeresen kitaláltad a szót.<br>Maradék életek száma: "+eletpont+"":"Sikeresen kitaláltad a szót.<br>Bár kiskrapek pórul járt. :/";
        eredmeny.classList.remove("d-none");
    }else if(eletpont < 0 && kitalalando_szo == jelenlegi_szo){
        // Feladtad
        bevitel.classList.add("d-none");
        eredmeny.classList.remove("d-none");
        eredmenykiir.innerHTML = "Sajnos nem sikerült kitalálni a szót.<br>És a kiskrapek pórul járt. :/";
    }
}

let tovabb = document.getElementById("tovabb");
tovabb.addEventListener("click", function () {
    tovabb = true;
    kerdes.classList.add("d-none");
    bevitel.classList.remove("d-none");
});

let feladom = document.getElementById("feladom");
feladom.addEventListener("click", function () {
    tovabb = false;
    kerdes.classList.add("d-none");
    eredmeny.classList.remove("d-none");
    eredmenykiir.innerHTML = "Sajnos nem sikerült kitalálni a szót.<br>És a kiskrapek pórul járt. :/";
});

let ujjatek = document.getElementById("ujjatek");
ujjatek.addEventListener("click", function () {
    //location.reload();
    beallitasok.classList.remove("d-none");
    kitalalando.value = "";
    visszajelzes.innerHTML = `<i class="fa-solid fa-xmark text-danger"></i> Még nincs beírva szó a mezőbe.`;
    ellenorzes_visszajelzes.innerHTML = "&nbsp;";
    mehet.disabled = true;

    jatekter.classList.add("d-none");
    bevitel.classList.add("d-none");
    eletpontok.innerHTML = "&nbsp;";
    tippelt.innerHTML = "&nbsp;";
    nincsbenne.innerHTML = "&nbsp;";
    document.getElementById("emberkep").src = "img/man0-512_blue.png";

    eredmeny.classList.add("d-none");
    eredmenykiir.innerHTML = "&nbsp;";
    
    kerdes.classList.add("d-none");

    jelenlegi_szo = "";
    ujszo = "";
    megjelenito.innerHTML = "Akasztófa";
    tippeltbetu.value = "";
    nemtalaltbetuk = [];
    eletpont = 16;
    szam = 0;
    folytatas = false;
});


function EmberValt(){
    
    let emberkiir = document.getElementById("emberkep");
    let emberrajz = "";
    switch (maxelet) {
        case 16:
            szam += 1;
            emberrajz = "img/man"+szam+"-512_blue.png";
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
            emberrajz = "img/man"+szam+"-512_blue.png";
            emberkiir.src = emberrajz;
            break;
        case 8:
            szam += 2;
            emberrajz = "img/man"+szam+"-512_blue.png";
            emberkiir.src = emberrajz;
            break;
        default:
            console.log("Hiba a kép kiírásakor.");
            break;
    }
}


// Ellenőrző gomb felirata
function updateButtonText() {
    const gomb = document.getElementById("ellenorzes");

    if (window.innerWidth <= 662 && window.innerWidth >= 575) {
        gomb.innerHTML = `<i class="fa-solid fa-magnifying-glass"></i>`;
    } else if( window.innerWidth < 394) {
        gomb.innerHTML = `<i class="fa-solid fa-magnifying-glass"></i>`;
    }else {
        gomb.innerHTML = `<i class="fa-solid fa-magnifying-glass"></i> Ellenőrzés`;
    }
}
window.addEventListener("resize", updateButtonText);
window.addEventListener("DOMContentLoaded", updateButtonText);

window.addEventListener("DOMContentLoaded",Gyari);
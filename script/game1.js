let mutatrejt = document.getElementById("mutatrejt"); // Kitalálandó szó "szeme"
let kitalalando = document.getElementById("kitalalando"); // Kitalálandó szó
let visszajelzes = document.getElementById("visszajelzes"); // Kitalálandó szó "hangja"
let mehet = document.getElementById("mehet"); // Játékindító
let valid = /[A-Za-z0-9áéíóöőúüűÁÉÍÓÖŐÚÜŰ]/; // Engedélyezett karakterek
// Kitalálandó szó rejtése/mutatása
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

// Játék engedélyezése
kitalalando.addEventListener("input", function () {
    kitalalando.value = kitalalando.value.replace(/['"`_]/g, '');
    kitalalando.value = kitalalando.value.replace(/[^A-Za-z0-9áéíóöőúüűÁÉÍÓÖŐÚÜŰ,;:\.\!\?\(\)\[\]\{\}\-\+\*\/\\@#%&~\^$=]/g, '');
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

// Hiba okának visszajelzése
let hibaok = document.getElementById("info");
let myModal = new bootstrap.Modal(document.getElementById('ErrorInfo'));

mehet.addEventListener("click", function () {

    if(!valid.test(kitalalando.value) ){
        hibaok.innerHTML = `Nincsen beírva kitalálandó szó!`;
        myModal.show();
    }else if(valid.test(kitalalando.value) && !/_/.test(kitalalando.value)){

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
        hibaok.innerHTML = `Tiltott karakter ( " ' \` _ ) található a kifejezésben.`;
        myModal.show();
    }

});
maxelet = 16;
let eletpont = 16; //16 v 12 v 8
let eletpont_kijelzo = document.getElementById("eletpontok"); // Életpont kijelzés
let szam = 0; // A kiskrapek állapota
let seged = 0; // Segéd változó a kiskrapek állapotához

function JatekKezdese(){
    maxelet = parseInt(document.querySelector('input[name="nehezseg"]:checked').value);
    eletpont = maxelet;
    eletpont_kijelzo.textContent = eletpont;
    tippeltbetu.value = "";
    seged = 0;
}

let ellenorzes = document.getElementById("ellenorzes"); // Ellenőrző gomb
let nemtalaltbetuk = []; // Azok a betűk, amelyeket már próbáltál, de nem jöttek be
let tippeltbetu = document.getElementById("tippelt"); // Kérdéses betű

// Tiltott karakterek kizárása
tippeltbetu.addEventListener("input", function () {
    if (!valid.test(tippeltbetu.value)) {
        tippeltbetu.value = '';
    }
});

// Eltaláltál egy karaktert animációval
function TalaltBetu(e){
    e.classList.add('a-c');
    setTimeout(() => e.classList.remove('a-c'), 1500);
}
function frissitMegjelenito(szo, animaltBetu = null) {
    megjelenito.innerHTML = '';
    szo.split('').forEach((char, i) => {
        let span = document.createElement('span');
        span.textContent = char;
        if (char === animaltBetu) {
            TalaltBetu(span);
        }
        megjelenito.appendChild(span);
    });
}

let nincsbenne = document.getElementById("nincsbenne"); // Nem található ilyen betű a rejtvényben
let ellenorzes_visszajelzes = document.getElementById("ellenorzes_visszajelzes"); // Visszajelzés a kérdéses karakter után
let folytatas = false; // Elfogytak az életpontjaid, de folytatnád-e tovább
// Játék magja
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
                frissitMegjelenito(jelenlegi_szo, betu); //megjelenito.innerHTML = jelenlegi_szo;
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

            if(!folytatas){
                JatekVege();
            }
            if(eletpont > -1){
                EmberValt();
            }

            tippeltbetu.value = "";
        }
    }
});

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
        eredmenykiir.innerHTML += eletpont > 0 ? "Sikeresen kitaláltad a szót.<br>Maradék életek száma: "+eletpont+' <i class="fa-solid fa-heart pulse"></i>':"Sikeresen kitaláltad a szót.<br>Bár kiskrapek pórul járt. :/";
        eredmeny.classList.remove("d-none");
    }else if(eletpont < 0 && kitalalando_szo == jelenlegi_szo){
        // Feladtad
        bevitel.classList.add("d-none");
        eredmeny.classList.remove("d-none");
        eredmenykiir.innerHTML = "Sajnos nem sikerült kitalálni a szót.<br>És a kiskrapek pórul járt. :/";
        Megoldas();
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
    Megoldas();
});

function Megoldas(){
    var szoveg = kitalalando_szo;
    var hianyos = jelenlegi_szo;
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

let ujjatek = document.getElementById("ujjatek");
ujjatek.addEventListener("click", function () {
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
    document.getElementById("emberkep").src = "img/blue/man0-512_blue.png";

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
    seged = 0;

    rosszvalasz.disabled = false;
});

// A kiskrapek állapotának változtatása
function EmberValt(){
    let emberkiir = document.getElementById("emberkep");
    let emberrajz = "";
    switch (maxelet) {
        case 16:
            szam += 1;
            emberrajz = "img/blue/man"+szam+"-512_blue.png";
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
            emberrajz = "img/blue/man"+szam+"-512_blue.png";
            emberkiir.src = emberrajz;
            break;
        case 8:
            szam += 2;
            emberrajz = "img/blue/man"+szam+"-512_blue.png";
            emberkiir.src = emberrajz;
            break;
        default:
            console.log("Hiba a kép kiírásakor.");
            break;
    }
}

// Tudom a megoldást
let tudomamegoldast = document.getElementById("tudomamegoldast");
tudomamegoldast.addEventListener("click", function () {
    let szo = jelenlegi_szo.split('');
    let cel = kitalalando_szo.split('');
    let index = 0;

    function felfedKovetkezo() {
        if (index >= cel.length) {
            jelenlegi_szo = cel.join('');
            frissitMegjelenito(jelenlegi_szo);
            JatekVege();
            return;
        }

        let aktualisKarakter = cel[index];
        let frissult = false;

        // Megkeressük az összes helyet, ahol a karakter hiányzik
        for (let i = 0; i < cel.length; i++) {
            if (cel[i] === aktualisKarakter && szo[i] !== cel[i]) {
                szo[i] = cel[i];
                frissult = true;
            }
        }

        if (frissult) {
            frissitMegjelenito(szo.join(''), aktualisKarakter);
        }

        // Ugrás a következő karakterre, amit még nem fedtünk fel
        do {
            index++;
        } while (index < cel.length && szo[index] === cel[index]);

        setTimeout(felfedKovetkezo, 500);
    }

    felfedKovetkezo();
});

// Rossz válasz
let rosszvalasz = document.getElementById("rosszvalasz");
rosszvalasz.addEventListener("click", function () {
    eletpont--;
    eletpont_kijelzo.innerHTML = eletpont;
    ellenorzes_visszajelzes.innerHTML = `Rossz volt a tippelt megoldás. -1 élet`;
    EmberValt();
    if(eletpont == 0){
        JatekVege();
        rosszvalasz.disabled = true;
    }
});

// Rendezvényes kiegészítők
// "Tudom a megoldást" és a "Rossz válasz" gombok látszódjon-e
let rendezveny_kapcsolo = document.getElementById("rendezveny_kapcsolo");
let rf = document.getElementById("rendezveny_funkciok");
let isOn = false;
rendezveny_kapcsolo.addEventListener("click", function(){
    isOn = !isOn;
    rf.classList.toggle('d-none', !isOn);
});

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

// Ha frissülne az oldal
function Gyari(){
    document.querySelectorAll('input[type="text"]').forEach(function(input) {
      input.value = '';
    });
    document.querySelectorAll('input[type="password"]').forEach(function(input) {
      input.value = '';
    });
    document.querySelectorAll('input[name="nehezseg"]')[0].checked = true;
    mehet.disabled = true;
    rendezveny_kapcsolo.checked = false;
    rosszvalasz.disabled = false;
}

window.addEventListener('resize', () => {
  updateButtonText();
});
window.addEventListener('DOMContentLoaded', () => {
  Gyari();
  updateButtonText();
});
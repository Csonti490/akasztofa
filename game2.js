let txtTartalom = ""; // ide mentjük a beolvasott szöveget
let kifejezesek = []; // ebben lesznek a sorok külön tömbként

let feltolto = document.getElementById('fkitalalandok');
let feldolgoz = document.getElementById('fajlellenor');
let mehet = document.getElementById("mehet");
let visszajelzes = document.getElementById("visszajelzes");


window.addEventListener('DOMContentLoaded', () => {
  feltolto.value = '';
  feldolgoz.disabled = true;
  mehet.disabled = true;
});

feltolto.addEventListener('change', () => {
  mehet.disabled = true;
  const file = feltolto.files[0];

  if (!file) {
    feldolgoz.disabled = true;
    visszajelzes.innerHTML = `<i class="fa-solid fa-file-circle-plus"></i> Nincs fájl kiválasztva.`;
    return;
  }
  else if (!file.name.toLowerCase().endsWith(".txt")) {
    feldolgoz.disabled = true;
    visszajelzes.innerHTML = `<i class="fa-solid fa-file-circle-exclamation"></i> Hibás fájlformátum! Csak '.txt' engedélyezett.`;
    return;
  }
  else{
    feldolgoz.disabled = false;
    visszajelzes.innerHTML = `<i class="fa-solid fa-file-circle-question"></i> Ellenőrzésre vár`;

    const reader = new FileReader();
    reader.onload = () => {
      txtTartalom = reader.result;
    };
    reader.readAsText(file);
  }

});

//Hiba
let hibaok = document.getElementById("info");
let myModal = new bootstrap.Modal(document.getElementById('ErrorInfo'));

feldolgoz.addEventListener('click', () => {
  if (txtTartalom.trim() === "") {
    hibaok.innerHTML = `Nincsenek kitalálható szavak.`;
    myModal.show();
    visszajelzes.innerHTML = `<i class="fa-solid fa-file-circle-xmark"></i> Nincsenek szavak`;
    return;
  }

  const sorok = txtTartalom.split(/\r?\n/);
  const tiltottKarakterek = /["'`_]/;
  const hibasSor = sorok.find(sor => {
    return sor.trim() === "" || tiltottKarakterek.test(sor);
  });

  if (hibasSor !== undefined) {
    hibaok.innerHTML = `A fájl tartalma hibás:<br>Üres sor vagy tiltott karakter ( " ' \` _ ) található benne.`;
    myModal.show();
    visszajelzes.innerHTML = `<i class="fa-solid fa-file-circle-xmark"></i> Hibás fájltartalom`;
    return;
  }

  // Ha minden rendben:
  kifejezesek = sorok.map(sor => sor.trim());
  console.log("Kifejezések tömbje:", kifejezesek);
  mehet.disabled = false;
  visszajelzes.innerHTML = `<i class="fa-solid fa-file-circle-check"></i> Sikeres fájlbeolvasás`;
});


let megjelenito = document.getElementById("megjelenito"); // Kijelző
let beallitasok = document.getElementById("beallitasok"); // Beállítások
let jatekter = document.getElementById("jatekter"); // Játéktér

let kitalalando_szo = ""; // Mit kell kitalálni
let jelenlegi_szo = ""; // Mi van eddig kitalálva

mehet.addEventListener("click", function () {
    // Alap adatok elmentése
    kitalalando_szo = kifejezesek[0].toUpperCase();
    kifejezesek.shift();
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
let ujbeolvas = document.getElementById("ujbeolvas");
let regifolytat = document.getElementById("regifolytat");
let db = document.getElementById("db");
let yesno = document.getElementById("yesno");

ujjatek.addEventListener("click", function () {
    //Ide kell azt beírni, hogyha van még kitalálandó szavaim, akkor legyen lehetőség folytatni a sort.
    beallitasok.classList.remove("d-none");
    ellenorzes.disabled = true;

    if(kifejezesek.length > 0){
        ujbeolvas.classList.add("d-none");
        regifolytat.classList.remove("d-none");
        db.innerHTML = kifejezesek.length;
    }else{
        ujbeolvas.classList.remove("d-none");
        regifolytat.classList.add("d-none");
    }
    feltolto.value = "";
    yesno.innerHTML = "&nbsp;";

    visszajelzes.innerHTML = `<i class="fa-solid fa-file-circle-plus"></i> Nincs fájl kiválasztva.`;
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

let YES = document.getElementById("YES");
let NO = document.getElementById("NO");
YES.addEventListener("click", function () {
    mehet.disabled = false;
    yesno.innerHTML = `<i class="fa-solid fa-gamepad"></i> Mehet a játék!`;
});

NO.addEventListener("click", function () {
    mehet.disabled = true;
    ujbeolvas.classList.remove("d-none");
    regifolytat.classList.add("d-none");
    kifejezesek = [];
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
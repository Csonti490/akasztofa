// Betűméret, Téma
document.addEventListener("DOMContentLoaded", function () {
    let slider = document.getElementById("b_meret");
    let label = document.getElementById("ertek");
    let talany = document.getElementById("megjelenito");

    slider.addEventListener("input", function () {
        let meret = this.value;
        talany.style.fontSize = meret + "vw";
        label.textContent = meret + " vw";

        if(document.getElementById("temakiir").textContent == "sötét"){
            updateCookie('style_dark.css',meret);
        }else{
            updateCookie('style_light.css',meret);
        }
    });

    let temaButtons = document.querySelectorAll(".temagomb");
    temaButtons.forEach(button => {
        button.addEventListener("click", function () {
            let temaszin = this.dataset.theme;
            let tst = document.getElementById("tema");

            if (temaszin === "dark") {
                tst.setAttribute('href', 'style_dark.css');
                document.getElementById("temakiir").textContent = "sötét";
                updateCookie('style_dark.css', slider.value);
            } else {
                tst.setAttribute('href', 'style_light.css');
                document.getElementById("temakiir").textContent = "világos";
                updateCookie('style_light.css', slider.value);
            }

            temaButtons.forEach(btn => btn.disabled = false);
            this.disabled = true;
        });
    });

});

// Süti megjelenítése
document.addEventListener("DOMContentLoaded", function () {
    checkCookie();
});

// Süti ellenőrzése
function checkCookie() {
    let cookies = document.cookie.split("; ").map(cookie => cookie.split("=")[0].trim());

    if (cookies.includes("akasztofa_suti")) {
        document.getElementById("cookieConsent").style.display = "none";
    } else {
        var myModal = new bootstrap.Modal(document.getElementById('cookieConsent'));
        myModal.show();
    }
}

// Süti elfogadása (86400)
function acceptCookies() {
    document.cookie = "akasztofa_suti=" + JSON.stringify({ theme: "style_light.css", fontsize: document.getElementById("b_meret").value }) + "; max-age=259200; path=/; SameSite=None; Secure";
    document.getElementById("cookieConsent").style.display = "none";
}

// Süti frissítése
function updateCookie(t,s) {
    document.cookie = "akasztofa_suti=" + JSON.stringify({ theme: t, fontsize: s }) + "; max-age=259200; path=/; SameSite=None; Secure";

    // -=- Figura frissítése -=-
    let emberkep = document.getElementById("emberkep");
    if(emberkep){
        if (t.includes("dark")) {
            emberkep.classList.add("vilagitas");
        } else {
            emberkep.classList.remove("vilagitas");
        }
        emberkep.offsetHeight;
    }
    // -=- =-= -=-

}

function getCookie(key) {
    let cookies = document.cookie.split("; ").reduce((acc, cookie) => {
        let [cookieKey, value] = cookie.split("=");
        acc[cookieKey] = value;
        return acc;
    }, {});
    
    if (cookies.hasOwnProperty(key)) {
        try {
            let data = JSON.parse(cookies[key]); // Süti adatainak feldolgozása

            // -=- Figura frissítése -=-
            let emberkep = document.getElementById("emberkep");
            if(emberkep){
                if (data.theme.includes("dark")) {
                    emberkep.classList.add("vilagitas");
                } else {
                    emberkep.classList.remove("vilagitas");
                }
                emberkep.offsetHeight;
            }
            // -=- =-= -=-

            return Frissit(data.theme, data.fontsize); // Közvetlen függvényhívás

        } catch (e) {
            console.error("Hiba a süti feldolgozásakor:", e);
            return null;
        }
    }
    
    return null;
}

function Frissit(t,s){
    let tst = document.getElementById("tema");
    tst.setAttribute('href', t);
    document.getElementById("megjelenito").style.fontSize = s + "vw";

    let gomb = document.getElementsByClassName("temagomb");
    document.getElementById("b_meret").value = s;
    document.getElementById("ertek").textContent = s+" vw";
    if(t == "style_dark.css"){
        gomb[0].disabled = false;
        gomb[1].disabled = true;
        document.getElementById("temakiir").textContent="sötét";
    }else{
        gomb[1].disabled = false;
        gomb[0].disabled = true;
        document.getElementById("temakiir").textContent="világos";
    }
}
/* -=- Ha inaktív az oldal, akkor addig animációt játszik le -=-*/
window.addEventListener('DOMContentLoaded', () => {
    const setCim = () => {
        const ora = new Date().getHours();

        if (ora >= 8 && ora < 12) {
            document.title = "Reggeli lógás";
        } else if (ora >= 12 && ora < 20) {
            document.title = "Esti lógás";
        } else {
            document.title = "Akasztófa Játék";
        }
    };
    setCim();

    window.addEventListener('blur', () => {
        document.title = "Akasztófa | By CsontiXD";
    });
    window.addEventListener('focus', () => {
        setCim();
    });
});

let fi = document.getElementById("favicon");
let i = 1;
let DiavetitesID;

window.onfocus = function () {
    clearInterval(DiavetitesID);
    fi.setAttribute("href", "img/gray/man16-512_gray.png");
};

window.onblur = function () {
    i = 1;
    DiavetitesID = setInterval(Diavetites, 500); // elmentjük az ID-t
};

function Diavetites() {
    fi.setAttribute("href", `img/gray/man${i}-512_gray.png`);
    i = i < 16 ? i + 1 : 1;
}

/* -=- Verziók animációja -=- */
const elemek = document.querySelectorAll(".kocka");
setInterval(() => {
  elemek.forEach(elem => {
    elem.classList.remove('animat');
    void elem.offsetWidth;
    elem.classList.add('animat');
  });
}, 2500);

/* -=- Cím animációja -=- */
const title = document.getElementById('megjelenito');
const original = title.textContent;
title.innerHTML = '';

const delays = [0,1,2,3,4,5,6,7,8];

[...original].forEach((char, index) => {
  const el = document.createElement('span');
  el.className = `animated-char delay-${delays[index] || 0}`;
  el.textContent = char;
  title.appendChild(el);
});

/* -=- Eltalált betű animációja -=- */
function sit(el){
        el.classList.add('a-c');
        setTimeout(() => el.classList.remove('a-c'), 1500);
    }
    sit();

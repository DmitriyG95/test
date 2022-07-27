/* объявление переменных для манипуляции с мобильным меню */
let mobMenu = document.querySelector('.header_mob')
burgerBtn = document.querySelector('.brg_button')
backgroundMenu = document.querySelector('#bg')
closeBtn = document.querySelector('.header_mob__close')
/* открытие-закрытие */
burgerBtn.addEventListener('click', function(e) {
    showMenu()
})
closeBtn.addEventListener('click', function(e) {
    closeMenu()
})
backgroundMenu.addEventListener('click', function(e) {
    closeMenu()
})
/* функции для открытия закроытия */
function showMenu() {
    mobMenu.classList.toggle('header_mob--active');
    backgroundMenu.classList.add('bg--active')
}

function closeMenu() {
    backgroundMenu.classList.remove('bg--active')
    mobMenu.classList.remove('header_mob--active');
}
/* Раскрытие аккордеонов в мобильном меню */
let acc = document.querySelectorAll(".header_mob__acc");

for (i = 0; i < acc.length; i++) {
    acc[i].addEventListener("click", function() {
        this.classList.toggle("header_mob__acc--active");
        let accblock = this.nextElementSibling;
        if (accblock.style.maxHeight) {
            accblock.style.maxHeight = null;
        } else {
            accblock.style.maxHeight = accblock.scrollHeight + "px";
        }
    });
}

/* Высота меню */
let header = document.querySelector('header')
header.style.top = '0'

function heightHeader() {
    return header.offsetHeight
}

// Работа только на десктопе
if (window.matchMedia("(min-width: 1400px)").matches) {
    // прокрутка вниз
    window.addEventListener('scroll', function() {
        let calcscrollY = pageYOffset + 'px'
        if (calcscrollY > 200 + 'px') {
            header.style.top = '-100%'
        } else {
            header.style.top = '0'
        }
    });
    // прокрутка вверх
    let scrolltop = pageYOffset;
    window.addEventListener('scroll', function() {
        if (pageYOffset < scrolltop) {
            header.style.top = '0'
        }
        scrolltop = pageYOffset;
    });
}
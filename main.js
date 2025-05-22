document.addEventListener('DOMContentLoaded', function() {
  
  const menuBtn = document.getElementById("menu-btn");
  const navLinks = document.getElementById("liens");
  const menuBtnIcon = menuBtn.querySelector("i");

  menuBtn.addEventListener("click", () => {
    navLinks.classList.toggle("open");
    menuBtnIcon.className = navLinks.classList.contains("open") 
      ? "ri-close-line" 
      : "ri-menu-line";
  });

  
  navLinks.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("open");
      menuBtnIcon.className = "ri-menu-line";
    });
  });

  
  const sr = ScrollReveal({
    origin: 'bottom',
    distance: '40px',
    duration: 1000,
    delay: 200,
    reset: true
  });

  
  sr.reveal('.header__content .section__subheader', { delay: 300 });
  sr.reveal('.header__content .section__header', { delay: 500 });
  sr.reveal('.scroll__btn', { delay: 700 });
  sr.reveal('.reseaux', { 
    origin: 'left',
    delay: 900
  });

  
  sr.reveal('.a_propos__image-1, .a_propos__image-3', { 
    origin: 'right',
    interval: 200
  });
  
  sr.reveal('.a_propos__image-2', { 
    origin: 'left',
    delay: 300
  });

  sr.reveal('.a_propos__content-1 .section__subheader', { delay: 400 });
  sr.reveal('.a_propos__content-1 .section__header', { delay: 600 });
  sr.reveal('.a_propos__content-1 p', { delay: 800 });
  sr.reveal('.a_propos__content-1 .a_propos__btn', { delay: 1000 });

  
});
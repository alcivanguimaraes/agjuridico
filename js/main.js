document.addEventListener("DOMContentLoaded", () => {
  const navToggle = document.querySelector(".nav-toggle");
  const navMenu = document.querySelector(".nav-menu");

  // Menu mobile
  if (navToggle && navMenu) {
    navToggle.addEventListener("click", () => {
      navToggle.classList.toggle("is-open");
      navMenu.classList.toggle("is-open");
    });

    // Fecha o menu ao clicar em um link interno
    navMenu.querySelectorAll("a[href^='#']").forEach(link => {
      link.addEventListener("click", () => {
        navToggle.classList.remove("is-open");
        navMenu.classList.remove("is-open");
      });
    });
  }

  // Rolagem suave para âncoras internas
  document.querySelectorAll("a[href^='#']").forEach(link => {
    link.addEventListener("click", event => {
      const targetId = link.getAttribute("href").substring(1);
      const target = document.getElementById(targetId);

      if (target) {
        event.preventDefault();
        const offsetTop = target.getBoundingClientRect().top + window.pageYOffset - 80;

        window.scrollTo({
          top: offsetTop,
          behavior: "smooth"
        });
      }
    });
  });

  // Ano automático no rodapé
  const spanAno = document.getElementById("anoAtual");
  if (spanAno) {
    spanAno.textContent = new Date().getFullYear();
  }
});

// Sección principal
const $sectionMain = document.querySelector(".cont-principal");
$sectionMain.style.position = "relative";

// Variables de estado para el efecto de scroll
let initialTop = 20; // Posición inicial en píxeles
let initialOpacity = 1; // Opacidad inicial

document.addEventListener("scroll", () => {
  const scroll = window.scrollY;

  // Calcula el cambio en la posición y la opacidad basándote en el desplazamiento
  const topOffset = scroll > 0 ? initialTop + scroll * 0.5 : initialTop;
  const opacity = Math.max(0, initialOpacity - scroll * 0.0003); // Asegura que la opacidad no sea negativa

  // Aplica los estilos
  $sectionMain.style.top = `${topOffset}px`;
  $sectionMain.style.opacity = opacity;
});

// Manejar el desplazamiento suave y cerrar el menú al hacer clic en un enlace
document.addEventListener("DOMContentLoaded", function() {
  const contactSection = document.querySelector('.contactanos-section');
  const whatsappButton = document.querySelector('.btn-wsp');
  const instagramButton = document.querySelector('.btn-inst');

  // Crear un observador de intersección
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Ocultar los botones cuando la sección es visible
        whatsappButton.classList.add('hide-buttons');
        instagramButton.classList.add('hide-buttons');
      } else {
        // Mostrar los botones cuando la sección no es visible
        whatsappButton.classList.remove('hide-buttons');
        instagramButton.classList.remove('hide-buttons');
      }
    });
  }, {
    threshold: 0.1 // El porcentaje de la sección visible para activar el callback
  });

  // Observar la sección "CONTÁCTANOS"
  observer.observe(contactSection);

  // Manejar el desplazamiento suave y cerrar el menú al hacer clic en un enlace
  const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
  const navbarCollapse = document.querySelector('#navbarNavAltMarkup');
  
  // Margen adicional general
  const additionalMargin = 5; // Ajusta este valor según sea necesario
  
  // Margen adicional específico para ciertas secciones
  const specificMargins = {
    servicios: 42, // Ajusta este valor según sea necesario
    reseñas: 42 // Ajusta este valor según sea necesario
  };

  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault(); // Evitar el comportamiento predeterminado del enlace
      const targetId = this.getAttribute('href').substring(1); // Obtener el ID de destino
      const targetSection = document.getElementById(targetId);

      if (targetSection) {
        const navbarHeight = document.querySelector('.navbar').offsetHeight; // Obtener altura del navbar
        const margin = specificMargins[targetId] || additionalMargin; // Usar margen específico si está definido

        // Ajustar el desplazamiento para la sección "INICIO" para llevar al principio de la página
        const offsetMargin = targetId === 'inicio' ? window.scrollY : margin;

        window.scrollTo({
          top: targetId === 'inicio' ? 0 : targetSection.offsetTop - navbarHeight - margin, // Ajustar el desplazamiento
          behavior: 'smooth' // Desplazamiento suave
        });

        // Cerrar el menú después de hacer clic en un enlace
        if (navbarCollapse.classList.contains('show')) {
          const bsCollapse = new bootstrap.Collapse(navbarCollapse, {
            toggle: false
          });
          bsCollapse.hide();
        }
      }
    });
  });

  document.addEventListener('scroll', function() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');

    let current = '';

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      if (pageYOffset >= sectionTop - 50 && pageYOffset < sectionTop + sectionHeight) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });
});

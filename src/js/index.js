// animaciones
gsap.registerPlugin(ScrollTrigger);

const tl = gsap.timeline({
  scrollTrigger: {
    trigger: "#picture-inicio",
    scrub: 1,
    start: "top top",
    end: "bottom top",
  }
});

tl
  .to("#picture-inicio", { duration: .8, scale: 1 }) // 0 -> 1
  .to("#clock", { opacity: 0, duration: 0.4 }, 0.6) // 0.8 -> 1.0
  .to("#maria-logo", { opacity: 0, duration: 0.4 }, "<") // 0.8 -> 1.0
  .to("#inicio-mask", {
    maskSize: "20vh",
    duration: 0.4,
  }, 0.8) // 0.8 -> 1.2
  .to("#inicio-mask", {
    maskPosition: "50% 20%",
    duration: 0.4
  }, "<") // 0.8 -> 1.2
  .to("#picture-inicio", { opacity: 0, duration: 0.4 }, 0.9) // 0.8 -> 1.2
  .to("#seccion-mensaje", { opacity: 1, duration: 0. }, 1.2) // 1.2 -> 1.4
  .to("#dec-xv", { opacity: 0.6, duration: 0.6 }, 1.2) // 1.2 -> 1.4
  .to("#flor-b", { opacity: 0.8, duration: 0.6 }, 1.2)
  .to("#inicio-mask", { opacity: 0, duration: 0.6 }, 1.8) // 1.4 -> 1.6
  .to("#dec-xv", { opacity: 0, duration: 0.6 }, 1.8) // 1.4 -> 1.6
  .to("#flor-b", { opacity: 0, duration: 0.6 }, "<")
  .to("#inferiorD", { opacity: 1, duration: 0.6 }, ">")
  .to("#inferiorZ", { opacity: 1, duration: 0.6 }, "<")
  .to("#seccion-mensaje", { opacity: 0, scale: 0.5, duration: 0.6 }, 1.8) // 1.4 -> 1.6
  .to("#cuerpo", { opacity: 1, duration: 0.3 }, "<") // 1.4 -> 1.6
  .to("#footer", { opacity: 1, duration: 0.3 }, "<"); // 1.4 -> 1.6

// Animación del footer para que se desvanezca al final del scroll
gsap.to("#footer", {
  opacity: 0,
  scrollTrigger: {
    trigger: "body",
    start: "bottom bottom",
    end: "bottom bottom",
    scrub: 1,
  }
});

gsap.to("#footer", {
  
  scrollTrigger: {
    trigger: "body",
    start: "bottom bottom",
    end: "bottom bottom",
    scrub: 1,
  }
});

gsap.from("#fecha", {
  opacity: 0,
  scale: 0.5,
  scrollTrigger: {
    trigger: "#fecha",
    start: "top 80%",
    end: "top 50%",
    scrub: 1,
  }
});

gsap.from("#clock", {
  opacity: 0,
  scale: 0.5,
});
gsap.from("#maria-logo", {
  opacity: 0,
  scale: 0.8,
  y: -100,
  duration: 0.5,
  delay: 0.3,
  ease: "back.out(1.7)",
});

gsap.from("#bienvenida", {
  opacity: 0,
  scale: 0.5,
  scrollTrigger: {
    trigger: "#bienvenida",
    start: "top 80%",
    end: "top 50%",
    scrub: 1,
  }
});

gsap.from("#titulo-ubicacion", {
  opacity: 0,
  y: -50,
  duration: 1,
  ease: "back.out(1.7)",
  scrollTrigger: {
    trigger: "#seccion-ubicacion",
    start: "top 80%",
    end: "top 50%",
    scrub: 1,
  }
});

gsap.from("#icono-ubicacion", {
  opacity: 0,
  scale: 0,
  rotation: 360,
  duration: 1.2,
  ease: "elastic.out(1, 0.5)",
  scrollTrigger: {
    trigger: "#seccion-ubicacion",
    start: "top 75%",
    end: "top 45%",
    scrub: 1,
  }
});

gsap.from("#mapa-ubicacion", {
  opacity: 0,
  scale: 0.8,
  y: 100,
  duration: 1.5,
  ease: "power2.out",
  scrollTrigger: {
    trigger: "#mapa-ubicacion",
    start: "top 85%",
    end: "top 55%",
    scrub: 1,
  }
});


// animación de la descripción
gsap.from("#descripcion-ubicacion", {
  opacity: 0,
  y: 50,
  duration: 1,
  ease: "power2.out",
  scrollTrigger: {
    trigger: "#descripcion-ubicacion",
    start: "top 90%",
    end: "top 70%",
    scrub: 1,
  }
});

const ubicacionTimeline = gsap.timeline({
  scrollTrigger: {
    trigger: "#seccion-ubicacion",
    start: "top 70%",
    end: "bottom 30%",
    scrub: false,
    once: true,
  }
});


ubicacionTimeline
  .from("#titulo-ubicacion h2", {
    opacity: 0,
    y: -30,
    duration: 0.8,
    ease: "power2.out"
  })
  .from("#mapa-ubicacion", {
    opacity: 0,
    scale: 0.9,
    y: 50,
    duration: 1,
    ease: "power2.out"
  }, "-=0.3")
  .from("#descripcion-ubicacion p", {
    opacity: 0,
    y: 30,
    duration: 0.6,
    ease: "power2.out"
  }, "-=0.5");


// efecto hover para el mapa
const mapaElement = document.getElementById('mapa-ubicacion');
if (mapaElement) {
  mapaElement.addEventListener('mouseenter', () => {
    gsap.to("#mapa-ubicacion", {
      scale: 1.05,
      duration: 0.3,
      ease: "power2.out"
    });
  });

  mapaElement.addEventListener('mouseleave', () => {
    gsap.to("#mapa-ubicacion", {
      scale: 1,
      duration: 0.3,
      ease: "power2.out"
    });
  });
}

// cuenta regresiva
const countdown = () => {
  const targetDate = new Date("2025-08-16T20:00:00"); // 16 de agosto, 8:00 PM
  const now = new Date();
  const difference = targetDate - now;

  if (difference <= 0) {
    document.getElementById("clock").innerHTML = "<p class='text-red-500 text-2xl'>¡La cuenta regresiva ha terminado!</p>";
    clearInterval(timer);
    return;
  }

  const seconds = Math.floor((difference / 1000) % 60);
  const minutes = Math.floor((difference / 1000 / 60) % 60);
  const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
  const days = Math.floor(difference / (1000 * 60 * 60 * 24));

  document.getElementById("days").textContent = days;
  document.getElementById("hours").textContent = hours;
  document.getElementById("minutes").textContent = minutes;
  document.getElementById("seconds").textContent = seconds;
};

const timer = setInterval(countdown, 1000);
countdown(); // Llamada inicial

// lluvia de sobres
function crearSobre() {
  const sobre = document.createElement('div');
  sobre.className = 'sobre sobre-lluvia absolute';

  // Posición aleatoria horizontal
  const margen = 100; // margen en px para evitar el borde derecho
  const posX = Math.random() * (window.innerWidth - margen);


  sobre.style.left = posX + 'px'; // Ajustar para centrar el sobre

  // Tamaño aleatorio
  const escala = 0.3 + Math.random() * 0.7; // Entre 0.3 y 1
  sobre.style.transform = `scale(${escala})`;

  // Velocidad aleatoria
  const duracion = 2.5 + Math.random() * 2.5; // Entre 2.5 y 5 segundos
  sobre.style.animationDuration = duracion + 's';

  return sobre;
}

function iniciarLluviaSobres() {
  const contenedor = document.getElementById('lluvia-container');
  let sobresCreados = 0;
  const maxSobres = 60;

  contenedor.innerHTML = '';

  const intervalo = setInterval(() => {
    if (sobresCreados >= maxSobres + 100) {
      clearInterval(intervalo);
      return;
    }

    if (sobresCreados < maxSobres) {
      const sobre = crearSobre();
      contenedor.appendChild(sobre);
      // Agregar clase para la animación de caída
      setTimeout(() => {
        sobre.classList.add('falling');
      }, 10);

      setTimeout(() => {
        if (sobre.parentNode) {
          sobre.parentNode.removeChild(sobre);
        }
      }, 10000);
    }

    sobresCreados++;
  }, 100); // Crear un sobre cada 80ms para más densidad
}

// Event listener para el botón
document.addEventListener('DOMContentLoaded', function () {
  const startButton = document.getElementById('start-button');
  if (startButton) {
    startButton.addEventListener('click', function () {
      // Cambiar el texto del botón
      this.textContent = '¡Gracias por confirmar!';
      // this.disabled = true;
      this.classList.add('bg-green-500');
      this.classList.remove('bg-verde-medio', 'hover:bg-verde-claro');


      
      // Hacer petición al backend para cambiar asistencia
      const nombre = this.value;
      fetch('/cambiarAsistencia', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nombre: nombre,
        })
      })
        .then(response => response.json())
        .then(data => {
          if (data.success) {
            // console.log(data.message);
            // Iniciar la lluvia de sobres solo si la petición fue exitosa
            iniciarLluviaSobres();

          } else {
            console.error('Error al confirmar asistencia:', data.message);
            // Mostrar mensaje de error al usuario
            alert('Error al confirmar asistencia. Por favor intenta de nuevo.');
          }
        })
        .catch(error => {
          console.error('Error en la petición:', error);
          alert('Error de conexión. Por favor intenta de nuevo.');
        });
    });
  }
});



const audio = new Audio("/assets/music/A-las-hadas-reunirán-TinkerBell.mp3");

window.addEventListener('load', () => {
    const loader = document.getElementById('loader');
    const content = document.getElementById('main-content');

    // Oculta el loader con fade-out
    loader.classList.add('opacity-0', 'transition-opacity', 'duration-500');

    // Espera la transición y muestra el contenido
    loader.style.display = 'none';
      content.classList.remove('opacity-0');
    setTimeout(() => {
      
        Swal.fire({
        title: "🎶 Activar audio",
        text: "Haz clic para comenzar",
        customClass: {
          popup: 'glass-alert'
        },
        backdrop: 'rgba(0,0,0,0.2)'
      }).then(() => {
        audio.volume = 0.3;
        audio.play().catch(err => console.warn("Autoplay fallido:", err));
        document.getElementById("btnReanudar").style.display = "none";
      });
      }, 700);
  });

  function pausarMusica() {
    if (!audio.paused) {
      audio.pause();
      document.getElementById("btnPausar").style.display = "none";
      document.getElementById("btnReanudar").style.display = "inline-block";
    }
  }

  function reanudarMusica() {
    if (audio.paused) {
      audio.play();
      document.getElementById("btnReanudar").style.display = "none";
      document.getElementById("btnPausar").style.display = "inline-block";
    }
  }
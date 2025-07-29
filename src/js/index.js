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
    duration: 0.4 
  }, 0.8) // 0.8 -> 1.2
  .to("#inicio-mask", { 
    maskPosition: "50% 20%", 
    duration: 0.4 
  }, "<") // 0.8 -> 1.2
  .to("#picture-inicio", { opacity: 0, duration: 0.4 }, "<") // 0.8 -> 1.2
  .to("#seccion-mensaje", { opacity: 1, duration: 0.2 }, 1.2) // 1.2 -> 1.4
  .to("#inicio-mask", { opacity: 0, duration: 0.6 }, 1.4) // 1.4 -> 1.6
  .to("#seccion-mensaje", { opacity: 0, scale: 0.5, duration: 0.6 }, 1.6) // 1.4 -> 1.6
  .to("#cuerpo", { opacity: 1, duration: 0.3 }, "<"); // 1.4 -> 1.6

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
  ease: "back.out(1.7)",});

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

function crearSobre() {
  const sobre = document.createElement('div');
  sobre.className = 'sobre sobre-lluvia';
  
  // Posición aleatoria horizontal
  const posX = Math.random() * window.innerWidth;
  sobre.style.left = posX + 'px';
  
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
  const maxSobres = 70; 
  
  contenedor.innerHTML = '';
  
  const intervalo = setInterval(() => {
    if (sobresCreados >= maxSobres + 10) {
      clearInterval(intervalo);
      return;
    }
    
    if(sobresCreados < maxSobres){
      const sobre = crearSobre();
      contenedor.appendChild(sobre);
      // Agregar clase para la animación de caída
      setTimeout(() => {
        sobre.classList.add('falling');
      }, 10);  
    }


    setTimeout(() => {
      if (sobre.parentNode) {
        sobre.parentNode.removeChild(sobre);
      }
    }, 6000);
    
    sobresCreados++;
  }, 110); // Crear un sobre cada 80ms para más densidad
}

// Event listener para el botón
document.addEventListener('DOMContentLoaded', function() {
  const startButton = document.getElementById('start-button');
  if (startButton) {
    startButton.addEventListener('click', function() {
      iniciarLluviaSobres();
      
      // Cambiar el texto del botón
      this.textContent = '¡Gracias por confirmar!';
      this.disabled = true;
      this.classList.add('bg-green-500');
      this.classList.remove('bg-verde-medio', 'hover:bg-verde-claro');
      
      // Agregar efecto de confeti adicional
      setTimeout(() => {
        this.innerHTML = '<i class="fas fa-heart mr-2"></i>¡Gracias por confirmar!';
      }, 2000);
    });
  }
});


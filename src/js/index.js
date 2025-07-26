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
  .to("#inicio-mask", { opacity: 0, duration: 0.4 }, 1.4) // 1.4 -> 1.6
  .to("#seccion-mensaje", { opacity: 0, scale: 0.5, duration: 0.3 }, 1.6) // 1.4 -> 1.6
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


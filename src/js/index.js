gsap.registerPlugin(ScrollTrigger);

const tl = gsap.timeline({
  scrollTrigger: {
    trigger: "#picture-inicio",
    scrub: 1,
  }
});

tl
  .to("#picture-inicio", { duration: 1, scale: 1 }) // 0 -> 1
  .to("#clock", { opacity: 0, duration: 0.2 }, 0.8) // 0.8 -> 1.0
  .to("#inicio-mask", { maskSize: "clamp(20vh, 25%, 30vh)" }, 0.8) // 0.8 -> 1.0
  .to("#inicio-mask", { maskPosition: "50% 20%" }, "<") // 0.8 -> 1.0
  .to("#picture-inicio", { opacity: 0, duration: 0.4 }, "<") // 0.8 -> 1.2
  .to("#seccion-fecha", { opacity: 1, duration: 0.2 }, 1.2) // 1.2 -> 1.4
  .to("#inicio-mask", { opacity: 0, duration: 0.2 }, 1.4)// 1.4 -> 1.6 (último evento)
  .to("#seccion-fecha", { opacity: 0, duration: 0.2 }, "<")// 1.2 -> 1.4
  .to("#cuerpo", { opacity: 1, duration: 0.2 }, "<")// 1.2 -> 1.4
  // .to("#inicio-mask", { display: none }); // 0.8 -> 1.0
  
  /*ScrollTrigger.create({
  trigger: "#seccion-ubicacion",
  start: "top center",
  onEnter: () => {
    gsap.to("#inicio-mask", {
      opacity: 0,
      duration: 0.5,
      onComplete: () => {
        document.getElementById("inicio-mask").classList.add("hidden");
      }
    });
  },
  onLeaveBack: () => {
    const mask = document.getElementById("inicio-mask");
    mask.classList.remove("hidden");
    gsap.to(mask, { opacity: 1, duration: 0.5 });
  }
});*/


// const conn = new Conexion();
//
// async function main() {
//     // await conn.insertar("Edgar", 198, 3);
//     // conn.eliminar(47)
//     // conn.actualizar(48,"edgar",23,4);
//     conn.asistencia(94,0);
//     let invitado = await conn.getByName("Edgar");
//     console.log(invitado);
//     conn.cerrar();
// }
//
// main();


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



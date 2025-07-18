gsap.registerPlugin(ScrollTrigger);

const tl = gsap.timeline({
  scrollTrigger: {
    trigger: "#picture-inicio",
    scrub: 1,
  }
});

tl.to("#picture-inicio", { duration: 1, scale: 1 })
  .to("#inicio-mask", { maskSize: "clamp(20vh, 25%, 30vh)" })
  .to("#inicio-mask", { maskPosition: "50% 20%" },"<")
  .to("#picture-inicio", { opacity: 0, duration: 1 },"<");
//   .to("#inicio-mask", { opacity: 0 , duration: 0.2},0.4);

console.log("Inicio");
// const conn = new Conexion();

// async function main() {
//     // await conn.insertar("Edgar", 198, 3);
//     // conn.eliminar(47)
//     // conn.actualizar(48,"edgar",23,4);
//     conn.asistencia(94,0);
//     let invitado = await conn.getByName("Edgar");
//     console.log(invitado);
//     conn.cerrar();
// }

// main();
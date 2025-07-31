const express = require("express");
const router = express.Router();
const { Conexion } = require("../../config/conexion"); // o ajusta según exportes
const conn = new Conexion();

router.post("/cambiarAsistencia", async function(req, res) {
    const nombre = req.body.nombre;
  
    try {
      await conn.confirmarAsistencia(nombre);
      console.log("Asistencia actualizada correctamente para: ", nombre);
      res.json({ success: true, message: "Asistencia confirmada correctamente" });
    } catch (error) {
      console.error("Error al cambiar la asistencia:", error);
      res.status(500).json({ success: false, message: "Error al confirmar asistencia" });
    }
  });

router.get("/", async (req, res) => {
  res.render("login");
})

router.get("/crud_invitados", async (req, res) => {

  if(!req.session.login) {
    res.render("login", { mensaje : "Sesión no encontrada. Por favor, debes iniciar sesión."})
  } else {
    try {
      const invitados = await conn.getAll();
      res.render("crud_invitados", { invitados });
    } catch (error) {
      console.error("Error al obtener los invitados:", error);
      res.status(500).send("No se pudieron cargar los invitados");
    }
  }
});

router.get("/agregar_invitado", function(req, res) {
  res.render("agregar_invitado");
})

router.get("/editar_invitado/:id", async function(req, res) {
  const id = req.params.id;

  try {
    const invitado = await conn.getById(id);
    console.log("Invitado cargado correctamente: ", id);
    console.log("Invitado: ", invitado);

    res.render("editar_invitado", {
      id: invitado.id,
      nombre: invitado.nombre,
      mesa: invitado.numero_mesa,
      numInvitados: invitado.numero_invitado
    });

  } catch (error) {
    console.error("Error al obtener los datos del invitado:", error);
    res.status(500).send("Error al obtener los datos del invitado");
  }
  //res.render("editar_invitado");
})

router.get("/login", function(req, res) {
  res.render("login");
})

router.get("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error("Error al cerrar sesión:", err);
      return res.status(500).send("Error al cerrar sesión");
    }

    res.redirect("/"); // o "/login"
  });
});

router.get(/^\/([a-zA-Z]+)$/, async (req, res) => {

  const match = req.url.match(/^\/([a-zA-Z]+)$/);
  const nombre = match ? match[1] : null;

  if (!nombre) {
    return res.status(400).send("Nombre no válido en la URL.");
  }
  
    try {
        const invitado = await conn.getByName(nombre);
        console.log("Invitado: ", invitado );

        res.render("index", {
          id: invitado.id,
          nombre: invitado.nombre,
          mesa: invitado.numero_mesa,
          numInvitados: invitado.numero_invitado,
          asistencia: invitado.asistencia || 0
        });

      } catch (error) {
        console.error("Error al obtener los datos del invitado:", error);
        res.status(500).send("Error al obtener los datos del invitado");
      }
})

module.exports = router;
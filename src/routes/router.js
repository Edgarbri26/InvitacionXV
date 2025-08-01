const express = require("express");
const router = express.Router();
const { Conexion } = require("../../config/conexion"); // o ajusta según exportes
const conn = new Conexion();

router.post("/cambiarAsistencia", async function (req, res) {
  const nombre = req.body.nombre;

  try {
    await conn.confirmarAsistencia(nombre);
    // console.log("Asistencia actualizada correctamente para: ", nombre);
    req.session.invitado.asistencia = 1;
    res.json({ success: true, message: "Asistencia confirmada correctamente" });
  } catch (error) {
    console.error("Error al cambiar la asistencia:", error);
    res.status(500).json({ success: false, message: "Error al confirmar asistencia" });
  }
});

router.get("/", async (req, res) => {
  if (req.session.invitado) {
    const invitado = req.session.invitado
    const nombre = invitado.nombre
    res.redirect("/" + nombre);
  }
  res.render("login");
})

router.get("/crud_invitados", async (req, res) => {

  if (!req.session.login) {
    res.render("login", { mensaje: "Sesión no encontrada. Por favor, debes iniciar sesión." })
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

router.get("/agregar_invitado", function (req, res) {
  res.render("agregar_invitado");
})

router.get("/editar_invitado/:id", async function (req, res) {
  const id = req.params.id;

  try {
    const invitado = await conn.getById(id);
    // console.log("Invitado cargado correctamente: ", id);
    // console.log("Invitado: ", invitado);
    
    // Capitalizar el nombre para mostrar en el formulario
    const nombreCapitalizado = invitado.nombre.replace(/\b\w/g, letra => letra.toUpperCase());

    res.render("editar_invitado", {
      id: invitado.id,
      nombre: nombreCapitalizado,
      mesa: invitado.numero_mesa,
      numInvitados: invitado.numero_invitado
    });

  } catch (error) {
    console.error("Error al obtener invitado:", error);
    res.status(500).send("Error al obtener invitado");
  }
  //res.render("editar_invitado");
})

router.get("/login", function (req, res) {

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

router.get(/^\/([\w%]+(?:%20[\w%]+)*)$/, async (req, res) => {

  const match = req.url.match(/^\/([\w%]+(?:%20[\w%]+)*)$/);
  const nombreCodificado = match ? match[1] : null;
  const nombre = decodeURIComponent(nombreCodificado);

  if (!nombre) {
    return res.status(400).send("Nombre no válido en la URL.");
  }

  try {
    let invitado;

    // Verificar si ya tenemos los datos en la sesión y si es el mismo invitado
    if (req.session.invitado && req.session.invitado.nombre === nombre) {
      console.log("DATOS OBTENIDOS DE LA SESIÓN");
      invitado = req.session.invitado;
    } else {
      console.log("SE LLAMA A LA BASE DE DATOS");
      invitado = await conn.getByName(nombre);

      if (!invitado) {
        return res.status(404).send("Invitado no encontrado");
      }

      // Guardar en la sesión
      req.session.invitado = {
        id: invitado.id,
        nombre: invitado.nombre,
        numero_mesa: invitado.numero_mesa,
        numero_invitado: invitado.numero_invitado,
        asistencia: invitado.asistencia || 0
      };
    }

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
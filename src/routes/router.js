const express = require("express");
const router = express.Router();
const { Conexion } = require("../../config/conexion"); // o ajusta según exportes
const conn = new Conexion();

router.get("/", function(req, res) {
    res.render("index");
})

router.get("/crud_invitados", async (req, res) => {
  try {
    const invitados = await conn.getAll();
    res.render("crud_invitados", { invitados });
  } catch (error) {
    console.error("Error al obtener los invitados:", error);
    res.status(500).send("No se pudieron cargar los invitados");
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

module.exports = router;
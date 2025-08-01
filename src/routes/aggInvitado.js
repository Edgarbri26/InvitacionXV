const express = require("express");
const router = express.Router();
const { Conexion } = require("../../config/conexion");
const conn = new Conexion();

router.post("/aggInvitado", async function(req, res) {
  const nombreInvitado = req.body.CampNom.trim().toLowerCase(); // Guardar en minúsculas
  const mesaInvitado = req.body.CampMesa;
  const numInvitados = req.body.CampNum;

  try {
    await conn.insertar(nombreInvitado, mesaInvitado, numInvitados);
    // console.log("Invitado agregado correctamente: ", nombreInvitado);

    try {
      const invitados = await conn.getAll();
      res.render("crud_invitados", { invitados, message: "Invitado agregado correctamente" });
    } catch (error) {
      console.error("Error al obtener los invitados:", error);
      res.status(500).send("No se pudieron cargar los invitados");
    }

  } catch (error) {
    console.error("Error al agregar invitado:", error);
    res.status(500).send("Error al agregar invitado");
  }
});

module.exports = router;
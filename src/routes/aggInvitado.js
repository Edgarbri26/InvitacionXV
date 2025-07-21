const express = require("express");
const router = express.Router();
const { Conexion } = require("../../config/conexion");

const conn = new Conexion();

router.post("/aggInvitado", async function(req, res) {
  const nombreInvitado = req.body.CampNom;
  const mesaInvitado = req.body.CampMesa;
  const numInvitados = req.body.CampNum;

  try {
    await conn.insertar(nombreInvitado, mesaInvitado, numInvitados);
    console.log("Invitado agregado correctamente");
    
    try {
        const invitados = await conn.getAll();
        res.render("crud_invitados", { invitados, message: "Invitado agregado correctamente"});
    } catch (error) {
        console.error("Error al obtener los invitados:", error);
        res.status(500).send("No se pudieron cargar los invitados");
    }
    //res.render("crud_invitados", { message: "Invitado agregado correctamente" });
  } catch (error) {
    console.error("Error al agregar el invitado:", error);
    res.status(500).send("Error al agregar el invitado");
  }
});

module.exports = router;
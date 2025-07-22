const express = require("express");
const router = express.Router();
const { Conexion } = require("../../config/conexion");

const conn = new Conexion();

router.post("/eliminarInvitado", async function(req, res) {
  const id = req.body.id;

  try {
    await conn.eliminar(id);
    console.log("Invitado eliminado correctamente: ", id);

    res.json({
        success: true,
        message: "Invitado eliminado correctamente.",
        idEliminado: id
    });
  } catch (error) {
    console.error("Error al eliminar el invitado:", error);
    res.status(500).send("Error al elimianr el invitado");
  }
});

module.exports = router;
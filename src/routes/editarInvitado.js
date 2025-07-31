const express = require("express");
const router = express.Router();
const { Conexion } = require("../../config/conexion");

const conn = new Conexion();

router.post("/editarInvitado", async function(req, res) {
  const id = req.body.CampId;
  const nombreInvitado = req.body.CampNom;
  const mesaInvitado = req.body.CampMesa;
  const numInvitados = req.body.CampNum;

    try {
        await conn.actualizar(id, nombreInvitado, mesaInvitado, numInvitados);
        // console.log("Invitado actualizado correctamente: ", id);

        try {
            const invitados = await conn.getAll();
            res.render("crud_invitados", { invitados, message: "Invitado actualizado correctamente"});

        } catch (error) {
            console.error("Error al obtener los invitados:", error);
            res.status(500).send("No se pudieron cargar los invitados");
        }
    } catch (error) {
        console.error("Error al actualizar los datos del invitado:", error);
        res.status(500).send("Error al actualizar los datos del invitado");
    }
});

module.exports = router;
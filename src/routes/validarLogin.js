const express = require("express");
const router = express.Router();
const { Conexion } = require("../../config/conexion");

const conn = new Conexion();

router.post("/validarLogin", async function(req, res) {
    const nombre = req.body.CampNom;

    try {

        if(nombre == 'admin') {
            try {
                const invitados = await conn.getAll();
                res.render("crud_invitados", { invitados });
            } catch (error) {
                console.error("Error al obtener los invitados:", error);
                res.status(500).send("No se pudieron cargar los invitados");
            }
        } else {

            try {
                const invitado = await conn.getByName(nombre);

                console.log("Invitado encontrado correcasdastamente: ", invitado);

                res.render("index", { nombre: invitado.nombre } );

            } catch (error) {
                console.error("Error al obtener los invitados:", error);
                res.status(500).send("");
            }
        }

    } catch (error) {
        console.error("Error al actualizar los datos del invitado:", error);
        res.status(500).send("Error al actualizar los datos del invitado");
    }
});

module.exports = router;
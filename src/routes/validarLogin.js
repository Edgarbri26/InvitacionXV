const express = require("express");
const router = express.Router();
const { Conexion } = require("../../config/conexion");

const conn = new Conexion();

router.post("/validarLogin", async function(req, res) {
    const nombre = req.body.CampNom;
    const contra = req.body.CampClave;

    try {

        if(nombre == 'eudys') {
            try {
                const user = await conn.getByUser(nombre);

                if (!user) {
                    return res.status(401).send("Usuario no encontrado.");
                }

                if (user.contraseña !== contra) {
                    return res.status(401).send("Contraseña incorrecta.");
                }
                
                req.session.login = true;
                req.session.id = user.id;
                req.session.nombre = user.nombre;
                console.log(req.session);

                const invitados = await conn.getAll();
                res.render("crud_invitados", { invitados,  datos: req.session });

            } catch (error) {
                console.error("Error al obtener los invitados:", error);
                res.status(500).send("No se pudieron cargar los invitadoss.");
            }
        } else {

            try {
                const invitado = await conn.getByName(nombre);

                console.log("Invitado encontrado correcasdastamente: ", invitado);

                res.redirect(`/${invitado.nombre}`);

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
const express = require("express");
const router = express.Router();
const { Conexion } = require("../../config/conexion");

const conn = new Conexion();

router.post("/validarLogin", async function(req, res) {
    const nombreOriginal = req.body.CampNom.trim();
    const nombreParaBuscar = nombreOriginal.toLowerCase(); // Para buscar en BD
    const nombreParaRuta = nombreOriginal.replace(/\s+/g, ''); // Para la URL
    const contra = req.body.CampClave;

    try {

        if(nombreOriginal.toLowerCase() === 'eudys') {
            try {
                const user = await conn.getByUser('eudys');

                if (!user) {
                    return res.status(401).send("Usuario no encontrado.");
                }

                if (user.contraseña !== contra) {
                    return res.render("login", { message: "Contraseña incorrecta. Por favor, inténtalo de nuevo." });
                }
                
                req.session.login = true;
                req.session.id = user.id;
                req.session.nombre = user.nombre;
                // console.log(req.session);

                const invitados = await conn.getAll();
                res.render("crud_invitados", { invitados,  datos: req.session });

            } catch (error) {
                console.error("Error al obtener los invitados:", error);
                res.status(500).send("No se pudieron cargar los invitadoss.");
            }
        } else {

            try {
                const invitado = await conn.getByName(nombreParaBuscar);

                if (!invitado) {
                    res.render("login", { message : `El nombre: ${nombreOriginal} no se encuentra en la lista de invitados` })
                    // console.log("probando esta monda", invitado);
                }

                // console.log("Invitado encontrado correcasdastamente: ", invitado);
                
                if (invitado ){
                    res.redirect(`/${nombreParaRuta}`);
                }

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

function capitalizarPalabras(str) {
    return str.replace(/\b\w/g, letra => letra.toUpperCase());
}
  
function capitalizarYEliminarEspacios(str) {
    return str
      .replace(/\b\w/g, letra => letra.toUpperCase())
      .replace(/\s+/g, '');
  }
  

module.exports = router;
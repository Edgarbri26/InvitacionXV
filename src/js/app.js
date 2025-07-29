const express = require('express');
const path = require("path");
const app = express();

// Configuración de la aplicación
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "../", "views")); // ejemplo si está en src/views

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//Rutas:::::::::::::::::::::::::::::::::::::::::
app.use(require('../routes/router.js'));
app.use(express.static("public"));//public ya no exixte 
app.use("/assets", express.static(path.join(__dirname, "../../assets")));
app.use("/src", express.static(path.join(__dirname, "../")));
app.use(require('../routes/aggInvitado.js'));
app.use(require('../routes/eliminarInvitado.js'));
app.use(require('../routes/editarInvitado.js'));
app.use(require('../routes/validarLogin.js'));

//configuración del puerto del servidor
const PORT = process.env.PORT || 3000;

app.listen(PORT,() => {
    if(PORT === 3000) {
        console.log("Servidor corriendo en el puerto 3000");
        console.log("http://localhost:3000/edgar");
    } else {
        console.log(`Servidor corriendo en el puerto ${PORT}`);
    }
})
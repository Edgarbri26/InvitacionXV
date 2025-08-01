const express = require('express');
const session = require("express-session");
const path = require("path");
const app = express();

// Configuración de la aplicación
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "./src", "views")); // ejemplo si está en src/views

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//manejo de sesiones
app.use(session({
    secret: "tu_contraseña",
    resave: false,
    saveUninitialized: false
}));

//Rutas:::::::::::::::::::::::::::::::::::::::::
app.use(require('./src/routes/router.js'));
// app.use(express.static("public"));//public ya no exixte 
app.use("/assets", express.static(path.join(__dirname, "./assets")));
app.use("/src", express.static(path.join(__dirname, "./src")));
app.use(require('./src/routes/aggInvitado.js'));
app.use(require('./src/routes/eliminarInvitado.js'));
app.use(require('./src/routes/editarInvitado.js'));
app.use(require('./src/routes/validarLogin.js'));

//configuración del puerto del servidor
const PORT = process.env.PORT || 3000;

app.listen(PORT,() => {
    if(PORT === 3000) {
        console.log("Servidor corriendo en el puerto 3000");
        console.log("http://localhost:3000");
    } else {
        console.log(`Servidor corriendo en el puerto ${PORT}`);
    }
});
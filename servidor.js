const http = require("http");
const fs = require("fs");
const path = require("path");
const { Conexion } = require("./src/js/conexion.js");
const querystring = require("querystring");

const db = new Conexion();

const server = http.createServer((req, res) => {
  if (req.method === "GET" && req.url === "/") {
    // Mostrar formulario HTML
    fs.readFile(path.join(__dirname, "/src/html/crud_invitados.html"), (err, data) => {
      res.writeHead(200, { "Content-Type": "text/html" });
      res.end(data);
    });

  } else if (req.method === "POST" && req.url === "/insertar") {
    // Recibir datos del formulario
    let body = "";
    req.on("data", chunk => {
      body += chunk.toString();
    });

    req.on("end", () => {
      const form = querystring.parse(body);
      const { nombre, numMesa, numinvitado } = form;

      db.insertar(nombre, numMesa, numinvitado)
        .then(() => {
          res.writeHead(200, { "Content-Type": "text/html" });
          res.end("<h2>Invitado insertado correctamente</h2>");
        })
        .catch(err => {
          res.writeHead(500, { "Content-Type": "text/plain" });
          res.end("Error: " + err.message);
        });
    });
  } else {
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("Ruta no encontrada");
  }
});

server.listen(3000, () => {
  console.log("Servidor funcionando en http://localhost:3000");
});

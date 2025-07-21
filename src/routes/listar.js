const express = require("express");
const router = express.Router();
const { Conexion } = require("../../config/conexion"); // o ajusta según exportes
const conn = new Conexion();

router.get("/crud_invitados", async (req, res) => {
  try {
    const invitados = await conn.getAll();
    res.render("crud_invitados", { invitados });
  } catch (error) {
    console.error("Error al obtener los invitados:", error);
    res.status(500).send("No se pudieron cargar los invitados");
  }
});
const {Conexion} = require("./conexion");

const conn = new Conexion();

async function main() {
    // await conn.insertar("Edgar", 198, 3);
    // conn.eliminar(47)
    conn.actualizar(48,"edgar",23,4);
    let invitado = await conn.getByName("Edgar");
    console.log(invitado);
    conn.cerrar();
}

main();
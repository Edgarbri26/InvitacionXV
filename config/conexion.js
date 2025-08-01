class Conexion {

    constructor() {
        this.mysql = require("mysql");
        this.conn = this.mysql.createPool({
            host: "mysql-mariaxv.alwaysdata.net",
            database: "mariaxv_bd", // <-- minúsculas
            user: "mariaxv",
            password: "Edgarbri26.",
            // port: "3306"
        });

        /*this.conn.connect(function(err) {
            if (err){
                throw err;
            } else {
                console.log("Conexión exitosa a la base de datos");
            }
        });*/
    }

    insertar(nombre, numMesa, numinvitado) {
        return new Promise((resolve, reject) => {
            const comando = "INSERT INTO invitado (nombre, numero_mesa, numero_invitado) VALUES (?, ?, ?)";
            this.conn.query(comando, [nombre, numMesa, numinvitado], function(err, resultado) {
                if (err) {
                    reject(err);
                } else {
                    resolve(resultado);
                }
            });
        });
    }

    actualizar(id, nombre, numMesa, numinvitado) {
        return new Promise((resolve, reject) => {
            const comando = "UPDATE invitado SET nombre = ?, numero_mesa = ?, numero_invitado = ? WHERE id = ?";
            this.conn.query(comando, [nombre, numMesa, numinvitado, id], function(err, resultado) {
                if (err) {
                    reject(err);
                } else {
                    resolve(resultado);
                }
            });
        });
    }

    eliminar(id) {
        return new Promise((resolve, reject) => {
            const comando = "DELETE FROM invitado WHERE id = ?";
            this.conn.query(comando, [id], function(err, resultado) {
                if (err) {
                    reject(err);
                } else {
                    resolve(resultado);
                }
            });
        });
    }

    getByName(nombre) {
        return new Promise((resolve, reject) => {
            const coman = "SELECT * FROM invitado WHERE nombre = ?";
            this.conn.query(coman, [nombre], function(err, invitado) {
                if (err) {
                    reject(err);
                } else {
                    resolve(invitado[0]);
                }
            });
        });
    }

    getByUser(user) {
        return new Promise((resolve, reject) => {
            const coman = "SELECT * FROM users WHERE nombre = ?";
            this.conn.query(coman, [user], function(err, user) {
                if (err) {
                    reject(err);
                } else {
                    resolve(user[0]);
                }
            });
        });
    }

    getById(id) {
        return new Promise((resolve, reject) => {
            const coman = "SELECT * FROM invitado WHERE id = ?";
            this.conn.query(coman, [id], function(err, invitado) {
            if (err) {
                reject(err);
            } else {
                resolve(invitado[0]);
            }
            });
        });
    }

    getAll() {
        return new Promise((resolve, reject) => {
            let coman = "SELECT * FROM invitado";
            this.conn.query(coman, function(err, lista) {
                if (err) {
                    reject(err);
                } else {
                    resolve(lista);
                }
            });
        });
    }

    confirmarAsistencia(nombre){
        return new Promise((resolve, reject) => {
            const comando = "UPDATE invitado SET asistencia = ? WHERE nombre = ?";
            this.conn.query(comando, [true, nombre], function(err, resultado) {
                if (err) {
                    reject(err);
                } else {
                    // console.log("Asistencia actualizada para:", nombre);
                    resolve(resultado);
                }
            });
        })
    }

    cerrar(){
        this.conn.end();
    }

}

module.exports = { Conexion };
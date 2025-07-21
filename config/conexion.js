class Conexion {

    constructor() {
        this.mysql = require("mysql");
        this.conn = this.mysql.createPool({
            host: "brbjs3krzs9xr6i3wcdv-mysql.services.clever-cloud.com",
            database: "brbjs3krzs9xr6i3wcdv", // <-- minúsculas
            user: "uoazfsvh2xeo7ce0",
            password: "cXf09VfUlelli3aWerFU",
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
            let coman = "SELECT * FROM invitado WHERE nombre = '" + nombre + "'";
            this.conn.query(coman, function(err, invitado) {
                if (err) {
                    reject(err);
                } else {
                    resolve(invitado);
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

    asistencia(id,asistencia){
        return new Promise((resolve, reject) => {
            const comando = "UPDATE invitado SET asistencia = ? WHERE id = ?";
            this.conn.query(comando, [asistencia, id], function(err, resultado) {
                if (err) {
                    reject(err);
                } else {
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
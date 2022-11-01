const { json } = require("express");
const conn = require("../db");

const getCanciones = (_, res) => {
    // Completar con la consulta que devuelve todas las canciones
    // Recordar que los parámetros de una consulta GET se encuentran en req.params
    // Deberían devolver los datos de la siguiente forma:
    /*
        [
            {
                "id": "Id de la canción",
                "nombre": "Nombre de la canción",
                "nombre_artista": "Id del artista",
                "nombre_album": "Id del album",
                "duracion": "Duración de la canción",
                "reproducciones": "Reproducciones de la canción"
            },
            {
                "id": "Id de la canción",
                "nombre": "Nombre de la canción",
                "nombre_artista": "Id del artista",
                "nombre_album": "Id del album",
                "duracion": "Duración de la canción",
                "reproducciones": "Reproducciones de la canción"
            },
            ...
        ]
    */

    // Revisar si tengo que seleccionar todas las canciones o solo aquellas a las cuales les perteneza un album y un artista luego de realizar las querys anteriores
    conn.query("SELECT canciones.id, canciones.nombre, artistas.id AS nombre_artista, albumes.id AS nombre_album, canciones.duracion, canciones.reproducciones FROM canciones INNER JOIN albumes ON canciones.album = albumes.id INNER JOIN artistas ON albumes.artista = artistas.id", (err, rows) => {
        if (err) return res.status(500).send("Ha ocurrido un error")
        res.json(rows)
    })
};

const getCancion = (req, res) => {
    // Completar con la consulta que devuelve una canción
    // Recordar que los parámetros de una consulta GET se encuentran en req.params
    // Deberían devolver los datos de la siguiente forma:
    /*
        {
            "id": "Id de la canción",
            "nombre": "Nombre de la canción",
            "nombre_artista": "Id del artista",
            "nombre_album": "Id del album",
            "duracion": "Duración de la canción",
            "reproducciones": "Reproducciones de la canción"
        }
    */
    
    const id = req.params.id
    conn.query("SELECT canciones.id, canciones.nombre, artistas.id AS nombre_artista, albumes.id AS nombre_album, canciones.duracion, canciones.reproducciones FROM canciones INNER JOIN albumes ON canciones.album = albumes.id INNER JOIN artistas ON albumes.artista = artistas.id WHERE canciones.id = ?", [id], (err, rows) => {
        if (err) return res.status(500).send("Ha ocurrido un error")
        res.json(rows)
    })
};

const createCancion = (req, res) => {
    // Completar con la consulta que crea una canción
    // Recordar que los parámetros de una consulta POST se encuentran en req.body
    // Deberían recibir los datos de la siguiente forma:
    /*
        {
            "nombre": "Nombre de la canción",
            "album": "Id del album",
            "duracion": "Duración de la canción",
        }
    */
    // (Reproducciones se inicializa en 0)
    
    const nombre = req.body.nombre
    const album = req.body.album
    const duracion = req.body.duracion
    conn.query("INSERT INTO canciones (nombre, album, duracion) VALUES (?, ?, ?)", [nombre, album, duracion], (err, rows) => {
        if (err) return res.status(500).send("Ha ocurrido un error")
        res.status(200).json({message: ("La cancion ha sido ingresada")})
    })
};

const updateCancion = (req, res) => {
    // Completar con la consulta que actualiza una canción
    // Recordar que los parámetros de una consulta PUT se encuentran en req.body
    // Deberían recibir los datos de la siguiente forma:
    /*
        {
            "nombre": "Nombre de la canción",
            "artista": "Id del artista",
            "album": "Id del album",
            "duracion": "Duración de la canción",
        }
    */
    // (Reproducciones no se puede modificar con esta consulta)

    const id = req.params.id
    const nombre = req.body.nombre
    const album = req.body.album
    const duracion = req.body.duracion
    
    // Revisar: No recibo los datos como lo indica la consigna
    conn.query("UPDATE canciones SET nombre = ?, album = ?, duracion = ? WHERE id = ?", [nombre, album, duracion, id], (err, rows) => {
        if (err) return res.status(500).send("Ha ocurrido un error")
        res.status(200).json({message: ("La cancion ha sido actualizada")})
    })
};

const deleteCancion = (req, res) => {
    // Completar con la consulta que elimina una canción
    // Recordar que los parámetros de una consulta DELETE se encuentran en req.params

    const id = req.params.id
    conn.query("DELETE FROM canciones WHERE id = ?", [id], (err, rows) => {
        if (err) return res.status(500).send("Ha ocurrido un error")
        res.status(200).json({message: ("La cancion ha sido borrada")})
    })
};

const reproducirCancion = (req, res) => {
    // Completar con la consulta que aumenta las reproducciones de una canción
    // En este caso es una consulta PUT, pero no recibe ningún parámetro en el body, solo en los params

    const id = req.params.id
    conn.query("SELECT reproducciones FROM canciones WHERE id = ?", [id] , (err, rows) => {
        if (err) return res.status(500).send("Ha ocurrido un error")
        const reproducciones = parseInt(rows[0].reproducciones) + 1
        conn.query("UPDATE canciones SET reproducciones = ? WHERE id = ?", [reproducciones, id], (err2, rows2) => {
            if (err2) return res.status(500).send("Ha ocurrido un error")
            res.status(200).json({message: ("Las reproducciones han sido actualizadas")})
        })
    })
};

module.exports = {
    getCanciones,
    getCancion,
    createCancion,
    updateCancion,
    deleteCancion,
    reproducirCancion,
};

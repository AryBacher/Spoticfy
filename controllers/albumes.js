const conn = require("../db");

const getAlbumes = (_, res) => {
    // Completar con la consulta que devuelve todos los albumes
    // Recordar que los parámetros de una consulta GET se encuentran en req.params
    // Deberían devolver los datos de la siguiente forma:
    /*
        [
            {
                "id": 1,
                "nombre": "Nombre del album",
                "nombre_artista": "Nombre del artista"
            },
            {
                "id": 2,
                "nombre": "Nombre del album",
                "nombre_artista": "Nombre del artista"
            },
            ...
        ]
    */

    conn.query("SELECT albumes.id, albumes.nombre, artistas.nombre AS nombre_artista FROM albumes INNER JOIN artistas ON albumes.artista = artistas.id", (err, rows) => {
        if (err) return res.status(500).send("Ha ocurrido un error")
        res.json(rows)
    })
};

const getAlbum = (req, res) => {
    // Completar con la consulta que devuelve un album por id
    // Recordar que los parámetros de una consulta GET se encuentran en req.params
    // Deberían devolver los datos de la siguiente forma:
    /*
        {
            "id": 1,
            "nombre": "Nombre del album",
            "nombre_artista": "Nombre del artista"
        }
    */

        const id = parseInt(req.params.id)
        conn.query("SELECT albumes.id, albumes.nombre, artistas.nombre AS nombre_artista FROM albumes INNER JOIN artistas ON albumes.artista = artistas.id WHERE albumes.id = ?", [id], (err, rows) => {
            if (err) return res.status(500).send("El ID ingresado no existe")
            else if (!rows.length) return res.status(500).send("El ID no ha sido ingresado")
            res.json(rows)       
        })
};

const createAlbum = (req, res) => {
    // Completar con la consulta que crea un album
    // Recordar que los parámetros de una consulta POST se encuentran en req.body
    // Deberían recbir los datos de la siguiente forma:
    /*
        {
            "nombre": "Nombre del album",
            "artista": "Id del artista"
        }
    */
    
    const nombreAlbum = req.body.nombre
    const idArtista = req.body.artista
    conn.query("INSERT INTO albumes (nombre , artista) VALUES (?, ?)", [nombreAlbum, idArtista], (err, rows) => {
        if (err) return res.status(500).send("Ha ocurrido un error")
        res.status(200).json({message: ("El album ha sido ingresado")})
    })
};

const updateAlbum = (req, res) => {
    // Completar con la consulta que actualiza un album
    // Recordar que en este caso tienen parámetros en req.params (el id) y en req.body (los demás datos)
    // Deberían recbir los datos de la siguiente forma:
    /*
        {
            "nombre": "Nombre del album",
            "artista": "Id del artista"
        }
    */

    const id = req.params.id
    const nombreAlbum = req.body.nombre
    const idArtista = req.body.artista
    conn.query("UPDATE albumes SET nombre = ?, artista = ? WHERE id = ?", [nombreAlbum, idArtista, id], (err, rows) => {
        if (err) return res.status(500).send("Ha ocurrido un error")
        res.status(200).json({message: ("El album ha sido actualizado")})
    })
};

const deleteAlbum = (req, res) => {
    // Completar con la consulta que elimina un album
    // Recordar que los parámetros de una consulta DELETE se encuentran en req.params

    const id = req.params.id
    conn.query("DELETE albumes, canciones FROM albumes INNER JOIN canciones ON albumes.id = canciones.album WHERE id = ?", [id], (err, rows) => {
        if (err) return res.status(500).send("Ha ocurrido un error")
        res.status(200).json({message: ("El album ha sido borrado")})
    })
};

const getCancionesByAlbum = (req, res) => {
    // Completar con la consulta que devuelve las canciones de un album
    // Recordar que los parámetros de una consulta GET se encuentran en req.params
    // Deberían devolver los datos de la misma forma que getCanciones

    const id = req.params.id
    conn.query("SELECT canciones.id, canciones.nombre, artistas.id AS nombre_artista, albumes.id AS nombre_album, canciones.duracion, canciones.reproducciones FROM canciones INNER JOIN albumes ON canciones.album = albumes.id INNER JOIN artistas ON albumes.artista = artistas.id WHERE albumes.id = ?", [id], (err, rows) => {
        if (err) return res.status(500).send("Ha ocurrido un error")
        res.json(rows)
    })
};

module.exports = {
    getAlbumes,
    getAlbum,
    createAlbum,
    updateAlbum,
    deleteAlbum,
    getCancionesByAlbum,
};

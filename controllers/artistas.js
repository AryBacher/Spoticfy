const conn = require("../db");

const getArtistas = (_, res) => {
    // Completar con la consulta que devuelve todos los artistas
    // Recordar que los parámetros de una consulta GET se encuentran en req.params
    // Deberían devolver los datos de la siguiente forma:
    /*
        [
            {
                "id": "Id del artista",
                "nombre": "Nombre del artista"
            },
            {
                "id": "Id del artista",
                "nombre": "Nombre del artista"
            },
            ...
        ]
    */
   conn.query("SELECT * FROM artistas", (err, rows) => {
       if (err) return res.status(500).send("Error al seleccionar los artistas")
       else if (!rows.length) return res.status(500).send("No hay artistas")
       res.json(rows)
   })
};

const getArtista = (req, res) => {
    // Completar con la consulta que devuelve un artista
    // Recordar que los parámetros de una consulta GET se encuentran en req.params
    // Deberían devolver los datos de la siguiente forma:
    /*
        {
            "id": "Id del artista",
            "nombre": "Nombre del artista"
        }
    */
   const id = parseInt(req.params.id)
   conn.query("SELECT * FROM artistas WHERE id = ?", [id], (err, rows) => {
    if (err) return res.status(500).send("El ID ingresado no existe")
    else if (!rows.length) return res.status(500).send("El ID no ha sido ingresado")
    res.json(rows)       
   })
};

const createArtista = (req, res) => {
    // Completar con la consulta que crea un artista
    // Recordar que los parámetros de una consulta POST se encuentran en req.body
    // Deberían recibir los datos de la siguiente forma:
    /*
        {
            "nombre": "Nombre del artista",
        }
    */

    const nombreArtista = req.body.nombre
    conn.query("INSERT INTO artistas (nombre) VALUES (?)", [nombreArtista], (err, rows) => {
        if (err) return res.status(500).send("Ha ocurrido un error")
        //else if (!rows.length) return res.status(500).send("Ha ocurrido un error")
        res.status(200).json({message: ("El usuario ha sido ingresado")})
    })
};

const updateArtista = (req, res) => {
    // Completar con la consulta que actualiza un artista
    // Recordar que en este caso tienen parámetros en req.params (el id) y en req.body (los demás datos)
    // Deberían recibir los datos de la siguiente forma:
    /*
        {
            "nombre": "Nombre del artista"
        }
    */
    const id = parseInt(req.params.id)
    const nombre = req.body.nombre
    conn.query("UPDATE artistas SET nombre = ? WHERE id = ?", [nombre, id], (err, rows) => {
        if (err) return res.status(500).send("Ha ocurrido un error")
        //else if (!rows.length) return res.status(500).send("Ha ocurrido un error")
        res.status(200).json({message: ("El usuario ha sido actualizado")})
    })
};

const deleteArtista = (req, res) => {
    // Completar con la consulta que elimina un artista
    // Recordar que los parámetros de una consulta DELETE se encuentran en req.params

    const id = parseInt(req.params.id)
    conn.query("DELETE FROM artistas WHERE id = ?", [id], (err, rows) => {
        if (err) return res.status(500).send("Ha ocurrido un error")
        //else if (!rows.length) return res.status(500).send("Ha ocurrido un error")
        res.status(200).json({message: ("El usuario ha sido borrado")})
    })
};

const getAlbumesByArtista = (req, res) => {
    // Completar con la consulta que devuelve las canciones de un artista 
    // Recordar que los parámetros de una consulta GET se encuentran en req.params
    // Deberían devolver los datos de la misma forma que getAlbumes

    const id = parseInt(req.params.id)
    conn.query("SELECT artistas.id, albumes.nombre, artistas.nombre AS nombre_artista FROM albumes INNER JOIN artistas ON albumes.artista = artistas.id WHERE artistas.id = ?", [id], (err, rows) => {
        if (err) return res.status(500).send("Ha ocurrido un error")
        //else if (!rows.length) return res.status(500).send("Ha ocurrido un error")
        res.json(rows)
    })
};

const getCanionesByArtista = (req, res) => {
    // Completar con la consulta que devuelve las canciones de un artista
    // (tener en cuenta que las canciones están asociadas a un álbum, y los álbumes a un artista)
    // Recordar que los parámetros de una consulta GET se encuentran en req.params
    // Deberían devolver los datos de la misma forma que getCanciones
};

module.exports = {
    getArtistas,
    getArtista,
    createArtista,
    updateArtista,
    deleteArtista,
    getAlbumesByArtista,
    getCanionesByArtista,
};

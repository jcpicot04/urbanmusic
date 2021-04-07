const express = require('express');
const router = express.Router();
const Song = require('../models/song');
module.exports = router;

router.get('/',async (req, res) => {
    const songs = await Song.find();
    res.json(songs);
});

router.get('/:id',async (req, res) => {
    const song = await Song.findById();
    res.json(song);
});

router.post('/', async (req, res) => {
    const { nom, numCanciones, numArtistas, canciones, nombre, artista, idtema, sonido, imagen } = req.body;
    const song = new Song({ nom, numCanciones, numArtistas, canciones, nombre, artista, idtema, sonido, imagen });
    console.log(song);
    await song.save();
    res.json({status: 'Guardado'});
})

router.put('/:id', async (req, res) => {
    const { nom, numCanciones, numArtistas, canciones, nombre, artista, idtema, sonido, imagen } = req.body;
    const newSong = { nom, numCanciones, numArtistas, canciones, nombre, artista, idtema, sonido, imagen };
    await Song.findByIdAndUpdate(req.params.id, newSong);
    res.json('Actualizado');
});

router.delete('/:id', async (req, res) => {
    await Song.findByIdAndRemove(req.params.id);
    res.json('Eliminado');
});

module.exports = router;
const express = require("express");
const router = express.Router();
const Song = require("../models/song");
//module.exports = router;

router.get("/", async (req, res) => {
  const songs = await Song.find();
  console.log("get / " + songs);
  res.json(songs);
});

router.get("/:id", async (req, res) => {
  const song = await Song.findById();
  console.log("get /id " + song);
  res.json(song);
});

router.post("/", async (req, res) => {
  // const {nombre, artista, idtema, sonido, imagen } = req.body;
  const songs = req.body;
  console.log("post /api/songs " + songs);

  for (let e of songs) {
    const { nombre, artista, idtema, sonido, imagen } = e;
    const song = new Song({ nombre, artista, idtema, sonido, imagen });
    console.log(song);
    await song.save();
  }

  res.json({ status: "Guardado" });
});

router.put("/:id", async (req, res) => {
  const { nombre, artista, idtema, sonido, imagen } = req.body;
  const newSong = { nombre, artista, idtema, sonido, imagen };
  console.log("put/");
  await Song.findByIdAndUpdate(req.params.id, newSong);
  res.json("Actualizado");
});

router.delete("/:id", async (req, res) => {
  await Song.findByIdAndRemove(req.params.id);
  console.log(req);
  res.json("Eliminado");
});

module.exports = router;

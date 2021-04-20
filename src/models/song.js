const mongoose = require('mongoose');
const { Schema } = mongoose;

const SongSchema = new Schema({
        nombre: String,
        artista: String,
        idtema: Number,
        sonido: String,
        imagen: String
     
});

module.exports = mongoose.model('Song', SongSchema);
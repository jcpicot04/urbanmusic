const mongoose = require('mongoose');
const { Schema } = mongoose;

const SongSchema = new Schema({
    nom: { type: String, required: false},
    numCanciones: { type: String, required: false},
    numArtistas: { type: String, required:false},
    canciones: [{
        nombre: String,
        artista: String,
        idtema: Number,
        sonido: String,
        imagen: String
    }] 
});

module.exports = mongoose.model('Song', SongSchema);
const mongoose = require("mongoose");
const { Schema } = mongoose;

const SongSchema = new Schema({
  color: Array,
  name: String,
  artist: String,
  id: Number,
  audio: String,
  cover: String,
  active: Boolean,
});

module.exports = mongoose.model("Song", SongSchema);

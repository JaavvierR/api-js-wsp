const mongoose = require('mongoose');

const ChatSchema = new mongoose.Schema({
  bienvenida: { type: String, required: true },
  menu: { type: [String], required: true },
  respuestas: { type: Map, of: String, required: true },
  despedida: { type: String, required: true },
  error: { type: String, required: true }
});

module.exports = mongoose.model('Chat', ChatSchema);

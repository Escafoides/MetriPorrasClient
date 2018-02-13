var mongoose = require('mongoose');

var PorraSchema = new mongoose.Schema({
    nombre: String,
    local: String,
    visitante: String,
    fecha: { type: Date, default: Date.now },
  });

module.exports = mongoose.model('Porra', PorraSchema);

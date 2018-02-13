var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;
var ApuestaSchema = new mongoose.Schema({
    participante: String,
    local: String,
    visitante: String,
    porraId: ObjectId
  });

module.exports = mongoose.model('Apuesta', ApuestaSchema);

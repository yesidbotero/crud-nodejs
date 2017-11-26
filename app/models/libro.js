const mongoose = require('mongoose')
    , Schema = mongoose.Schema;

libroSchema = new Schema({
    title: { type: String, required: "Titulo obligatorio"},
    author: { type: String, required: "Autor obligatorio"},
    pages: { type: Number, required: "Paginas obligatorio"},
    price: { type: Number, required: "Precio obligatorio"},
});

Libro = mongoose.model('libro', libroSchema);

module.exports = Libro;

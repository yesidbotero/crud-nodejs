var mongoose = require('mongoose');
var Parameter = require('../models/libro');
let bodyParser = require('body-parser');
var Promise = require('mpromise');

module.exports.controller = function (app) {

  app.use(bodyParser.urlencoded({
    extended: true
  }));
  app.use(bodyParser.json());

  app.get('/crear_libro', function (req, res) {
    res.render('pages/crear_libro.ejs', {
      libro: null,
    });
  });

  app.get('/libro/:id', function (req, res) {
    Libro.findById(req.params.id, (err, doc) => {
      console.log(doc);
      res.render('pages/editar_libro.ejs', {
        libro: doc
      });
    });
  });

  app.post('/libro', function (req, res) {
    console.log(req.body.libro);
    var libro = new Libro({ title: req.body.title, author: req.body.author,
      pages: req.body.pages, price: req.body.price });
      var promise = libro.save();
      promise.onResolve(function (err) {
        if (err) {
          console.log(err.message); // mensajes de error
          res.render('pages/editar_libro.ejs', {
            error: err.message
          });
        }
        Libro.find({}, (err, docs) => {
          res.render('pages/libros.ejs', {
            libros: docs
          });
        });
      });
    });


    app.post('/libro/:id', function (req, res) {
      Libro.findById(req.params.id, (err, doc) => {
        doc.title = req.body.title;
        doc.author = req.body.author;
        doc.pages = req.body.pages;
        doc.price = req.body.price;
        var promise = doc.save();
        promise.onResolve(function (err) {
          if (err) {
            console.log(err.message); // mensajes de error
            res.render('pages/editar_libro.ejs', {
              error: err.message,
              parameter: doc
            });
          }
          Libro.find({}, (err, docs) => {
            res.render('pages/libros.ejs', {
              libros: docs
            });
          });
        });
      });
    });


    app.get(['/libros', '/'], function (req, res) {
      Libro.find({}, (err, docs) => {
        res.render('pages/libros.ejs', {
          libros: docs
        });
      });
    });

    app.get('/libro/delete/:id', function (req, res) {
      Libro.remove({ _id: req.params.id }, function (err) {
        console.log(req.params.id);
        if (!err) {
          Libro.find({}, (err, docs) => {
            res.render('pages/libros.ejs', {
              libros: docs
            });
          });
        }
        else {
          message.type = 'error';
        }
      });
    });

  }

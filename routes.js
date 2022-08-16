const express = require('express');
const routes = express.Router();
const listaController = require('./Controllers/listaController');
const itemController = require('./Controllers/itemController')


/* CRUD de lista */
routes.post('/list', listaController.post);

routes.get('/list', listaController.get);

routes.put('/list', listaController.put);

routes.delete('/list/:id', listaController.delete);


/* CRUD de intens lista */

routes.post('/item', itemController.post);

routes.get('/item/:id', itemController.get);

routes.put('/item', itemController.put);

routes.delete('/item/:id', itemController.delete);


module.exports = routes;
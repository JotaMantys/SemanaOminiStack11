const express =require('express');
const ongController = require('./controller/ong_controller');
const incidentsController = require('./controller/incident_controller');
const sessionController = require('./controller/session_controller');
const profileController = require('./controller/profile_controller');

const routes = express.Router();

routes.post('/session', sessionController.create);
routes.get('/profile', profileController.index );

routes.get('/ongs', ongController.index);
routes.post('/ongs', ongController.create);

routes.get('/incidents' ,incidentsController.index );
routes.post('/incidents',incidentsController.create);
routes.delete('/incidents/:id',incidentsController.delete);

module.exports = routes

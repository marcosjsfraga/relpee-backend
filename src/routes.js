// Import required modules
const express = require('express');
const multer = require('multer');
const multerConfig = require('./config/multer');
// Import Controllers
const EventController = require('./controllers/EventController');
const PersonController = require('./controllers/PersonController');
const SessionController = require('./controllers/SessionController');

const Person = require('./models/Person');

// Create routes from express
const routes = express.Router();

// Event
routes.post('/event', EventController.createUpdate);
routes.get('/event/list/:person_id', EventController.list);
routes.delete('/event/delete/:id', EventController.delete);
routes.post('/event/participate/:event_id/:person_id', EventController.participate);
routes.post('/event/unparticipate/:event_id/:person_id', EventController.unparticipate);

// Person
routes.post('/person', PersonController.createUpdate);
routes.get('/person/:id', PersonController.find);
routes.get('/person/list', PersonController.list);
routes.delete('/person/delete/:id', PersonController.delete);
routes.post('/person/imageupload/:person_id', multer(multerConfig).single('personImage'), (request, response) => {
    console.log('Upload Imag Response:' + response)

    return response.json({ status: "OK" })
});

// Session
routes.post('/session/validate', SessionController.validate);


// Export routes
module.exports = routes;

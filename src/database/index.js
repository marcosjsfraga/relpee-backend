const Sequelize = require('sequelize');
const dbConfig =  require('../config/database');
// Models
const Event = require('../models/Event');
const EventParticipants = require('../models/EventParticipants');
const Person = require('../models/Person');

// Connections
const connection = new Sequelize(dbConfig);

// Initialize models
Event.init(connection);
EventParticipants.init(connection);
Person.init(connection);

// Initialize associations
Event.associate(connection.models);
Person.associate(connection.models);

// Export connection
module.exports = connection;

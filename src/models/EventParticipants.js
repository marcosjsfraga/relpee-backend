const { Model, DataTypes } = require('sequelize');

class EventParticipants extends Model {
    static init(connection) {
        super.init({
            event_id: DataTypes.INTEGER,
            person_id: DataTypes.INTEGER,
        }, {
            sequelize: connection,
            tableName: 'event_participants', // Force no capitalized name
        })
    }
}

module.exports = EventParticipants;

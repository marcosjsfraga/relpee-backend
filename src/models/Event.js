const { Model, DataTypes } = require('sequelize');

class Event extends Model {
    static init(connection) {
        super.init({
            title: DataTypes.STRING(100),
            description: DataTypes.STRING(255),
            start_date: DataTypes.DATEONLY,
            start_time: DataTypes.TIME,
            end_date: DataTypes.DATEONLY,
            end_time: DataTypes.TIME,
            street: DataTypes.STRING(60),
            street_number: DataTypes.INTEGER,
            street_complement: DataTypes.STRING(20),
            neighborhood: DataTypes.STRING(60),
            city: DataTypes.STRING(60),
            state: DataTypes.STRING(2),
        }, {
            sequelize: connection,
            tableName: 'event', // Force no capitalized name
        })
    }

    static associate(models) {
         this.belongsTo(models.Person, { foreignKey: 'person_id', as: 'person' });
         this.hasMany(models.EventParticipants, { foreignKey: 'event_id', as: 'participants' });
    }
}

module.exports = Event;

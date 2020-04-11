const { Model, DataTypes } = require('sequelize');

class Person extends Model {
    static init(connection) {
        super.init({
            name: DataTypes.STRING(60),
            email_login: DataTypes.STRING(100),
            password: DataTypes.STRING(255),
            whatsapp: DataTypes.STRING(15),
            city: DataTypes.STRING(60),
            state: DataTypes.STRING(2),
            image_name: DataTypes.STRING(100),
            image_url: DataTypes.STRING(255),
        }, {
            sequelize: connection,
            tableName: 'person', // Force no capitalized name
        })
    }

    static associate(models) {
        this.hasMany(models.Event, { foreignKey: 'person_id', as: 'events ' });
   }

}

module.exports = Person;

const { Model, DataTypes } = require('sequelize');

class SocialAction extends Model {
    static init(connection) {
        super.init({
            title: DataTypes.STRING(100),
        }, {
            sequelize: connection,
            tableName: 'social_action', // Force no capitalized name
        })
    }
}

module.exports = SocialAction;

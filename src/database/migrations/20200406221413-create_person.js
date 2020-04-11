'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('person', {
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false,
            },
            name: {
                type: Sequelize.STRING(60)
            },
            email_login: {
                type: Sequelize.STRING(100)
            },
            password: {
                type: Sequelize.STRING
            },
            whatsapp: {
                type: Sequelize.STRING(15)
            },
            city: {
                type: Sequelize.STRING(60)
            },
            state: {
                type: Sequelize.STRING(2)
            },
            created_at: {
                allowNull: false,
                type: Sequelize.DATE
            },
            updated_at: {
                allowNull: false,
                type: Sequelize.DATE
            }
        });
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable('person');
    }
};

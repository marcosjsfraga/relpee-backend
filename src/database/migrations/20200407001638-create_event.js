'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('event', {
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false,
            },
            title: {
                type: Sequelize.STRING(100)
            },
            description: {
                type: Sequelize.STRING(255)
            },
            start_date: {
                type: Sequelize.DATEONLY
            },
            start_time: {
                type: Sequelize.TIME
            },
            end_date: {
                type: Sequelize.DATEONLY
            },
            end_time: {
                type: Sequelize.TIME
            },
            street: {
                type: Sequelize.STRING(60)
            },
            street_number: {
                type: Sequelize.INTEGER
            },
            street_complement: {
                type: Sequelize.STRING(20)
            },
            neighborhood: {
                type: Sequelize.STRING(60)
            },
            city: {
                type: Sequelize.STRING(60)
            },
            state: {
                type: Sequelize.STRING(2)
            },
            person_id: {
                type: Sequelize.INTEGER,
                references: { model: 'person', key: 'id' },
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE',
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
        return queryInterface.dropTable('event');
    }
};

'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('event_comments', {
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false,
            },
            event_id: {
                type: Sequelize.INTEGER,
                references: { model: 'event', key: 'id' },
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE',
            },
            person_id: {
                type: Sequelize.INTEGER,
                references: { model: 'person', key: 'id' },
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE',
            },
            comment: {
                type: Sequelize.STRING(255)
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
        return queryInterface.dropTable('event_comments');
    }
};

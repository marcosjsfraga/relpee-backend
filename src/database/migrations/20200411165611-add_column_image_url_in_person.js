'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.addColumn(
            'person',
            'image_url',
            Sequelize.STRING(255)
        );
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.removeColumn(
            'person',
            'image_url',
        );
    }
};

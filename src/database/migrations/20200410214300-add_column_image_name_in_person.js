'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.addColumn(
            'person',
            'image_name',
            Sequelize.STRING(100)
        );
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.removeColumn(
            'person',
            'image_name',
        );
    }
};

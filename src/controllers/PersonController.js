var multer = require('multer');
const Person = require('../models/Person');

// Import required modules
// const Cryptr = require('cryptr');

// const cryptr = new Cryptr(global.passwordSecretKey)

module.exports = {

    // Create or Update data
    async createUpdate(request, response) {
        // console.log('--> REQUEST.BODY: ' + JSON.stringify(request.body));
        var result = {};

        const {
            id, name, email_login, password, type, whatsapp, city, state
        } = request.body;

        try {
            // const encPassword = global.cryptr.encrypt(password);

            if (id === 0 || id === null) {
                // Insert data
                const person = await Person.create({
                    name, email_login, password, type, whatsapp, city, state
                });

                result = {
                    message: "Data created successfully.",
                    id: person.id
                };
                response.status(201);

            } else if (id > 0) {
                Person.update({
                    name, email_login, password, type, whatsapp, city, state
                }, {
                    where: { id: id }
                })
                .error(err =>
                    handleError(err)
                );

                result = {
                    message: "Successfully updated data."
                };
                response.status(202);
            } else {
                result = {
                    message: "Bad request."
                };
                response.status(400);
            }
        } catch (error) {
            console.log('--> Error: ' + error + '\n--> Stack: ' + error.stack);
            result = {
                message: error.toString()
            };
            response.status(500);
        }

        // Resquest return
        return response.json(result);
    },

    // List data
    async list(request, response) {
        const person = await Person.findAll({
            order: [
                ['name', 'ASC'],
            ]
        });

        return response.json(person);
    },

    // Find Person by Id
    async find(request, response) {
        const { id } = request.params;

        const person = await Person.findOne({
            where: {
                id: id,
            },
        });

        return response.json(person);
    },

    // Delete data
    async delete(request, response) {
        var result = {};

        try {
            const { id } = request.params;

            await Person.destroy({
                where: {
                    id: id,
                },
            });

            response.status(200);
            result = {
                message: "Data successfully deleted."
            };

        } catch (error) {
            console.log('--> Error: ' + error + '\n--> Stack: ' + error.stack);
            result = {
                message: error.toString()
            };
            response.status(500);
        }

        // Resquest return
        return response.json(result);
    },

};

const Event = require('../models/Event');
const EventParticipants = require('../models/EventParticipants');
const Person = require('../models/Person');

// Import required modules const Cryptr = require('cryptr');
// const cryptr = new Cryptr(global.passwordSecretKey)

module.exports = {

    /**
     * Create or Update data
     */
    async createUpdate(request, response) {
        // console.log('--> REQUEST.BODY: ' + JSON.stringify(request.body));
        var result = {};

        var {
            id, title, description, start_date, start_time, end_date, end_time, street,
            street_number, street_complement, neighborhood, city, state,
            person_id
        } = request.body;

        try {

            start_date = start_date.substring(6, 10) + '-' +
                         start_date.substring(3, 5) + '-' +
                         start_date.substring(0, 2);
            end_date = end_date.substring(6, 10) + '-' +
                       end_date.substring(3, 5) + '-' +
                       end_date.substring(0, 2);

            if (id === 0 || id === null) {

                // Insert data
                const event = await Event.create({
                    title, description, street, start_date, start_time,
                    end_date, end_time, street_number, street_complement,
                    neighborhood, city, state, person_id
                });

                result = {
                    message: "Data created successfully.",
                    id: event.id
                };
                response.status(201);

            } else if (id > 0) {
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
            console.log('--> Error: ' + error.stack);
            result = {
                message: error.toString()
            };
            response.status(500);
        }

        // Resquest return
        // console.log('--> RESULT: '+result);
        return response.json(result);
    },

    /**
     * List events
     */
    async list(request, response) {
        const {person_id} = request.params;

        // response.header('X-Total-Count', count['count(*)']);

        try {

            const event_list = await Event.findAll({
                attributes: [
                    'id', 'title', 'description', 'start_date', 'start_time',
                    'end_date', 'end_time', 'street', 'street_number',
                    'street_complement', 'neighborhood', 'city', 'state',
                    'person_id'
                ],
                include: [{
                    association: 'person', // <- Join Person
                    attributes: ['name', 'image_url'],
                },
                { // This willserve only to count
                    association: 'participants', // <- Join EventParticipants
                    attributes: ['person_id'],
                }],
                order: [
                    ['start_date', 'DESC'],
                    ['start_time']
                ]
            });

            event_list.map(el => {
                // Create new field
                el.setDataValue('person_participates', false);
                el.participants.map(p => {
                    if (p.person_id == person_id)
                        el.setDataValue('person_participates', true);
                });
            });

            return response.json(event_list);

        } catch (error) {
            console.log('--> Error: ' + error + '\n--> Stack: ' + error.stack);
            result = {
                message: error.toString()
            };
            response.status(500);

            return result;
        }
    },

    /**
     * Delete event
     */
    async delete(request, response) {
        /*
        var result = {};

        try {
            const {id} = request.params;

            await connection('event')
                .where('id', id)
                .delete();

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
        */
        // Resquest return
        return response.json(result);
    },

    /**
     * Set participation on event
     */
    async participate(request, response) {
        var result = {};
        const {event_id, person_id} = request.params;

        try {

            const ep = await EventParticipants.findOrCreate({
                defaults: {
                    event_id,
                    person_id
                },
                where: {
                    event_id: event_id,
                    person_id: person_id,
                }
              });

            if (ep[1] == false) {
                result = {
                    message: "Person is already inserted in the event."
                };
            } else {
                result = {
                    message: "Person inserted in the event."
                };
            }
            response.status(200);

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

    /**
     * Unset participation on event
     */
    async unparticipate(request, response) {
        var result = {};
        const {event_id, person_id} = request.params;

        try {

            const ep = await EventParticipants.destroy({
                where: {
                    event_id: event_id,
                    person_id: person_id,
                }
              });

            response.status(200);

        } catch (error) {
            console.log('--> Error: ' + error + '\n--> Stack: ' + error.stack);
            result = {
                message: error.toString()
            };
            response.status(500);
        }

        // Resquest return
        return response.json(result);
    }

};

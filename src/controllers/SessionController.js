const path = require('path');
const fs = require('fs')
const Person = require('../models/Person');

module.exports = {

    async validate(request, response) {
        const { email_login, password } = request.body;
        const tmpUploadPath = path.resolve(__dirname, '..', '..', 'tmp', 'uploads')
        let imageNameVar =  null;
        let imageUrlVar =  null;

        // console.log('--> BODY: ' + JSON.stringify(request.body));
        // const encPassword = global.cryptr.encrypt(password);

        const person = await Person.findOne({
            where: {
                email_login: email_login,
                password: password,
            },
        });

        if (person) {
            return response.status(200).json({
                message: 'Valid user.',
                personId: person.id,
                personName: person.name,
                imageUrl: person.image_url,
                personAddress: person.city + '/' + person.state,
            });
        }
        else {
            return response.status(401).json({ message: 'Invalid user or password. ' });
        }

        return response.json(person);
    },

};

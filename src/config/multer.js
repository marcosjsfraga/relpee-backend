const multer = require('multer');
const path = require('path');
const crypto = require('crypto');
const Person = require('../models/Person');
const cloudinary = require('cloudinary').v2;

module.exports = {
    dest: path.resolve(__dirname, '..', '..', 'tmp', 'uploads'),

    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, path.resolve(__dirname, '..', '..', 'tmp', 'uploads'));
        },
        filename: (req, file, cb) => {
            const { person_id } = req.params;
            // Get uplod folder
            const destFolder = path.resolve(__dirname, '..', '..', 'tmp', 'uploads');

            crypto.randomBytes(16, (err, hash) => {
                if (err)
                    cb(err);

                    let filename = file.originalname; // `${hash.toString('hex')}-${file.originalname}`;
                // const extension = filename.substring(filename.lastIndexOf('.')+1, filename.length);
                // filename = 'person_image_' + person_id + '.' + extension;
                cb(null, filename);


                // Send imagem do Cloudinary
                const response = cloudinary.uploader.upload(destFolder + '/' + filename, {
                    cloud_name: 'relpee',
                    api_key: '428869926387946',
                    api_secret: 's467iV1b24jv1P2n6sptN1QC-5Q',
                    resource_type: "image",
                    overwrite: true,
                    // public_id: "my_folder/my_sub_folder/my_dog",
                }, function(error, result) {
                    console.log();
                    console.log("** Cloudinary File Upload");
                    if (error) {
                        console.log(result, '\n--> Cloudinary ERROR: ' + error.message);
                    }
                    else {
                        // console.log("* public_id: " + result.public_id);
                        // Update person in database
                        Person.update({
                            image_name: filename,
                            image_url: result.url,
                        },
                        {
                            where: { id: person_id }
                        });
                    }
                });

                // console.log('--> RESPONSE: ' + response);
            });
        },
    }),
    limits: {
        fileSize: 1 * 2048 * 2048,
    },
    fileFilter: (req, file, cb) => {
        const allowedMimes = [
            'image/jpeg',
            'image/pjpeg',
            'image/png',
        ];

        if (allowedMimes.includes(file.mimetype)) {
            cb(null, true);
        } else {
            cb(new Error('Invalid file type.'))
        }
    },
}

const ApplicationController = require("./application.controller");
const Joi = require('joi');

module.exports = [
    {
        path: '/applications',
        method: 'GET',
        handler: ApplicationController.find,
        config: {
            description: 'Find all the Applications',
            tags: ['api', 'Applications'],
            notes: 'Returns all the applications',
            validate: {
                headers: Joi.object({
                    'authorization' : Joi.string().required()
                }).unknown()
            }
        }
    },
    {
        path: '/applications',
        method: 'POST',
        handler: ApplicationController.create,
        config: {
            validate: {
                payload: Joi.object().keys({
                    hired: Joi.boolean().optional(),
                    job: Joi.string().required(),
                    candidate: Joi.string().required(),
                }),
                headers: Joi.object({
                    'authorization' : Joi.string().required()
                }).unknown()
            },
            description: 'Create new Application',
            tags: ['api', 'Applications'],
            notes: 'Return newly created Application'
        }
    }
];
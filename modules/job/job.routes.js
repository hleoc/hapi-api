const JobController = require("./job.controller");
const Joi = require('joi');
const { validate } = require("./job.model");

module.exports = [
    {
        path: '/jobs',
        method: 'GET',
        handler: JobController.find,
        config: {
            tags: ['api', 'Jobs'],
            description: 'Get all the Jobs',
            notes: 'Returns all the Jobs with Company',
            validate: {
                headers: Joi.object({
                    'authorization' : Joi.string().required()
                }).unknown()
            }
        }
    },
    {
        path: '/jobs',
        method: 'POST',
        handler: JobController.create,
        config: {
            validate: {
                payload: Joi.object().keys({
                    title: Joi.string().required(),
                    company: Joi.string().required()
                }),
                headers: Joi.object({
                    'authorization' : Joi.string().required()
                }).unknown()
            },
            description: 'Create new Job',
            tags: ['api', 'Jobs'],
            notes: 'Returns newly created Job'
        }
    },
];
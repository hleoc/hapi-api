const CandidateController = require("./candidate.controller");
const Joi = require('joi');
const { validate } = require("./candidate.model");

module.exports = [
    {
        path: '/candidates',
        method: 'GET',
        handler: CandidateController.find,
        config: {
            tags: ['api', 'Candidate'],
            description: 'Find all Candidates',
            notes: 'Returns all Candidates',
            validate: {
                headers: Joi.object({
                    'authorization' : Joi.string().required()
                }).unknown()
            }
        }
    },
    {
        path: '/candidates',
        method: 'POST',
        handler: CandidateController.create,
        config: {
            validate: {
                payload: Joi.object().keys({
                    first_name: Joi.string().required(),
                    last_name: Joi.string().required(),
                    email: Joi.string().required(),
                    company: Joi.string().required(),
                }),
                headers: Joi.object({
                    'authorization' : Joi.string().required()
                }).unknown()
            },
            tags: ['api', 'Candidate'],
            description: 'Create new Candidate',
            notes: 'Returns newly created Candidate'
        }
    },
];
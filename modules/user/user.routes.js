const userController = require("./user.controller");
const UserController = require("./user.controller");
const Joi = require('joi');

module.exports = [
    {
        path: '/users/signup',
        method: 'POST',
        handler: UserController.signup,
        config: {
            validate: {
                payload: Joi.object().keys({
                    email: Joi.string().email().required(),
                    password: Joi.string().required()
                })
            },
            description: 'User can create new Account',
            tags: ['api', 'Users'],
            notes: 'Returns a signup response',
            auth: false
        }
    },
    {
        path: '/user/login',
        method: 'POST',
        handler: userController.login,
        config: {
            validate: {
                payload: Joi.object().keys({
                    email: Joi.string().email().required(),
                    password: Joi.string().required()
                })
            },
            description: 'User can login to his account',
            tags: ['api', 'Users'],
            notes: 'Returns a JSON WEB Token',
            auth: false
        }
    }
];
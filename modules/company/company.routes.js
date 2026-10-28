const CompanyController = require("./company.controller");
const Joi = require('joi');

const schema = Joi.object().keys({
  name: Joi.string().required(),
  city: Joi.string().optional(),
  address: Joi.string().optional(),
});

module.exports = [
  {
    path: "/companies",
    method: "POST",
    handler: CompanyController.create,
    config: {
      validate: {
        payload: schema,
        headers: Joi.object({
          'authorization' : Joi.string().required()
        }).unknown()
      },
      description: 'Create new Company',
      tags: ['api', 'Companies'],
      notes: 'Returns newly created Company'
    }
  },
  {
    path: "/companies",
    method: "GET",
    handler: CompanyController.find,
    config: {
      response: {
        schema: Joi.array().items(schema),
        sample: 50
      },
      tags: ['api', 'Companies'],
      description: 'Find all the Companies',
      notes: 'Returns all the Companies',
      validate: {
        headers: Joi.object({
          'authorization' : Joi.string().required()
        }).unknown()
      }
    }
  },
  {
    path: "/company/{id?}",
    method: "GET",
    handler: CompanyController.findOne,
    config: {
      validate: {
        params: Joi.object().keys({
          id: Joi.string().length(24).hex().required()
        }),
        headers: Joi.object({
          'authorization' : Joi.string().required()
        }).unknown()
      },
      tags: ['api', 'Companies'],
      description: 'Find Company By Id',
      notes: 'Returns a single Company'
    }
  },
  {
    path: "/company/{id?}",
    method: "PUT",
    handler: CompanyController.update,
    config: {
      validate: {
          params: Joi.object().keys({
          id: Joi.string().length(24).hex().required(),
        }),
        payload: Joi.object().keys({
          name: Joi.string().optional(),
          city: Joi.string().optional(),
          address: Joi.string().optional()
        }),
        headers: Joi.object({
          'authorization' : Joi.string().required()
        }).unknown()
      },
      tags: ['api', 'Companies'],
      description: 'Update a Company By Id',
      notes: 'Returns a updated Company'
    }
  },
  {
    path: "/company/{id?}",
    method: "DELETE",
    handler: CompanyController.delete,
    config: {
      validate: {
        params: Joi.object().keys({
          id: Joi.string().length(24).hex().required()
        }),
        headers: Joi.object({
          'authorization' : Joi.string().required()
        }).unknown()
      },
      tags: ['api', 'Companies'],
      description: 'Delete Company By Id',
      notes: 'Returns a deleted message'
    }
  },
];

const Company = require('./company.model');
const Boom = require('boom');

module.exports = {
    async create(request, reply) {
       try {
            const company = await Company.create({
                name: request.payload.name,
                city: request.payload.city,
                address: request.payload.address,
                user: request.auth.credentials.id
            });

            return reply.response(company);
            
       } catch (error) {
            throw Boom.badImplementation('could not create company', error);
       }
    },
    async find(_request, reply) {
        try {
            const companies = await Company.find({})
                .populate('candidates')
                .populate('jobs');
            
            return reply.response(companies);
        } catch (err) {
            throw err;
        }
    },
    findOne(request, reply) {
        Company.findById(request.params.id, (err, company) => {
            if(err) {
                return reply(err).code(500);
            }

            if(!company) {
                return reply({ err: 'Company not found'}).code(404);
            }
            return reply.response(company);
        });
    },
    update(request, reply) {
        let attribuites = {};
        
        if(request.payload.name) {
            attribuites.name = request.payload.name;
        }
        
        if(request.payload.city) {
            attribuites.city = request.payload.city;
        }
        
        if(request.payload.address) {
            attribuites.address = request.payload.address;
        }
        
        Company.findByIdAndUpdate(request.params.id, attribuites, { new: true }, (err, company) => {
           if(err) {
                return reply(err).code(500);
            }

            if(!company) {
                return reply({ err: 'Company not found'}).code(404);
            }
        
            return reply.response(company);
        });
    },
    delete(request, reply) {
        Company.findByIdAndRemove(request.params.id, (err, result) => {
            if(err) {
                return reply(err).code(500);
            }

            if(!result) {
                return reply({ err: 'Company not found'}).code(404);
            }

            return reply.response({ msg: `company has deleted with id ${request.params.id}` });
        });
    },
};
const Candidate = require('./candidate.model');
const Company = require('../company/company.model');

module.exports = {
    async find(request, reply) {
        try {
            const candidates = await Candidate.find({}).populate('company');
            reply.response(candidates);
        } catch (err) {
            throw err;
        }
    },
    async create(request, reply) {
        try {
            const candidate = await Candidate.create({
                first_name: request.payload.first_name,
                last_name: request.payload.last_name,
                email: request.payload.email,
                company: request.payload.company
            });
            const _company = await Company.findById(request.payload.company);
            _company.candidates.push(candidate);
            await _company.save();

            return reply.response(candidate);
        }
        catch(err) {
            throw err;
        }
    }
};
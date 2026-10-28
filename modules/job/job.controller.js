const Job = require('./job.model');
const Company = require('../company/company.model')

module.exports = {
    async find(request, reply) {
        try {
            const jobs = await Job.find({})
                .populate('company');

            return reply.response(jobs);
        } catch (err) {
            throw err;
        }
    },
    async create(request, reply) {
        try {
            const job = await Job.create({
                title: request.payload.title,
                company: request.payload.company
            })
            const _company = await Company.findById(request.payload.company);
            _company.jobs.push(job);
            await _company.save();

            return reply.response(job);
        } catch (err) {
            throw err;
        }
    }
};
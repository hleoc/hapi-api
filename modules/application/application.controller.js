const Application = require('./application.model');

module.exports = {
    async find(request, reply) {
        try {
            const applications = await Application.find({})
                .populate('job')
                .populate('candidate');
            return reply.response(applications);
        } catch (err) {
            throw err;
        }
    },
    async create(request, reply) {
        try {
            const application = await Application.create({
                hired: request.payload.hired,
                job: request.payload.job,
                candidate: request.payload.candidate
            });
            
            return reply.response(application);
        } catch (err) {
            throw err;
        }
    }
};
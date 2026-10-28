const User = require("./user.model");
const UtilService = require('../../services/util.service');
const Boom = require('boom');
const jwtService = require("../../services/jwt.service");

module.exports = {
  async signup(request, reply) {
    try {
      const user = new User({
        email: request.payload.email,
        password: request.payload.password,
      });

      user.password = await UtilService.hashPassword(user.password);
      await user.save();

      return reply.response('Signup successful!');
    } catch (error) {
      //console.error(error);
      throw Boom.badImplementation('Signup Failed', error);
    }
  },

  async login(request, reply) {
    try {
      const user = await User.findOne({
        email: request.payload.email
      });

      if(!user) {
        reply(Boom.unauthorized('Invalid credentials providedsssss'));
      }

      const matched = await UtilService.comparePassword(request.payload.password, user.password);

      if(matched) {
        const token = jwtService.issue({
          payload: {
            id: user._id,
            email: user.email
          },
          expiresIn: '1 day'
        });
        reply.response({ token: token });
      } else {
        reply(Boom.unauthorized('Invalid credentials provided', error));
      }
    } catch (error) {
      throw Boom.unauthorized('Invalid credentials provided', error);
    }
  },
};

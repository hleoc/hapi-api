const hapi = require('hapi');
const plugins = require('./config/plugins');
const jwtService = require('./services/jwt.service');
const config = require('./config/development');

const server = new hapi.Server();

server.connection({
    host: config.host,
    port: config.port
});

server.register(plugins, (err) => {
    if(err) {
        throw err;
    }
    server.start(err => {
        if(err) {
            throw err;
        }

        server.auth.strategy('jwt', 'jwt', {
            key: config.secret,
            verifyOptions: {
                algorithm: ['HS256']
            },
            validateFunc: jwtService.validate
        });

        server.auth.default('jwt');

        console.log(`Server Running at PORT ${server.info.port}`);
    });
});

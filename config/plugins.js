const HapiSwagger = require('hapi-swagger');
const Inert = require('inert');
const Vision = require('vision');
const MongoosePlugin = require('../plugins/mongoose.plugin');

const CompanyModule = require('../modules/company/company.module');
const ApplicationModule = require('../modules/application/application.module');
const CandidateModule = require('../modules/candidate/candidate.module');
const JobModule = require('../modules/job/job.module');
const UserModule = require('../modules/user/user.module');

const goodOptions = {
  ops: { interval: 1000 },
  reporters: {
    myConsoleReporter: [
      {
        module: 'good-squeeze',
        name: 'Squeeze',
        args: [{ log: '*', response: '*' }]
      },
      {
        module: 'good-console'
      },
      'stdout'
    ],
    myFileReporter: [
      {
        module: 'good-squeeze',
        name: 'Squeeze',
        args: [{ ops: '*' }]
      },
      {
        module: 'good-squeeze',
        name: 'SafeJson'
      },
      {
        module: 'good-file',
        args: ['./logs/awesome_log.log']
      }
    ]
  }
};


module.exports = [
    {
        register: MongoosePlugin,
        options: {
            mongoDbUri: 'mongodb://localhost:27017/hapi_db'
        }
    },
    {
        register: Inert
    },
    {
        register: Vision
    },
    {
        register: HapiSwagger,
        options: {
            info: {
                title: 'API Documentation',
                version: '0.0.1'
            }
        }
    },
    require('hapi-auth-jwt2'),
    {
        register: require('good'),
        options: goodOptions
    },
    {
        register: CompanyModule
    },
    {
        register: ApplicationModule
    },
    {
        register: CandidateModule
    },
    {
        register: JobModule
    },
    {
        register: UserModule
    }
];
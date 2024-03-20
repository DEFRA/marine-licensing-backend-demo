import convict from 'convict'
import path from 'path'

import 'dotenv/config'

const config = convict({
  env: {
    doc: 'The application environment.',
    format: ['production', 'development', 'test'],
    default: 'development',
    env: 'NODE_ENV'
  },
  port: {
    doc: 'The port to bind.',
    format: 'port',
    default: 3001,
    env: 'PORT'
  },
  serviceName: {
    doc: 'Api Service Name',
    format: String,
    default: 'marine-licensing-backend-demo'
  },
  root: {
    doc: 'Project root',
    format: String,
    default: path.normalize(path.join(__dirname, '..', '..'))
  },
  isProduction: {
    doc: 'If this application running in the production environment',
    format: Boolean,
    default: process.env.NODE_ENV === 'production'
  },
  isDevelopment: {
    doc: 'If this application running in the development environment',
    format: Boolean,
    default: process.env.NODE_ENV !== 'production'
  },
  isTest: {
    doc: 'If this application running in the test environment',
    format: Boolean,
    default: process.env.NODE_ENV === 'test'
  },
  logLevel: {
    doc: 'Logging level',
    format: ['fatal', 'error', 'warn', 'info', 'debug', 'trace', 'silent'],
    default: 'info',
    env: 'LOG_LEVEL'
  },
  mongoUri: {
    doc: 'URI for mongodb',
    format: '*',
    default: 'mongodb://root:rootpass@127.0.0.1:27017/',
    env: 'MONGO_URI'
  },
  mongoDatabase: {
    doc: 'database for mongodb',
    format: String,
    default: 'marine-licensing-backend-demo',
    env: 'MONGO_DATABASE'
  },
  httpProxy: {
    doc: 'HTTP Proxy',
    format: String,
    nullable: true,
    default: null,
    env: 'CDP_HTTP_PROXY'
  },
  httpsProxy: {
    doc: 'HTTPS Proxy',
    format: String,
    nullable: true,
    default: null,
    env: 'CDP_HTTPS_PROXY'
  },
  entraOAuthUrl: {
    doc: 'base url for using oauth with Entra (formerly Azure Active Directory)',
    format: String,
    nullable: true,
    default: null,
    env: 'ENTRA_OAUTH_URL'
  },
  entraClientId: {
    doc: 'Client id to authenticate to Entra (formerly Azure Active Directory) to generate oauth tokens',
    format: String,
    nullable: true,
    default: null,
    env: 'ENTRA_CLIENT_ID'
  },
  entraClientSecret: {
    doc: 'Client secret to authenticate to Entra (formerly Azure Active Directory) to genearte oauth tokens',
    format: String,
    nullable: true,
    default: null,
    env: 'ENTRA_CLIENT_SECRET'
  },
  dataverseUrl: {
    doc: 'Domain for all dataverse requests',
    format: String,
    nullable: true,
    default: null,
    env: 'DATAVERSE_URL'
  },
  dataverseApiUrl: {
    doc: 'Domain for all dataverse API requests (includes environment as the sub-domain)',
    format: String,
    nullable: true,
    default: null,
    env: 'DATAVERSE_API_URL'
  },
  dynamicsAppId: {
    doc: 'Application id for dynamics instance',
    format: String,
    nullable: true,
    default: null,
    env: 'DYNAMICS_APP_ID'
  },
  dynamicsUrl: {
    doc: 'domain for dynamics instance',
    format: String,
    nullable: true,
    default: null,
    env: 'DYNAMICS_URL'
  }
})

config.validate({ allowed: 'strict' })

export { config }

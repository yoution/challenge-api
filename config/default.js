/**
 * The configuration file.
 */

module.exports = {
  LOG_LEVEL: process.env.LOG_LEVEL || 'debug',
  PORT: process.env.PORT || 3000,
  API_VERSION: process.env.API_VERSION || 'v5',
  AUTH_SECRET: process.env.AUTH_SECRET || 'mysecret',
  VALID_ISSUERS: process.env.VALID_ISSUERS || '["https://api.topcoder-dev.com", "https://api.topcoder.com", "https://topcoder-dev.auth0.com/"]',

  // used to get M2M token
  AUTH0_URL: process.env.AUTH0_URL,
  AUTH0_PROXY_SERVER_URL: process.env.AUTH0_PROXY_SERVER_URL,
  AUTH0_AUDIENCE: process.env.AUTH0_AUDIENCE || 'https://www.topcoder-dev.com',
  TOKEN_CACHE_TIME: process.env.TOKEN_CACHE_TIME,
  AUTH0_CLIENT_ID: process.env.AUTH0_CLIENT_ID,
  AUTH0_CLIENT_SECRET: process.env.AUTH0_CLIENT_SECRET,

  // bus API config params
  BUSAPI_URL: process.env.BUSAPI_URL || 'https://api.topcoder-dev.com/v5',
  KAFKA_ERROR_TOPIC: process.env.KAFKA_ERROR_TOPIC || 'common.error.reporting',

  AMAZON: {
    AWS_ACCESS_KEY_ID: process.env.AWS_ACCESS_KEY_ID || 'FAKE_ACCESS_KEY',
    AWS_SECRET_ACCESS_KEY: process.env.AWS_SECRET_ACCESS_KEY || 'FAKE_SECRET_ACCESS_KEY',
    AWS_REGION: process.env.AWS_REGION || 'ap-northeast-1',
    IS_LOCAL_DB: process.env.IS_LOCAL_DB ? process.env.IS_LOCAL_DB === 'true' : true,
    DYNAMODB_URL: process.env.DYNAMODB_URL || 'http://localhost:7777',
    ATTACHMENT_S3_BUCKET: process.env.ATTACHMENT_S3_BUCKET || 'my-testing-bucket-12345',
    S3_API_VERSION: process.env.S3_API_VERSION || '2006-03-01'
  },

  ES: {
    // above AWS_REGION is used if we use AWS ES
    HOST: process.env.ES_HOST || 'localhost:9200',
    API_VERSION: process.env.ES_API_VERSION || '6.8',
    ES_INDEX: process.env.ES_INDEX || 'challenge',
    ES_TYPE: process.env.ES_TYPE || '_doc', // ES 6.x accepts only 1 Type per index and it's mandatory to define it
    ES_REFRESH: process.env.ES_REFRESH || 'true'
  },

  // in bytes
  FILE_UPLOAD_SIZE_LIMIT: process.env.FILE_UPLOAD_SIZE_LIMIT
    ? Number(process.env.FILE_UPLOAD_SIZE_LIMIT) : 50 * 1024 * 1024, // 50M
  RESOURCES_API_URL: process.env.RESOURCES_API_URL || 'http://localhost:4000/v5/resources',
  GROUPS_API_URL: process.env.GROUPS_API_URL || 'http://localhost:4000/v5/groups',
  PROJECTS_API_URL: process.env.PROJECTS_API_URL || 'http://localhost:4000/v4/projects',
  // copilot resource role ids allowed to upload attachment
  COPILOT_RESOURCE_ROLE_IDS: process.env.COPILOT_RESOURCE_ROLE_IDS
    ? process.env.COPILOT_RESOURCE_ROLE_IDS.split(',') : ['10ba038e-48da-487b-96e8-8d3b99b6d18b'],

  // health check timeout in milliseconds
  HEALTH_CHECK_TIMEOUT: process.env.HEALTH_CHECK_TIMEOUT || 3000,

  SCOPES: {
    CHALLENGES: {
      READ: process.env.SCOPE_CHALLENGES_READ || 'read:challenges',
      CREATE: process.env.SCOPE_CHALLENGES_CREATE || 'create:challenges',
      UPDATE: process.env.SCOPE_CHALLENGES_UPDATE || 'update:challenges',
      ALL: process.env.SCOPE_CHALLENGES_ALL || 'all:challenges'
    },
    CHALLENGE_TYPES: {
      CREATE: process.env.SCOPE_CHALLENGE_TYPES_CREATE || 'create:challenge_types',
      UPDATE: process.env.SCOPE_CHALLENGE_TYPES_UPDATE || 'update:challenge_types',
      ALL: process.env.SCOPE_CHALLENGE_TYPES_ALL || 'all:challenge_types'
    },
    CHALLENGE_SETTINGS: {
      READ: process.env.SCOPE_CHALLENGE_SETTINGS_READ || 'read:challenge_settings',
      CREATE: process.env.SCOPE_CHALLENGE_SETTINGS_CREATE || 'create:challenge_settings',
      UPDATE: process.env.SCOPE_CHALLENGE_SETTINGS_UPDATE || 'update:challenge_settings',
      ALL: process.env.SCOPE_CHALLENGE_SETTINGS_ALL || 'all:challenge_settings'
    },
    CHALLENGE_AUDIT_LOGS: {
      READ: process.env.SCOPE_CHALLENGE_AUDIT_LOGS_READ || 'read:challenge_audit_logs'
    },
    CHALLENGE_PHASES: {
      READ: process.env.SCOPE_CHALLENGE_PHASES_READ || 'read:challenge_phases',
      CREATE: process.env.SCOPE_CHALLENGE_PHASES_CREATE || 'create:challenge_phases',
      DELETE: process.env.SCOPE_CHALLENGE_PHASES_DELETE || 'delete:challenge_phases',
      UPDATE: process.env.SCOPE_CHALLENGE_PHASES_UPDATE || 'update:challenge_phases',
      ALL: process.env.SCOPE_CHALLENGE_PHASES_ALL || 'all:challenge_phases'
    },
    TIMELINE_TEMPLATES: {
      READ: process.env.SCOPE_TIMELINE_TEMPLATES_READ || 'read:timeline_templates',
      CREATE: process.env.SCOPE_TIMELINE_TEMPLATES_CREATE || 'create:timeline_templates',
      DELETE: process.env.SCOPE_TIMELINE_TEMPLATES_DELETE || 'delete:timeline_templates',
      UPDATE: process.env.SCOPE_TIMELINE_TEMPLATES_UPDATE || 'update:timeline_templates',
      ALL: process.env.SCOPE_TIMELINE_TEMPLATES_ALL || 'all:timeline_templates'
    },
    CHALLENGE_ATTACHMENTS: {
      READ: process.env.SCOPE_CHALLENGE_ATTACHMENTS_READ || 'read:challenge_attachments',
      CREATE: process.env.SCOPE_CHALLENGE_ATTACHMENTS_CREATE || 'create:challenge_attachments',
      ALL: process.env.SCOPE_CHALLENGE_ATTACHMENTS_ALL || 'all:challenge_attachments'
    }
  },

  M2M_AUDIT_HANDLE: process.env.M2M_AUDIT_HANDLE || 'TopcoderService'
}

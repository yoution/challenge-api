const dynamoose = require('dynamoose')
const Schema = dynamoose.Schema

// const awsConfigs = config.DYNAMODB.IS_LOCAL_DB ? {
//   accessKeyId: config.DYNAMODB.AWS_ACCESS_KEY_ID,
//   secretAccessKey: config.DYNAMODB.AWS_SECRET_ACCESS_KEY,
//   region: config.DYNAMODB.AWS_REGION
// } : {
//   region: config.DYNAMODB.AWS_REGION
// }

const awsConfigs = {
  accessKeyId: 'FAKE_ACCESS_KEY',
  secretAccessKey: 'FAKE_SECRET_ACCESS_KEY',
  region: 'ap-northeast-1'
}

dynamoose.AWS.config.update(awsConfigs)

dynamoose.local('http://localhost:8000')

dynamoose.setDefaults({
  create: false,
  update: false,
  waitForActive: false
})


const schema = new Schema({
  // id: {
  //   type: String,
  //   hashKey: true,
  //   required: true
  // },
  name: {
    type: String,
    required: true
  },
  dateOfBirth: {
    type: Date,
    required: true
  },
  effectiveDt: {
    type: Date,
    required: true
  },
  agent: {
    type: String,
    required: true
  },
  agency: {
    type: String,
    required: true
  },
  createDateTime: {
    type: Date,
    required: false
  },
  updatedDateTime: {
    type: Date,
    required: false
  }
},
{
  throughput: { read: 4, write: 2 },
  // throughput: 'ON_DEMAND',
  useDocumentTypes: true
}
)

const model = dynamoose.model('model', schema)

module.exports = model

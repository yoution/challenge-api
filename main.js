const dynamoose = require('dynamoose')
const AWS = require('aws-sdk')
const config = require('config')
const models = require('./src/models')

AWS.config.update({ 
  // accessKeyId:IAm_user_Key,
  // secretAccessKey:IAm_user_Secret,
  region:'us-east-2',
  endpoint:'http://localhost:8000' });

function getDbClient () {
  const dbClients = {}
  if (!dbClients.client) {
    dbClients.client = new AWS.DynamoDB.DocumentClient()
  }
  return dbClients.client
}


const challengeId = '5fa04185-041f-49a6-bfd1-fe82533cd6c8'

const id =  "5fa04185-041f-49a6-bfd1-fe82533cd6c5"
const fieldName = 'fieldName'
const memberId = 'member1'

const dbClient = getDbClient();
const filter = {
  TableName: 'AuditLog',
  IndexName: "computedField-index",
  KeyConditionExpression: "computed = :computed",
  // KeyConditionExpression: "challengeId = :challengeId",
  // KeyConditionExpression: "id = :id",
  ExpressionAttributeValues: {
    // ":id": id,
    // ":challengeId": challengeId,
    ":computed": challengeId + '_' + fieldName + '_' + memberId
    // ":computed": 'aa'
  }
}
console.log(challengeId + '_' + fieldName + '_' + memberId)


dbClient.query(filter, (err, data) => {
  if (err) {
    console.log('-----')
    console.log(err)
    console.log('-----')
    return err
  }
  console.log(data)
})


// models['AuditLog'].scan().exec((err, result) => {
//   if (err) {
//    console.log('xx',err) 
//   }
//   console.log(result)
// })

// const condition = new dynamoose.Condition().where("challengeId").eq(challengeId)//.and().where("name").eq("Bob");
// // models['AuditLog'].query('challengeId').eq(challengeId).using('challengeId-index').where('fieldName').eq('fieldName').using('fieldName-index').exec((err, result) => {
// models['AuditLog'].query(condition).exec((err, result) => {
//   if (err) {
//     console.log('-----')
//     console.log(err)
//     console.log('-----')
//   }
//   console.log(result)
// })

// const id = 'asdf'
// models['AuditLog'].query('id').eq(id).exec((err, result) => {
//   if (err) {
//     return reject(err)
//   }
//   console.log(result)
// })

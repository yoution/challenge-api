const newman = require('newman')
const _ = require('lodash')

const challengeTypeRequests = [
  {
    folder: 'create challengeType by admin',
    iterationData: require('./testData/challenge-type/create-challenge-type-by-admin.json')
  },
  {
    folder: 'create challengeType by invalid token',
    iterationData: require('./testData/challenge-type/create-challenge-type-by-invalid-token.json')
  },
  {
    folder: 'create challengeType by error field',
    iterationData: require('./testData/challenge-type/create-challenge-type-by-error-field.json')
  },
  {
    folder: 'get challengeType - id'
  },
  {
    folder: 'get challengeType - all'
  },
  {
    folder: 'get challengeType - not found'
  },
  {
    folder: 'fully update challengeType by admin',
    iterationData: require('./testData/challenge-type/fully-update-challenge-type-by-admin.json')
  },
  {
    folder: 'fully update challengeType by invalid token',
    iterationData: require('./testData/challenge-type/fully-update-challenge-type-by-invalid-token.json')
  },
  {
    folder: 'fully update challengeType by error field',
    iterationData: require('./testData/challenge-type/fully-update-challenge-type-by-error-field.json')
  },
  {
    folder: 'fully update challengeType by not foundId'
  },
  {
    folder: 'partially update challengeType by admin',
    iterationData: require('./testData/challenge-type/partially-update-challenge-type-by-admin.json')
  },
  {
    folder: 'partially update challengeType by invalid token',
    iterationData: require('./testData/challenge-type/partially-update-challenge-type-by-invalid-token.json')
  },
  {
    folder: 'partially update challengeType by error field',
    iterationData: require('./testData/challenge-type/partially-update-challenge-type-by-error-field.json')
  },
  {
    folder: 'partially update challengeType by not foundId'
  }
]
const challengeTrackRequests = [
  {
    folder: 'create challengeTrack by admin',
    iterationData: require('./testData/challenge-track/create-challenge-track-by-admin.json')
  },
  {
    folder: 'create challengeTrack by invalid token',
    iterationData: require('./testData/challenge-track/create-challenge-track-by-invalid-token.json')
  },
  {
    folder: 'create challengeTrack by error field',
    iterationData: require('./testData/challenge-track/create-challenge-track-by-error-field.json')
  },
  {
    folder: 'get challengeTrack - id'
  },
  {
    folder: 'get challengeTrack - all'
  },
  {
    folder: 'get challengeTrack - not found'
  },
  {
    folder: 'fully update challengeTrack by admin',
    iterationData: require('./testData/challenge-track/fully-update-challenge-track-by-admin.json')
  },
  {
    folder: 'fully update challengeTrack by invalid token',
    iterationData: require('./testData/challenge-track/fully-update-challenge-track-by-invalid-token.json')
  },
  {
    folder: 'fully update challengeTrack by error field',
    iterationData: require('./testData/challenge-track/fully-update-challenge-track-by-error-field.json')
  },
  {
    folder: 'fully update challengeTrack by not foundId'
  },
  {
    folder: 'partially update challengeTrack by admin',
    iterationData: require('./testData/challenge-track/partially-update-challenge-track-by-admin.json')
  },
  {
    folder: 'partially update challengeTrack by invalid token',
    iterationData: require('./testData/challenge-track/partially-update-challenge-track-by-invalid-token.json')
  },
  {
    folder: 'partially update challengeTrack by error field',
    iterationData: require('./testData/challenge-track/partially-update-challenge-track-by-error-field.json')
  },
  {
    folder: 'partially update challengeTrack by not foundId'
  }

]

const requests = [
  ...challengeTypeRequests,
  ...challengeTrackRequests
  // ChallengePhases
  // TimelineTemplates
  // ChallengeTimelineTemplates
  // AuditLog
  // Health
]

const options = {
  collection: require('./Challenge-API.postman_collection.json'),
  exportEnvironment: 'test/postman/Challenge-API.postman_environment.json',
  reporters: 'cli'
}

const runner = (options) => new Promise((resolve, reject) => {
  newman.run(options, function (err, results) {
    if (err) {
      reject(err)
      return
    }
    resolve(results)
  })
})

;(async () => {
  for (const request of requests) {
    delete require.cache[require.resolve('./Challenge-API.postman_environment.json')]
    options.environment = require('./Challenge-API.postman_environment.json')
    options.folder = request.folder
    options.iterationData = request.iterationData
    try {
      const results = await runner(options)
      if (_.get(results, 'run.failures.length', 0) > 0) {
        process.exit(-1)
      }
    } catch (err) {
      console.log(err)
    }
  }
})().then(() => {
  console.log('newman test completed!')
  process.exit(0)
}).catch((err) => {
  console.log(err)
  process.exit(1)
})

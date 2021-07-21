/**
 * Exposes a function that performs business logic rule checks before any modification to a challenge
 */
const _ = require('lodash')
const { challengeStatuses } = require('../../app-constants')
const errors = require('../common/errors')
const { hasAdminRole } = require('../common/helper')

/**
 * For each property that needs to be validated,
 * write a method that takes 3 parameters (newData, oldData, currentUser)
 * and write the logic of the validation insider the method.
 */
const RULE_CONFIGURATION = {
  tags: (newData, oldData, currentUser) => {
    if (currentUser.isMachine || hasAdminRole(currentUser)) {
      return
    }
    if (newData.status === challengeStatuses.Completed) {
      throw new errors.BadRequestError('Cannot change tags for completed challenges')
    }
  }
}

/**
 * Validate challenge changes
 * @param {Object} newData the new challenge data
 * @param {Object} oldData the old challenge data
 * @param {Object} currentUser the logged in user
 */
async function validateChallengeChanges (newData, oldData, currentUser) {
  for (const key of _.keys(newData)) {
    if (RULE_CONFIGURATION[key] && _.isFunction(RULE_CONFIGURATION[key])) {
      await RULE_CONFIGURATION[key](newData, oldData, currentUser)
    }
  }
}

module.exports = {
  validateChallengeChanges
}

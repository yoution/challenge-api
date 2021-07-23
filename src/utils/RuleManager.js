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
  status: (newData, oldData, currentUser) => {
    // 1.
    // If the challenge status is Draft, it can only be changed to Active/Deleted/Cancelled
    if (oldData.status === challengeStatuses.Draft) {
      if (_.indexOf([
        challengeStatuses.Active,
        challengeStatuses.Deleted,
        challengeStatuses.Cancelled
      ], newData.status) === -1) {
        throw new errors.BadRequestError(`Cannot change to ${newData.status} status for draft challenge`)
      }
    }

    // 2.
    // If the challenge status is Active, it can be changed to Completed only if all submissions are reviewed.
    if (oldData.status === challengeStatuses.Active && newData.status === challengeStatuses.Completed) {
      throw new errors.BadRequestError(`Cannot change to ${challengeStatuses.Completed} status`)
      // TODO
    }

    // 3.
    // If the challenge status is Active, it can be changed to Draft only if there are no registered members with a Submitter role
    if (oldData.status === challengeStatuses.Active && newData.status === challengeStatuses.Draft) {

      throw new errors.BadRequestError(`Cannot change to ${challengeStatuses.Draft} status`)
    }


    // 5.
    // The challenge prizes can only be increased if the submission and registration phases are still open.



    // 8
    // If the challenge status is Active, the submission/registration phases cannot be extended if there are already submissions for the challenge

    // 9
    // If the challenge status is Active, the submission/registration phases cannot be extended in the last 24 hours of the submission phase.

    // 10
    // If the challenge status is Completed, no changes to the challenge description, privateDescription, terms, and prizeSets are allowed.

    if (newData.status === challengeStatuses.Completed) {
      throw new errors.BadRequestError('Cannot change tags for completed challenges')
    }
  },
  prizeSets: (newData, oldData, currentUser) => {
    // 4.
    // If the challenge status is Active, the prizes cannot be lowered.
    if (oldData.status === challengeStatuses.Active && oldData.price) {
      throw new errors.BadRequestError('Cannot lower prizes for active challenge')
    }
  },
  terms: (newData, oldData, currentUser) => {
    // 6.
    // If the challenge status is Active, terms cannot be removed.
    if (oldData.status === challengeStatuses.Active && oldData.price) {
      throw new errors.BadRequestError('Cannot remove terms for active challenge')
    }

    // 7.
    // If the challenge status is Active, terms cannot be added if there are registered members.
    if (oldData.status === challengeStatuses.Active && oldData.price) {
      // throw new errors.BadRequestError('Cannot  terms for active challenge')
    }
  },
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
  for (const key of _.keys(newData['$PUT'])) {
    if (RULE_CONFIGURATION[key] && _.isFunction(RULE_CONFIGURATION[key])) {
      await RULE_CONFIGURATION[key](newData['$PUT'], oldData, currentUser)
    }
  }
  for (const key of _.keys(newData['$DELETE'])) {
    if (RULE_CONFIGURATION[key] && _.isFunction(RULE_CONFIGURATION[key])) {
      await RULE_CONFIGURATION[key](newData['$DELETE'], oldData, currentUser)
    }
  }
}

module.exports = {
  validateChallengeChanges
}

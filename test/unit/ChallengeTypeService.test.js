/*
 * Unit tests of challenge type service
 */

require('../../app-bootstrap')
const uuid = require('uuid/v4')
const chai = require('chai')
const service = require('../../src/services/ChallengeTypeService')

const should = chai.should()

describe('challenge type service unit tests', () => {
  // created entity ids
  let id
  let id2
  // random names
  const name = `test1${new Date().getTime()}`
  const name2 = `test2${new Date().getTime()}`
  const notFoundId = uuid()

  describe('create challenge type tests', () => {
    it('create challenge type successfully 1', async () => {
      const result = await service.createChallengeType({
        name,
        description: 'desc',
        isActive: true
      })
      should.equal(result.name, name)
      should.equal(result.description, 'desc')
      should.equal(result.isActive, true)
      should.exist(result.id)
      id = result.id
    })

    it('create challenge type successfully 2', async () => {
      const result = await service.createChallengeType({
        name: name2,
        description: 'desc2',
        isActive: false
      })
      should.equal(result.name, name2)
      should.equal(result.description, 'desc2')
      should.equal(result.isActive, false)
      should.exist(result.id)
      id2 = result.id
    })

    it('create challenge type - name already used', async () => {
      try {
        await service.createChallengeType({
          name,
          description: 'desc',
          isActive: false
        })
      } catch (e) {
        should.equal(e.message, `ChallengeType with name: ${name} already exist`)
        return
      }
      throw new Error('should not reach here')
    })

    it('create challenge type - missing name', async () => {
      try {
        await service.createChallengeType({
          description: 'desc',
          isActive: false
        })
      } catch (e) {
        should.equal(e.message.indexOf('"name" is required') >= 0, true)
        return
      }
      throw new Error('should not reach here')
    })

    it('create challenge type - invalid name', async () => {
      try {
        await service.createChallengeType({
          name: ['xx'],
          description: 'desc',
          isActive: false
        })
      } catch (e) {
        should.equal(e.message.indexOf('"name" must be a string') >= 0, true)
        return
      }
      throw new Error('should not reach here')
    })

    it('create challenge type - invalid isActive', async () => {
      try {
        await service.createChallengeType({
          name: 'some name',
          description: 'desc',
          isActive: 'abc'
        })
      } catch (e) {
        should.equal(e.message.indexOf('"isActive" must be a boolean') >= 0, true)
        return
      }
      throw new Error('should not reach here')
    })

    it('create challenge type - unexpected field', async () => {
      try {
        await service.createChallengeType({
          name: 'some name',
          description: 'desc',
          isActive: false,
          other: 123
        })
      } catch (e) {
        should.equal(e.message.indexOf('"other" is not allowed') >= 0, true)
        return
      }
      throw new Error('should not reach here')
    })
  })

  describe('get challenge type tests', () => {
    it('get challenge type successfully', async () => {
      const result = await service.getChallengeType(id2)
      should.equal(result.id, id2)
      should.equal(result.name, name2)
      should.equal(result.description, 'desc2')
      should.equal(result.isActive, false)
    })

    it('get challenge type - not found', async () => {
      try {
        await service.getChallengeType(notFoundId)
      } catch (e) {
        should.equal(e.message, `ChallengeType with id: ${notFoundId} doesn't exist`)
        return
      }
      throw new Error('should not reach here')
    })

    it('get challenge type - invalid id', async () => {
      try {
        await service.getChallengeType('invalid')
      } catch (e) {
        should.equal(e.message.indexOf('"id" must be a valid GUID') >= 0, true)
        return
      }
      throw new Error('should not reach here')
    })
  })

  describe('search challenge types tests', () => {
    it('search challenge types successfully 1', async () => {
      const result = await service.searchChallengeTypes({
        page: 1,
        perPage: 10,
        name: name2.substring(1).toUpperCase(),
        description: 'desc',
        isActive: false
      })
      should.equal(result.total, 1)
      should.equal(result.page, 1)
      should.equal(result.perPage, 10)
      should.equal(result.result.length, 1)
      should.equal(result.result[0].id, id2)
      should.equal(result.result[0].name, name2)
      should.equal(result.result[0].description, 'desc2')
      should.equal(result.result[0].isActive, false)
    })

    it('search challenge types successfully 2', async () => {
      const result = await service.searchChallengeTypes({ name: 'xyzxyz123' })
      should.equal(result.total, 0)
      should.equal(result.page, 1)
      should.equal(result.perPage, 20)
      should.equal(result.result.length, 0)
    })

    it('search challenge types - invalid name', async () => {
      try {
        await service.searchChallengeTypes({ name: ['invalid'] })
      } catch (e) {
        should.equal(e.message.indexOf('"name" must be a string') >= 0, true)
        return
      }
      throw new Error('should not reach here')
    })

    it('search challenge types - invalid description', async () => {
      try {
        await service.searchChallengeTypes({ description: ['invalid'] })
      } catch (e) {
        should.equal(e.message.indexOf('"description" must be a string') >= 0, true)
        return
      }
      throw new Error('should not reach here')
    })

    it('search challenge types - invalid isActive', async () => {
      try {
        await service.searchChallengeTypes({ isActive: 'abc' })
      } catch (e) {
        should.equal(e.message.indexOf('"isActive" must be a boolean') >= 0, true)
        return
      }
      throw new Error('should not reach here')
    })

    it('search challenge types - invalid page', async () => {
      try {
        await service.searchChallengeTypes({ page: -1 })
      } catch (e) {
        should.equal(e.message.indexOf('"page" must be larger than or equal to 1') >= 0, true)
        return
      }
      throw new Error('should not reach here')
    })

    it('search challenge types - invalid perPage', async () => {
      try {
        await service.searchChallengeTypes({ perPage: -1 })
      } catch (e) {
        should.equal(e.message.indexOf('"perPage" must be larger than or equal to 1') >= 0, true)
        return
      }
      throw new Error('should not reach here')
    })

    it('search challenge types - unexpected field', async () => {
      try {
        await service.searchChallengeTypes({ other: 123 })
      } catch (e) {
        should.equal(e.message.indexOf('"other" is not allowed') >= 0, true)
        return
      }
      throw new Error('should not reach here')
    })
  })

  describe('fully update challenge type tests', () => {
    it('fully update challenge type successfully', async () => {
      const result = await service.fullyUpdateChallengeType(id2, {
        name: `${name2}-updated`,
        description: 'desc222',
        isActive: true
      })
      should.equal(result.id, id2)
      should.equal(result.name, `${name2}-updated`)
      should.equal(result.description, 'desc222')
      should.equal(result.isActive, true)
    })

    it('fully update challenge type - name already used', async () => {
      try {
        await service.fullyUpdateChallengeType(id2, {
          name,
          description: 'desc',
          isActive: false
        })
      } catch (e) {
        should.equal(e.message, `ChallengeType with name: ${name} already exist`)
        return
      }
      throw new Error('should not reach here')
    })

    it('fully update challenge type - not found', async () => {
      try {
        await service.fullyUpdateChallengeType(notFoundId, {
          name: 'slkdjflskjdf',
          description: 'desc',
          isActive: false
        })
      } catch (e) {
        should.equal(e.message, `ChallengeType with id: ${notFoundId} doesn't exist`)
        return
      }
      throw new Error('should not reach here')
    })

    it('fully update challenge type - invalid id', async () => {
      try {
        await service.fullyUpdateChallengeType('invalid', {
          name: 'slkdjflskjdf',
          description: 'desc',
          isActive: false
        })
      } catch (e) {
        should.equal(e.message.indexOf('"id" must be a valid GUID') >= 0, true)
        return
      }
      throw new Error('should not reach here')
    })

    it('fully update challenge type - null name', async () => {
      try {
        await service.fullyUpdateChallengeType(id, {
          name: null,
          description: 'desc',
          isActive: false
        })
      } catch (e) {
        should.equal(e.message.indexOf('"name" must be a string') >= 0, true)
        return
      }
      throw new Error('should not reach here')
    })

    it('fully update challenge type - invalid name', async () => {
      try {
        await service.fullyUpdateChallengeType(id, {
          name: { invalid: 'x' },
          description: 'desc',
          isActive: false
        })
      } catch (e) {
        should.equal(e.message.indexOf('"name" must be a string') >= 0, true)
        return
      }
      throw new Error('should not reach here')
    })

    it('fully update challenge type - invalid description', async () => {
      try {
        await service.fullyUpdateChallengeType(id, {
          name: 'some name',
          description: ['desc'],
          isActive: false
        })
      } catch (e) {
        should.equal(e.message.indexOf('"description" must be a string') >= 0, true)
        return
      }
      throw new Error('should not reach here')
    })

    it('fully update challenge type - empty name', async () => {
      try {
        await service.fullyUpdateChallengeType(id, {
          name: '',
          description: 'desc',
          isActive: false
        })
      } catch (e) {
        should.equal(e.message.indexOf('"name" is not allowed to be empty') >= 0, true)
        return
      }
      throw new Error('should not reach here')
    })

    it('fully update challenge type - invalid isActive', async () => {
      try {
        await service.fullyUpdateChallengeType(id, {
          name: 'asdfsadfsdf',
          description: 'desc',
          isActive: 'invalid'
        })
      } catch (e) {
        should.equal(e.message.indexOf('"isActive" must be a boolean') >= 0, true)
        return
      }
      throw new Error('should not reach here')
    })
  })

  describe('partially update challenge type tests', () => {
    it('partially update challenge type successfully 1', async () => {
      const result = await service.partiallyUpdateChallengeType(id2, {
        name: `${name2}-33`,
        description: 'desc33'
      })
      should.equal(result.id, id2)
      should.equal(result.name, `${name2}-33`)
      should.equal(result.description, 'desc33')
      should.equal(result.isActive, true)
    })

    it('partially update challenge type - name already used', async () => {
      try {
        await service.partiallyUpdateChallengeType(id2, {
          name
        })
      } catch (e) {
        should.equal(e.message, `ChallengeType with name: ${name} already exist`)
        return
      }
      throw new Error('should not reach here')
    })

    it('partially update challenge type - not found', async () => {
      try {
        await service.partiallyUpdateChallengeType(notFoundId, {
          name: 'slkdjflskjdf'
        })
      } catch (e) {
        should.equal(e.message, `ChallengeType with id: ${notFoundId} doesn't exist`)
        return
      }
      throw new Error('should not reach here')
    })

    it('partially update challenge type - invalid id', async () => {
      try {
        await service.partiallyUpdateChallengeType('invalid', { name: 'hufdufhdfx' })
      } catch (e) {
        should.equal(e.message.indexOf('"id" must be a valid GUID') >= 0, true)
        return
      }
      throw new Error('should not reach here')
    })

    it('partially update challenge type - null name', async () => {
      try {
        await service.partiallyUpdateChallengeType(id, { name: null })
      } catch (e) {
        should.equal(e.message.indexOf('"name" must be a string') >= 0, true)
        return
      }
      throw new Error('should not reach here')
    })

    it('partially update challenge type - invalid description', async () => {
      try {
        await service.partiallyUpdateChallengeType(id, { description: { invalid: 'x' } })
      } catch (e) {
        should.equal(e.message.indexOf('"description" must be a string') >= 0, true)
        return
      }
      throw new Error('should not reach here')
    })

    it('partially update challenge type - empty name', async () => {
      try {
        await service.partiallyUpdateChallengeType(id, { name: '' })
      } catch (e) {
        should.equal(e.message.indexOf('"name" is not allowed to be empty') >= 0, true)
        return
      }
      throw new Error('should not reach here')
    })

    it('partially update challenge type - unexpected field', async () => {
      try {
        await service.partiallyUpdateChallengeType(id, { name: 'xx', other: 'xx' })
      } catch (e) {
        should.equal(e.message.indexOf('"other" is not allowed') >= 0, true)
        return
      }
      throw new Error('should not reach here')
    })
  })
})

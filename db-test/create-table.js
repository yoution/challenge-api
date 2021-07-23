const model = require('./model')

async function createTable() {
  console.log('creating table')
  try {
    await model.$__.table.create()
    console.log('create table successfully')
    process.exit()
  } catch (e) {
    console.log('create table failed', e)
    process.exit(1)
  }
}

createTable()

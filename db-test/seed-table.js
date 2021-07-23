const model = require('./model')

async function seedTable() {
  console.log('inserting table')
  try {
    const data = require(`./data.json`)
    await model.batchPut(data)
    console.log('insert data successfully')
    process.exit()
  } catch (e) {
    console.log('insert data failed', e)
    process.exit(1)
  }
}

seedTable()

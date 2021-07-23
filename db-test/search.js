const model = require('./model')

async function scanAll (scanParams) {
  let results = await model.scan(scanParams).exec()
  let lastKey = results.lastKey
  while (results.lastKey) {
    const newResult = await model.scan(scanParams).startAt(lastKey).exec()
    results = [...results, ...newResult]
    lastKey = newResult.lastKey
  }
  return results
}

async function search() {
  debugger;
  const result = await scanAll({name:"bo1", agent: "asdf"})
  console.log(JSON.parse(JSON.stringify(result)))
}

search()

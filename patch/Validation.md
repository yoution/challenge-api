# validation

## uncomment lines
uncomment line in `config/default.js` line 29,31 to 
```
    AWS_ACCESS_KEY_ID: process.env.AWS_FAKE_ID || 'FAKE_ACCESS_KEY',
    AWS_SECRET_ACCESS_KEY: process.env.AWS_FAKE_KEY || 'FAKE_SECRET_ACCESS_KEY',
```

## set `BUSAPI_URL`
you can follow the video step in file `Poc-test.md`  to  set the mock server in the  postman, 
or just comment the line in `src/common/helper.js` in line 601 to 607
```
async function postBusEvent (topic, payload) {
  const client = getBusApiClient()
  // await client.postEvent({
  //   topic,
  //   originator: constants.EVENT_ORIGINATOR,
  //   timestamp: new Date().toISOString(),
  //   'mime-type': constants.EVENT_MIME_TYPE,
  //   payload
  // })
}
```

## set env
```
  export AUTH0_URL=https://topcoder-dev.auth0.com/oauth/token
  export AUTH0_AUDIENCE=https://m2m.topcoder-dev.com/
  export AUTH0_AUDIENCE_UBAHN=https://u-bahn.topcoder.com
  export AUTH0_CLIENT_ID=gZ6jt50HYHLBf4vhxjUhXPZOR7Q5lk4k
  export AUTH0_CLIENT_SECRET=zb-OV1Rl3QpUkt4BexJ-Rs58jYMazCre1_97aU4PJIvQdVB-DmQIs61W3gCfPyP4

```

## follow the `Poc-test.md` to start the server local

### start docker
```
  $ cd challenge-api/local
  $ docker-compose up

```
### create tables
```
  $ npm run create-tables
```

### start app
```
  $ cd challenge-api 
  $ source env.sh            # set env variables
  $ NODE_ENV=test npm start
```

### newman test
  ```bash
  $ npm run test:newman
  ```

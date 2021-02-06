#!/bin/zsh
# cd local
# docker-compose up

# export AUTH0_AUDIENCE=https://m2m.topcoder-dev.com/
# export AUTH0_CLIENT_ID=EkE9qU3Ey6hdJwOsF1X0duwskqcDuElW
# export AUTH0_CLIENT_SECRET=Iq7REiEacFmepPh0UpKoOmc6u74WjuoJriLayeVnt311qeKNBvhRNBe9BZ8WABYk
# export AUTH0_URL=https://topcoder-dev.auth0.com/oauth/token
# export AUTH0_PROXY_SERVER_URL=https://topcoder-dev.auth0.com/oauth/token

export AUTH0_CLIENT_ID=AjXaC6akg8U6FBMSh8Ay6xWoNwcfBQmN
export AUTH0_CLIENT_SECRET=LtjEtwYiqsK-7y7IW_PFdxAir42hhJfMrX9nWgiCj8MSLMdDfmPSWbygw-d4BcM5
export AUTH0_URL=https://topcoder-dev.auth0.com/oauth/token
export AUTH0_AUDIENCE=https://m2m.topcoder-dev.com/
export AUTH0_PROXY_SERVER_URL=https://auth0proxy.topcoder-dev.com/token

node app.js

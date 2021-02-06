#!/bin/zsh
# cd local
# docker-compose up

export AUTH0_CLIENT_ID=8QovDh27SrDu1XSs68m21A1NBP8isvOt
export AUTH0_CLIENT_SECRET=3QVxxu20QnagdH-McWhVz0WfsQzA1F8taDdGDI4XphgpEYZPcMTF4lX3aeOIeCzh
export AUTH0_URL=https://topcoder-dev.auth0.com/oauth/token
export AUTH0_AUDIENCE=https://m2m.topcoder-dev.com/

# npm run drop-tables
# npm run init-es
# npm run create-tables
# npm run init-db
# npm run seed-tables
# npm run sync-es
# npm run start
node --inspect-brk app.js

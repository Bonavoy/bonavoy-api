# Bonavoy GraphQL API

Repo for Bonavoy's GraphQL API

# Setup

1. clone repo and `cd` into root
2. get secret files
3. install node modules with `yarn install`
4. run with `yarn dev`

# Codegen

use `yarn codegen` to regenerate typescript types according to the graphql schemas in `src/generated/graphql.ts`

# Testing

Run `yarn test` or `yarn test:watch`

# Documentation

- Local: http://localhost:4000/graphql
- Prod: http://api.bonavoy.com/graphql

# Deployment

Deployed using: https://cloud.google.com/community/tutorials/nginx-reverse-proxy-docker

1. SSH into the server and `cd` into `bonavoy-api` directory
2. `git pull` latest commit on main
3. build image with `docker build -t bonavoy-api .`
4. Run container with:

```
docker run -d \
    --name bonavoy-api \
    -e 'LETSENCRYPT_EMAIL=bonavoydevelopers@gmail.com' \
    -e 'LETSENCRYPT_HOST=api.bonavoy.com' \
    -e 'VIRTUAL_HOST=api.bonavoy.com' bonavoy-api:latest
```

`docker run -it -p <PORT>:4000 <CONTAINER_NAME>`

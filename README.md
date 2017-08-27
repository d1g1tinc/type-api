# Typescript enabled API library

[![Greenkeeper badge](https://badges.greenkeeper.io/casual-solutions/type-api.svg)](https://greenkeeper.io/)

[![Build Status](https://travis-ci.org/casual-solutions/type-api.svg?branch=master)](https://travis-ci.org/casual-solutions/type-api)
[![NPM version](https://img.shields.io/npm/v/standard-version.svg)](https://www.npmjs.com/package/type-api)
[![Standard Version](https://img.shields.io/badge/release-standard%20version-brightgreen.svg)](https://github.com/conventional-changelog/standard-version)
[![styled with prettier](https://img.shields.io/badge/styled_with-prettier-ff69b4.svg)](https://github.com/prettier/prettier)
[![Conventional Commits](https://img.shields.io/badge/Conventional%20Commits-1.0.0-yellow.svg)](https://conventionalcommits.org)


## Consumption of published library:

`yarn add type-api` or `npm install type-api`

### Webpack

```ts
import {RestApi, rest} from 'type-api'

/**
 * Define rest api
 */
@rest({
    baseUrl: 'https://jsonplaceholder.typicode.com',
    endpoint: '/posts'
})
class PostApi extends RestApi {
    // Here you can define additional methods as needed
}

/**
 * Initialize api
 */
export const postApi = new PostApi()

// Get one by ID
try {
    const response = postApi.findById(1)

    console.log(response)
} catch (error) {
    console.error(error)
}

// Create entity
try {
    const postData =   {
        "userId": 1,
        "title": "New user",
        "body": "Some content"
    },
    const response = postApi.create(postData)

    console.log(response)
} catch (error) {
    console.error(error)
}

// Update entity
try {
    const postData =   {
        "userId": 1,
        "title": "New user",
        "body": "Some content"
    },
    const response = postApi.update(1, postData)

    console.log(response)
} catch (error) {
    console.error(error)
}
```

### Available methods


## Rest API

* `findById(id)` : GET - retrieve one record as object
* `findAll()` : GET - retrieve all records as list
* `find({limit: 3})` : GET - retrieve records as list and generate query string from object
* `create({name: 'Some Name'})` : POST - submit object for creation
* `update(1, {name: 'Some Name'})` : PUT - submit object for update

## Base API

* `get('custom')`
* `post('custom', postData)`
* `put('custom', postData)`

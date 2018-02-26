[![Build Status](https://travis-ci.org/Cereceres/mongo-proxy.svg?branch=master)](https://travis-ci.org/Cereceres/mongo-proxy)


# proxifying-mongo
mongo proxy to wrap mongoDB
   


# Config

|Variable|Mean|Default|
|---|---|---|
|NUM_DOC_BY_PAGE|doc's number to return in a query|100|
|PORT|port where start the server|8080|


# API 
Expond a object with :

    {
        ProxyError -> Object,
        startServer([dbUrl, port, getters, options]) -> Promise,
        getServer([dbUrl, getters, options]) -> Promise,
        getMiddleware([dbUrl, getters, options]) -> Promise
    }

Because of async behavior of DB connections every function return a promise. In another hand dbUlrl default value is 'mongodb://localhost:27017/test'
port default value is '8080'.

Options object is:

    {
        baseUrl: '/path/where/mount/the/api'
    }

default value to baseUrl is '/'.

With this options, then the request url is

    localhost:8080/path/where/mount/the/api/collectionName[/ID?query]

if ID is given the query is replaced with {_id:ID}, how you can guess, the collectionName is required. The data to POST and PUT must travel in body request field.

# Response
    {
        error, // if is present other fields will be missing
        records, // array of items altered
        next // path to next request to do pagination
    }

# Errors

Promise rejected will be considered as API errors. The object returned by a promise rejected need to be:

    {
        message: string() // error property returned in response,
        code: number() // http code to return in response, default 500
    }

## Class ProxyError(httpCode, message)
Extends of Error class.
## Getters

For getMiddleware:

    {
        getDatabase(dbUrl)-> DataBaseConnection,
        getUserModel(DataBaseConnection) -> userModel,
        getSchemaModel(DataBaseConnection) -> schemaModel,
        getCollection(DataBaseConnection) -> collectionModel,
        getCredentialsFromReq(req) -> Promise.resolve({pass, name})
    }


For getServer:


    {
        getDatabase(dbUrl)-> DataBaseConnection,
        getUserModel(DataBaseConnection) -> userModel,
        getSchemaModel(DataBaseConnection) -> schemaModel,
        getCollection(DataBaseConnection) -> collectionModel,
        getCredentialsFromReq(req) -> Promise.resolve({pass, name}),
        getMiddleware(dbUrl, getters) -> middleware(req, res)
    }
For startServer:


    {
        getServer(dbUrl, getters) -> ServerInstance,
        getDatabase(dbUrl)-> DataBaseConnection,
        getUserModel(DataBaseConnection) -> userModel,
        getSchemaModel(DataBaseConnection) -> schemaModel,
        getCollection(DataBaseConnection) -> collectionModel,
        getCredentialsFromReq(req) -> Promise.resolve({pass, name}),
        getMiddleware(dbUrl, getters) -> middleware(req, res)
    }

## userModel

    {
        FindOne(query)-> Promise.resolve(resultQuery)
    }

## schemaModel

    {
        FindOne(query)-> Promise.resolve(resultQuery)
    }

## collectionModel

    {
        find(query)-> Promise.resolve(resultQuery),
        create(data)-> Promise.resolve(dataCreated),
        delete(query)-> Promise.resolve(docRemoved),
        update(query, dataToUpdate)-> Promise.resolve(docUpdated),
        count(query) -> Promise.resolve(NumberOfDocMatchingQuery)
    }

# Users Collection

Default proxifying-mongo try to get info of user from __users collection.
The proxifying-mongo looking for name and pass fields, the pass must be base64 coded.
In this doc the [collectionName] field is a json with:

    {
        name:'userName',
        pass:'base64codingPass',
        someCollectionName:{
            someField:{
                __$remove:false,
                __$get:false,
                __$create:true,
                __$update:false,
            },
            otherField:'__$all',
            ...otherfields
            _id:{
                __$remove:false,
                __$get:false,
            }
        },
        otherCollectionName:{
            fieldOne:'__$all',
            fieldTwo:'__$all',
            ...otherfields
            _id:{
                __$remove:false,
                __$get:false,
            }
        },
        actions: {
            PUT:false,
            GET: true,
            DELETE: false,
            POST:false
        }
    }

actions could be '__$all' on that case all actions to this user are allowed.

# Schema Model
Default proxifying-mongo try to get the schema to collectionName given from __schemas collection, the schema must a json schema like [joison](!https://www.npmjs.com/package/joison) module, the json object returned by findOne method in schemaModel is passed to joison and the joi schema returned by joison is used to validate the data.

    {
        __schema: joisonSchema,
        __collection:'collectionName'
    }

Example of doc in __schemas collection

    {
        __schema: {
                __$type:'object',
                __$properties:{
                    someField:{
                        __$type:'object',
                        __$properties:{
                            nested:{
                                __$type:'string'
                            }
                        }
                    },
                    otherField:{
                        __$type:'string'
                    }
                },
                __$required:[]
            },
        __collection:'collectionName'
    }

actions could be '__$all' on that case all actions to this user are allowed.

# Client

If you install globally you get a monprox command with next options:

    Options:
    --version                  Show version number                       [boolean]
    --gd, --get-db             Path to get-database                       [string]
    --gum, --get-user-model    Path to get-user-model                     [string]
    --gsm, --get-schema-model  Path to get-schema-model
    --gc, --get-collection     Path to get-collection-model-thunk         [string]
    --help                     Show help                                 [boolean]
    -h, --host                 Host'url with basic auth to use
                                [string] [default: "mongodb://localhost:27017/test"]
    -s, --start                Start the server                          [boolean]
    -p, --port                 Host'port                [string] [default: "8080"]


Here the difference is that get-collection file must export a thunk what receive the 
database instance returned by get-database module and must return a function what is called with collectionName and return the collection object with find, create, delete and update methods.


    getCollection(DBinstance) -> function(collectionName) -> {
        find(query)-> Promise.resolve(resultQuery),
        create(data)-> Promise.resolve(dataCreated),
        delete(query)-> Promise.resolve(docRemoved),
        update(query, dataToUpdate)-> Promise.resolve(docUpdated)
    }

example:

```bash
monprox -s --gd ./lib/get-database --gum ./lib/get-getter-user/get-model-user --gsm ./lib/get-getter-schema/get-model-schema --gc ./lib/get-getter-collection

```

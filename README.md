[![Build Status](https://travis-ci.org/Cereceres/mongo-proxy.svg?branch=master)](https://travis-ci.org/Cereceres/mongo-proxy)


# mongo-proxy
mongo proxy to wrap mongoDB


# API 
Expond a object with :

    {
        startServer([dbUrl, port, getters]),
        getServer([dbUrl, getters]),
        getMiddleware([dbUrl, getters])
    }


dbUlrl default value is 'mongodb://localhost:27017/test'
port default value is '8080'.


## Getters

For getMiddleware:

    {
        getDatabase(dbUrl)-> DataBaseConnection,
        getUserModel(DataBaseConnection) -> userModel,
        getSchemaModel(DataBaseConnection) -> schemaModel,
        getCollection(DataBaseConnection) -> collectionModel
    }


For getServer:


    {
        getDatabase(dbUrl)-> DataBaseConnection,
        getUserModel(DataBaseConnection) -> userModel,
        getSchemaModel(DataBaseConnection) -> schemaModel,
        getCollection(DataBaseConnection) -> collectionModel
        getMiddleware(dbUrl, getters) -> middleware(req, res)
    }
For startServer:


    {
        getServer(dbUrl, getters) -> ServerInstance,
        getDatabase(dbUrl)-> DataBaseConnection,
        getUserModel(DataBaseConnection) -> userModel,
        getSchemaModel(DataBaseConnection) -> schemaModel,
        getCollection(DataBaseConnection) -> collectionModel
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
        update(query, dataToUpdate)-> Promise.resolve(docUpdated)
    }



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
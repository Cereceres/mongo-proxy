[![Build Status](https://travis-ci.org/Cereceres/mongo-proxy.svg?branch=master)](https://travis-ci.org/Cereceres/mongo-proxy)


# mongo-proxy
mongo proxy to wrap mongoDB


# API 
Expond a object with {
    startServer([dbUrl, port, getters]),
    getServer([dbUrl, getters]),
    getMiddleware([dbUrl, getters])
}


dbUlrl default value is 'mongodb://localhost:27017/test'
port default value is 'port'


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
        getMiddleware()
    }
For startServer:
    {
        getServer()
        getDatabase(dbUrl)-> DataBaseConnection,
        getUserModel(DataBaseConnection) -> userModel,
        getSchemaModel(DataBaseConnection) -> schemaModel,
        getCollection(DataBaseConnection) -> collectionModel
        getMiddleware()
    }


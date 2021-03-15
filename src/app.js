
const bodyParser = require('body-parser')
const express = require('express')
var cors = require('cors');
const mongoose = require('mongoose')
const routes = require('./routes')
const config = require ('../config/config.json')
const auth = require('./utils/authMiddleware')

//class app
class App{
    constructor(){
        this.server = express()
        this.server.use(cors())
        mongoose.Promise = global.Promise
        mongoose.connect( config.mongoURL , { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true }).then(()=>{
            console.log( 'Connected to mongo' )
        }).catch((err)=>{
            console.log( 'error: ' + err)
        })

        this.middlewares()
        this.routes()
    }

    middlewares(){
        this.server.use(express.json())
    }

    routes(){
        this.server.use(routes)
    }
}

module.exports = new App().server

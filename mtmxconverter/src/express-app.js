const express = require('express');
const cors  = require('cors');
const { mtmxconverter, appEvents  } = require('./api');
const HandleErrors = require('./utils/error-handler')
var bodyParser = require('body-parser')

module.exports = async (app) => {

    app.use(express.json({ limit: '1mb'}));
    app.use(express.urlencoded({ extended: true, limit: '1mb'}));
    app.use(cors());
    app.use(express.static(__dirname + '/public'))

    app.use(bodyParser.urlencoded({ extended: false }))
     app.use(bodyParser.json())

    //Listeners
    appEvents(app);

    //api
    mtmxconverter(app);

    // error handling
    app.use(HandleErrors);
    
}
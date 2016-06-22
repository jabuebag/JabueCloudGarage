var express = require('express');
var mongoose = require('mongoose');
var bodyParser  = require('body-parser');
var systemConfig = require('./Config/SystemConfig');
var mongoConfig = require('./Config/MongoConfig');
var authMiddleware = require('./Utility/AuthUtility');

// path router
var indexController = require('./Controller/IndexController');
var userController = require('./Controller/UserController');
var authController = require('./Controller/AuthController');

// App
var app = express();
var router = express.Router();

// connect mongo db
mongoose.connect(mongoConfig.mongoUrl);

// use body parser so we can get info from POST and/or URL parameters
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//authMiddleware
authMiddleware.authMiddleware(app, router);

// route to different controllers due to path
app.use('/', indexController);
app.use('/user', userController);
app.use('/auth', authController);

app.listen(systemConfig.port);
console.log('Server is on.');
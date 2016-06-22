/**
 * Created by jabue on 16-06-16.
 */
var express = require('express');
var authService = require('../Service/AuthService');

var router = express.Router();

router.post('/auth', function (req, res) {
    authService.authUser(req.body.email, req.body.password, function(success, token) {
        if (success) {
            res.json({
                success: true,
                message: 'Enjoy your token!',
                token: token
            });
        } else {
            res.json({
                success: false,
                message: 'Authentication failed.'
            });
        }
    })
});

router.get('/', function (req, res, next) {
    res.json({
        title: 'Authentication API Instructions',
        APIS: [
            {
                api: '/auth/auth',
                describe: 'Authenticate users. Generate token for user.',
                method: 'post',
                parameters: 'email:requird, password:required',
                token: 'not required'
            }
        ]
    });
});

module.exports = router;
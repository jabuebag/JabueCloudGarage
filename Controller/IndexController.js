/**
 * Created by jabue on 16-06-15.
 */
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
    res.json({
        title: 'JabueCloud API Instructions',
        APIS: [
            {
                api: '/user',
                describe: 'All user APIS, go to /user to see detail instructions.'
            },
            {
                api: '/auth',
                describe: 'All auth APIS, go to /auth to see detail instructions.'
            },
            {
                api: '/map',
                describe: 'All map APIS, go to /map to see detail instructions.'
            }
        ]
    });
});

module.exports = router;
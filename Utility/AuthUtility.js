/**
 * Created by jabue on 16-06-17.
 */
var jwt = require('jsonwebtoken');
var systemConfig = require('../Config/SystemConfig');

var exports = module.exports = {};

exports.authMiddleware = function (app, router) {
    // route authenticate
    router.use(function (req, res, next) {
        var token = req.body.token || req.query.token || req.headers['x-access-token'];

        if (token) {
            jwt.verify(token, systemConfig.tokenSecret, function (err, decoded) {
                if (err) {
                    return res.json({
                        success: false,
                        message: 'Failed to authenticate token.'
                    });
                } else {
                    req.decoded = decoded;
                    next();
                }
            });
        } else {
            return res.status(403).send({
                success: false,
                message: 'No token provided.'
            });
        }
    });

    app.use('/user/users', router);
    app.use('/user/info', router);
}
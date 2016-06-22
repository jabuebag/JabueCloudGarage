/**
 * Created by jabue on 16-06-21.
 */
var jwt = require('jsonwebtoken');
var passwordHash = require('password-hash');
var systemConfig = require('../Config/SystemConfig');
var User = require('../Model/UserModel');
var exports = module.exports = {};

exports.authUser = function (email, password, callback) {
    User.findOne({
        email: email
    }, function (err, user) {
        if (err) throw err;
        if (user && passwordHash.verify(password, user.password)) {
            var token = jwt.sign(user, systemConfig.tokenSecret);
            callback(true, token);
        } else {
            callback(false, null);
        }
    });
}

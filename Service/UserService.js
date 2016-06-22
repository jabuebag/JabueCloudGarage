/**
 * Created by jabue on 16-06-15.
 */
var passwordHash = require('password-hash');
var User = require('../Model/UserModel');

var exports = module.exports = {};

exports.addUser = function (body, callback) {
    var user = new User({
        username: body.username,
        password: passwordHash.generate(body.password),
        email: body.email ? body.email : '',
        admin: true
    });

    user.save(function (err, user) {
        if (err) throw err;
        console.log('User saved successfully');
        return callback(user);
    });
}

exports.isExist = function (email, callback) {
    User.find({
        email: email
    }, function (err, user) {
        if (err) throw err;
        if (user.length > 0) {
            callback(true);
        } else {
            callback(false);
        }
    });
}

exports.getAllUser = function (callback) {
    User.find({}, function (err, users) {
        callback(users);
    });
}

exports.getUserInfo = function (uid, callback) {
    User.findById(uid, function (err, user) {
        if (err) throw err;
        callback(user);
    });
}

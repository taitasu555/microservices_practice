'use strict';

var utils = require('../utils/writer.js');
var Users = require('../service/UsersService');

module.exports.loginGET = function loginGET (req, res, next) {
  Users.loginGET()
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

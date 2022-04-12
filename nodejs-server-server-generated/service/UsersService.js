'use strict';


/**
 * Get all users.
 * Returns an array of User model
 *
 * returns List
 **/
exports.loginGET = function() {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = [ {
  "email" : "test@test.com"
} ];
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


  /**
 * Useraccount.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    roll_number: {
      type: 'string'
    },
    password: {
      type: 'string'
    },
    full_name:  {
      type: 'string'
    },
    mobile_number:  {
      type: 'string'
    },
    email_id: {
      type: 'string'
    },
    admin:  {
      type: 'boolean',
      defaultsTo:  false
    },
    verified: {

    }
  }
};

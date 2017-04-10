/**
 * Transport.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    bus_number: {
      type: 'string'
    },
    bus_route:  {
      type: 'string'
    },
    status : {
      type : 'boolean',
      defaultsTo : 'true'
    },
    comments : {
      type : 'string',
      defaultsTo : 'No comments'
    },
    driverDetails : {
      type : 'json'
    },
    alternateTransport : {
      type : 'array'
    }

  }
};

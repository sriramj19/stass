/**
 * Stoppoint.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    transport_id: {
      model:  'transport'
    },
    boarding_point: {
      type: 'string'
    },
    boarding_time:  {
      type: 'string'
    }

  }
};

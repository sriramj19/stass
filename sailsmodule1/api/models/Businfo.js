/**
 * Businfo.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    profile_id: {
      model:  'useraccount'
    },
    bus_id:  {
      model:  'stoppoint'
    },
    status : {
      type : 'boolean',
      defaultsTo : 'true'
    }
  }
};

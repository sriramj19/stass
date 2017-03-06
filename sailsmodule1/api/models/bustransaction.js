module.exports = {
  attributes : {
    profile_id : {
      model : 'useraccount'
    },
    bus_details : {
      model : 'transport'
    },
    stop_details : {
      model : 'stoppoint'
    },
    feeStatus : {
      type : 'boolean',
      defaultsTo : 'false'
    }
  }
};

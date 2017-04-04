/**
 * BusinfoController
 *
 * @description :: Server-side logic for managing businfoes
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

 var _ = require('lodash');

var _ = require('lodash');
module.exports = {
	createBusInfo : function(req, res) {
		var busInfo = req.allParams();

		Businfo.create(busInfo).exec(function(err, response) {
			if(err)	return console.log(err);

			if(response) {
				return res.json(response);
			}
		});
	},
	getAllStudentsTravels : function(req, res) {
		Businfo.find().populate('profile_id').populate('bus_id').exec(function(err, responseData) {
			if(err)	return console.log(err);

			var response=[];
			if(responseData.length) {
				_.forEach(responseData, function(value) {
					if(value.bus_id.transport_id === req.param('id')) {
						response.push(value);
					}
				});
				return res.json(response);
			}
			else {
				return res.status(404).json({error : "No travel data found"});
			}
		});
	},


	shiftI2T : function(req, res) {
		Businfo.find().populate('bus_id').exec(function(err, responseData) {
			if(err)	return console.log(err);

			if(responseData.length) {
				_.forEach(responseData, function(value) {
					console.log('profile_id:',value.profile_id,'bus_id:',value.bus_id.transport_id,'stop_id:',value.bus_id.id);
					var details= {
						profile_id : value.profile_id,
						bus_details : value.bus_id.transport_id,
						stop_details : value.bus_id.id,
						feeStatus : true
					}
					Bustransaction.create(details).exec(function(err, response) {
						if(err)	return console.log(err);

						console.log(response);
					});
				});
			}
		});
	}
};

/**
 * BusinfoController
 *
 * @description :: Server-side logic for managing businfoes
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

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
};

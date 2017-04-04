/**
 * TransportController
 *
 * @description :: Server-side logic for managing transports
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var _ = require('lodash');
module.exports = {
	createTransport : function(req, res) {
		var transportInfo = req.allParams();
		Transport.create(transportInfo).exec(function(err, response) {
				if(err)	return console.log(err);

				if(response) {
					return res.json(response);
				}
		});
	},

	getAllRoutes : function(req, res) {
		Transport.find().exec(function(err, response) {
			if(err)	return console.log(err);

			if(response.length) {
				return res.json(response);
			}
		})
	},

	deactivateBus : function(req, res) {
		var comments = req.param('comments')||"Bus cancelled";
		Transport.update({id : req.param('id')},{status : false, comments : comments}).exec(function(err, response) {
			if(err)	return console.log(err);

			if(response.length) {
				return res.json(response);
			}
			else {
				return res.status(404).json({error : "transport not found"});
			}
		});
	},

	resetTransport : function(req, res) {
		Transport.update({}, {status : true, comments : "No comments"}).exec(function(err, response) {
			if(err)	return console.log(err);

			if(response.length) {
				return res.json(response);
			}
			else {
				return res.status(404).json({error : "transport not found"});
			}
		});
	},

	alterTransport : function(req, res) {
		var idList = req.param('list');
		_.forEach(idList, function(value) {
			Transport.update({id : value}, {comments : req.param('note'), status : false}).exec(function(err, response) {
				if(err)	return console.log(err);

				if(!response.length) {
					return res.status(404).json({error : "Something Went Wrong"});
				}
				else {
					Bustransaction.find({bus_details : value}).populate('profile_id').exec(function(err, responseTransaction) {
						if(err) return console.log(err);

						if(responseTransaction.length) {
							var emailData = [];
							_.forEach(responseTransaction, function(value) {
								emailData.push({name : value.profile_id.full_name, emailId : value.profile_id.email_id});
							});
							var confirmation = mailer.sendMail(emailData, response[0]);
							console.log('verification', confirmation);
						}
						else {
							console.log('Something went wrong');
						}
					});

				}
			});
		});


		return res.json({data : "Successful"});
	},

};

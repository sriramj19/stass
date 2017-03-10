/**
 * TransportController
 *
 * @description :: Server-side logic for managing transports
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

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
	}

};

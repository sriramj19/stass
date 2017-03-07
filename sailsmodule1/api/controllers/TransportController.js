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

};

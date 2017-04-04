/**
 * StoppointController
 *
 * @description :: Server-side logic for managing stoppoints
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	createBoardPoint: function(req, res) {
		var boardPoint = req.allParams();
		Stoppoint.create(boardPoint).exec(function(err, response) {
			if(err)	return console.log(err);

			if(response) {
				return res.json(response);
			}
		});
	},
	findBoardPoint: function(req, res) {
		Stoppoint.findOne({id : req.param('stop_id')}).populate('transport_id').exec(function(err, response) {
			if(err)	return console.log(err);

			if(response) {
				return res.json(response);
			}
		});
	},
	getAllStopPoints : function(req, res) {
		Stoppoint.find({transport_id : req.param('id')}).populate('transport_id').exec(function(err, response) {
			if(err)	return console.log(err);

			if(response.length) {
				return res.json(response);
			}
			else {
				return res.status(404).json({error : "No stoppoints found"});
			}
		});
	},
};

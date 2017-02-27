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
};

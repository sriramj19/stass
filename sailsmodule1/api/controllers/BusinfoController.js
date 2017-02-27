/**
 * BusinfoController
 *
 * @description :: Server-side logic for managing businfoes
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

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
};

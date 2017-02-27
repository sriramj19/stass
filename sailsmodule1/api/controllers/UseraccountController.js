/**
 * UseraccountController
 *
 * @description :: Server-side logic for managing Useraccounts
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	createAccount : function(req, res) {
		var accountDetails = req.allParams();
		Useraccount.create(accountDetails).exec(function(err, response) {
			if(err)	return console.log(err);

			if(response) {
				return res.json(response);
			}
		});
	},
};

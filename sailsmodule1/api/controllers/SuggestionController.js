/**
 * SuggestionController
 *
 * @description :: Server-side logic for managing suggestions
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

 var _ = require('lodash');

module.exports = {
	createSuggestion : function(req, res) {
		Suggestion.create({profile_id : req.param('id'), note : req.param('note'), bus_route : req.param('bus_route')})
			.exec(function(err, response) {
				if(err)	return console.log(err);

				return res.json(response);
			});
	},

	suggestionViewOne : function(req, res) {
		Suggestion.findOne({id : req.param('id')}).populate('profile_id').exec(function(err,response) {
			if(err)	return console.log(err);

			if(response) {
				return res.json(response);
			}
			else {
				return res.status(404).json({error : "Suggestion not found"});
			}
		});
	},

	adminSuggestionView : function(req, res) {
		Suggestion.find().populate('profile_id').exec(function(err, response) {
			if(err)	return console.log(err);

			if(response.length) {
				return res.json(response);
			}
			else {
				return res.json({error : "No suggestions yet..."});
			}
		});
	},

	studentSuggestionView : function(req, res) {
		Suggestion.find({profile_id : req.param('id')}).exec(function(err,responseData) {
			if(err)	return console.log(err);

			if(responseData.length) {
				return res.json(responseData);
			}
			else {
				return res.status(404).json({error : "No suggestions made by you..."});
			}
		});
	},

	readRecipient : function(req, res) {
		Suggestion.update({id : req.param('id')}, {readRecipient : true}).exec(function(err, response) {
			if(err)	return console.log(err);

			if(response.length) {
				return res.json(response);
			}
			else {
				return res.status(404).json({error : "No such suggestion exists"});
			}
		});
	},

  noteData : function(req, res) {
		Suggestion.findOne({id : req.param('id')}).exec(function(err, response) {
			if(err)	return console.log(err);

			if(response) {
				return res.json(response);
			}
			else {
				return res.status(404).json({error : "No such suggestion exists"});
			}
		});
	},

 };

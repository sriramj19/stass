module.exports = {
   signupForTransport : function(req, res) {
    var signupDetails = req.allParams();
    bustransaction.create(signupDetails).exec(function(err, response) {
      if(err) return  console.log(err);

      if(response) {
        return res.json(response);
      }
    });
  }
};

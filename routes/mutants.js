//File: routes/Mutants.js
module.exports = function(worker, mongoose) {

	var MutantService = require('../services/mutants.js')(mongoose);

	//GET - Return all Mutants in the DB
	var stats = function(req, res) {
		console.log('GET');
		
		res.send(Mutant);
	};

	//POST - Validate a new Mutant in the DB
	var mutant = function(req, res) {
		var dna = req.body.dna;
		
		if(dna == undefined)
			throw new Error("The structure of the parameters is not valid, example { dna:[string, string, ...]  }");
		
		let promiseIsMutant = MutantService.IsMutant(dna);
		
		promiseIsMutant.then(function (isMutant) {
			res.send(isMutant);
		});
	};

	//Link routes and functions
	worker.server.post('/Mutant', mutant);	
}
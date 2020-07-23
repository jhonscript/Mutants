module.exports = function(mongoose)
{	
	var Human = require('../models/human.js')(mongoose);
	
	var data = {
		Find: async function(dna) {
			var human = await Human.findOne({dna: dna.toString()}, function(err) {
				if(!err) {
				} else {
					console.log('ERROR: ' + err);
				}
			}).exec();
			
			return human;
		},
		Save: async function(dna, isMutant)
		{			
			var human = new Human({
				dna:  dna.toString(),
				isMutant: isMutant
			});			
			
			var promise = human.save(function(err) {
				if(!err) {
				} else {
					console.log('ERROR: ' + err);
				}
			});
			
			return promise;
		}
	}

	return data;
}
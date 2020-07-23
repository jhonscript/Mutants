module.exports = function(mongoose)
{	
	var Human = require('../models/human.js')(mongoose);
	
	var data = {
		CountHumans: async function(isMutant)
		{
			var count = await Human.countDocuments({ isMutant: isMutant }, function (err, count) {
				if(err) 
					console.log('ERROR: ' + err);
			}).exec();
			
			return count;
		},
		Find: async function(dna) 
		{
			var human = await Human.findOne({dna: dna.toString().toUpperCase()}, function(err) {
				if(err) 
					console.log('ERROR: ' + err);				
			}).exec();
			
			return human;
		},
		Save: async function(dna, isMutant)
		{			
			var human = new Human({
				dna:  dna.toString().toUpperCase(),
				isMutant: isMutant
			});			
			
			var promise = human.save(function(err) {
				if(err)
					console.log('ERROR: ' + err);				
			});
			
			return promise;
		}
	}

	return data;
}
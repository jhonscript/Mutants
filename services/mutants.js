module.exports = function(mongoose)
{	
	var ValidationDNA = require('../utils/validationDNA.js');
	var HumanData = require('../data/humans.js')(mongoose);
	
	var service = {
		Stats: async function() 
		{
			var countMutants = await HumanData.CountHumans(true);
			var countNoMutants = await HumanData.CountHumans(false);
			
			var ratio = 0;
			if(countNoMutants != 0)			 
				ratio = countMutants / countNoMutants;
			
			var stats = { count_mutant_dna: countMutants, count_human_dna: countNoMutants, ratio: ratio };
			return stats;
		},
		IsMutant: async function(dna)
		{
			let promiseValidateMutant = new Promise((resolve, reject) => { 
			
				var promises = ValidationDNA.ValidateMutant(dna);
								
				Promise.all(promises).then((values) => {
					var found = values.find(element => element == true);
					if(!found)
					{
						var isMutant = false;
						service.GenerateData(dna, isMutant);
						resolve(isMutant);
					}
					else
						console.log("Error Promise All");
				})
				.catch(error => {
					if(error == true)
					{
						var isMutant = error;
						service.GenerateData(dna, isMutant);
						resolve(isMutant);
					}
					else
						console.log(error);
				});
			});
			
			return promiseValidateMutant;
		},
		GenerateData: async function(dna, isMutant)
		{
			var human = await HumanData.Find(dna);
						
			if(human == undefined)					
				var promiseSave = HumanData.Save(dna, isMutant);			
		}
	}

	return service;
}
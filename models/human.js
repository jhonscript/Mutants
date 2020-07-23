module.exports = function(mongoose)
{	
	var Schema = mongoose.Schema;

	var humanSchema = new Schema({
		dna: { type: 'string' },
		isMutant: { type: 'string' }
	});

	return mongoose.model('humans', humanSchema);
}
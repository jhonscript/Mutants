module.exports = {
	myRe: /([ATCG])\1{3}/,
	ValidationTransposeVerticalToHorizontalDNA: function (array) {
		var promise = new Promise((resolve, reject) => {			
			var itemLarge = array.reduce((acc, item) =>
				acc.length < item.length ? item : acc
			);
						
			var responseValidation = Object.keys(itemLarge).some((indexColumn) => {
					return this.myRe.test(
							array.map((rowArray) => 
								rowArray[indexColumn] == undefined ? '' : rowArray[indexColumn]
							).join('')
						);
			});
			
			if(!responseValidation)
				resolve(responseValidation);
			else
				reject(responseValidation);
		});
		
		return promise;		
	},
	
	ValidationTransposeObliqueToHorizontalDNA: function (array) {
		var promise = new Promise((resolve, reject) => {
			var defaultResponse = false;
		
			var itemLarge = array.reduce((acc, item) =>
				acc.length < item.length ? item : acc
			);
			
			var maxColums = itemLarge.length;
			var maxRows = array.length;			
			
			var itemArrayAsc = [];
			var itemArrayDesc = [];
			
			for(var i = 0; i < maxColums; i++)
			{					
				for(var j = 0; j < maxRows; j++)
				{
					if(i+j >= maxColums && i+j >= maxRows)
						break;
						
					if(itemArrayAsc != undefined) itemArrayAsc.push(array[j][i+j]);
					if(itemArrayDesc != undefined) itemArrayDesc.push(array[i+j][j]);						
				}
				
				if(!this.ValidateItemArray(itemArrayAsc))
					itemArrayAsc = undefined;
				else
				{							
					var responseValidation = this.ValidateItem(itemArrayAsc)
					if(responseValidation)
						reject(responseValidation);
				}
				
				if(!this.ValidateItemArray(itemArrayDesc))						
					itemArrayDesc = undefined;
				else
				{		
					var responseValidation = this.ValidateItem(itemArrayDesc)
					if(responseValidation)
						reject(responseValidation);
				}
					
				if(itemArrayAsc == undefined && itemArrayDesc == undefined)
				{
					resolve(defaultResponse);
				}
			}
			
			resolve(defaultResponse);
		});
		
		return promise;
	},
	
	
	ValidationOriginalDNA: async function (dnaArray) {
		var promise = new Promise((resolve, reject) => {
			var responseValidation = dnaArray.some((value)=> 
						 this.myRe.test(value)
						);
			if(!responseValidation)
				resolve(responseValidation);
			else
				reject(responseValidation);
		});
		
		return promise;
	},
	
	ValidateItemArray: function (itemArray)
	{
		var minLengthSecuence = 4;
		
		if(itemArray == undefined)
			return false;
		else if (itemArray.length < minLengthSecuence)
			return false;
		else
			return true;					
	},
	
	ValidateItem: function (itemArray)
	{
		var defaultResponse = false;			
		
		item = itemArray.join('');
					
		var responseValidation = this.myRe.test(item);					
		if(responseValidation)
			return responseValidation;
		
		return defaultResponse;
	},
		
	ValidateMutant: function (dna) {		
		var dnaArrayOrginal = dna;
		let promiseValidationOriginalDNA =  this.ValidationOriginalDNA(dnaArrayOrginal); 
		let promiseValidationTransposeVerticalToHorizontalDNA = this.ValidationTransposeVerticalToHorizontalDNA(dnaArrayOrginal);
		let promiseValidationTransposeObliqueToHorizontalDNA = this.ValidationTransposeObliqueToHorizontalDNA(dnaArrayOrginal);
		
		var dnaArrayReverse = dnaArrayOrginal.slice(0).reverse();
		let promiseValidationTransposeObliqueToHorizontalDNAReverse = this.ValidationTransposeObliqueToHorizontalDNA(dnaArrayReverse);
		
		var promises = [
			promiseValidationOriginalDNA,
			promiseValidationTransposeVerticalToHorizontalDNA,
			promiseValidationTransposeObliqueToHorizontalDNA,
			promiseValidationTransposeObliqueToHorizontalDNAReverse
		];
		
		return promises;
	}	
}
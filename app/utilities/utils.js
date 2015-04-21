module.exports = {
	
	//get random integer from an interval
	//from http://stackoverflow.com/questions/4959975/generate-random-value-between-two-numbers-in-javascript
	randomInt: function(min,max) {
	    return Math.floor(Math.random()*(max-min+1)+min);
	},

	slugify: function(text) {
		if(text) {
			var slug = text.toString().toLowerCase()
				.replace(/\s+/g, '-')        // Replace spaces with -
				.replace(/[^\w\-]+/g, '')    // Remove all non-word chars
				.replace(/\-\-+/g, '-')      // Replace multiple - with single -
				.replace(/^-+/, '')          // Trim - from start of text
				.replace(/-+$/, '');         // Trim - from end of text

			return slug;
		}
		else {
			return '';
		}
	}

};
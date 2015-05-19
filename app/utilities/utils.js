module.exports = {
	
	//get random integer from an interval
	//from http://stackoverflow.com/questions/4959975/generate-random-value-between-two-numbers-in-javascript
	randomInt: function(min,max) {
	    return Math.floor(Math.random()*(max-min+1)+min);
	},

	slugify: function(text, _wordCount) {
		var wordCount = _wordCount ? _wordCount : 4;
		if(text) {
			var slug = text.toString();
			
			//limit word 
			var words = slug.split(' ');
			if(words.length > 5) {
				slug = words.splice(0, wordCount).join(' ');
			}

			return slug.toLowerCase()
				.replace(/\s+/g, '-')        // Replace spaces with -
				.replace(/[^\w\-]+/g, '')    // Remove all non-word chars
				.replace(/\-\-+/g, '-')      // Replace multiple - with single -
				.replace(/^-+/, '')          // Trim - from start of text
				.replace(/-+$/, '');         // Trim - from end of text
		}
		else {
			return '';
		}
	}

};
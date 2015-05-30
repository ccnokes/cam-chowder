function topicSvc() {
	
	var topics = [
		'cheesecake',
		'snake charming',
		'pro wrestling',
		'texting while pooping',
		'collecting exotic fungi',
		'ferret grooming'
	];

	var lastUsedIndex = 0;

	var getRandomTopic = function() {
		var i;

		//always run this at least once
		do {
			i = Math.floor(Math.random() * topics.length);
		} 
		//but prevent consecutive dupes
		while(i === lastUsedIndex);
		
		lastUsedIndex = i;
		return topics[i];
	};

	//public API
	return {
		
		getRandomTopic: getRandomTopic,
		
		getTopic: function(index) {
			return topics[index];
		}

	};
}

module.exports = topicSvc();
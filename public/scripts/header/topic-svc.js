
const topics = [
	'cheesecake',
	'snake charming',
	'pro wrestling',
	'ferret grooming',
	'collecting beanie babies',
	'becoming a Pokemon master',
	'falconry'
];

let lastUsedIndex = 0;

/**
 * get a topic randomly, no consecutive dupes
 * @return {String}
 */
export function getRandomTopic() {
	var i;

	//always run this at least once
	do {
		i = Math.floor(Math.random() * topics.length);
	} 
	//but prevent consecutive dupes
	while(i === lastUsedIndex);
	
	lastUsedIndex = i;
	return topics[i];
}

/**
 * get a specific topic by numeric index
 * @param  {Number} index
 * @return {String}
 */
export function getTopic(index) {
	return topics[index];
}
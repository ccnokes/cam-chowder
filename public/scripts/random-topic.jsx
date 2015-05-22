var React = require('react');

var topics = [
	'cheesecake',
	'snake charming',
	'pro wrestling',
	'texting while pooping',
	'collecting exotic fungi',
	'ferret grooming'
];

var lastUsedIndex = 0;

var getRandomIndex = function() {
	return Math.floor(Math.random() * topics.length);
};

var getRandomTopic = function() {
	var i;

	//always run this at least once
	do {
		i = getRandomIndex();
	} 
	//but prevent consecutive dupes
	while(i === lastUsedIndex);
	
	lastUsedIndex = i;
	return topics[i];
};

module.exports = React.createClass({
	
	getInitialState: function() {
		return {
			topic: topics[0]
		};
	},

	handleClick: function() {
		var topic = getRandomTopic();
		this.setState({
			topic: topic
		});
	},

	render: function() {
		return (
			<span className="random-topic" onClick={this.handleClick}>{this.state.topic}</span>
		);
	}

});
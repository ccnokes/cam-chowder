var React = require('react'),
	topicSvc = require('./topic-svc');


module.exports = React.createClass({
	
	getInitialState: function() {
		return {
			topic: topicSvc.getTopic(0)
		};
	},

	handleClick: function() {
		this.setState({
			topic: topicSvc.getRandomTopic()
		});
	},

	render: function() {
		return (
			<span className="random-topic" onClick={this.handleClick}>{this.state.topic}</span>
		);
	}

});
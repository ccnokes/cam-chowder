import React from 'react';
import * as topicSvc from './topic-svc';


module.exports = React.createClass({
	
	getInitialState() {
		return {
			topic: topicSvc.getTopic(0)
		};
	},

	handleClick() {
		this.setState({
			topic: topicSvc.getRandomTopic()
		});
		ga('send', 'event', 'randomTopic', 'click');
	},

	render() {
		return (
			<span className="random-topic" onClick={this.handleClick}>{this.state.topic}</span>
		);
	}

});
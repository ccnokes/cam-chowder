var React = require('react');

var Loader = React.createClass({
	
	propTypes: {
		show: React.PropTypes.bool.isRequired
	},

	getDefaultProps: function() {
		return {
			show: true
		};
	},

	render: function() {
		var className = 'loader-container';
		
		if(!this.props.show) {
			className += ' hidden';
		}

		return (
			<div className={className}>
				<div className="loader"></div>
			</div>
		);
	}
});

module.exports = Loader;
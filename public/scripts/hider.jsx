var React = require('react');

var Hider = React.createClass({

	propTypes: {
		show: React.PropTypes.bool.isRequired
	},

	componentWillMount: function() {
		this.setState({
			showing: this.props.show
		});
	},

	componentWillReceiveProps: function (nextProps) {
		this.setState({
			showing: nextProps.show
		});
	},

	render: function() {
		var className = ( this.state.showing ? '' : 'hidden' );
		return (
			<div className={ (this.props.className || '') + ' ' + className}>
				{this.props.children}
			</div>
		);
	}

});

module.exports = Hider;
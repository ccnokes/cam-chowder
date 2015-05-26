var React = require('react');

var Hider = React.createClass({

	propTypes: {
		show: React.PropTypes.bool.isRequired
	},

	getInitialState: function () {
	    return {
	        showing: false  
	    };
	},

	componentWillReceiveProps: function (nextProps) {
	    if(this.isMounted()) {
	    	this.setState({
	    		showing: nextProps.show
	    	});
	    }
	},

	render: function() {
		var className = ( this.state.showing ? '' : 'hidden' );
		return (
			<div className={this.props.className + ' ' + className}>
				{this.props.children}
			</div>
		);
	}

});

module.exports = Hider;
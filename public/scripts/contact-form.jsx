var React = require('react'),
	validators = require('../../app/utilities/validators');


var Input = React.createClass({

	propTypes: {
		validators: React.PropTypes.array,
		errorMessage: React.PropTypes.string,
		label: React.PropTypes.string,
		name: React.PropTypes.string,
		type: React.PropTypes.string
	},

	getDefaultProps: function() {
		return {
			type: 'text',
			errorMessage: 'Field is invalid.'
		};
	},

	getInitialState: function() {
		return {
			isValid: false,
			isPristine: true,
			value: ''
		}	
	},

	// getValue: function() {
	// 	return this.state.value;	
	// },

	// isValid: function() {
	// 	return this.state.isValid;	
	// },

	validate: function(val) {
		return this.props.validators.every(function(validator) {
			return validator(val);
		});
	},

	onInteract: function(event) {
		var self = this;
		var val = event.target.value;
		var isValid = this.validate(val);

		//set this regardless
		this.setState({
			isPristine: false,
			isValid: isValid
		});

		//if valid, set value
		if(isValid) {
			this.setState({
				value: val
			});
		}
	},

	render: function() {
		var errorMessage = this.props.errorMessage;
		var formHelpClass = 'form-help';
		if(this.state.isValid || this.state.isPristine) {
			formHelpClass += ' hidden';
		}

		console.log(this.state);

		return (
			<div className="form-group">
				<label htmlFor={this.props.name}>
					{this.props.label}
					<input className="form-control" name={this.props.name} type={this.props.type} onChange={this.onInteract} />
				</label>
				<div className={formHelpClass}>
					<p>{errorMessage}</p>
				</div>
			</div>
		);
	}

});


var ContactForm = React.createClass({
	
	getInitialState: function () {
	    return {
	        name: '',
	        email: '',
	        message: ''  
	    };
	},

	onControlInteract: function(event) {
		var val = event.target.value;
		var field = event.target.name;
		var validator;

		if(typeof val !== 'undefined') {
			
			if(field === 'name' || field === 'message') {
				validator = validators.isNotEmpty;
			}
			else {
				validator = validators.checkEmail;
			}

			if(validator(val)) {
				var state = {};
				state[field] = val;

				this.setState(state);
			}
			//show UI error
			else {
				console.log('INVALID');
			}
		}
	},

	onFormSubmit: function(event) {
		console.log(arguments);
		event.preventDefault();

		console.log(this.state);
	},

	render: function() {
		return (
			<form onSubmit={this.onFormSubmit} noValidate>

				<Input label="Name" name="name" errorMessage="you stink" validators={[validators.isNotEmptyString]} />

				<Input label="Email" name="email" type="email" errorMessage="you stink" validators={[validators.isValidEmail]} />

				<div className="form-group">
					<label>
						Message
						<textarea className="form-control" name="message" onBlur={this.onControlInteract} />
					</label>
				</div>

				<input className="btn btn-primary" type="submit" />

			</form>
		);
	}

});

module.exports = ContactForm;
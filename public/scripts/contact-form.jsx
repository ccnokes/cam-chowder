var React = require('react'),
	Hider = require('./hider.jsx'),
	validators = require('../../app/utilities/validators'),
	ContactSvc = require('./contact-svc');


var FormControlMixin = {
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
			errorMessage: 'This field is invalid.'
		};
	},

	getInitialState: function() {
		return {
			isValid: false,
			isFocused: false,
			isComplete: false, //valid and blurred
			value: ''
		}	
	},

	getContainerClass: function() {
		var classes = [this.props.className, 'infield-group'];
		if(this.state.isFocused) {
			classes.push('is-active');
		}
		if(this.state.isComplete) {
			classes.push('is-complete');
		}
		if(this.shouldShowHelp()) {
			classes.push('needs-help');
		}
		return classes.join(' ');
	},

	validate: function(val) {
		var validators = this.props.validators;
		if(validators && validators.length > 0) {
			return validators.every(function(validator) {
				return validator(val);
			});
		}
		else {
			return true;
		}
	},

	shouldShowHelp: function() {
		return (!this.state.isValid && this.state.value.length > 0);
	},

	onInteract: function(event) {
		var self = this;
		var val = event.target.value;
		var isValid = this.validate(val);

		this.setState({
			isValid: isValid,
			value: val
		});		
	},

	onFocus: function(event) {
		this.setState({
			isFocused: true,
			isComplete: false
		});
	},

	onBlur: function() {
		this.setState({
			isFocused: false
		});

		if(this.state.isValid) {
			this.setState({
				isComplete: true
			});
		}
	},

	//the following are more for external consumers of these components
	getValue: function() {
		return this.state.value;	
	},

	isValid: function() {
		return this.state.isValid;	
	},
};

var Input = React.createClass({

	mixins: [FormControlMixin],

	render: function() {
		return (
			<div className={this.getContainerClass()}>
				<label htmlFor={this.props.name}>
					{this.props.label}
					<input 
						className="form-control" 
						name={this.props.name} 
						type={this.props.type} 
						onChange={this.onInteract} 
						onFocus={this.onFocus}
						onBlur={this.onBlur}
					/>
				</label>
				<Hider show={this.shouldShowHelp()} className="form-help">
					<span>{this.props.errorMessage}</span>
				</Hider>
			</div>
		);
	}

});


var TextArea = React.createClass({
	mixins: [FormControlMixin],
	
	render: function() {
		return (
			<div className={this.getContainerClass()}>
				<label htmlFor={this.props.name}>
					{this.props.label}
					<textarea 
						className="form-control" 
						name={this.props.name} 
						onChange={this.onInteract} 
						rows="8" 
						onFocus={this.onFocus}
						onBlur={this.onBlur}
					/>
				</label>
				<Hider show={this.shouldShowHelp()} className="form-help">
					<span>{this.props.errorMessage}</span>
				</Hider>
			</div>
		);
	}
});


var ContactForm = React.createClass({
	
	getInitialState: function () {
	    return {
	    	isValid: true
	    };
	},

	onFormSubmit: function(event) {
		var formVals = {};
		event.preventDefault();
		
		var len = Object.keys(this.refs).length;
		var validCount = 0;

		for(var key in this.refs) {
			var ref = this.refs[key];
			if(ref.isValid()) {
				validCount++;
				formVals[key] = ref.getValue();
			}
		}

		if(validCount === len) {
			this.setState({
				isValid: true
			});

			ContactSvc.postContact(formVals);
		}
		else {
			this.setState({
				isValid: false
			});
		}
	},

	render: function() {
		return (
			<div>
				<form className="infield-form" onSubmit={this.onFormSubmit} noValidate>
					<div className="row">
						<Input ref="name" className="col-md-6" label="Name" name="name" errorMessage="Your name can't be empty." validators={[validators.isNotEmptyString]} />
						<Input ref="email" className="col-md-6" label="Email" name="email" type="email" errorMessage="This email looks invalid." validators={[validators.isValidEmail]} />
					</div>
					<div className="row mg-btm">
						<TextArea ref="message" className="col-md-12" label="Message" name="message" errorMessage="Your message can't be empty." validators={[validators.isNotEmptyString]} />
					</div>
					<div className="row">
						<input className="btn btn-primary" type="submit" value="Send Message" />
					</div>
					<Hider show={!this.state.isValid} className="row">
						<div className="form-error">
							<span>Please make sure everything is filled out correctly.</span>
						</div>
					</Hider>
				</form>
			</div>
		);
	}

});

module.exports = ContactForm;
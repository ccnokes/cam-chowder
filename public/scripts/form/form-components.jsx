var React = require('react'),
	Hider = require('../core/hider.jsx');

var formComponents = exports;


//generic functionality for a form
//assumes all form elements implement the FormControlMixin API below
formComponents.FormMixin = {
	
	//generic iterator of each control
	//cb args: (control obj, control ref name, index)
	forEachControl: function(cb) {
		var i = 0;
		for(var key in this.refs) {
			//break if cb returns false
			if(cb(this.refs[key], key, ++i) === false) {
				break;
			}
		}
	},

	//returns array of invalid controls
	getInvalids: function() {
		var invalids = [];
		this.forEachControl(function(control) {
			if(!control.isValid()) {
				invalids.push(control);
			}
		});
		return invalids;
	},

	//returns all values of form in object keyed by control name
	getFormValue: function() {
		var formVals = {};
		this.forEachControl(function(control, controlKey) {
			formVals[controlKey] = control.getValue();
		});
		return formVals;
	},

	isValid: function() {
		var formIsValid = true;

		this.forEachControl(function(control) {
			if(!control.isValid()) {
				formIsValid = false;
				return false;
			}
		});

		return formIsValid;
	}

};


//mixin of functionalities for a field in a form
formComponents.FormControlMixin = {
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
	}
};


//implement above in an <input>
formComponents.Input = React.createClass({

	mixins: [formComponents.FormControlMixin],

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


//implement above in an <textarea>
formComponents.TextArea = React.createClass({
	mixins: [formComponents.FormControlMixin],
	
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


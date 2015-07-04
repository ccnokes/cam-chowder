import React from 'react';
import ToggleDisplay from 'react-toggle-display';



//generic functionality for a form
//assumes all form elements implement the FormControlMixin API below
let FormMixin = {
	
	/**
	 * generic iterator of each control. **Assumes you want all refs to be managed by the FormMixin**
	 * cb args: control {Object}, control ref name {String}, index {Number}
	 */
	forEachControl(cb) {
		var i = 0;
		for(var key in this.refs) {
			//break if cb returns false
			if(cb(this.refs[key], key, ++i) === false) {
				break;
			}
		}
	},

	/**
	 * returns invalid controls
	 * @return {Array}
	 */
	getInvalids() {
		var invalids = [];
		this.forEachControl(function(control) {
			if(!control.isValid()) {
				invalids.push(control);
			}
		});
		return invalids;
	},

	/**
	 * Returns all values of form in object keyed by control name
	 * @return {Object}
	 */
	getFormValue() {
		var formVals = {};
		this.forEachControl(function(control, controlKey) {
			formVals[controlKey] = control.getValue();
		});
		return formVals;
	},

	/**
	 * calls clearValue() on each control
	 */
	clearAllControls() {
		this.forEachControl(function(control) {
			control.clearValue();
		});
	},

	/**
	 * @return {Boolean}
	 */
	isValid() {
		var formIsValid = true;

		this.forEachControl(function(control) {
			if(!control.isValid() && !control.props.optional) {
				formIsValid = false;
				return false;
			}
		});

		return formIsValid;
	}

};


//mixin of functionalities for a field in a form
let FormControlMixin = {
	propTypes: {
		validators: React.PropTypes.array,
		errorMessage: React.PropTypes.string,
		label: React.PropTypes.string,
		name: React.PropTypes.string,
		type: React.PropTypes.string,
		optional: React.PropTypes.bool
	},

	getDefaultProps() {
		return {
			type: 'text',
			errorMessage: 'This field is invalid.'
		};
	},

	getInitialState() {
		return {
			isPristine: true,
			isValid: (this.props.optional ? true : false), //false by default, true if optional
			isFocused: false,
			isComplete: false, //valid and blurred
			value: '' //value of the control
		}	
	},

	/**
	 * returns CSS class based on component's state
	 * @return {String}
	 */
	getContainerClass() {
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

	/**
	 * Validate the input's value. Will not run if no validators defined
	 * @param  {*} val - should be the input's value attribute
	 * @return {Boolean}
	 */
	validate(val) {
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

	/**
	 * shows help if the input is invalid and has been touched
	 * @return {Boolean}
	 */
	shouldShowHelp() {
		return (!this.state.isValid && !this.state.isPristine);
	},

	/**
	 * Called in response to onChange event usually
	 * sets components value, runs validation
	 */
	onInteract(event) {
		var val = event.target.value;
		var isValid = this.validate(val);

		this.setState({
			isPristine: false, //it's been touched now
			isValid: isValid,
			value: val
		});
	},

	/**
	 * called on focus event
	 */
	onFocus(event) {
		this.setState({
			isFocused: true,
			isComplete: false //complete = valid & blurred
		});
	},

	/**
	 * called on blur event
	 */
	onBlur() {
		this.setState({
			isFocused: false
		});

		if(this.isValid() && this.state.value) {
			this.setState({
				isComplete: true
			});
		}
	},

	//the following are more for external consumers of these components
	getValue() {
		return this.state.value;	
	},

	clearValue() {
		this.setState({
			value: '',
			isComplete: false,
			isPristine: true
		});
	},

	isValid() {
		return this.state.isValid;	
	},

	showHelp() {
		this.setState({
			isPristine: false
		});
	}
};


//implement above in an <input>
let Input = React.createClass({

	mixins: [FormControlMixin],

	render() {
		return (
			<div className={this.getContainerClass()}>
				<label htmlFor={this.props.name}>
					{this.props.label}
					<input 
						value={this.state.value}
						id={this.props.name}
						className="form-control" 
						name={this.props.name} 
						type={this.props.type} 
						onChange={this.onInteract} 
						onFocus={this.onFocus}
						onBlur={this.onBlur}
					/>
				</label>
				<ToggleDisplay show={this.shouldShowHelp()} className="form-help">
					<span>{this.props.errorMessage}</span>
				</ToggleDisplay>
			</div>
		);
	}

});


//implement above in an <textarea>
let TextArea = React.createClass({
	mixins: [FormControlMixin],
	
	render() {
		return (
			<div className={this.getContainerClass()}>
				<label htmlFor={this.props.name}>
					{this.props.label}
					<textarea 
						value={this.state.value}
						id={this.props.name}
						className="form-control"
						name={this.props.name} 
						onChange={this.onInteract} 
						rows="8" 
						onFocus={this.onFocus}
						onBlur={this.onBlur}
					/>
				</label>
				<ToggleDisplay show={this.shouldShowHelp()} className="form-help">
					<span>{this.props.errorMessage}</span>
				</ToggleDisplay>
			</div>
		);
	}
});


export { FormMixin, FormControlMixin, Input, TextArea };


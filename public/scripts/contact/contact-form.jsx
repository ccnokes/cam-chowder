import React from 'react';
import Hider from '../core/hider.jsx';
import validators from '../../../app/utilities/validators';
import ContactSvc from './contact-svc';
import formComponents, { Input, TextArea, FormMixin } from '../form/form-components.jsx';


var ContactForm = React.createClass({
	mixins: [FormMixin],

	getInitialState() {
		return {
			isValid: true,
			submitAttempts: 0,
			submitted: false
		};
	},

	onFormSubmit(event) {
		event.preventDefault();
		this.setState({ submitAttempts: this.state.submitAttempts + 1 });

		if(this.isValid()) {
			let formVal = this.getFormValue();

			this.setState({
				isValid: true,
				submitted: true
			});

			ContactSvc.postContact(formVal);
		}
		else {
			this.setState({
				isValid: false
			});
			
			//show input help on invalids
			this.getInvalids().forEach((control) => {
				control.showHelp();
			});
		}
	},

	render() {
		
		let renderInvalids = function() {
			return this.getInvalids().map((control, i) => {
				return(
					<li key={i}>{control.label}</li>
				);
			});
		}.bind(this);

		return (
			<div>
				<Hider show={!this.state.submitted}>
					<form className="infield-form" onSubmit={this.onFormSubmit} noValidate>
						
						<div className="infield-form-inner mg-btm">
							<div className="row">
								<Input ref="name" className="col-md-6" label="Name" name="name" errorMessage="Your name can't be empty." validators={[validators.isNotEmptyString]} />
								<Input ref="email" className="col-md-6" label="Email" name="email" type="email" errorMessage="This email looks invalid." validators={[validators.isValidEmail]} />
							</div>
							<div className="row">
								<TextArea ref="message" className="col-md-12" label="Message" name="message" errorMessage="Your message can't be empty." validators={[validators.isNotEmptyString]} />
							</div>
						</div>

						<div>
							<input className="btn btn-primary btn-contact" type="submit" value="Send Message" />
						</div>
						
						<Hider show={!this.state.isValid}>
							<div className="form-error">
								<p>Please make sure everything is filled out correctly. These fields might be wrong:</p>
								<ul>
									{renderInvalids()}
								</ul>
							</div>
						</Hider>

					</form>
				</Hider>

				<Hider show={this.state.isValid && this.state.submitted}>
					<div className="well">
						<h3>Thanks!</h3>
						<p>I'll get in touch with you shortly.</p>
					</div>
				</Hider>

			</div>
		);
	}

});

export default ContactForm;


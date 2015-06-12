var React = require('react'),
	Hider = require('../core/hider.jsx'),
	validators = require('../../../app/utilities/validators'),
	ContactSvc = require('./contact-svc'),
	formComponents = require('../form/form-components.jsx'),
	Input = formComponents.Input,
	TextArea = formComponents.TextArea;



var ContactForm = React.createClass({
	
	getInitialState: function () {
		return {
			isValid: true,
			submitAttempts: 0,
			submitted: false
		};
	},

	onFormSubmit: function(event) {
		var formVals = {};
		event.preventDefault();
		
		this.setState({ submitAttempts: this.state.submitAttempts + 1 });

		var len = Object.keys(this.refs).length;
		var validCount = 0;

		for(var key in this.refs) {
			var ref = this.refs[key];
			//if it's valid, add to the formVals object
			if(ref.isValid()) {
				validCount++;
				formVals[key] = ref.getValue();
			}
		}

		//all valid
		if(validCount === len) {
			this.setState({
				isValid: true,
				submitted: true
			});

			ContactSvc.postContact(formVals);
		}
		//invalid
		else {
			this.setState({
				isValid: false
			});
		}
	},

	render: function() {
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
								<span>Please make sure everything is filled out correctly.</span>
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

module.exports = ContactForm;
var React = require('react'),
	Navigation = require('react-router').Navigation,
	validators = require('../../../app/utilities/validators'),
	formComponents = require('../form/form-components.jsx'),
	Input = formComponents.Input,
	TextArea = formComponents.TextArea,
	ToggleDisplay = require('react-toggle-display'),
	adminSvc = require('./admin-svc.js');


var AdminLogin = React.createClass({

	mixins: [Navigation, formComponents.FormMixin],

	getInitialState: function () {
		return {
			isValid: true,
			submitted: false,
			authFailed: false
		};
	},

	onFormSubmit: function(event) {
		event.preventDefault();

		if(this.isValid()) {
			this.setState({
				isValid: true,
				submitted: true
			});

			var formVal = this.getFormValue();

			adminSvc.authenticate(formVal)
			.then(
				function ok() {
					this.transitionTo('admin-main', {user: formVal});
				}.bind(this),
				function err(e) {
					this.setState({ authFailed: true });
				}.bind(this)
			);
		}
		else {
			this.setState({
				isValid: false
			});
		}
	},

	render: function() {
		return (
			<section>
				<form className="infield-form" onSubmit={this.onFormSubmit} noValidate>
					<div className="infield-form-inner mg-btm">
						<div className="row">
							<Input 
								ref="username" 
								className="col-md-6" 
								label="Username" 
								name="username" 
								errorMessage="Username can't be empty." 
								validators={[validators.isNotEmptyString]} 
							/>
							<Input 
								ref="password" 
								className="col-md-6" 
								label="Password" 
								name="password"
								type="password"
								errorMessage="Password can't be empty." 
								validators={[validators.isNotEmptyString]} 
							/>
						</div>
					</div>
	
					<div>
						<input className="btn btn-primary btn-contact" type="submit" value="Login" />
					</div>
				</form>
				
				<ToggleDisplay show={!this.state.isValid}>
					<div className="form-error">
						<span>Please make sure everything is filled out correctly.</span>
					</div>
				</ToggleDisplay>

				<ToggleDisplay show={this.state.authFailed}>
					<div className="form-error">
						<span>Username or password is incorrect.</span>
					</div>
				</ToggleDisplay>

			</section>
		);
	}

});


module.exports = AdminLogin;
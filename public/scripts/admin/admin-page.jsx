var React = require('react'),
	validators = require('../../../app/utilities/validators'),
	formComponents = require('../form/form-components.jsx'),
	Input = formComponents.Input,
	TextArea = formComponents.TextArea,
	Hider = require('../core/hider.jsx'),
	adminSvc = require('./admin-svc.js');


var AdminPage = React.createClass({

	mixins: [formComponents.FormMixin],

	getInitialState: function () {
		return {
			isValid: true,
			submitted: false
		};
	},

	onFormSubmit: function(event) {
		event.preventDefault();

		if(this.isValid()) {
			this.setState({
				isValid: true,
				submitted: true
			});

			adminSvc.authenticate(this.getFormValue());
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
				
				<Hider show={!this.state.isValid}>
					<div className="form-error">
						<span>Please make sure everything is filled out correctly.</span>
					</div>
				</Hider>

			</section>
		);
	}

});


module.exports = AdminPage;
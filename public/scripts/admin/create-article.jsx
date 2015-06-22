import React from 'react';
import validators from '../../../app/utilities/validators';
import formComponents, { Input, TextArea, FormMixin } from '../form/form-components.jsx';
import Hider from '../core/hider.jsx';
import articleSvc from '../article/article-svc';


export default React.createClass({
	mixins: [FormMixin],

	getInitialState() {
		return {
			isValid: true,
			showCreated: false
		};
	},

	onFormSubmit(event) {
		event.preventDefault();

		if(this.isValid()) {
			let formVal = this.getFormValue();

			articleSvc.createArticle(formVal)
			.then(() => {
				this.clearAllControls();
				
				this.setState({
					isValid: true,
					showCreated: true
				});

				//hide it in 3 secs
				setTimeout(() => {
					this.setState({
						showCreated: false
					})
				}, 3000);
			});
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
					<li key={i}>{control.props.label}</li>
				);
			});
		}.bind(this);

		return(
			<div>
				<form className="infield-form--full" onSubmit={this.onFormSubmit} noValidate>
					<legend>Create New Post</legend>
					<div className="infield-form-inner mg-btm">
						<div className="row">
							<Input ref="title" className="col-md-12" label="Title" name="title" errorMessage="Title can't be empty." validators={[validators.isNotEmptyString]} />
							<Input ref="teaser" className="col-md-12" label="Teaser" name="teaser" optional={true} validators={[validators.isNotEmptyString]} />
							<TextArea ref="text" className="col-md-12" label="Body" name="text" errorMessage="Body can't be empty." validators={[validators.isNotEmptyString]} />
						</div>
					</div>

					<div>
						<input className="btn btn-primary btn-lg" type="submit" value="Create" />
					</div>

				</form>

				<Hider show={!this.state.isValid}>
					<div className="form-error">
						<p>The following fields look problematic:</p>
						<ul>
							{renderInvalids()}
						</ul>
					</div>
				</Hider>

				<Hider show={this.state.showCreated}>
					<div className="form-success">
						<span>Post created!</span>
					</div>
				</Hider>

			</div>
		);
	}

});
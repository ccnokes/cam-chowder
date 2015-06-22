import React from 'react';
import formComponents, { Input, TextArea, FormMixin } from '../form/form-components.jsx';
import mediaSvc from './media-svc.js';


export default React.createClass({
	mixins: [FormMixin],

	// getInitialState() {
	// 	return {
	// 		isValid: true,
	// 		showCreated: false
	// 	};
	// },

	onFormSubmit(event) {
		event.preventDefault();

		if(this.isValid()) {
			
			let file = React.findDOMNode(this.refs.fileUpload).querySelector('input').files[0];
			console.log(file);

			mediaSvc.upload(file)
			.then( (res) => {
				console.log(res);
				this.clearAllControls();
			}, (e) => {
				console.error(e);
			});
		}
		else {

		}
	},

	render() {
		return (
			<form onSubmit={this.onFormSubmit}>
				<Input type="file" ref="fileUpload" name="fileUpload" label="Upload file" />

				<div>
					<input className="btn btn-primary btn-lg" type="submit" value="Upload" />
				</div>
			</form>
		);
	}
})
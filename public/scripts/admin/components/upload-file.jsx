import React from 'react';
import formComponents, { Input, TextArea, FormMixin } from '../../form/form-components.jsx';
import mediaSvc from '../media-svc.js';
import adminEvents from '../admin-events';

export default React.createClass({
	mixins: [FormMixin],

	onFormSubmit(event) {
		event.preventDefault();

		if(this.isValid()) {
			
			let file = React.findDOMNode(this.refs.fileUpload).querySelector('input').files[0];

			//had to use XMLHttpRequest object here, so no promise API
			mediaSvc.upload(file, (err, res) => {
				if(err) {
					console.error(e);
				}
				else {
					this.clearAllControls(); 
					adminEvents.emit('updateUploads');
				}
			});
		}
	},

	render() {
		return (
			<form onSubmit={this.onFormSubmit} className="mg-btm">
				<Input type="file" ref="fileUpload" name="fileUpload" label="Upload file" />

				<div>
					<input className="btn btn-primary btn-lg" type="submit" value="Upload" />
				</div>
			</form>
		);
	}
})
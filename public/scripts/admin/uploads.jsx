import React from 'react';
import mediaSvc from './media-svc.js';

export default React.createClass({
	
	getInitialState() {
		return {
			uploads: []
		}
	},

	componentDidMount() {
		mediaSvc.getUploads()
		.then( (uploads) => {
			this.setState({
				uploads: uploads
			});
		}, (err) => {
			console.err(err);
		});
	},

	render() {
		let files = this.state.uploads.map(function(upload) {
			return (
				<div className="file-tile" key={upload.filename}>
					<img src={upload.uri} />
					<div>{upload.filename}</div>
					<small className="muted">{upload.uri}</small>
					<input type="text" readOnly value={upload.md} />
				</div>
			);
		});

		return (
			<section>
				<legend>Uploaded Files</legend>
				<div className="file-tile-container">
					{files}
				</div>
			</section>
		);
	}
});
import React from 'react';
import mediaSvc from '../media-svc.js';
import adminEvents from '../admin-events';
import Hider from '../../core/hider.jsx';


let UploadTile = React.createClass({
	
	getInitialState() {
		return {
			hide: false
		};
	},

	remove() {
		mediaSvc.removeUpload(this.props.upload.uri)
		.then( () => {
			this.setState({
				hide: true
			});	
		}, (e) => {
			console.log(e);
		});
	},

	render() {
		let upload = this.props.upload;
		return (
			<Hider show={!this.state.hide} className="file-tile">
				<img src={upload.uri} />
				<div><strong>{upload.filename}</strong></div>
				<small><input type="text" readOnly value={upload.md} /></small>
				<hr />
				<button className="btn btn-link btn-xs" onClick={this.remove}>Delete</button>
				<a href={upload.uri} target="_blank" className="btn btn-default btn-xs pull-right">View</a>
			</Hider>
		);
	}
});


export default React.createClass({
	
	getInitialState() {
		return {
			uploads: []
		}
	},

	getData() {
		mediaSvc.getUploads()
		.then( (uploads) => {
			this.setState({
				uploads: uploads
			});
		}, (err) => {
			console.err(err);
		});
	},

	onUpdateUploads() {
		this.getData();
	},

	componentDidMount() {
		this.getData();

		//update on event
		adminEvents.on('updateUploads', this.onUpdateUploads);
	},

	componentWillUnmount() {
		//destroy listener, prevent multiple registrations
		adminEvents.off('updateUploads', this.onUpdateUploads);
	},

	render() {
		let files = this.state.uploads.map( (upload, i) => {
			return (
				<UploadTile upload={upload} key={upload.uri} />
			);
		});

		return (
			<section>
				<Hider show={files.length > 0}>
					<div className="file-tile-container">
						{files}
					</div>
				</Hider>
				
				<Hider show={files.length === 0}>
					<h4 className="muted">No uploads yet.</h4>
				</Hider>
			</section>
		);
	}
});
import React from 'react';
import contactSvc from '../contact/contact-svc';
import CreateArticle from './components/create-article.jsx';
import ViewContacts from './components/view-contacts.jsx';
import UploadFile from './components/upload-file.jsx';
import {Navigation} from 'react-router';
import * as adminSvc from '../admin/admin-svc';
import Uploads from './components/uploads.jsx';


export default React.createClass({
	mixins: [Navigation],

	getInitialState() {
		return {
			contacts: {}
		};
	},

	componentWillMount() {
		//make sure user is authenticated
		if(!adminSvc.isAuthenticated()) {
			this.transitionTo('admin-login');
		}
	},

	componentDidMount() {
		contactSvc.getContacts()
		.then( (data) => {
			this.setState({
				contacts: data
			});
		});
	},

	render() {
		return(
			<div>
				<CreateArticle />
				<hr className="big-hr" />

				<legend>Uploaded Files</legend>
				<UploadFile />
				<Uploads />
				<hr className="big-hr" />

				<ViewContacts contacts={this.state.contacts} />
			</div>
		);
	}
});


import React from 'react';
//import formComponents as { Input, TextArea } from '../form/form-components.jsx';	
import contactSvc from '../contact/contact-svc';
import CreateArticle from './create-article.jsx';
import ViewContacts from './view-contacts.jsx';
import UploadFile from './upload-file.jsx';
import {Navigation} from 'react-router';
import * as adminSvc from '../admin/admin-svc';
import Uploads from './uploads.jsx';


export default React.createClass({
	mixins: [Navigation],

	getInitialState() {
		return {
			contacts: {}
		};
	},

	componentDidMount() {
		//make sure user is authenticated
		if(!adminSvc.isAuthenticated()) {
			this.transitionTo('admin-login');
			return;
		}

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

				<Uploads />
				<UploadFile />
				<hr className="big-hr" />

				<ViewContacts contacts={this.state.contacts} />
			</div>
		);
	}
});


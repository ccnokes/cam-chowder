import React from 'react';
//import formComponents as { Input, TextArea } from '../form/form-components.jsx';	
import contactSvc from '../contact/contact-svc';
import CreateArticle from './create-article.jsx';
import ViewContacts from './view-contacts.jsx';


export default React.createClass({
	
	getInitialState() {
		return {
			contacts: {}
		};
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
				<ViewContacts contacts={this.state.contacts} />
			</div>
		);
	}
});


import React from 'react';
import filters from '../../config/filters';
import ToggleDisplay from 'react-toggle-display';


export default React.createClass({

	render() {
		let contacts = this.props.contacts; //don't worry about pagination for now
		let showTable = !!(contacts && contacts.content && contacts.content.length > 0);

		let renderRow = function() {
			if(contacts.content) {
				return contacts.content.map(function(contact) {
					return (
						<tr key={contact._id}>
							<td>{ filters.formatDate(contact.date) }</td>
							<td>{contact.name}</td>
							<td>{contact.email}</td>
							<td>{contact.message}</td>
						</tr>
					);
				});
			}
			else {
				return null;
			}
		};

		return (
			<div>
				<ToggleDisplay show={showTable}>
					<table className="table table-striped">
						<legend>Contact requests</legend>
						<thead>
							<tr>
								<th>Date</th>
								<th>Name</th>
								<th>Email</th>
								<th>Message</th>
							</tr>
						</thead>	
						<tbody>
							{ renderRow() }
						</tbody>
					</table>
				</ToggleDisplay>
				<ToggleDisplay show={!showTable}>
					<h4 className="muted">No contact requests yet.</h4>
				</ToggleDisplay>
			</div>
		);
	}

});
var React = require('react'),
	ContactForm = require('./contact-form.jsx');

var ContactPage = React.createClass({

	render: function() {
		return (
			<div>
				<h1>Contact</h1>
				<ContactForm></ContactForm>	
			</div>
		);
	}

});

module.exports = ContactPage;
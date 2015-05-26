var React = require('react'),
	ContactForm = require('./contact-form.jsx');

var ContactPage = React.createClass({

	render: function() {
		return (
			<div>
				<h1>Contact</h1>
				<p>Send me a message and let me know what's on your mind. I'll get back to you shortly.</p>
				<ContactForm></ContactForm>	
			</div>
		);
	}

});

module.exports = ContactPage;
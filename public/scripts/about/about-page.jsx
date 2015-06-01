var React = require('react');

var About = React.createClass({
	render: function() {
		return (
			<div>
				<h1>About Me</h1>
				<p>
				I’m an experienced front-end developer who loves a challenge (and cheesecake). 
				I enjoy Javascript programming&amp;especially working in React, Angular, and Node.js.
				</p>

				<h3>Stalk Me</h3>
				// links to github, twitter, etc.
			</div>
		);
	}
});

module.exports = About;
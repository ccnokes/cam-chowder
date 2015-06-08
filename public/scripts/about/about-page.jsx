var React = require('react');

var About = React.createClass({
	render: function() {
		return (
			<div>
				<h1>About Me</h1>
				<p>
				I’m an experienced front-end developer who loves a challenge (and cheesecake). 
				I enjoy Javascript programming &amp; especially working in React, Angular, D3, and Node.js.
				</p>

				<h3>Stalk Me</h3>
				<ul>
					<li><a href="https://twitter.com/@ccnokes" target="_blank">Twitter</a></li>
					<li><a href="https://github.com/ccnokes" target="_blank">Github</a></li>
					<li><a href="http://www.linkedin.com/pub/cameron-nokes/2a/47b/251" target="_blank">LinkedIn</a></li>
				</ul>

			</div>
		);
	}
});

module.exports = About;
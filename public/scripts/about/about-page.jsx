import React from 'react';
import DocTitle from '../core/doc-title.jsx';
import appConstants from '../config/constants';

export default React.createClass({
	render() {
		return (
			<div>
				<DocTitle pageTitle="About"></DocTitle>
				<h1>About Me</h1>
				<div className="row">
					<div className="col-md-8">
						<p>
						I’m a front-end developer who loves a challenge (and cheesecake).
						I enjoy Javascript programming &amp; especially working in React, Angular, D3, and Node.js.
						</p>

						<h3>Stalk Me</h3>
						<ul>
							<li><a href={appConstants.linkedin} target="_blank">LinkedIn</a></li>
							<li><a href={appConstants.github} target="_blank">Github</a></li>
							<li><a href={appConstants.stackOverflow}>StackOverflow</a></li>
							<li><a href={appConstants.twitter} target="_blank">Twitter</a></li>
						</ul>

						<h3>About this site</h3>
						<p>This site is made with the following technologies (from front to back):</p>
						<ul>
							<li>
								React.js, react-router, D3, axios
							</li>
							<li>
								LESS
							</li>
							<li>
								Webpack, Gulp
							</li>
							<li>
								Nginx
							</li>
							<li>
								Node.js
							</li>
							<li>
								MongoDB
							</li>
							<li>
								Ubuntu
							</li>
							<li>
								VPS provided by <a href="https://www.digitalocean.com/?refcode=10dc7dc56c9a">DigitalOcean</a>
							</li>
						</ul>
						<p>View this <a href="https://github.com/ccnokes/cam-chowder">site's code</a></p>

					</div>
				</div>
			</div>
		);
	}
});

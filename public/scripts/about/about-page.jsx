import React from 'react';
import DocTitle from '../core/doc-title.jsx';

export default React.createClass({
	render() {
		return (
			<DocTitle pageTitle="About">
				<div>
					<h1>About Me</h1>
					<div className="row">
						<div className="col-md-8">
							<p>
							I’m a front-end developer who loves a challenge (and cheesecake). 
							I enjoy Javascript programming &amp; especially working in React, Angular, D3, and Node.js.
							</p>

							<h3>Stalk Me</h3>
							<ul>
								<li><a href="http://www.linkedin.com/pub/cameron-nokes/2a/47b/251" target="_blank">LinkedIn</a></li>
								<li><a href="https://github.com/ccnokes" target="_blank">Github</a></li>
								<li><a href="http://stackoverflow.com/users/1397311/ccnokes?tab=profile">StackOverflow</a></li>
								<li><a href="https://twitter.com/@ccnokes" target="_blank">Twitter</a></li>
							</ul>
						</div>
					</div>
				</div>
			</DocTitle>
		);
	}
});
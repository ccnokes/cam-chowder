import React from 'react';
import {Link} from 'react-router';
import RandomTopic from './random-topic.jsx';

const links = [
	{
		label: 'Blog',
		linkTo: 'post-index'
	},
	{
		label: 'About',
		linkTo: 'about'
	},
	{
		label: 'Contact',
		linkTo: 'contact'
	}
];


module.exports = React.createClass({
	
	renderLinks() {
		return links.map(function(link) {
			return(
				<li className="nav__link" key={link.label}>
					<Link className="nav__anchor" to={link.linkTo}>
						{link.label}
					</Link>
				</li>
			);
		});
	},

	render() {
		return(
			
			<header className="header row">
				<div className="col-sm-7">
					<h2 className="header-title">
						<Link to="post-index" className="nolinkstyle">
							Cameron Nokes
						</Link>
					</h2>
					<p className="header-sub">
						<small>A website about front-end web development, UX, and <RandomTopic/>.</small>
					</p>
				</div>
				<nav className="nav-container col-sm-5">
					<ul className="nav navbar-nav">
						{ this.renderLinks() }
					</ul>
				</nav>
			</header>		

		);
	}

});
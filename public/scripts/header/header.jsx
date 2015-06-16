var React = require('react'),
	Link = require('react-router').Link,
	RandomTopic = require('./random-topic.jsx');

module.exports = React.createClass({
	
	render() {
		return(
			
			<header className="header row">
				<div className="col-md-6">
					<h2 className="header-title">
						<Link to="post-index" className="nolinkstyle">
							Cameron Nokes
						</Link>
					</h2>
					<p className="header-sub">
						<small>A website about front-end web development, UX, and <RandomTopic/>.</small>
					</p>
				</div>
				<nav className="collapse navbar-collapse col-md-6 pull-right">
					<ul className="nav navbar-nav">
						<li>
							<Link to="post-index">
								Blog
							</Link>
						</li>
						<li>
							<Link to="about">
								About
							</Link>
						</li>
						<li>
							<Link to="contact">
								Contact
							</Link>
						</li>
					</ul>
				</nav>
			</header>		

		);
	}

});
var React = require('react'),
	Router = require('react-router'),
	RouteHandler = Router.RouteHandler,
	TransitionGroup = require('react/lib/ReactCSSTransitionGroup'),
	articleSvc = require('./article/article-svc');


var App = React.createClass({

	render: function() {
		return (
			
			<div className="page-container">
				<header className="header">
					<h2>Cameron Nokes</h2>
					<p><small>A website about front-end web development, UX, and cheesecake.</small></p>
					<ul className="no-list">
						<li>
							About
						</li>
						<li>
							Contact
						</li>
					</ul>
				</header>
				

				<TransitionGroup transitionName="post-index">
					<RouteHandler {...this.props} />
				</TransitionGroup>


				<footer className="footer"></footer>
			</div>

		);
	}

});

module.exports = App;
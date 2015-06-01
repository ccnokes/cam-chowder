var React = require('react'),
	Router = require('react-router'),
	RouteHandler = Router.RouteHandler,
	Link = require('react-router').Link,
	TransitionGroup = require('react/lib/ReactCSSTransitionGroup'),
	articleSvc = require('./article/article-svc'),
	RandomTopic = require('./header/random-topic.jsx'),
	headerGraphic = require('./header/header-graphic');


var App = React.createClass({

	componentDidMount: function() {
		headerGraphic({
			target: '#header-graphic'
		})
		.render();
	},

	render: function() {
		return (
			<div>
				<div id="header-graphic"></div>
				<div className="page-container">
					<header className="header row">
						<div className="col-md-6">
							<h2 className="header-title">
								<Link to="post-index" className="nolinkstyle">
									Cameron Nokes
								</Link>
							</h2>
							<p className="header-sub"><small>A website about front-end web development, UX, and <RandomTopic/>.</small></p>
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
					

					<TransitionGroup transitionName="post-index">
						<RouteHandler {...this.props} />
					</TransitionGroup>

				</div>

				<footer className="footer">
					<div className="page-container">
						&copy; 2015 Cameron Nokes
					</div>
				</footer>

			</div>
		);
	}

});

module.exports = App;
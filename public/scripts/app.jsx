var React = require('react'),
	Router = require('react-router'),
	RouteHandler = Router.RouteHandler,
	Link = require('react-router').Link,
	TransitionGroup = require('react/lib/ReactCSSTransitionGroup'),
	headerGraphic = require('./header/header-graphic'),
	Header = require('./header/header.jsx');


var App = React.createClass({

	componentDidMount() {
		headerGraphic({
			target: '#header-graphic'
		})
		.render();
	},

	render() {
		return (
			<div>
				<div id="header-graphic"></div>
				<div className="page-container">
					<Header/>

					<TransitionGroup transitionName="post-index">
						<RouteHandler {...this.props} />
					</TransitionGroup>

				</div>

				<footer className="footer">
					<div className="page-container">
						&copy; { (new Date).getFullYear() } Cameron Nokes
					</div>
				</footer>

			</div>
		);
	}

});

module.exports = App;
let React = require('react'),
	Router = require('react-router'),
	RouteHandler = Router.RouteHandler,
	Link = require('react-router').Link,
	TransitionGroup = require('react/lib/ReactCSSTransitionGroup'),
	headerGraphic = require('./header/header-graphic'),
	Header = require('./header/header.jsx'),
	DocTitle = require('./core/doc-title.jsx');


let App = React.createClass({

	componentDidMount() {
		headerGraphic.makeGraphic({
			target: '#header-graphic'
		});
	},

	componentWillUnmount() {
		headerGraphic.destroy();
	},

	render() {
		return (
			<DocTitle>
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
			</DocTitle>
		);
	}

});

module.exports = App;
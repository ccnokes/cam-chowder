var React = require('react'),
	articleSvc = require('./article/article-svc');


var SinglePost = React.createClass({

	getInitialState: function() {
		return {
			post: {}
		};
	},

	componentDidMount: function() {
		console.log(this.props);

		articleSvc.getArticleBySlug(this.props.params.slug)
		.then(
			function ok(data) {
				if(this.isMounted()) {
					this.setState({
						post: data
					});
				}

			}.bind(this),
			function err(e) {
				console.error(e);
			}
		);
	},

	render: function() {
		var post = this.state.post;

		return (
			<article className="blog-post">
				<h1>{post.title}</h1>
				<p>{post.text}</p>
			</article>
		);
	}

});

module.exports = SinglePost;
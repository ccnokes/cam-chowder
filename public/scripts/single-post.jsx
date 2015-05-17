var React = require('react'),
	articleSvc = require('./article/article-svc'),
	PostList = require('./post-list.jsx');;


var SinglePost = React.createClass({

	appreciate: function() {
		this.setState({ appreciateCount: ++this.state.appreciateCount });
		return articleSvc.appreciateArticle(this.state.post._id);
	},

	getData: function(props) {
		articleSvc.getArticleBySlug(props.params.slug)
		.then(
			function ok(data) {
				if(this.isMounted()) {
					this.setState({
						post: data,
						appreciateCount: data.appreciates
					});
				}

			}.bind(this),
			function err(e) {
				console.error(e);
			}
		);
	},

	getInitialState: function() {
		return {
			post: {},
			appreciateCount: 0
		};
	},

	componentWillReceiveProps: function(newProps) {
		this.getData(newProps);
	},

	componentDidMount: function() {
		this.getData(this.props);
	},

	render: function() {
		var post = this.state.post;

		return (
			<div className="row">
				<div className="sidebar col-md-3">
					<PostList></PostList>
				</div>
				<article className="blog-post col-md-9">
					<h1>{post.title}</h1>
					<p>{post.text}</p>
					<p>{this.state.appreciateCount}</p>
					<button onClick={this.appreciate}>Appreciate this</button>
				</article>
			</div>
		);
	}

});

module.exports = SinglePost;
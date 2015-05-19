var React = require('react'),
	articleSvc = require('./article/article-svc'),
	filters = require('./config/filters'),
	PostList = require('./post-list.jsx');


var SinglePost = React.createClass({

	appreciate: function() {
		this.setState({ 
			appreciateCount: ++this.state.appreciateCount,
			disableAppreciate: true
		});
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
			appreciateCount: 0,
			disableAppreciate: false
		};
	},

	componentWillReceiveProps: function(newProps) {
		this.getData(newProps);
		//reset it when a new post is loaded
		this.setState({
			disableAppreciate: false
		});
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
					<div className="blog-post-meta small">
						<p>Published: {filters.formatDate(post.createdDate)}</p>
					</div>
					<p>{post.text}</p>
					
					<div>
						<button onClick={this.appreciate} disabled={this.state.disableAppreciate} className="btn btn-primary">
							Appreciate this &nbsp;
							<span className="badge">{this.state.appreciateCount}</span>
						</button>
						<span className={this.state.disableAppreciate ? '': 'hidden'}>Thanks!</span>
					</div>

				</article>
			</div>
		);
	}

});

module.exports = SinglePost;
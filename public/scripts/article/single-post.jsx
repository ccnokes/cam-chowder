var React = require('react'),
	articleSvc = require('./article-svc'),
	filters = require('../config/filters'),
	PostList = require('./post-list.jsx'),
	Loader = require('../core/loader.jsx');


var SinglePost = React.createClass({

	appreciate: function() {
		this.setState({ 
			appreciateCount: ++this.state.appreciateCount,
			disableAppreciate: true
		});
		
		return articleSvc.appreciateArticle(this.state.post._id);
	},

	getData: function(props) {
		this.setState({
			loading: true
		});

		articleSvc.getArticleBySlug(props.params.slug)
		.then(
			function ok(data) {
				if(this.isMounted()) {
					this.setState({
						post: data,
						loading: false,
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
			loading: false,
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
		var html = function() {
			return { __html: post.html || '' };
		};

		return (
			<div className="row">
				<div className="sidebar col-md-4">
					<PostList></PostList>
				</div>

				<article className="blog-post col-md-8">
				
					<Loader show={this.state.loading}></Loader>

					<div className="blog-post-header mg-btm">
						<h1>{post.title}</h1>
						<div className="blog-post-meta small">
							<span>Published: {filters.formatDate(post.createdDate)}</span>
							<div className="blog-post-meta-appreciates">
								<div className="shape-heart"></div>&nbsp;<span className="heart-text">{this.state.appreciateCount}</span>
							</div>
						</div>
					</div>

					<div className="blog-post-body mg-btm" dangerouslySetInnerHTML={html()}></div>
					
					<div className="blog-post-footer">
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
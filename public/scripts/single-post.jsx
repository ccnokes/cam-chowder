var React = require('react'),
	articleSvc = require('./article/article-svc'),
	filters = require('./config/filters'),
	PostList = require('./post-list.jsx'),
	Remarkable = require('remarkable'),
	hljs = require('highlight.js'),
	md = new Remarkable({
		highlight: function (str, lang) {
			if (lang && hljs.getLanguage(lang)) {
				try {
					return hljs.highlight(lang, str).value;
				} catch (err) {}
			}

			try {
				return hljs.highlightAuto(str).value;
			} catch (err) {}

			return ''; // use external default escaping
		}
	});


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
		var html = md.render(post.text);

		return (
			<div className="row">
				<div className="sidebar col-md-3">
					<PostList></PostList>
				</div>
				<article className="blog-post col-md-9">
					<div className="blog-post-header mg-btm">
						<h1>{post.title}</h1>
						<div className="blog-post-meta small">
							<p>Published: {filters.formatDate(post.createdDate)}</p>
						</div>
					</div>

					<div className="blog-post-body mg-btm" dangerouslySetInnerHTML={{__html: html}}></div>
					
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
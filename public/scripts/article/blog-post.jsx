let React = require('react'),
	Navigation = require('react-router').Navigation,
	articleSvc = require('./article-svc'),
	filters = require('../config/filters'),
	PostList = require('./post-list.jsx'),
	Loader = require('../core/loader.jsx'),
	DocTitle = require('../core/doc-title.jsx');


let BlogPost = React.createClass({
	mixins: [Navigation],

	appreciate() {
		this.setState({ 
			appreciateCount: ++this.state.appreciateCount,
			disableAppreciate: true
		});
		
		return articleSvc.appreciateArticle(this.state.post._id);
	},

	getData(props) {
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
				this.transitionTo('/404');
			}.bind(this)
		);
	},

	getInitialState() {
		return {
			post: {},
			loading: false,
			appreciateCount: 0,
			disableAppreciate: false
		};
	},

	componentWillReceiveProps(newProps) {
		this.getData(newProps);
		//reset it when a new post is loaded
		this.setState({
			disableAppreciate: false
		});
	},

	componentDidMount() {
		this.getData(this.props);
	},

	render() {
		let post = this.state.post;
		let html = function() {
			return { __html: post.html || '' };
		};

		return (
			<DocTitle pageTitle={post.title}>
				<main className="blog-post flex-md-8" role="main" itemScope itemType="http://schema.org/BlogPosting" itemProp="blogPost">
				
					<Loader show={this.state.loading}></Loader>

					<header className="blog-post-header mg-btm">
						<h1 itemScope itemProp="headline">{post.title}</h1>
						<div className="blog-post-meta small">
							<span>Published: <time itemProp="datePublished" dateTime={post.createdDate}>{filters.formatDate(post.createdDate)}</time></span>
							<div className="blog-post-meta-appreciates">
								<div className="shape-heart"></div>&nbsp;<span className="heart-text">{this.state.appreciateCount}</span>
							</div>
						</div>
					</header>

					<article itemProp="text" className="blog-post-body mg-btm" dangerouslySetInnerHTML={html()}></article>
					
					<footer className="blog-post-footer">
						<button onClick={this.appreciate} disabled={this.state.disableAppreciate} className="btn btn-primary">
							<div className="shape-heart"></div>
							&nbsp;
							Appreciate 
							&nbsp;
							<span className="badge">{this.state.appreciateCount}</span>
						</button>
						<span className={this.state.disableAppreciate ? '': 'hidden'}>Thanks!</span>
					</footer>
					
				</main>
			</DocTitle>
		);
	}

});

module.exports = BlogPost;
var React = require('react'),
	PostIndexMixin = require('./post-index-mixin'),
	filters = require('./config/filters'),
	Link = require('react-router').Link,
	md = require('./md'),
	Pagination = require('./pagination.jsx');


var BlogPage = React.createClass({
	
	mixins: [PostIndexMixin],

	render: function() {
		console.log(this.state);

		var posts = this.state.posts.map(function(post) {
			return (
				<div className="mg-btm" key={post._id}>
					<div className="blog-post-meta small">
						<span>{filters.formatDate(post.createdDate)}</span>
					</div>

					<div className="clearfix">
						<div className="pull-left blog-appreciates">
							{post.appreciates}
						</div>
						<h3 className="pull-left">
							<Link to="single-post" params={post}>
								{post.title}
							</Link>
						</h3>
					</div>

					<div className="blog-teaser">
						<p dangerouslySetInnerHTML={{__html: md.render(post.teaser)}}></p>
					</div>
				</div>
			);
		});

		return (
			<section className="content">
				{posts}
				<Pagination pagination={this.state.pagination}></Pagination>
			</section>
		);
	}

});

module.exports = BlogPage;
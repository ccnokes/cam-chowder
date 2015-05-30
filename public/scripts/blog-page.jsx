var React = require('react'),
	PostIndexMixin = require('./post-index-mixin'),
	filters = require('./config/filters'),
	Link = require('react-router').Link,
	md = require('./md');


var BlogPage = React.createClass({
	
	mixins: [PostIndexMixin],

	render: function() {

		var posts = this.state.posts.map(function(post) {
			return (
				<div className="blog-post-summary" key={post._id}>
					
					<div className="blog-post-meta small">
						<span>{filters.formatDate(post.createdDate)}</span>
					</div>

					<h3>
						<Link to="single-post" params={post}>
							{post.title}
						</Link>
					</h3>

					<div className="blog-teaser">
						<p dangerouslySetInnerHTML={{__html: md.render(post.teaser)}}></p>
					</div>

					<Link className="btn btn-default btn-readmore" to="single-post" params={post}>
						Continue Reading &rarr;
					</Link>
				</div>
			);
		});

		return (
			<section className="content">
				{posts}
			</section>
		);
	}

});

module.exports = BlogPage;
import React from 'react';
import PostList from './post-list.jsx';
import BlogPost from './blog-post.jsx';

class SinglePostPage extends React.Component {

	render() {
		return (
			<div className="flex-md-row">
				<aside role="complementary" itemScope itemType="http://schema.org/WPSideBar" className="sidebar flex-md-4">
					<PostList></PostList>
				</aside>
				<BlogPost {...this.props} />
			</div>
		);
	}
}

export default SinglePostPage;
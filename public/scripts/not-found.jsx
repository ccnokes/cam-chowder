import React from 'react';
import DocMeta from 'react-doc-meta';

const tags = [
	{ name: 'robots', content: 'noindex' }
];

export default React.createClass({
	render() {
		return(
			<div>
				<DocMeta tags={tags} />
				<h1>Not found.</h1>
				<p>This is embarrassing.</p>
			</div>
		);
	}
});
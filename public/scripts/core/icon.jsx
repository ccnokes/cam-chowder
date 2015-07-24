import React from 'react';

export default React.createClass({
	
	render() {
		let className = this.props.className || ''; //stick className prop here, not on <span> so svg is affected by it
		let svgStr = `
			<svg class="icon ${className}">
			  	<use xlink:href="#${this.props.id}" />
			</svg>
		`;

		return (
			<span dangerouslySetInnerHTML={{__html: svgStr}}></span>
		);
	}
})
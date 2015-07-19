import d3 from 'd3';
import _ from 'lodash';


let components = {};
let opts;


function randomIntFromInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}


function createData(widthLimit, xRange, yRange, _offset) {
	let dataArr = [];
	let totalWidth = 0;
	let offset = (_offset ? _offset : 0);
	
	while(totalWidth < widthLimit) {
		let x = randomIntFromInterval(xRange[0], xRange[1]);
		
		totalWidth += x + offset;
		dataArr.push({
			y: randomIntFromInterval(yRange[0], yRange[1]),
			x: x,
		});	
	}
	
	return dataArr;
}


//returns event remove fn
function listenTo(eventName, cb) {
	let fn = _.debounce(cb, 100);
	window.addEventListener(eventName, fn, false);
	return function unlisten() {
		window.removeEventListener(fn, false);
	};	
}

export function makeGraphic(options) {
	
	let defaults = {
		target: '#target',
		height: 125,
		barWidthRange: [25, 80],
		barHeightRange: [5, 125]
	};

	opts = _.extend({}, defaults, options);

	render(opts);
}


function render(opts) {

	let target = components['target'] = d3.select(opts.target);
	if(target.length === 0) {
		throw new Error('no DOM element');
	}

	let height = opts.height;
	let width = document.documentElement.offsetWidth;
	let barMargin = 1;

	let data = createData(width, opts.barWidthRange, opts.barHeightRange, barMargin);
    
	
	let svg = components['svg'] = target.append('svg')
		.attr({
			height: height,
			width: width
		});
	

	let y = components['y'] = d3.scale.linear()
		.range([height, 0])
		.domain( [0, d3.max(data, function(d) {
			return d.y;
		})] );


	components['rects'] = svg.selectAll('rect')
		.data(data)
		.enter()
		.append('rect')
		.classed('header-graphic-bar', true)
		.attr('height', function(d, i) {
			return height - y(d.y);
		})
		.attr('width', function(d, i) {
			return d.x;
		})
		.attr('x', function(d, i) {
			return data.reduce(function(prev, curr, index) {
				if(index < i) {
					return prev + curr.x + barMargin;	
				}
				else {
					return prev;
				}
			}, 0);
		})
		.attr('y', function(d, i) {
			return 0;
		});

	animateOnScroll();
	handleResize();
}


function animateRects() {
	components.rects
		.transition()
		.duration(800)
		.ease('bounce')
		.attr('height', function() {
			let randomInt = randomIntFromInterval(opts.barHeightRange[0], opts.barHeightRange[1]);
			return opts.height - components.y(randomInt);
		});
}


function animateOnScroll() {
	components['removeScrollListener'] = listenTo('scroll', function() {
		let pageY = window.pageYOffset;
		if(pageY === 0) {
			animateRects();
		}
	});
}


function handleResize() {
	components['removeResizeListener'] = listenTo('resize', function() {
		components.target.node().style.width = document.documentElement.offsetWidth + 'px';
	});
}


export function destroy() {
	components.removeScrollListener();
	components.removeResizeListener();
	components = {};
}


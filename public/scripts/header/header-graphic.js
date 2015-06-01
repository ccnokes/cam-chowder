var d3 = require('d3'),
	_ = require('lodash');

function randomIntFromInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function createData(widthLimit, xRange, yRange, _offset) {
	var dataArr = [];
	var totalWidth = 0;
	var offset = (_offset ? _offset : 0);
	
	while(totalWidth < widthLimit) {
		var x = randomIntFromInterval(xRange[0], xRange[1]);
		
		totalWidth += x + offset;
		dataArr.push({
			y: randomIntFromInterval(yRange[0], yRange[1]),
			x: x,
		});	
	}
	
	return dataArr;
}

function makeGraphic(options) {
	var defaults = {
		target: '#target',
		height: 125,
		barWidthRange: [25, 80],
		barHeightRange: [5, 125]
	};

	var opts = _.extend({}, defaults, options);
	var svg;
	var target = d3.select(opts.target);
	if(target.length === 0) {
		throw new Error('no DOM element');
	}
	
	function render() {
		var height = opts.height;
		var width = document.documentElement.offsetWidth;
		var barMargin = 1;

		var data = createData(width, opts.barWidthRange, opts.barHeightRange, barMargin);
        
		if(!svg) {
			svg = target.append('svg')
			.attr({
				height: height,
				width: width
			});	
		}

		var y = d3.scale.linear()
		.range([height, 0])
		.domain( [0, d3.max(data, function(d) {
			return d.y;
		})] );


		svg.selectAll('rect')
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
	}
	
	return {
		render: render
	};
}

module.exports = makeGraphic;
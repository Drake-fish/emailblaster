import React, { Component } from 'react';
var BarChart = require('react-chartjs').Bar;

class BarGraph extends Component {
	constructor(props) {
		super(props);
	}
	render() {
		console.log(this.props);
		var data = {
			labels: ['Yes', 'No'],
			datasets: [
				{
					label: 'My First dataset',
					fillColor: 'rgba(220,220,220,0.5)',
					strokeColor: 'rgba(220,220,220,0.8)',
					highlightFill: 'rgba(220,220,220,0.75)',
					highlightStroke: 'rgba(220,220,220,1)',
					data: [this.props.data.yes, this.props.data.no]
				}
			]
		};
		var chartOptions = {
			//Boolean - Whether the scale should start at zero, or an order of magnitude down from the lowest value
			scaleBeginAtZero: true,

			//Boolean - Whether grid lines are shown across the chart
			scaleShowGridLines: true,

			//String - Colour of the grid lines
			scaleGridLineColor: 'rgba(0,0,0,.05)',

			//Number - Width of the grid lines
			scaleGridLineWidth: 1,

			//Boolean - Whether to show horizontal lines (except X axis)
			scaleShowHorizontalLines: true,

			//Boolean - Whether to show vertical lines (except Y axis)
			scaleShowVerticalLines: true,

			//Boolean - If there is a stroke on each bar
			barShowStroke: true,

			//Number - Pixel width of the bar stroke
			barStrokeWidth: 2,

			//Number - Spacing between each of the X value sets
			barValueSpacing: 5,

			//Number - Spacing between data sets within X values
			barDatasetSpacing: 1,
			//String - A legend template
			legendTemplate:
				'<ul class="<%=name.toLowerCase()%>-legend"><% for (var i=0; i<datasets.length; i++){%><li><span style="background-color:<%=datasets[i].fillColor%>"><%if(datasets[i].label){%><%=datasets[i].label%><%}%></span></li><%}%></ul>'
		};
		return <BarChart data={data} options={chartOptions} />;
	}
}

export default BarGraph;

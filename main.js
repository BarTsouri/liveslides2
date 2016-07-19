(function(){
	window.addEventListener('load', init);

	function init(){
		initSlider();
		initChart();
	}

	var i = 0;
	var inTransit = false;
	function initSlider(){
		$("#slider")[0].addEventListener('touchstart', function(e){
			if (inTransit) return;
			inTransit = true;
			i += e.touches[0].screenX > window.innerWidth / 2 ? 1 : -1;
			i = i < -4 ? -4: i > 0 ? 0 : i;
			$(".slide").transition({x: 100 * i + "vw"}, 500, 'ease', function(){
				inTransit = false;
			})
		})
	}

	function initChart(){
		var randomColor = function() {
			return 'rgba(255, 255, 255, 1)';
		};

		var config = {
			type: 'line',
			data: {
				labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
				datasets: [{
					data: [500, 512, 1000, 10023, 209, 203203, 5420],
					fill: false,
					borderDash: [5, 5]
				}]
			},
			options: {
				responsive: true,
				title:{
					display:false,
					text:'User Interaction'
				},
				scales: {
					xAxes: [{
						display: true,
						gridLines:{
							drawTicks: false,
							drawOnChartArea: false,
							drawBorder: false
						},
						ticks:{
							fontColor: "#fff",
							padding: 0
						}
					}],
					yAxes: [{
						type: 'logarithmic',
						display: false,
						gridLines:{
							drawTicks: false,
							drawOnChartArea: false
						}
					}]
				},
				legend: {
					display: false
				}
			},

			tooltip: {
				mode: 'single',
				callbacks: {
					title: function(tooltipItems, data) {
						// Title doesn't make sense for scatter since we format the data as a point
						return '';
					},
					label: function(tooltipItem, data) {
						debugger;
						return '';
					}
				}
			}
		};

		config.data.datasets.forEach(function(dataset) {
			dataset.borderColor = randomColor(1);
			dataset.backgroundColor = randomColor(1);
			dataset.pointBorderColor = '#CCC';
			dataset.pointBackgroundColor = randomColor(1);
			dataset.pointBorderWidth = 1;
		});

		var ctx = document.getElementById("canvas").getContext("2d");
		window.c = new Chart(ctx, config);
		window.c.defaultFontColor = "#fff";
	}
}());
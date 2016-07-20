(function(){
	window.addEventListener('load', init);

	function init(){
		initSlider();
		initChartLogScale();
		initChartLinearScale();
	}

	var i = 0;
	var inTransit = false;
	function initSlider(){
		$("#slider")[0].addEventListener('touchstart', function(e){
			if (inTransit) return;
			inTransit = true;
			i += e.touches[0].screenX > window.innerWidth / 2 ? 1 : -1;
			i = i < -5 ? -5: i > 0 ? 0 : i;
			$(".slide").transition({x: 100 * i + "vw"}, 500, 'ease', function(){
				inTransit = false;
			})
		})
	}

	function initChartLogScale(){
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
							//drawBorder: false,
							color:"rgba(255,255,255,0.5)"
						},
						ticks:{
							fontColor: "#fff"
						}
					}],
					yAxes: [{
						type: 'logarithmic',
						gridLines:{
							drawTicks: false,
							drawOnChartArea: false,
							color:"rgba(255,255,255,0.5)"
						},
						afterBuildTicks: function(scale){
							var max = scale.ticks[0];
							var maxLog = Math.log10(max);
							var interval = maxLog / 10;
							var ticks = [];
							for (var i = 4; i <= 10; i ++){
								ticks.push(Math.pow(10, interval * i))
							}

							scale.ticks = ticks;
						},
						ticks: {
							fontColor: "#fff",
							callback: function(value, index, values) {
								if (value > 10000){
									value = parseInt(value / 1000) + 'k'
								} else {
									value = parseInt(value);
								}
								return value;
							}
						}
					}]
				},
				legend: {
					display: false
				},

				tooltips: {
					mode: 'single',
					yPadding: 8,
					titleMarginBottom: 0,
					titleFontSize: 0,
					callbacks: {
						label: function(tooltipItem, data) {
							return tooltipItem.yLabel;
						}
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
		new Chart(ctx, config);
	}

	function initChartLinearScale(){
		var randomColor = function() {
			return 'rgba(255, 255, 255, 1)';
		};

		var config = {
			type: 'line',
			data: {
				labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
				datasets: [{
					data: [23, 35, 30, 20, 42, 8, 45],
					fill: false,
					lineTension: 0
				}]
			},
			options: {
				responsive: true,
				title:{
					display:false
				},
				scales: {
					xAxes: [{
						display: true,
						gridLines:{
							drawTicks: false,
							drawOnChartArea: false,
							//drawBorder: false,
							color:"rgba(255,255,255,0.5)"
						},
						ticks:{
							fontColor: "#fff"
						}
					}],
					yAxes: [{
						gridLines:{
							drawTicks: false,
							drawOnChartArea: false,
							color:"rgba(255,255,255,0.5)"
						},
						ticks:{
							fontColor: "#fff",
							beginAtZero: true
						}
					}]
				},
				legend: {
					display: false
				},

				tooltips: {
					mode: 'single',
					yPadding: 8,
					titleMarginBottom: 0,
					titleFontSize: 0,
					callbacks: {
						label: function(tooltipItem, data) {
							return tooltipItem.yLabel;
						}
					}
				}
			}
		};

		config.data.datasets.forEach(function(dataset) {
			dataset.borderColor = "rgba(255,255,255, 0.8)";
			dataset.pointBorderColor = '#CCC';
			dataset.pointBackgroundColor = randomColor(1);
			dataset.pointBorderWidth = 1;
		});

		var ctx = document.getElementById("linear-canvas").getContext("2d");
		new Chart(ctx, config);
	}

}());
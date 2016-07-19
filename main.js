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
				labels: ["January", "February", "March", "April", "May", "June", "July"],
				datasets: [{
					data: [500, 512, 1000, 10023, 1, 203203, 5420],
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
						display: true
					}],
					yAxes: [{
						type: 'logarithmic'
					}]
				}
			}
		};

		$.each(config.data.datasets, function(i, dataset) {
			dataset.borderColor = randomColor(1);
			dataset.backgroundColor = randomColor(1);
			dataset.pointBorderColor = 'rgb(200, 200, 200)';
			dataset.pointBackgroundColor = randomColor(1);
			dataset.pointBorderWidth = 1;
		});

		var ctx = document.getElementById("canvas").getContext("2d");
		new Chart(ctx, config);
	}
}());
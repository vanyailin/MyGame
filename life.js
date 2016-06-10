var appWidth=10;
var appHeight=10;
var startGame = [];

$.getJSON('live.json', function(data){
	startGame=data;
	console.log(startGame);
	$(function(){
		for (var x = 1; x <= appWidth; x++) {
			for (var y = 1; y <= appHeight; y++) {
				$('<div></div>')
					.addClass('field').addClass('dead')
					.attr('id','field'+x.toString()+'-' + y.toString())
					.data('x',x).data('y',y)
					.appendTo('#app')
			}
		}
	
		$.each(startGame, function() {
			$('#field'+this[0]+'-'+this[1]).addClass('live').removeClass('dead');
		});	
	
		$('#start').on('click', game);
	
		function game (){
			var timerId = setInterval(function() {
				var newGeneration = [];
				$('.field').each(function() {
					var x = $(this).data('x');
					var y = $(this).data('y');
					var count = neigbours(x,y);
					var element = [];
					if (this.className != 'field live' && count==3){
						element = [x, y, "live"];
						newGeneration.push(element);
					} else if (this.className == 'field live' && count!=3 && count!=2) {
						element = [x, y, "dead"];
						newGeneration.push(element);
					}
				});
				$.each(newGeneration, function() {
					$('#field' + this[0] + '-' + this[1]).attr('class', 'field ' + this[2]);
				});
				console.log(newGeneration);
				if (newGeneration.length==0) {
					alert("Game over!");
					clearInterval(timerId);
					alert("Спасибо за игру! :)");
				}
			},2000);
		
			$('#start').off('click');
			
			function neigbours(x, y) {
				var life = 0;
				var directions = [{x:-1,y:-1},{x:-1, y:0},{x:-1, y:1},{x:0, y:1},{x:0,y:-1},{x:1, y:1},{x:1, y:0},{x:1, y:-1}]
				for (var i=0; i<directions.length; i++){
					if ($('#field'+(x+directions[i].x)+'-'+(y+directions[i].y)).hasClass('live')) {
						life++;
					}	
				}
				return life;
			}
		}
 	});
});

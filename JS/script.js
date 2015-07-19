$(document).ready(function() {
    $('#menu').accordion({
    	active: false,
  		collapsible: true,
    });

    $('.proyect').click(function(){
    	window.location.href = "http://ja-bravo.github.io/Sokoban/";
    });

    $('.proyect').mouseenter(function(){
    	$(this).css("background-color","#4CCADB");
    });

    $('.proyect').mouseleave(function(){
    	$(this).css("background-color","#00B4CC");
    });

});


alert(!![]);
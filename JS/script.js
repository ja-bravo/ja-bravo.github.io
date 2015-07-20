$(document).ready(function() {
    $('#proyect1').click(function(){
        window.location.href = "Pathfinder/pathfinder.html";
    });

    $('#proyect2').click(function(){
        window.location.href = "http://ja-bravo.github.io/Sokoban/";
    });

    $('#proyect3').click(function(){
    	window.location.href = "http://ja-bravo.github.io/League-of-Legends-stats-viewer/";
    });

    if($(window).width() < 680)
    {
        $(".skill:nth-child(1)").css("margin-left","15%");
        $(".skill:nth-child(3)").css("margin-left","15%");
        $(".skill:nth-child(5)").css("margin-left","15%");
    }
    else
    {
        $(".skill:nth-child(1)").css("margin-left","7%");
        $(".skill:nth-child(4)").css("margin-left","7%");
    }
});
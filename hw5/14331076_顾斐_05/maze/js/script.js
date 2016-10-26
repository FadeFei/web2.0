var ifInMaze = false;
var ifStart = false;
window.onload = function() {
	for (var i = 1; i < 10; i++) {
			document.getElementsByTagName('div')[i].style.backgroundColor = "silver";
	}
	document.getElementsByClassName("wall1-1")[0].onmouseover = fail;
	document.getElementsByClassName("wall1-2")[0].onmouseover = fail;
	document.getElementsByClassName("wall1-3")[0].onmouseover = fail;
	document.getElementsByClassName("wall2")[0].onmouseover = fail;
	document.getElementsByClassName("wall3")[0].onmouseover = fail;
	document.getElementsByClassName("wall4")[0].onmouseover = fail;
	document.getElementsByClassName("wall5-1")[0].onmouseover = fail;
	document.getElementsByClassName("wall5-2")[0].onmouseover = fail;
	document.getElementsByClassName("wall5-3")[0].onmouseover = fail;
	document.getElementsByClassName("start")[0].onmouseover = gameStart;
	document.getElementsByClassName("end")[0].onmouseover = gameEnd;
	document.getElementsByClassName("maze")[0].onmouseleave = function() {
		ifInMaze = false;
		ifStart = false;
		for (var i = 1; i < 10; i++) {
			document.getElementsByTagName('div')[i].style.backgroundColor = "silver";
		}
		
		
	}
}

function fail(event) {
	if (ifStart == true) {
		event.target.style.backgroundColor = "red";
		ifStart = false;
		document.getElementsByClassName("result")[0].innerHTML = "Sorry, you lose!";
	}
}
function gameStart() {
	ifInMaze = true;
	ifStart = true;
	document.getElementsByClassName("result")[0].innerHTML = "";
}
function gameEnd() {
	if (ifInMaze == true && ifStart == true) {
		document.getElementsByClassName("result")[0].innerHTML = "You Win!";
	}
	else if (ifInMaze == false) {
		document.getElementsByClassName("result")[0].innerHTML = "Don't cheat, you should start from the 'S' and move to the 'E' inside the Maze!";
	}
}

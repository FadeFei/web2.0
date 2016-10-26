var ifStart = false;
var moleSta = 0;
var time = 30, grade = 0;
var timePrint, statePrint, moleSet, gradePrint;
var timeCal;
var ifMole = false;//判断当前是否有mole
window.onload = function() {
	document.getElementById("start").onclick = start;
	timePrint = document.getElementById("TimeBox");
	statePrint = document.getElementById("station");
	moleSet = document.getElementsByClassName("hole");
	gradePrint = document.getElementById("ScoreBox");
}
function start() {
	// 游戏已经开始
	if (ifStart) {
		clearInterval(timeCal);
		ifStart = false;
		statePrint.innerHTML = "pause";
	} else {
	// 游戏未开始
		statePrint.innerHTML = "palying"
		ifStart = true;
		if (!ifMole) {
			for (var i = 0; i < 60; i++) {
				moleSet[i].style.backgroundImage = "none";
			}
			random();
		}
		timeCount();
	}
}
// 随机选一个点出现mole
function random() {
	ifMole = true;
	moleSta = Math.floor(Math.random()*60);
	moleSet[moleSta].style.backgroundImage = "url(img/mole.jpg)";
	moleSet[moleSta].style.backgroundSize = "100%";
	moleSet[moleSta].name = "O";
	hunt();
}

// 倒计时
function timeCount() {
	if (time == 0) {
		timePrint.innerHTML = time;
		end();
	}
	else {
		timePrint.innerHTML = time;
		time--;
		timeCal = setTimeout("timeCount()", 1000);
	}

}

// 游戏结束
function end() {
	if (grade <= 0) {
		for (var i = 0; i < 60; i++) {
			moleSet[i].style.backgroundImage = "url(img/mole.jpg)";
		}
		alert("AHahhhhhhhhh");
	} else {
		alert("游戏结束!"+"\n"+"您的最终得分是: " + grade);
	}
	ifStart = false;
	time = 30;
	grade = 0;
	ifMole = false;
	statePrint.innerHTML = "READY";
}

// 游戏进行中
function hunt() {
	for (var i = 0; i < 60; i++) {
		moleSet[i].onclick = function() {
			if (this.name == "O")
			{
				this.style.backgroundImage = "none";
				this.name = "X";
				random();
				grade++;
				gradePrint.innerHTML = grade;
			}
			else if (this.name = "X")
			{
				if (grade > 0)
				{
					grade--;
				}
				gradePrint.innerHTML = grade;
			}
		}
	}
}
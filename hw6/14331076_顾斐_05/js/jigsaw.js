var myJigsaw = {
	step: 0,
	start: 0
}
var end = false;

window.onload = function() {
	var button = document.getElementById("restart");
	Init();
	Event();
	button.onclick= function() {
		start();
		myJigsaw.step = 0;
	}
	// var button2 = document.getElementById("resolve");
	// button2.onclick = function() {
	// 	resolve();
	// }
}

function Init() {
	myJigsaw.puzzle = document.getElementById("main");
	var frag = document.createDocumentFragment();
	for (var i = 0; i < 4; i++) {
		for (var j = 0; j < 4; j++) {
			var divPuzzle = document.createElement("divPuzzle");
			divPuzzle.id = 4*i + j;
			if (i == 3 && j== 3) {
				//即那个空格
				divPuzzle.className = "blank";
			} else {
				divPuzzle.className = "smallPuzzle";
				divPuzzle.style.backgroundPositionX = "-" + j*88 + "px";
				divPuzzle.style.backgroundPositionY = "-" + i*88 + "px";
			}
			divPuzzle.style.left = j*90 + "px";
			divPuzzle.style.top = i*90 + "px";
			//在后面添加一个节点
			frag.appendChild(divPuzzle);
		};
	};
	myJigsaw.puzzle.appendChild(frag);
}

function Event() {
	var eachDivPuzzle = document.getElementsByClassName("smallPuzzle");
	var test = document.getElementsByClassName("smallPuzzle")[0];
	var blank = document.getElementsByClassName("blank")[0];
	//解析字符串 返回整数
	var blankLeft = parseInt(blank.style.left);
	var blankTop = parseInt(blank.style.top);
	for (var i = eachDivPuzzle.length - 1; i >= 0; i--) {
		eachDivPuzzle[i].onclick = function() {
			// moveDivPuzzle(eachDivPuzzle[0], blank);
			if (myJigsaw.start == 1 && this.style.top == blank.style.top
				&& (parseInt(this.style.left)+90 == parseInt(blank.style.left) || parseInt(this.style.left)-90 == parseInt(blank.style.left))) {
				moveDivPuzzle(this, blank);
				myJigsaw.step++;
			}
			if (myJigsaw.start == 1 && this.style.left == blank.style.left
				&& (parseInt(this.style.top)+90 == parseInt(blank.style.top) || parseInt(this.style.top)-90 == parseInt(blank.style.top))) {
				moveDivPuzzle(this, blank);
				myJigsaw.step++;
			}
			ifWin();
		}
	}
}


function moveDivPuzzle(tempPuzzle, tempBlank) {
	var tempLeft = tempPuzzle.style.left;
	var tempTop = tempPuzzle.style.top;
	tempPuzzle.style.left = tempBlank.style.left;
	tempPuzzle.style.top = tempBlank.style.top;
	tempBlank.style.left = tempLeft;
	tempBlank.style.top = tempTop;
	
}


function start() {
	end = false;
	myJigsaw.start = 1;
	var count = 14;
	var tempDivPuzzle;
	// var idSet = new Array("0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14");   //存储还没被设置位置的所有块的id
	var blank = document.getElementsByClassName("blank")[0];
	var eachDivPuzzle = document.getElementsByClassName("smallPuzzle");
	//相当于还原难度吧
	var level = 100;
	// 由于在打乱的时候遵循了move的规则，即空格只能和相邻位交换，因此应该是一定有解的
	while (level--) {
		var tempId = Math.round((Math.random()*100)%count);

		if (eachDivPuzzle[tempId].style.top == blank.style.top
			&& (parseInt(eachDivPuzzle[tempId].style.left)+90 == parseInt(blank.style.left) || parseInt(eachDivPuzzle[tempId].style.left)-90 == parseInt(blank.style.left))) {
			moveDivPuzzle(eachDivPuzzle[tempId], blank);
		}
		if (eachDivPuzzle[tempId].style.left == blank.style.left
			&& (parseInt(eachDivPuzzle[tempId].style.top)+90 == parseInt(blank.style.top) || parseInt(eachDivPuzzle[tempId].style.top)-90 == parseInt(blank.style.top))) {
			moveDivPuzzle(eachDivPuzzle[tempId], blank);
		}
	}
}


function ifWin() {
	var win = 1;
	for (var i = 0; i < 4; i++) {
		for (var j = 0; j < 4; j++) {
			var tempId = 4*i + j;
			var tempDivPuzzle = document.getElementById(tempId);
			if(tempDivPuzzle.style.left != j*90 + "px" || tempDivPuzzle.style.top != i*90 + "px") {
				win = 0;
		    }
		}
	}
	var stepTemp = myJigsaw.step;
	if (win && myJigsaw.start == 1) {
		var t = setTimeout(function(){alert("Congratulations!You win by " + stepTemp + " steps!")}, 200);
		myJigsaw.start = 0;
		myJigsaw.step = 0;
		end = true;
	}
}
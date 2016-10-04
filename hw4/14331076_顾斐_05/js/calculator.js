var check = false;
window.onload = function() {
	var num_buttons = document.getElementsByClassName("button");
	for (var i = 0; i < num_buttons.length; i++) {
		num_buttons[i].onclick = function() {
			var flag = this.innerText;
			// 用于判断按键类型
			if (flag != 'CE' && flag != '←' && flag != "=") {
				inputButton(this.innerText);
				check = false;
			} else if (flag == 'CE') {
				clearButton();
				check = false;
			} else if (flag == '←') {
				deleteButton();
				check = false;
			} else if (flag == '=') {
				equalButton();
				check = true;
			} else {
				alert('');
			}
		}
	}
}
function inputButton(val) {
	var old_str = document.getElementsByClassName('formula-box')[0].value;
	var last_input = old_str.substring(old_str.length-1);
	var last_two_input = old_str.substring(old_str.length-2, old_str.length-1);
	var numOfLeftBrack = 0;
	for (var i = 0; i < old_str.length; i++) {
		var temp = old_str.charAt(i);
		if (temp == "(")
			numOfLeftBrack++;
		if (temp == ")")
			numOfLeftBrack--;
	}
	if ((last_input == '+' || last_input == '-' || last_input == '*' || last_input == '/' || last_input == ".")
		&& (val == '+' || val == '*' || val == '/')) {
			alert("请不要重复输入运算符或者在小数点后输入运算符");
	} else if (val == "." && last_input == ".") {
			alert("请不要重复输入小数点");
	} else if (last_input == '' && (val == '+' || val == '*' || val == '/')) {
			alert("请先输入数字或括号或负号");
	} else if (last_input == "(" && (val == '+' || val == '*' || val == '/')) {
			alert("括号内请先输入数字或负号");
	} else if ((val == ")" && numOfLeftBrack <= 0)||(last_input == "(" && val == ")")) {
			alert("请按照正确的方法使用括号");
	} else if (!isNaN(val) && check) {
			document.getElementsByClassName('formula-box')[0].value = val;
	} else if (val == '-' && ((isNaN(last_input) && isNaN(last_two_input) && last_input != '(')||
				(old_str.length == 1 && last_input == '-'))) {
			alert("请正确使用负号");
	} else {
		document.getElementsByClassName('formula-box')[0].value += val;
	}
}


function clearButton() {
	var old_str = document.getElementsByClassName('formula-box')[0].value;
	if (old_str == "") {
		alert("我已经什么都没有了，你还想清空什么！")
	}
	document.getElementsByClassName('formula-box')[0].value = '';
}

function equalButton() {
	try {
		var result = eval(document.getElementsByClassName('formula-box')[0].value);
		if (result == 'NaN' || result == 'underfine' || result == 'Infinity')
			throw result;
		document.getElementsByClassName('formula-box')[0].value = result;
	} catch(exception) {
		alert(exception  + "\n厉害了，这种算式都想的出来！\n有些算式例如1--1必须写成1-（-1）才能被接受");
	}
}

function deleteButton() {
	var old_str = document.getElementsByClassName('formula-box')[0].value;
	if (old_str == "") {
		alert("我已经什么都没有了，你还想删除什么！")
	}
	document.getElementsByClassName('formula-box')[0].value = old_str.substring(0, old_str.length-1);
}
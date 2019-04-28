
var $progressValue = 0;
var resultList = [];

const quizdata = [{
		question: "Выберите логотип для фреймворка из следующих кинолент",
		options: ["Avengers", "Теория большого взрыва", "V-значит Вендетта", "Крутые бобры"],
	},
	{
		question: "Выберите создателя лучшего фреймворка",
		options: ["Google", "Facebook", "Бывший работник Google", "Неравнодушное комьюнити"],
	},
	{
		question: "Какое имя вам больше нравится?",
		options: ["Angie", "Amber", "Rihanna", "Evie"],
	},
	{
		question: "Какие инструменты тестирования вы предпочитаете?",
		options: ["Jasmine & karma", "Karma & Mocha, jest", "Q-inite", "Jest & Enzyme"],
	},
	{
		question: "В каком году по вашему мнению вышел самый лучший фреймворк?",
		options: ["2011", "2013", "2014", "2016"],
	},
	{
		question: "Выберите уровень сложности вашего фреймворка",
		options: ["Hard", "Easy", "Normal", "Very Hard!"],
	},
	{
		question: "Какие параметр фреймворка для вас более важен?",
		options: ["Модульность", "Легкий JS и HTML", "Зрелость фреймворка и сообщества", "TypeScript"],
	},
	{
		question: "Какими сервисами вы пользуетесь чаще всего?",
		options: ["Forbes, Wix, Weather.com, Google", "Uber, Twitter, Reddit, Paypal, Facebook", "Alibaba, Baidu, GitLab", "Netflix, Linkedln"],
	},
	{
		question: "Как вы думаете, cколько звёзд на GitHub у вашего фреймворка?",
		options: ["21К+", "47К+", "128К+", "136К+"],
	},
	{
		question: "Что вы почувствовали, когда вы впервые увидели документацию вашего фреймворка?",
		options: ["Я читал и плакал от легкости изучения", "Пфф и всё? ..ааа тут есть ещё и подразделы LOL", "Слава богам - она русифицирована!", "Обычные доки"],
	},
	{
		question: "Что вы предпочитаете разрабатывать?",
		options: ["Modern web & native apps (iOS and Android)", "Large-scale and feature-rich apps", "Web apps", "SPAs and Web"],
	},
	{
		question: "Ваш знакомый попросил сделать мобильное приложение. Какой инструмент вы выберите?",
		options: ["Ionic", "React-Native", "Cordova", "Weex"],
	}
];
/** Random shuffle questions **/
function shuffleArray(question) {
	var shuffled = question.sort(function () {
		return .5 - Math.random();
	});
	return shuffled;
}

function shuffle(a) {
	for (var i = a.length; i; i--) {
		var j = Math.floor(Math.random() * i);
		var _ref = [a[j], a[i - 1]];
		a[i - 1] = _ref[0];
		a[j] = _ref[1];
	}
}

/*** Return shuffled question ***/
function generateQuestions() {
	var questions = shuffleArray(quizdata);
	return questions;
}

/*** Return list of options ***/
function returnOptionList(opts, i) {

	var optionHtml = '<li class="myoptions">' +
		'<input value="' + opts + '" name="optRdBtn" type="radio" id="rd_' + i + '">' +
		'<label for="rd_' + i + '">' + opts + '</label>' +
		'<div class="bullet">' +
		'<div class="line zero"></div>' +
		'<div class="line one"></div>' +
		'<div class="line two"></div>' +
		'<div class="line three"></div>' +
		'<div class="line four"></div>' +
		'<div class="line five"></div>' +
		'<div class="line six"></div>' +
		'<div class="line seven"></div>' +
		'</div>' +
		'</li>';

	return optionHtml;
}

/** Render Options **/
function renderOptions(optionList) {
	var ulContainer = $('<ul>').attr('id', 'optionList');
	for (var i = 0, len = optionList.length; i < len; i++) {
		var optionContainer = returnOptionList(optionList[i], i)
		ulContainer.append(optionContainer);
	}
	$(".answerOptions").html('').append(ulContainer);
}

/** Render question **/
function renderQuestion(question) {
	$(".question").html("<h1>" + question + "</h1>");
}

/** Render quiz :: Question and option **/
function renderQuiz(questions, index) {
	var currentQuest = questions[index];
	renderQuestion(currentQuest.question);
	renderOptions(currentQuest.options);
	console.log("Question");
	console.log(questions[index]);
}

/** Insert progress bar in html **/
function getProgressindicator(length) {
	var progressbarhtml = " ";
	for (var i = 0; i < length; i++) {
		progressbarhtml += '<div class="my-progress-indicator progress_' + (i + 1) + ' ' + ((i == 0) ? "active" : "") + '"></div>';
	}
	$(progressbarhtml).insertAfter(".my-progress-bar");
}

/*** change progress bar when next button is clicked ***/
function changeProgressValue() {
	$progressValue += 9;
	if ($progressValue >= 100) {

	} else {
		if ($progressValue == 99) $progressValue = 100;
		$('.my-progress')
			.find('.my-progress-indicator.active')
			.next('.my-progress-indicator')
			.addClass('active');
		$('progress').val($progressValue);
	}
	$('.js-my-progress-completion').html($('progress').val() + '% complete');
}

function addClickedAnswerToResult(questions, presentIndex, clicked) {
	var result = {
		index: presentIndex,
		question: questions[presentIndex].question,
		clicked: clicked,
	}
	resultList.push(result);
}

$(document).ready(function () {

	var presentIndex = 0;
	var clicked = 0;

	var questions = generateQuestions();
	renderQuiz(questions, presentIndex);
	getProgressindicator(questions.length);

	$(".answerOptions ").on('click', '.myoptions>input', function (e) {
		clicked = $(this).val();

		if (questions.length == (presentIndex + 1)) {
			$("#submit").removeClass('hidden');
			$("#next").addClass("hidden");
		} else {
			$("#next").removeClass("hidden");
		}
	});

	$("#next").on('click', function (e) {
		e.preventDefault();
		addClickedAnswerToResult(questions, presentIndex, clicked);

		$(this).addClass("hidden");

		presentIndex++;
		renderQuiz(questions, presentIndex);
		changeProgressValue();
	});

	$("#submit").on('click', function (e) {
		addClickedAnswerToResult(questions, presentIndex, clicked);
		$('.multipleChoiceQues').hide();
		$(".resultArea").show();

		var emberAnswers = [
			"Не знаю, например лого из 'Крутых бобров' было ничего такое",
			"Неравнодушное комьюнити",
			"Amber",
			"Q-inite",
			"2011",
			"Very Hard!",
			"Зрелость фреймворка и сообщества",
			"Netflix, Linkedln",
			"21К+",
			"Обычные доки",
			"Web apps",
			"Cordova"
		];

		var reactAnswers = [
			"Из ситкома 'Теория большого взрыва'",
			"Google",
			"Rihanna",
			"Jest & Enzyme",
			"2013",
			"Easy",
			"Модульность",
			"Uber, Twitter, Reddit, Paypal, Facebook",
			"128К+",
			"Слава богам - она русифицирована!",
			"Modern web & native apps (iOS and Android)",
			"React-Native",
		];

		var angularAnswers = [
			"Из 'Avengers'",
			"Facebook",
			"Angie",
			"Jasmine & karma",
			"2016",
			"Hard",
			"TypeScript",
			"Forbes, Wix, Weather.com, Google",
			"47К+",
			"Пфф и всё? ..ааа тут есть ещё и подразделы LOL",
			"Large-scale and feature-rich apps",
			"Ionic"
		];

		var vueAnswers = ["Лого из фильма 'V-значит Вендетта'",
			"Бывший работник Google",
			"Evie",
			"Karma & Mocha, jest",
			"2014",
			"Normal",
			"Легкий JS и HTML",
			"Alibaba, Baidu, GitLab",
			"136К+",
			"Я читал и плакал от легкости изучения",
			"SPAs and Web",
			"Weex",
		];

		var clickedAnswers = [];

		for (i = 0; i < 12; i++) {
			clickedAnswers.push(resultList[i].clicked);
		};

		function calc(a) {
			var count = {},
				res = 0,
				q;

			for (q = 0; q < a.length; ++q) {
				count[a[q]] = ~~count[a[q]] + 1;
			}

			for (q in count) {
				if (count.hasOwnProperty(q) && count[q] > 1) {
					res += count[q];
				}
			}

			return res;
		}

		var reactClickedNumber = (calc(reactAnswers.concat(clickedAnswers)) / 2);
		var angularClickedNumber = (calc(angularAnswers.concat(clickedAnswers)) / 2);
		var emberClickedNumber = (calc(emberAnswers.concat(clickedAnswers)) / 2);
		var vueClickedNumber = (calc(vueAnswers.concat(clickedAnswers)) / 2);

		var maxClickedNumber = Math.max(
			reactClickedNumber,
			angularClickedNumber,
			emberClickedNumber,
			vueClickedNumber
		);

		if (reactClickedNumber === maxClickedNumber) {
			$('#picture').attr({
				src: "jpg/react.jpg"
			});
		} else if (angularClickedNumber === maxClickedNumber) {
			$('#picture').attr({
				src: "jpg/angular.jpg"
			});
		} else if (emberClickedNumber === maxClickedNumber) {
			$('#picture').attr({
				src: "jpg/ember.jpg"
			});
		} else if (vueClickedNumber === maxClickedNumber) {
			$('#picture').attr({
				src: "jpg/vue.jpg"
			});
		}
	});

	$(".resultArea").on('click', '.replay', function () {
		window.location.reload(true);
	});

}); 

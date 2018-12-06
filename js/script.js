function QuizQuestion(question, choices, correctAnswer){
  this.question = question;
  this.choices = choices;
  this.correctAnswer = correctAnswer;
}

var allQuestions = [
  new QuizQuestion("Grand Central Terminal, Park Avenue, New York is the world's",["largest railway station", "highest railway station", "longest railway station", "None of the above"],0),
  new QuizQuestion("Entomology is the science that studies",["Behavior of human beings", "Insects", "The origin and history of technical and scientific terms"],1),
  new QuizQuestion("Eritrea, which became the 182nd member of the UN in 1993, is in the continent of",[ "Asia", "Africa", "Europe", "Australia"],1),
  new QuizQuestion(" Garampani sanctuary is located at ",["Junagarh, Gujarat", "Diphu, Assam", "Kohima, Nagaland", "Gangtok, Sikkim"],1),
  new QuizQuestion("For which of the following disciplines is Nobel Prize awarded?",["Physics and Chemistry", "Physiology or Medicine","Literature, Peace and Economics","All of the above" ],3),
  new QuizQuestion("Hitler party which came into power in 1933 is known as",["Labor Party", "Nazi Party", "Ku-Klux-Klan","Democratic Party"],1),
  new QuizQuestion("The headquarter of International Atomic Energy Agency (IAEA) are situated at ",["Vienna", "Rome", "Geneva","Paris"],0),
  new QuizQuestion("Where is the permanent secretariat of the SAARC?",["Kathmandu", "New Delhi", "Islamabad", "Colombo"],0),
  new QuizQuestion("The Olympic Flame symbolises ",["unity among various nations of the world", "speed, perfection and strength", "sports as a means for securing harmony among nations", "continuity between the ancient and modern games"],3),
  new QuizQuestion("The number of already named bones in the human skeleton is",["200", "206", "212", "218"],1),
];

var currentquestion = 0;
var correctAnswers = 0;

function setupOptions() {
  $('#question').html(parseInt(currentquestion) + 1 + ". " + allQuestions[currentquestion].question);
  var options = allQuestions[currentquestion].choices;
  var formHtml = '';
  for (var i = 0; i < options.length; i++) {
    formHtml += '<div><input type="radio" name="option" value="' + i + '" class="options"><label for="option' + i + '">' + options[i] + '</label></div><br/>';
  }
  $('#form').html(formHtml);
  $(".options:eq(0)").prop('checked', true);
}

function checkAns() {
  if ($("input[name=option]:checked").val() == allQuestions[currentquestion].correctAnswer) {
    correctAnswers++;
  }
}

$(document).ready(function(){

  var $jumbotron = $(".jumbotron");
  var $start = $("#start");
  var $progressbar = $("#progressbar");
  var $next = $("#next");
  var $result = $("#result");

	$jumbotron.hide();
	$start.click(function() {
	    $jumbotron.fadeIn();
	    $(this).hide();
  	});

	$(function() {
		$progressbar.progressbar({
			max: allQuestions.length-1,
			value: 0
		});
	});

	setupOptions();

	$next.click(function(){
			event.preventDefault();
			checkAns();
			currentquestion++;
			$(function() {
    			$progressbar.progressbar({
      				value: currentquestion
    			});
  			});
			if(currentquestion<allQuestions.length){
				setupOptions();
				if(currentquestion==allQuestions.length-1){
					$next.html("Submit");
					$next.click(function(){
						$jumbotron.hide();
						$result.html("You correctly answered " + correctAnswers + " out of " + currentquestion + " questions! ").hide();
						$result.fadeIn(1500);
					});

				}

			};
	});
});

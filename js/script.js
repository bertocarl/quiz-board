function QuizQuestion(question, choices, correctAnswer) {
  this.question = question;
  this.choices = choices;
  this.correctAnswer = correctAnswer;
}

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

$(document).ready(function() {

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
      max: allQuestions.length - 1,
      value: 0
    });
  });

  setupOptions();

  $next.click(function() {
    event.preventDefault();
    checkAns();
    currentquestion++;
    $(function() {
      $progressbar.progressbar({
        value: currentquestion
      });
    });
    if (currentquestion < allQuestions.length) {
      setupOptions();
      if (currentquestion == allQuestions.length - 1) {
        $next.html("Submit");
        $next.click(function() {
          $jumbotron.hide();
          $result.html("You correctly answered " + correctAnswers + " out of " + currentquestion + " questions! ").hide();
          $result.fadeIn(1500);
          //*$result.html("")*//
        });

      }

    };
  });
});

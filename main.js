var minutes;
var secondes;
var participants;
var currentId = 0;
var isTimerActive;
var isStart = true;
var participantsTimer = [];
var sortableParticipants = [];
var timer2 = 0;
var totalSecondes = 0;
var pourcent = 0;
var maxSecondes;

// Write the name of the current participant
function writeCurrentName() {
  $('h1').text(participants[sortableParticipants[currentId]].nom);
}

function getTimer(minutes, secondes) {
  var showMinutes;
  var showSecondes;

  if (minutes < 10) {
    showMinutes = '0' + minutes;
  } else {
    showMinutes = minutes;
  }

  if (secondes < 10) {
    showSecondes = '0' + secondes;
  } else {
    showSecondes = secondes;
  }

  return showMinutes + ':' + showSecondes;
}

// Write the time into a timer
function showTimer() {
  if (secondes <= 0 && minutes <= 0) {
    $('#timer').text("C'est fini !");
    $('#timer2').text("C'est fini !");
  } else {
    $('#timer').text(getTimer(minutes, secondes));
    $('#timer2').text(getTimer(minutes, secondes));
  }
}

// Load the JSON data
$.getJSON('./config.json', function(data) {
  participants = data.participants;

  minutes = participants.length * data.chrono.minutes;
  secondes = participants.length * data.chrono.secondes;
  maxSecondes = (data.chrono.minutes * 60) + data.chrono.secondes;
  console.log(maxSecondes);
  
  totalSecondes = (minutes * 60) + secondes;

  while (secondes >= 60) {
    minutes++;
    secondes = secondes - 60;
  };

  for (var participantIndex = 0; participantIndex < participants.length; participantIndex++) {
    var participantId = 'participant' + participantIndex;
    participantsTimer.push(0);

    sortableParticipants.push(participantIndex);

    if (participantIndex === currentId) {
      $('ul').append("<li id='" + participantId + "' class='active'>" + participants[participantIndex].nom + '<span> 00:00 </span></li>');
    } else {
      $('ul').append("<li id='" + participantId + "'>" + participants[participantIndex].nom + '<span> 00:00 </span></li>');
    }
  }

  writeCurrentName();
  showTimer();

  $('li').click(function() {
    $(".active").removeClass('active');
    $(this).addClass('active');

    updateSortableParticipants();
    var participantId = $(this).attr('id');
    var trueParticipantId = participantId.substr(participantId.length - 1);
    currentId = sortableParticipants.indexOf(trueParticipantId);

    writeCurrentName();
  });
});

// Get the current participant ID
function getParticipantId() {
  return '#participant' + currentId;
}

function updateSortableParticipants() {
  var currentSortableParticipants = [];

  $("li").each(function (index) {
    var participantId = $(this).attr("id");

    if (participantId != undefined) {
      currentSortableParticipants.push(participantId.substr(participantId.length - 1));

      if ($(this).hasClass("active")) {
        currentId = index;
      }
    }
  });

  sortableParticipants = currentSortableParticipants;
}

$('#suivant').click(function() {
  if (currentId < participants.length - 1) {
    updateSortableParticipants();
    $("#participant" + sortableParticipants[currentId]).removeClass('active');
    currentId++;
    $("#participant" + sortableParticipants[currentId]).addClass('active');
    writeCurrentName();
  }
});

$('#precedent').click(function() {
  if (currentId > 0) {
    updateSortableParticipants();
    $("#participant" + sortableParticipants[currentId]).removeClass('active');
    currentId--;
    $("#participant" + sortableParticipants[currentId]).addClass('active');
    writeCurrentName();
  }
});

// Set the timer every secondes
function timer() {
  if (isTimerActive == true) {
    
    participantsTimer[sortableParticipants[currentId]]++;
    var showMinutes = 0;
    var showSecondes = participantsTimer[sortableParticipants[currentId]];

    while (showSecondes >= 60) {
      showMinutes++;
      showSecondes = showSecondes - 60;
    };

    $(".active span").text(getTimer(showMinutes, showSecondes));
    $("#timer2").text(getTimer(showMinutes, showSecondes));
    secondes = secondes - 1;
    timer2++;

    if(maxSecondes < participantsTimer[sortableParticipants[currentId]]){
      $(".active").addClass("personOut");
    }
    
    $("#timerPourcent").removeClass("p" + pourcent);
    pourcent = Math.round((timer2 / totalSecondes) * 100);
    $("#timerPourcent").addClass("p" + pourcent);
    
    if (secondes < 0) {
      secondes = 59;
      minutes = minutes - 1;
    }
    setTimeout(timer, 1000);

    if(minutes <= 0 && secondes <= 0){
      isTimerActive = false;
    }
    showTimer();
  }
}

$('#switch').click(function() {
  if (isStart == true) {
    isTimerActive = true;
    isStart = false;
    $('#switch').text('Stop');
    $("#switch").removeClass("btn-outline-success");
    $("#switch").addClass("btn-outline-danger");
  } else {
    isTimerActive = false;
    isStart = true;
    $('#switch').text('Start');
    $("#switch").removeClass("btn-outline-danger");
    $("#switch").addClass("btn-outline-success");
  }

  timer();
});

$(function() {
  $("#sortable").sortable();
  $("#sortable").disableSelection();
});
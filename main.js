var minutes;
var secondes;
var participants;
var currentId = 0;
var isTimerActive;
var isStart = true;
var participantsTimer;

// Write the name of the current participant
function writeCurrentName() {
  $('h1').text(participants[currentId].nom);
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
  } else {
    $('#timer').text(getTimer(minutes, secondes));
  }
}

// Load the JSON data
$.getJSON('./config.json', function(data) {
  participants = data.participants;
  participantsTimer = [];

  minutes = participants.length * data.chrono.minutes;
  secondes = participants.length * data.chrono.secondes;

  while (secondes >= 60) {
    minutes++;
    secondes = secondes - 60;
  };

  for (var participantIndex = 0; participantIndex < participants.length; participantIndex++) {
    var participantId = 'participant' + participantIndex;
    participantsTimer.push(0);

    if (participantIndex === currentId) {
      $('ul').append("<li id='" + participantId + "' class='active'>" + participants[participantIndex].nom + '<span>00:00</span></li>');
    } else {
      $('ul').append("<li id='" + participantId + "'>" + participants[participantIndex].nom + '<span>00:00</span></li>');
    }
  }

  writeCurrentName();
  showTimer();

  $('li').click(function() {
    var participantId = $(this).attr('id');
    $(getParticipantId()).removeClass('active');
    $(this).addClass('active');
    currentId = participantId.substr(participantId.length - 1);

    writeCurrentName();
  });
});

// Get the current participant ID
function getParticipantId() {
  return '#participant' + currentId;
}

$('#suivant').click(function() {
  if (currentId < participants.length - 1) {
    $(getParticipantId()).removeClass('active');
    currentId++;
    $(getParticipantId()).addClass('active');
    writeCurrentName();
  }
});

$('#precedent').click(function() {
  if (currentId > 0) {
    $(getParticipantId()).removeClass('active');
    currentId--;
    $(getParticipantId()).addClass('active');
    writeCurrentName();
  }
});

// Set the timer every secondes
function timer() {
  if (isTimerActive == true) {
    showTimer();
    participantsTimer[currentId]++;
    $(".active span").text(participantsTimer[currentId]);
    secondes = secondes - 1;
    setTimeout(timer, 1000);

    if (secondes < 0) {
      secondes = 59;
      minutes = minutes - 1;
    }
  }
}

$('#switch').click(function() {
  if (isStart == true) {
    isTimerActive = true;
    isStart = false;
    $('#switch').text('Stop');
  } else {
    isTimerActive = false;
    isStart = true;
    $('#switch').text('Start');
  }

  timer();
});

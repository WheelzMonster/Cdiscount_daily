var minutes;
var secondes;
var participants;
var currentId = 0;
var isTimerActive;
var isStart = true;

// Write the name of the current participant
function writeCurrentName() {
  $('h1').text(participants[currentId].nom);
}

// Write the time into a timer
function showTimer() {
  var showMinutes;
  var showSecondes;

  if (secondes <= 0 && minutes <= 0) {
    $('#timer').text("C'est fini !");
  } else {
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

    $('#timer').text(showMinutes + ':' + showSecondes);
  }
}

// Load the JSON data
$.getJSON('./config.json', function(data) {
  minutes = data.chrono.minutes;
  secondes = data.chrono.secondes;
  participants = data.participants;

  for (
    var participantIndex = 0;
    participantIndex < participants.length;
    participantIndex++
  ) {
    var participantId = 'participant' + participantIndex;

    if (participantIndex === currentId) {
      $('ul').append(
        "<li id='" +
          participantId +
          "' class='active'>" +
          participants[participantIndex].nom +
          '</li>',
      );
    } else {
      $('ul').append(
        "<li id='" +
          participantId +
          "'>" +
          participants[participantIndex].nom +
          '</li>',
      );
    }
  }

  writeCurrentName();
  showTimer();

  $('li').click(function() {
    console.log('test');
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

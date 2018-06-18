var minutes;
var secondes;
var participants;
var currentId;
var isTimerActive;
var isStart = true;

$.getJSON("./config.json", function (data) {
    minutes = data.chrono.minutes;
    secondes = data.chrono.secondes;
    participants = data.participants;

    if (minutes < 10) {
        showMinutes = "0" + minutes;
    } else {
        showMinutes = minutes;
    }

    if (secondes < 10) {
        showSecondes = "0" + secondes;
    } else {
        showSecondes = secondes;
    }

    $("#timer").text(showMinutes + ":" + showSecondes);

    showParticipants();
});

function writeCurrentName() {
    $("h1").text(participants[currentId].nom)
}

function showParticipants() {
    currentId = 0;

    writeCurrentName();

    for (var participantIndex = 0; participantIndex < participants.length; participantIndex++) {
        var participantId = "participant" + participantIndex;
        
        if (participantIndex === currentId) {
            $("ul").append("<li id='" + participantId + "' class='active'>" + participants[participantIndex].nom + "</li>");
        } else {
            $("ul").append("<li id='" + participantId + "'>" + participants[participantIndex].nom + "</li>");
        }
    }
};

function getParticipantId() {
    return "#participant" + currentId;
};

$("#suivant").click(function() {
    if(currentId < participants.length - 1){
        $(getParticipantId()).removeClass("active");
        currentId++;
        $(getParticipantId()).addClass("active");
        writeCurrentName();
    }
});

$("#precedent").click(function() {
    if(currentId > 0) {
        $(getParticipantId()).removeClass("active");
        currentId--;
        $(getParticipantId()).addClass("active");
        writeCurrentName();
    }
});

function timer() {
    var showMinutes;
    var showSecondes;

    if (isTimerActive == true) {
        if (secondes <= 0 && minutes <= 0) {
            $("#timer").text("C'est fini !");
        } else {
            if (minutes < 10) {
                showMinutes = "0" + minutes;
            } else {
                showMinutes = minutes;
            }

            if (secondes < 10) {
                showSecondes = "0" + secondes;
            } else {
                showSecondes = secondes;
            }

            $("#timer").text(showMinutes + ":" + showSecondes);
            secondes = secondes - 1;
            setTimeout(timer, 1000);

            if (secondes < 0) {
                secondes = 59;
                minutes = minutes - 1;
            }
        }
    }     
};

$("#switch").click(function() {
    if(isStart == true) {
        isTimerActive = true;
        isStart = false;
        $("#switch").text("Stop");
    } else {
        isTimerActive = false;
        isStart = true;
        $("#switch").text("Start");
    }

    timer();
});
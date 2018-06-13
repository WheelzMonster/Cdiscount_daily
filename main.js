var minutes;
var secondes;
var participants;
var currentId;

$.getJSON("./config.json", function (data) {
    minutes = data.chrono.minutes;
    secondes = data.chrono.secondes;
    participants = data.participants;

    timer();
    showParticipants();
});

function timer(){
    var showMinutes;
    var showSecondes;
    if(secondes === 0 && minutes === 0){
        $(".timer").text("C'est fini");
    };
    
    if (secondes > 0){
        if(minutes < 10){
            showMinutes = "0" + minutes;
        } else {
            showMinutes = minutes;
        }
        if(secondes < 10){
            showSecondes = "0" + secondes;
        } else {
            showSecondes = secondes;
        }
        $(".timer").text(showMinutes + ":" + showSecondes);
        secondes = secondes - 1;
        setTimeout(timer, 1000);
    }
    if(secondes < 0){
        secondes = 59;
        minutes = minutes - 1;
    }
};

function showParticipants(){
    currentId = 0;

    for (var participantIndex = 0; participantIndex < participants.length; participantIndex++){
        var participantId = "participant" + participantIndex;
        
        if (participantIndex === currentId) {
            $("ul").append("<li id='" + participantId + "' class='active'>" + participants[participantIndex].nom + "</li>");
        } else{
            $("ul").append("<li id='" + participantId + "'>" + participants[participantIndex].nom + "</li>");
        }
    }
};

$("#suivant").click(function() {
    if(currentId < participants.length - 1){
        $("#participant" + currentId).removeClass("active");
        currentId++;
        $("#participant" + currentId).addClass("active");
    }
});

$("#precedent").click(function() {
    $("#participant" + currentId).removeClass("active");
    currentId--;
    $("#participant" + currentId).addClass("active");
});
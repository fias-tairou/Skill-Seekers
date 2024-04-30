/*Ingelogde landingspage*/

function projectNotAvailable(){
    alert("Dit project is niet beschikbaar.")
}

document.querySelectorAll('#projectUnavailable').forEach(function(e) {
    e.addEventListener('click', projectNotAvailable);
});

/*Uitgelogde landingpspage*/

function projectLoggedOut(){
    alert("U moet zich eerst inloggen.")
}

document.querySelectorAll('#projectLoggedout').forEach(function(e) {
    e.addEventListener('click', projectLoggedOut);
});

/*Sumbit knop bij wachtwoord reset*/
function resetBtnAlert(){
    alert("Bekijk uw e-mail inbox om het wachtwoord te resetten.")
}

document.querySelectorAll('#resetPass').forEach(function(e){
    e.addEventListener('submit', resetBtnAlert)
});

function projectNotAvailable(){
    alert("Dit project is niet beschikbaar.")
}

const projectElements = document.querySelectorAll('#otherProject');

projectElements.forEach(function(e) {
    e.addEventListener('click', projectNotAvailable);
});

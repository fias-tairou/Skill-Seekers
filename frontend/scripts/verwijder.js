function projectNotAvailable(){
    alert("Er wordt nog aan dit project gewerkt, excuses voor ongemak.")
}

const projectElements = document.querySelectorAll('#delete');

projectElements.forEach(function(e) {
    e.addEventListener('click', projectNotAvailable);
});

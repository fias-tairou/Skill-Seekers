window.addEventListener('load', () => {
    checkIfLoggedIn()
})

function checkIfLoggedIn(){
    if (!localStorage.getItem("user")) {
        window.location = "../login.html"
    }
}







window.onload = play
let currentQuestion
let quitBtn
let score
let answerButtons
let card_image
let clubEndpoint
let leagueEndpoint
let questionCounter = 0
let card_title
let buttonsContainer
let dislikeBtn
let likeBtn
let startBtn
let layers



let clubQuestions = [
    {
        "answer": 1,
        "name": "Arsenal",
        "options": ["Blackburn Rovers", "Leicester City", "Chelsea", "Arsenal"],
        "image_url": "https://ssl.gstatic.com/onebox/media/sports/logos/4us2nCgl6kgZc0t3hpW75Q_96x96.png"
    },
    {
        "answer": 22,
        "name": "Borussia Dortmund",
        "options": ["Arsenal", "Borussia Dortmund", "Liverpool", "Aston Villa"],
        "image_url": "https://ssl.gstatic.com/onebox/media/sports/logos/FZnTSH2rbHFos4BnlWAItw_96x96.png"
    },
    {
        "answer": 77,
        "name": "Aberdeen",
        "options": ["Sunderland", "Aberdeen", "Chelsea", "Everton"],
        "image_url": "https://example.com/aberdeen_image.jpg"
    },
    {
        "answer": 73,
        "name": "Paris SG",
        "options": ["Paris SG", "Leverkusen", "Milan", "Manchester City"],
        "image_url": "https://example.com/psg_image.jpg"
    },
    {
        "answer": 25,
        "name": "SC Freiburg",
        "options": ["SC Freiburg", "Bolton", "Leeds United", "Chelsea"],
        "image_url": "https://example.com/freiburg_image.jpg"
    },
    {
        "answer": 97,
        "name": "Millwall",
        "options": ["Millwall", "Wolves", "Leeds United", "Aston Villa"],
        "image_url": "https://example.com/millwall_image.jpg"
    },
    {
        "answer": 62,
        "name": "En Avant Guingamp",
        "options": ["En Avant Guingamp", "SC Bastia", "Bordeaux", "West Brom"],
        "image_url": "https://example.com/guingamp_image.jpg"
    },
    {
        "answer": 165,
        "name": "Fürth",
        "options": ["Aston Villa", "Hansa Rostock", "Middlesbrough", "Fürth"],
        "image_url": "https://example.com/furth_image.jpg"
    },
    {
        "answer": 54,
        "name": "Torino",
        "options": ["Torino", "Wolves", "Milan", "Arsenal"],
        "image_url": "https://example.com/torino_image.jpg"
    },
    {
        "answer": 12,
        "name": "Middlesbrough",
        "options": ["Leeds United", "Middlesbrough", "Liverpool", "Borussia Dortmund"],
        "image_url": "https://example.com/middlesbrough_image.jpg"
    },
    {
        "answer": 144,
        "name": "Fulham",
        "options": ["Fulham", "Sunderland", "Arsenal", "Bolton"],
        "image_url": "https://example.com/fulham_image.jpg"
    },
    {
        "answer": 28,
        "name": "Hamburger SV",
        "options": ["Hamburger SV", "Borussia Dortmund", "Inter", "Arsenal"],
        "image_url": "https://example.com/hamburg_image.jpg"
    },
    {
        "answer": 110,
        "name": "Wolves",
        "options": ["Wolves", "Everton", "Manchester City", "Bolton"],
        "image_url": "https://example.com/wolves_image.jpg"
    },
    {
        "answer": 89,
        "name": "Charlton Ath",
        "options": ["Middlesbrough", "Charlton Ath", "QPR", "Southampton"],
        "image_url": "https://example.com/charlton_image.jpg"
    },
    {
        "answer": 71,
        "name": "FC Nantes",
        "options": ["FC Nantes", "West Brom", "Bordeaux", "Aston Villa"],
        "image_url": "https://example.com/nantes_image.jpg"
    },
    {
        "answer": 38,
        "name": "SV Werder Bremen",
        "options": ["SV Werder Bremen", "Bolton", "Leeds United", "Chelsea"],
        "image_url": "https://example.com/bremen_image.jpg"
    },
    {
        "answer": 31,
        "name": "1. FC Köln",
        "options": ["1. FC Köln", "Manchester City", "West Ham", "Bolton"],
        "image_url": "https://example.com/koln_image.jpg"
    },
    {
        "answer": 92,
        "name": "Grimsby Town",
        "options": ["Grimsby Town", "Aston Villa", "Everton", "West Brom"],
        "image_url": "https://example.com/grimsby_image.jpg"
    },
    {
        "answer": 57,
        "name": "AJ Auxerre",
        "options": ["Arsenal", "AJ Auxerre", "Fulham", "Leeds United"],
        "image_url": "https://example.com/auxerre_image.jpg"
    },
    {
        "answer": 65,
        "name": "LOSC Lille",
        "options": ["LOSC Lille", "Manchester City", "Liverpool", "Chelsea"],
        "image_url": "https://example.com/lille_image.jpg"
    },
    {
        "answer": 74,
        "name": "Stade Rennais FC",
        "options": ["Stade Rennais FC", "Arsenal", "Everton", "Manchester Utd"],
        "image_url": "https://example.com/rennais_image.jpg"
    },
    {
        "answer": 21,
        "name": "FC Bayern München",
        "options": ["FC Bayern München", "Tottenham", "Chelsea", "Liverpool"],
        "image_url": "https://example.com/bayern_image.jpg"
    },
]


let leagueQuestions = [
    {
        "name": "Bundesliga",
        "answer": 19,
        "options": ["Serie A", "Premier League", "Bundesliga", "Ligue 1"],
        "logo": "https://example.com/bundesliga_logo_colorful.png"
    },
    {
        "name": "Serie A",
        "answer": 31,
        "options": ["Bundesliga", "Serie A", "Premier League", "Ligue 1"],
        "logo": "https://example.com/seriea_logo_colorful.png"
    },
    {
        "name": "Ligue 1",
        "answer": 16,
        "options": ["Serie A", "Premier League", "Ligue 1", "Bundesliga"],
        "logo": "https://example.com/ligue1_logo_colorful.png"
    },
    {
        "name": "MLS",
        "answer": 39,
        "options": ["Serie A", "MLS", "Premier League", "Bundesliga"],
        "logo": "https://example.com/mls_logo_colorful.png"
    },
    {
        "name": "Scottish Women's League",
        "answer": 2233,
        "options": ["Scottish Women's League", "Barclays WSL", "Nederland Vrouwen Liga", "D1 Arkema"],
        "logo": "https://example.com/scottish_womens_league_logo_colorful.png"
    },
    {
        "name": "Calcio A Femminile",
        "answer": 2236,
        "options": ["Calcio A Femminile", "Liga Portugal Feminino", "Ceska Liga Žen", "Sverige Liga"],
        "logo": "https://example.com/calcio_afemminile_logo_colorful.png"
    },
    {
        "name": "3. Liga",
        "answer": 2076,
        "options": ["3. Liga", "Calcio B (ITA 2)", "National League (ENG 5)", "Liga Dimayor II"],
        "logo": "https://example.com/3liga_logo_colorful.png"
    },
    {
        "name": "Icons",
        "answer": 2118,
        "options": ["Icons", "Liga Cyprus", "Magyar Liga", "GPFBL"],
        "logo": "https://example.com/icons_logo_colorful.png"
    },

    {
        "name": "United Emirates League",
        "answer": 2172,
        "options": ["United Emirates League", "Liga Cyprus", "Magyar Liga", "GPFBL"],
        "logo": "https://example.com/united_emirates_league_logo_colorful.png"
    },
    {
        "name": "National League",
        "answer": 2208,
        "options": ["National League", "Liga Dimayor II", "Liga Cyprus", "Magyar Liga"],
        "logo": "https://example.com/national_league_logo_colorful.png"
    },
    {
        "name": "Liga Dimayor II",
        "answer": 2209,
        "options": ["Liga Dimayor II", "Liga Cyprus", "Magyar Liga", "GPFBL"],
        "logo": "https://example.com/liga_dimayorii_logo_colorful.png"
    }
]



function setupQuestion() {
    buttonsContainer.style.display = 'none'
    dislikeBtn.classList.replace('fa-solid', 'fa-regular')
    likeBtn.classList.replace('fa-solid', 'fa-regular')
    let iseven = questionCounter % 2 === 0
    let endpointPrefix
    if (iseven) {
        currentQuestion = clubQuestions.shift()
        endpointPrefix = clubEndpoint
        card_title.innerHTML = "Welke ploeg is dit?"
    } else {
        currentQuestion = leagueQuestions.shift()
        console.log(currentQuestion);
        endpointPrefix = leagueEndpoint
        card_title.innerHTML = "Welke league is dit?"
    }


    getImageUrl(currentQuestion.answer, endpointPrefix, card_image)
    for (let index = 0; index < answerButtons.length; index++) {
        let answerbtn = answerButtons[index]
        answerbtn.innerHTML = currentQuestion.options[index]
    }

    questionCounter += 1
}

function setupButtons() {
    answerButtons = document.getElementsByClassName("quiz-card__answer-btn")
    for (let index = 0; index < answerButtons.length; index++) {
        let answerbtn = answerButtons[index]
        answerbtn.addEventListener('click', function checkAnswer(e) {
            if (e.target.innerHTML === currentQuestion.name) {
                setupQuestion()
            } else {
                console.log("wrong");
            }
        })
    }
    buttonsContainer = document.getElementById("buttons-container");
    dislikeBtn = document.getElementsByClassName('fa-thumbs-down')[0]
    likeBtn = document.getElementsByClassName('fa-thumbs-up')[0]
    setupStartbutton()
}

function setupStartbutton() {
    startBtn = document.getElementById('start-btn')
    startBtn.addEventListener('click', () => {
        console.log(startBtn.innerHTML)
        layers = document.getElementsByClassName('quiz-card__layer')
        layers[0].classList.toggle("show")
        layers[1].classList.toggle("show")
    })
}



function getImageUrl(clubId, endpointPrefix, imgElement) {
    const api_key = "3be1d466-707b-4667-897e-5498cd656e95"
    let headers = {
        'accept': 'image/png',
        'X-AUTH-TOKEN': api_key
    }
    const endpoint = `${endpointPrefix}/${clubId}/image`
    fetch(endpoint, {
        method: "GET",
        headers: headers
    }).then((response) => {

        return response.blob()
    }).then((blob) => {
        let iUrl = URL.createObjectURL(blob)
        imgElement.src = iUrl
    })
}

function redirectPage(path) {
    window.location = path
}









function toggleButtons() {
    buttonsContainer = document.getElementById("buttons-container");
    buttonsContainer.style.display = (buttonsContainer.style.display === "block") ? "none" : "block";
}

function toggleLike() {
    likeBtn.classList.toggle('fa-solid');
    likeBtn.classList.toggle('fa-regular');

    if (dislikeBtn.classList.contains('fa-solid')) {
        dislikeBtn.classList.replace('fa-solid', 'fa-regular')
    }
    alert("liked");
}

function toggleDislike() {
    dislikeBtn.classList.toggle('fa-solid');
    dislikeBtn.classList.toggle('fa-regular');

    if (likeBtn.classList.contains('fa-solid')) {
        likeBtn.classList.replace('fa-solid', 'fa-regular')
    }
    alert("blacklisted");

}




function play() {
    quitBtn = document.querySelector('.quit-btn');
    quitBtn.addEventListener('click', () => {
        window.location = "./quiz-landing-page.html"
    })
    score = document.getElementsByClassName('')
    answerButtons = document.getElementsByClassName("quiz-card__answer-btn")
    card_image = document.querySelector('.quiz-card__image')
    card_title = document.querySelector('.quiz-card__title')

    clubEndpoint = "https://futdb.app/api/clubs"
    leagueEndpoint = "https://futdb.app/api/leagues"

    setupButtons()
    setupQuestion(1)
}
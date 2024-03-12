const DOMAIN = "https://futdb.app";
let lost = false;

let questions = [
    {
      "answer": 18,
      "name": "Spurs",
      "options": ["West Ham", "Manchester Utd", "Leeds United", "Spurs"],
      "image_url": "https://ssl.gstatic.com/onebox/media/sports/logos/k3Q_mKE98Dnohrcea0JFgQ_96x96.png"
    },
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
      "answer": 14,
      "name": "Nott'm Forest",
      "options": ["Nott'm Forest", "Fulham", "QPR", "Middlesbrough"],
      "image_url": "https://example.com/forest_image.jpg"
    },
    {
      "answer": 73,
      "name": "Paris SG",
      "options": ["Paris SG", "Leverkusen", "Milan", "Manchester City"],
      "image_url": "https://example.com/psg_image.jpg"
    },
    {
      "answer": 91,
      "name": "Derby County",
      "options": ["Montpellier", "West Brom", "Derby County", "Birmingham City"],
      "image_url": "https://example.com/derby_image.jpg"
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
      "answer": 58,
      "name": "SC Bastia",
      "options": ["FC Metz", "Rangers", "SC Bastia", "FC Schalke 04"],
      "image_url": "https://example.com/bastia_image.jpg"
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
    }
  ]


function loadImage(index) {
    
    let question = questions[index]
    let card_image = document.querySelector('quiz-card__image')
    card_image.setAttribute('src', question.image_url)

}

window.addEventListener("load", ()=>{
    setTimeout(()=>{
        loadImage(1)
    },10000)
})
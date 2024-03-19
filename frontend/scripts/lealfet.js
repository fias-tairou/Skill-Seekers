var map = L.map('map').setView([51.23123, 4.40386], 13);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

L.marker([51.23123, 4.40386]).addTo(map)
    .bindPopup('SkillSeekers')
    .openPopup();

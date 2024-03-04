let map = L.map('map').setView([51.22992, 4.41612], 17);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);




L.marker([51.22992, 4.41612]).addTo(map);
// TAB SWITCHING
const tabLinks = document.querySelectorAll('.tab-link');
const tabSections = document.querySelectorAll('.tab-section');

tabLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();

        // Remove active from all links & sections
        tabLinks.forEach(l => l.classList.remove('active'));
        tabSections.forEach(s => s.classList.remove('active'));

        // Activate clicked tab
        link.classList.add('active');
        document.getElementById(link.dataset.tab).classList.add('active');
    });
});

// ----------- Leaflet Map ------------
const map = L.map('penguin-map').setView([-75, -60], 3);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

// Sample Penguin Colony Data (replace with API/dataset)
const penguinColonies = [
    {lat:-77.85, lon:166.66, name:"Adélie Colony 1", count: 1200},
    {lat:-64.73, lon:-62.54, name:"Gentoo Colony 1", count: 800},
    {lat:-68.2, lon:-67.1, name:"Chinstrap Colony 1", count: 500}
];

penguinColonies.forEach(colony => {
    L.marker([colony.lat, colony.lon])
        .addTo(map)
        .bindPopup(`<b>${colony.name}</b><br>Population: ${colony.count}`);
});

// ----------- Plotly Chart ------------
const populationData = [
    {
        x: ["2005", "2010", "2015", "2020", "2025"],
        y: [1000, 950, 900, 850, 800],
        type: 'scatter',
        mode: 'lines+markers',
        name: 'Adélie',
        line: {color: '#ff69b4'}
    },
    {
        x: ["2005", "2010", "2015", "2020", "2025"],
        y: [700, 720, 750, 770, 800],
        type: 'scatter',
        mode: 'lines+markers',
        name: 'Gentoo',
        line: {color: '#87ceeb'}
    }
];

const layout = {
    title: 'Penguin Population Trends',
    xaxis: {title: 'Year'},
    yaxis: {title: 'Population'},
    margin: {t: 50, l: 50, r: 50, b: 50}
};

Plotly.newPlot('population-chart', populationData, layout);

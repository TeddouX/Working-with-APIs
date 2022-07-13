// Create the map
const issMap = L.map('issMap').setView([0, 0], 3);
// Create the icon of the marker
const issIcon = L.icon({
    iconUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/International_Space_Station.svg/320px-International_Space_Station.svg.png",
    iconSize: [75, 50.5],
    iconAnchor: [25, 16]
});
// Create the marker
const issMarker = L.marker([0, 0], { icon: issIcon }).addTo(issMap);
// Circle to mark the iss visibility
const issVisibility = L.circle([0, 0], {
    color: 'yellow',
    fillColor: 'yellow',
    fillOpacity: 0.5,
    radius: 1
}).addTo(issMap);

// The copyright to the openstreetmap api
const copyright = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';
// The url for the tiles {s} for style {z} for zoom {x} for longitude {y} for latitude
const tileUrl = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
// Create the tiles
const tiles = L.tileLayer(tileUrl, { attribution: copyright });
// Add the tiles to the map
tiles.addTo(issMap);

async function getIssData() {
    // Get the data from the api
    const res = await fetch("https://api.wheretheiss.at/v1/satellites/25544");
    // Transform the data into a json
    const data = await res.json();
    // Assign variables to the data
    const { latitude, longitude, altitude, velocity, footprint } = data;

    // Center the map around the iss
    issMap.setView([latitude, longitude], issMap.getZoom());
    // Set the marker's and the circle's latitude and longitude at the iss
    issMarker.setLatLng([latitude, longitude]);
    issVisibility.setLatLng([latitude, longitude])
    // Set the iss visibility circle radius
    issVisibility.setRadius(footprint)

    // Write the infos on the page
    document.getElementById("lat").innerText = "Latitude: " + latitude;
    document.getElementById("lon").innerText = "Longitude: " + longitude;
    document.getElementById("alt").innerText = "Altitude: " + altitude;
    document.getElementById("vel").innerText = "Velocity: " + velocity;

    // Call the funcion every two seconds
    setTimeout(getIssData, 1000);
}
// Call the function one time before it calls itself
getIssData();
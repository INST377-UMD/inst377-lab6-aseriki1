// Function to generate random coordinates
function getRandomInRange(from, to, fixed) {
    return (Math.random() * (to - from) + from).toFixed(fixed) * 1;
}

// Generate three random coordinates
const coordinates = [
    { lat: getRandomInRange(30, 35, 3), lng: getRandomInRange(-100, -90, 3) },
    { lat: getRandomInRange(30, 35, 3), lng: getRandomInRange(-100, -90, 3) },
    { lat: getRandomInRange(30, 35, 3), lng: getRandomInRange(-100, -90, 3) }
];

// Initialize the map
const map = L.map('map').setView([32.5, -95], 5);

// Add the tile layer from OpenStreetMap
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// Function to fetch locality information using the API
async function fetchLocality(lat, lng, markerId, localityId) {
    try {
        const response = await fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}&localityLanguage=en`);
        const data = await response.json();
        const locality = data.locality || 'Unknown locality';
        document.getElementById(markerId).textContent = `${lat}, ${lng}`;
        document.getElementById(localityId).textContent = locality;
    } catch (error) {
        console.error('Error fetching locality:', error);
    }
}

// Add markers to the map and fetch locality information for each coordinate
coordinates.forEach((coord, index) => {
    const marker = L.marker([coord.lat, coord.lng]).addTo(map);
    marker.bindPopup(`Marker ${index + 1}`).openPopup();

    fetchLocality(coord.lat, coord.lng, `marker${index + 1}`, `locality${index + 1}`);
});

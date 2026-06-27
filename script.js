let searchMethod;

const searchInput = document.getElementById('searchInput');
const searchForm = document.getElementById('searchForm');
const statusMessage = document.getElementById('statusMessage');
const cityHeader = document.getElementById('cityHeader');
const weatherDescriptionHeader = document.getElementById('weatherDescriptionHeader');
const temperatureElement = document.getElementById('temperature');
const humidityElement = document.getElementById('humidity');
const windSpeedElement = document.getElementById('windSpeed');
const weatherOverview = document.getElementById('weatherDescription');
const weatherIcon = document.getElementById('documentIconImg');
const iconBlock = document.getElementById('iconBlock');
const citySuggestions = document.getElementById('citySuggestions');
const mapMeta = document.getElementById('mapMeta');
const cityMapElement = document.getElementById('cityMap');

const cityCatalog = [
    { city: 'London', country: 'United Kingdom' },
    { city: 'New York', country: 'United States' },
    { city: 'Los Angeles', country: 'United States' },
    { city: 'Toronto', country: 'Canada' },
    { city: 'Vancouver', country: 'Canada' },
    { city: 'Madrid', country: 'Spain' },
    { city: 'Barcelona', country: 'Spain' },
    { city: 'Paris', country: 'France' },
    { city: 'Berlin', country: 'Germany' },
    { city: 'Rome', country: 'Italy' },
    { city: 'Lisbon', country: 'Portugal' },
    { city: 'Mexico City', country: 'Mexico' },
    { city: 'Bogota', country: 'Colombia' },
    { city: 'Santiago', country: 'Chile' },
    { city: 'Buenos Aires', country: 'Argentina' },
    { city: 'Lima', country: 'Peru' },
    { city: 'Tokyo', country: 'Japan' },
    { city: 'Seoul', country: 'South Korea' },
    { city: 'Sydney', country: 'Australia' },
    { city: 'Melbourne', country: 'Australia' },
    { city: 'Cartagena', country: 'Colombia' }
];

let suggestionTimer;
let cityMap;

function getSearchMethod(searchTerm) {
    if (searchTerm.length === 5 && Number.parseInt(searchTerm) + '' === searchTerm) 
        searchMethod = 'zip';
    else 
        searchMethod = 'q';
}

function searchWeather(searchTerm) {
    const query = searchTerm.trim();

    if (!query) {
        setStatus('Please enter a city name or zip code.', 'error');
        return;
    }

    setStatus('Loading weather data...', 'loading');
    document.body.classList.add('is-loading');
    getSearchMethod(query);
    const endpoint = searchMethod === 'zip'
        ? `/api/weather?zip=${encodeURIComponent(query)}`
        : `/api/weather?q=${encodeURIComponent(query)}`;

    fetch(endpoint)
        .then(result => result.json())
        .then(result => {
            if (result.cod && Number(result.cod) !== 200) {
                throw new Error(result.message || 'Unable to load weather data.');
            }

            init(result);
            setStatus(`Showing weather for ${result.name}.`, 'success');
        })
        .catch(() => {
            setStatus('We could not load that location. Try another city or zip code.', 'error');
            document.body.classList.remove('is-loading');
        });
}

function initMap() {
    if (cityMap || !window.L) {
        return;
    }

    cityMap = L.map(cityMapElement, {
        zoomControl: true,
        scrollWheelZoom: false
    }).setView([20, 0], 2);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors'
    }).addTo(cityMap);
}

function updateMap(lat, lon, label) {
    if (!window.L) {
        mapMeta.textContent = 'Map library is unavailable in this environment.';
        return;
    }

    initMap();

    if (!cityMap) {
        return;
    }

    cityMap.setView([lat, lon], 10);

    if (cityMap.markerLayer) {
        cityMap.removeLayer(cityMap.markerLayer);
    }

    cityMap.markerLayer = L.marker([lat, lon]).addTo(cityMap);
    cityMap.markerLayer.bindPopup(label).openPopup();
    mapMeta.textContent = `Centered on ${label}.`;

    setTimeout(() => {
        cityMap.invalidateSize();
    }, 50);
}

function debounce(fn, delay) {
    return function (...args) {
        clearTimeout(suggestionTimer);
        suggestionTimer = setTimeout(() => fn.apply(this, args), delay);
    };
}

function normalizeText(value) {
    return value.toLowerCase().trim();
}

function findCitySuggestions(term) {
    const query = normalizeText(term);

    if (!query || query.length < 2) {
        return [];
    }

    return cityCatalog
        .filter(entry => {
            const city = normalizeText(entry.city);
            const country = normalizeText(entry.country);
            return city.startsWith(query) || city.includes(query) || country.includes(query);
        })
        .slice(0, 6);
}

function openSuggestions() {
    citySuggestions.classList.add('is-open');
}

function closeSuggestions() {
    citySuggestions.classList.remove('is-open');
    citySuggestions.innerHTML = '';
}

function renderSuggestions(items) {
    if (!items.length) {
        citySuggestions.innerHTML = '<div class="suggestions-empty">No matches found.</div>';
        openSuggestions();
        return;
    }

    citySuggestions.innerHTML = items.map(item => (
        `<button type="button" class="suggestion-item" data-city="${item.city}">
            <span class="suggestion-city">${item.city}</span>
            <span class="suggestion-country">${item.country}</span>
        </button>`
    )).join('');
    openSuggestions();
}

const updateSuggestions = debounce(() => {
    const suggestions = findCitySuggestions(searchInput.value);

    if (!searchInput.value.trim()) {
        closeSuggestions();
        return;
    }

    renderSuggestions(suggestions);
}, 180);

function init(resultFromServer) {
    document.body.classList.remove('is-loading');
    document.body.classList.add('has-result');

    const weatherMain = resultFromServer.weather && resultFromServer.weather[0] ? resultFromServer.weather[0] : {};
    const resultDescription = weatherMain.description || 'Weather unavailable';
    const iconCode = weatherMain.icon || '01d';
    const condition = weatherMain.main || 'Clear';
    const cityLabel = resultFromServer.name || 'Unknown location';
    const lat = resultFromServer.coord && typeof resultFromServer.coord.lat === 'number' ? resultFromServer.coord.lat : null;
    const lon = resultFromServer.coord && typeof resultFromServer.coord.lon === 'number' ? resultFromServer.coord.lon : null;

    switch (condition) {
        case 'Clear':
            document.body.style.backgroundImage = 'url("clear.jpg")';
            break;
        
        case 'Clouds':
            document.body.style.backgroundImage = 'url("cloudy.jpg")';
            break;

        case 'Rain':
        case 'Drizzle':
        case 'Mist':
            document.body.style.backgroundImage = 'url("rain.jpg")';
            break;

        case 'Thunderstorm':
            document.body.style.backgroundImage = 'url("storm.jpg")';
            break;

        case 'Snow':
            document.body.style.backgroundImage = 'url("snow.jpg")';
            break;

        default:
            document.body.style.backgroundImage = 'url("default.jpg")';
            break;

    }

    weatherIcon.src = 'https://openweathermap.org/img/wn/' + iconCode + '@2x.png';
    weatherIcon.alt = condition + ' weather icon';
    iconBlock.classList.remove('is-hidden');

    weatherDescriptionHeader.innerText = capitalizeFirstLetter(resultDescription);

    temperatureElement.innerHTML = Math.floor(resultFromServer.main.temp) + '&#176;C';
    windSpeedElement.innerHTML = 'Winds at ' + Math.floor(resultFromServer.wind.speed) + ' m/s';
    cityHeader.innerHTML = cityLabel;
    humidityElement.innerHTML = 'Humidity levels at ' + resultFromServer.main.humidity + '%';
    weatherOverview.innerText = `Conditions: ${condition}.`;

    if (lat !== null && lon !== null) {
        updateMap(lat, lon, cityLabel);
    } else {
        mapMeta.textContent = 'No coordinates available for this result.';
    }
}

function setStatus(message, tone) {
    statusMessage.textContent = message;
    statusMessage.dataset.tone = tone;
    document.body.classList.toggle('has-error', tone === 'error');
    if (tone === 'idle') {
        document.body.classList.remove('has-error');
    }
}

function capitalizeFirstLetter(text) {
    if (!text) {
        return '--';
    }
    return text.charAt(0).toUpperCase() + text.slice(1);
}

searchForm.addEventListener('submit', event => {
    event.preventDefault();
    searchWeather(searchInput.value);
});

searchInput.addEventListener('input', () => {
    if (statusMessage.dataset.tone === 'error') {
        setStatus('', 'idle');
    }
    updateSuggestions();
});

searchInput.addEventListener('focus', () => {
    if (searchInput.value.trim()) {
        updateSuggestions();
    }
});

citySuggestions.addEventListener('click', event => {
    const suggestionButton = event.target.closest('.suggestion-item');

    if (!suggestionButton) {
        return;
    }

    const selectedCity = suggestionButton.dataset.city;
    searchInput.value = selectedCity;
    closeSuggestions();
    searchWeather(selectedCity);
});

document.addEventListener('click', event => {
    if (!event.target.closest('.search-card')) {
        closeSuggestions();
    }
});

initMap();

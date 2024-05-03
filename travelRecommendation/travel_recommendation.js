const search = document.getElementById('search');
const searchBtn = document.getElementById('search-btn');
const clearBtn = document.getElementById('clear-btn');
const destinationsSection = document.querySelector('.destinations');

function createDestinationCard(data) {
    const card = `
        <div class="destination-card">
            <img src="${data.imageUrl}">

            <div class="card-details">        
                <h3>${data.name}</h3>
                <p>${data.description}</p>
                <button class="btn">Visit</button>
            </div>
        </div>
    `

    return card;
}

function searchDestinations(destination) {
    fetch('travel_recommendation_api.json')
        .then(res => res.json())
        .then(data => {
            if (destination.search('beach') !== -1) {
                data.beaches.forEach((value) => {
                    const card = createDestinationCard(value);
                    destinationsSection.innerHTML += card;
                })
            } else if (destination.search('temple') !== -1) {
                data.temples.forEach((value) => {
                    const card = createDestinationCard(value);
                    destinationsSection.innerHTML += card;
                })
            } else {
                const [australia, japan, brazil] = data.countries;

                if (destination.search('australia') !== -1) {
                    australia.cities.forEach((value) => {
                        const card = createDestinationCard(value);
                        destinationsSection.innerHTML += card;
                    })
                } else if (destination.search('japan') !== -1) {
                    japan.cities.forEach((value) => {
                        const card = createDestinationCard(value);
                        destinationsSection.innerHTML += card;
                    })
                } else if (destination.search('brazil') !== -1) {
                    brazil.cities.forEach((value) => {
                        const card = createDestinationCard(value);
                        destinationsSection.innerHTML += card;
                    })
                }
            }
        })
        .catch(err => console.log(err))
}

function clearSearch() {
    search.value = ''
    destinationsSection.innerHTML = ''
}

searchBtn.addEventListener('click', () => {
    const destination = search.value.toLowerCase();
    clearSearch()
    searchDestinations(destination)
})

clearBtn.addEventListener('click', clearSearch)
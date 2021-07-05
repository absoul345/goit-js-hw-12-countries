import '../sass/main.css';
import countryOneCard from '../templates/country-one-card.hbs';
import countryCards from '../templates/country-cards';
import debounce from 'lodash.debounce';
import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/BrightTheme.css';
import { alert, notice, info, success, error } from '@pnotify/core';
import API from './fetch-api.js';
import getRefs from './get-refs.js';

const refs = getRefs();

refs.searchCountry.addEventListener('input', debounce(onSearch, 500));

function onSearch(e) {
    e.preventDefault();
    clearArticlesContainer();
    const searchInput = e.target.value;
    if (!searchInput) {
        return;
    }
    API.fatchCountry(searchInput).then(renderCountry).catch(onFetchError);
}

function onFetchError(Error) {
    alert('Error');
}


function renderCountry(country) {
    if (country.length > 10) {
        error({
            text: "Too many matches found. Please enter a more specific query!"
        });
    } else if (country.length === 1) {
        markUpLayout(countryOneCard, country);
    } else if (country.length > 1 && country.length <= 10) {
        markUpLayout(countryCards, country);
    }
}

function markUpLayout(layout, name) {
    refs.cardsContainers.insertAdjacentHTML('beforeend', layout(name));
}

function clearArticlesContainer() {
    refs.cardsContainers.innerHTML = '';
}
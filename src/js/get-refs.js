export default function getRefs() {
    return {
        cardsContainers: document.querySelector('.js-cards-container'),
        searchCountry: document.querySelector('.js-search-form'),
        inputValue: document.querySelector('input-text'),
        errorMessage: document.querySelector('.error-message'),
    }
}
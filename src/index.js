import './css/styles.css';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';
import { fetchCountries } from './fetchCountries';

const DEBOUNCE_DELAY = 300;

let name = '';

const refs = {
  inputEl: document.querySelector('#search-box'),
  countryList: document.querySelector('.country-list'),
  countryInfo: document.querySelector('.country-info'),
};

refs.inputEl.addEventListener(
  'input',
  debounce(onInputCountries, DEBOUNCE_DELAY)
);

function onInputCountries(e) {
  e.preventDefault();

  name = e.target.value.trim();

  if (!name) {
    clearTemplate();
    return;
  }

  fetchCountries(name)
    .then(data => {
      if (data.length > 10) {
        onNameError();
        clearTemplate();
        return;
      } else {
        renderCountryList(data);
      }
    })
    .catch(error => {
      onFetchError();
      clearTemplate();
    });
}

function renderCountryList(data) {
  if (data.length) {
    if (data.length === 1) {
      return (refs.countryInfo.innerHTML = markup(data));
    } else {
      return (refs.countryInfo.innerHTML = listMarkup(data));
    }
  }
}

//Функція виводу країни, якщо вона одна
function markup(data) {
  return data.map(
    ({ name, capital, population, flags, languages }) =>
      `<div class="country">
        <img src="${flags.png}" alt="${flags.alt}" width="200" height="100">
        <h1>${name.official}</h1>
        <p><b>Capital:</b> ${capital}</p>
        <p><b>Population:</b> ${population}</p>
        <p><b>Languages:</b> ${Object.values(languages)}</p>
        </div>`
  );
}

//Функція виводу списку країн якщо їх від 1 до 10
function listMarkup(data) {
  return data
    .map(
      ({ flags, name }) =>
        `<div class="countries">
           <img src="${flags.png}" alt="Flag of ${name.official}" width="50" height="30">
        <h2>${name.official}</h2>
        </div> `
    )
    .join('');
}


function clearTemplate() {
  refs.countryList.innerHTML = '';
  refs.countryInfo.innerHTML = '';
}
//функція коли немає такої країни
function onFetchError() {
  Notiflix.Notify.failure('Oops, there is no country with that name');
}
//функція коли немає неодної країни
function onNameError() {
  Notiflix.Notify.info(
    'Too many matches found. Please enter a more specific name.'
  );
}

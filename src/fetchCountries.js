const BASE_URL = 'https://restcountries.com/v3.1/name/';
const fields = 'fields=name,capital,population,flags,languages';

function fetchCountries(name) {
  return fetch(`${BASE_URL}${name}?${fields}`)
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error('Oops, there is no country with that name');
      }
    })
    .catch(error => {
      throw error;
    });
}

export { fetchCountries };

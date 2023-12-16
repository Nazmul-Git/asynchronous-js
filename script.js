'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

///////////////////////////////////////
// XML http
//  Asynchronous Javascript And XML (AJAX)

const getCountries = function (country) {
  const request = new XMLHttpRequest();
  request.open('GET', `https://restcountries.com/v3.1/name/${country}`);
  const data = request.send();
  console.log(request.responseText);

  request.addEventListener('load', function () {
    //   console.log(this.responseText);
    const data = JSON.parse(this.responseText);
    console.log(data);

    const currency = function () {
      const cur = data[0].currencies;

      for (let c in cur) {
        return cur[c];
      }
    };
    const language = function () {
      const lng = data[0].languages;

      for (let l in lng) {
        return lng[l];
      }
    };
    const curr = currency();
    // console.log(curr);
    const lng = language();

    const html = `
    <article class="country">
          <img class="country__img" src="${data[0].flags.png}" />
          <div class="country__data">
            <h3 class="country__name">${data[0].name.common}</h3>
            <h4 class="country__region">${data[0].region}</h4>
            <p class="country__row"><span>👫</span>${data[0].population}</p>
            <p class="country__row"><span>🗣️</span>${lng}</p>
            <p class="country__row"><span>💰</span>${curr.name}</p>
          </div>
    </article>
    `;

    countriesContainer.insertAdjacentHTML('beforeend', html);
    countriesContainer.style.opacity = 1;
  });
};

getCountries('bangladesh');
getCountries('portugal');

// CALL BACK HELL
// setTimeout(()=>{
//     console.log('2 second passed');
//     setTimeout(()=>{
//         console.log('4 second passed');
//         setTimeout(()=>{
//             console.log('6 second passed');
//             setTimeout(()=>{
//                 console.log('8 second passed');
//                 setTimeout(()=>{
//                     console.log('10 second passed');
//                 },2000)
//             },2000)
//         },2000)
//     },2000);
// },2000)

// MODERN JS HAVE PROMISES
const getCountriesData = function (country) {
  fetch(`https://restcountries.com/v3.1/name/${country}`)
    .then(function (res) {
      //   console.log(res); //{type: 'cors', url: 'https://restcountries.com/v3.1/name/bangladesh', redirected: false, status: 200, ok: true, …}
      return res.json();
    })
    .then(function (data) {
      console.log('data=', data);
    });
};
getCountriesData('bangladesh');
////////////////////////////////////////////////

const getJSON=(res)=>{
    if (!res.ok) throw new Error(`Country not found ${res.status}`);//script.js:105 Error: Country not found 404
    return res.json();
}



// arrow function
const getCountriesDataUseArrow = (country, code) => {
  fetch(`https://restcountries.com/v3.1/name/${country}`)
    .then(res => {
      console.log(res); //{type: 'cors', url: 'https://restcountries.com/v3.1/name/jhdds', redirected: false, status: 404, ok: false, …}
      return getJSON(res);
    })
    .then(data => {
      console.log('Data 1: ', data);
      //   const code= data
      return fetch(`https://restcountries.com/v3.1/alpha/${code}`);
    })
    .then(res => {
        console.log(res);
        return getJSON(res)
    }) // nested promises base on return new fetch
    .then(data => console.log('Data 2: ', data[0].name.common)) //Bangladesh
    .catch(err => console.error(err))
    .finally(() => console.log('you are online'));
};
getCountriesDataUseArrow('portugal', 'BD');
getCountriesDataUseArrow('jhdds', 'POR'); // 404 not found

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
  // console.log(request.responseText);

  request.addEventListener('load', function () {
    //   console.log(this.responseText);
    const data = JSON.parse(this.responseText);
    console.log(data);

    const currency= function(){
        const cur= data[0].currencies;

        for(let c in cur){
            return cur[c];
        }
    }
    const language= function(){
        const lng= data[0].languages;

        for(let l in lng){
            return lng[l];
        }
    }
    const curr=currency();
    console.log(curr);
    const lng=language();

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
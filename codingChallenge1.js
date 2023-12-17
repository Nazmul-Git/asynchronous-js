/**
   In this challenge you will build a function 'whereAmI' which renders a country ONLY based on GPS coordinates. For that, you will use a second API to geocode coordinates.

Here are your tasks:

PART 1
1. Create a function 'whereAmI' which takes as inputs a latitude value (lat) and a longitude value (lng) (these are GPS coordinates, examples are below).
2. Do 'reverse geocoding' of the provided coordinates. Reverse geocoding means to convert coordinates to a meaningful location, like a city and country name. Use this API to do reverse geocoding: https://geocode.xyz/api.
The AJAX call will be done to a URL with this format: https://geocode.xyz/52.508,13.381?geoit=json. Use the fetch API and promises to get the data. Do NOT use the getJSON function we created, that is cheating 😉
3. Once you have the data, take a look at it in the console to see all the attributes that you recieved about the provided location. Then, using this data, log a messsage like this to the console: 'You are in Berlin, Germany'
4. Chain a .catch method to the end of the promise chain and log errors to the console
5. This API allows you to make only 3 requests per second. If you reload fast, you will get this error with code 403. This is an error with the request. Remember, fetch() does NOT reject the promise in this case. So create an error to reject the promise yourself, with a meaningful error message.

PART 2
6. Now it's time to use the received data to render a country. So take the relevant attribute from the geocoding API result, and plug it into the countries API that we have been using.
7. Render the country and catch any errors, just like we have done in the last lecture (you can even copy this code, no need to type the same code)

TEST COORDINATES 1: 52.508, 13.381 (Latitude, Longitude)
TEST COORDINATES 2: 19.037, 72.873
TEST COORDINATES 2: -33.933, 18.474

GOOD LUCK 😀
*/

// const whereAmI = (lat, lng) => {
//   fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`)
//     .then(res => {
//       console.log(res);
//       if (!res.ok) throw new Error(`Problem with geocoding ${res.status}`);
//       return res.json();
//     })
//     .then(data => {
//       console.log(data);
//       console.log(`You are in ${data.city}, ${data.country}`);

//       return fetch(`https://restcountries.com/v3.1/name/${data.country}`);
//     })
//     .then(res => {
//       if (!res.ok) throw new Error(`Country not found ${res.status}`);

//       return res.json();
//     })
//     .then(data => console.log(data[0]))
//     .catch(err => console.error(err.message));
//   // .finally(() => console.log('Done.'));
// };

// whereAmI(52.508, 13.381);
// whereAmI(19.037, 72.873);
// whereAmI(-33.933, 18.474);

///////////////////////////////////////////////////////////////
console.log('Test Start');
setTimeout(() => console.log('0 sec timer'), 0); //inside callback queue
Promise.resolve('Resolve promise 1.').then(res => console.log(res)); //inside microtask queue
console.log('Test End');

////////////////////////////////////////////////////////////
//  Promise
const lotteryPromise = new Promise(function (resolve, reject) {
  console.log('Lottery Draw...');
  setTimeout(() => {
    if (Math.random() >= 0.5) resolve('You Win.');
    else reject('You loss.');
  }, 2000);
});

lotteryPromise.then(res => console.log(res)).catch(err => console.error(err));

// ////////////////////////////////////////////////////////
// Coding challenge 2

const wait= function(sec){
    return new Promise(function(resolve){
        setTimeout(resolve, sec*1000);
    });
};

const imgContainer = document.querySelector('.imgContainer');
let currentImg;

const createImage = function (imgPath) {
  return new Promise(function (resolve, reject) {
    const img = document.createElement('img');
    img.src = imgPath;

    img.addEventListener('load', function () {
      imgContainer.append(img);
      resolve(img);
    });

    img.addEventListener('error', function () {
      reject(new Error('Image not found.'));
    });
  });
};

createImage('/img/img-1.jpg')
  .then(img => {
    currentImg=img;
    console.log('Image 1 loaded.');
    return wait(2);
}).then(()=>{
    currentImg.style.display='none';
    return createImage('/img/img-2.jpg');
}).then(img=>{
    currentImg=img;
    console.log('Image 2 loaded.');
    return wait(2);
}).then(()=>{
    currentImg.style.display='none';
    return createImage('/img/img-3.jpg');
}).then(img=>{
    console.log('Image 3 loaded.');
    return wait(2);
}).then(()=>currentImg.style.display='none')
  .catch(err => console.error(err));


///////////////////////////////////////////////////
//  async await
const whereAmI =async (lat, lng) => {
    try{
        const res= await fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`)
    const data= await res.json();
    console.log(data);
    }catch(err){
        console.error('my error',err.message);
    }
  };
  
  whereAmI(52.508, 13.381);
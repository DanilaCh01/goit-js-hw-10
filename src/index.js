import { fetchBreeds, fetchCatByBreed } from './cat-api.js';

const breedSelect = document.querySelector('.breed-select');
const catInfo = document.querySelector('.cat-info');
const loader = document.querySelector('.loader');
const error = document.querySelector('.error');

function hasError(boolean) {
  catInfo.style.display = boolean ? 'none' : 'block';
  error.style.display = boolean ? 'block' : 'none';
};

function loading() {
  loader.style.display = 'block';
  catInfo.style.display =  'none';
  error.style.display =  'none';
}

function populateBreeds() {
  loading();
  fetchBreeds()
    .then(breeds => {
      const options = breeds.map(breed => new Option(breed.name, breed.id));
      breedSelect.append(...options);
      new SlimSelect('.breed-select');
      hasError(false);
      breedSelect.addEventListener('change', fetchCatInformation);
    })
    .catch(() => {
      hasError(true);
    })
    .finally(() => {
      loader.style.display = 'none';
    });
}


function fetchCatInformation() {
  const selectedBreedId = breedSelect.value;
  if (selectedBreedId) {
    loading();
    catInfo.innerHTML = '';
    fetchCatByBreed(selectedBreedId)
      .then(([cat]) => {
        const container = document.createElement('div');
        container.classList.add('cat-container');
        container.innerHTML = `
          <div class="image-container">
            <img src="${cat.url}" alt="Breed: ${cat.breeds[0].name}">
          </div>
          <div class="info-container">
            <h2>${cat.breeds[0].name}</h2>
            <p>${cat.breeds[0].description}</p>
            <p>Temperament: ${cat.breeds[0].temperament}</p>
          </div>
        `;
        catInfo.innerHTML = '';
        catInfo.appendChild(container);
        hasError(false)
      })
      .catch(() => {
        hasError(true)
      }).finally(() => {
      loader.style.display = 'none'
    });
  }
}

populateBreeds();


// import { fetchBreeds, fetchCatByBreed } from './cat-api.js';

// const breedSelect = document.querySelector('.breed-select');
// const catInfo = document.querySelector('.cat-info');
// const loader = document.querySelector('.loader');
// const error = document.querySelector('.error');

// function hasError(boolean) {
//   catInfo.style.display = boolean ? 'none' : 'block';
//   error.style.display = boolean ? 'block' : 'none';
// };

// function loading() {
//   loader.style.display = 'block';
//   catInfo.style.display =  'none';
//   error.style.display =  'none';
// }

// function populateBreeds() {
//   loading();
//   fetchBreeds()
//     .then(breeds => {
//       // const breedsArray = breeds.map(breed=>{})
//       breeds.forEach(breed => {
//         const option = new Option(breed.name, breed.id);
//         breedSelect.appendChild(option);
//       });
//       new SlimSelect('.breed-select');
//       hasError(false)
//       breedSelect.addEventListener('change', fetchCatInformation);
//     })
//     .catch(() => {
//       hasError(true)
//     }).finally(() => {
//       loader.style.display = 'none'
//     });
// }

// function fetchCatInformation() {
//   const selectedBreedId = breedSelect.value;
//   if (selectedBreedId) {
//     loading();
//     catInfo.innerHTML = '';
//     fetchCatByBreed(selectedBreedId)
//       .then(([cat]) => {
//         const container = document.createElement('div');
//         container.classList.add('cat-container');
//         container.innerHTML = `
//           <div class="image-container">
//             <img src="${cat.url}" alt="Breed: ${cat.breeds[0].name}">
//           </div>
//           <div class="info-container">
//             <h2>${cat.breeds[0].name}</h2>
//             <p>${cat.breeds[0].description}</p>
//             <p>Temperament: ${cat.breeds[0].temperament}</p>
//           </div>
//         `;
//         catInfo.innerHTML = '';
//         catInfo.appendChild(container);
//         hasError(false)
//       })
//       .catch(() => {
//         hasError(true)
//       }).finally(() => {
//       loader.style.display = 'none'
//     });
//   }
// }

// populateBreeds();
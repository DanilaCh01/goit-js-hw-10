import { fetchBreeds, fetchCatByBreed } from './cat-api.js';

const breedSelect = document.querySelector('.breed-select');
const catInfo = document.querySelector('.cat-info');
const loader = document.querySelector('.loader');
const error = document.querySelector('.error');

function populateBreeds() {
  loader.style.display = 'block';
  fetchBreeds()
    .then(breeds => {
      breeds.forEach(breed => {
        const option = new Option(breed.name, breed.id);
        breedSelect.appendChild(option);
      });
      new SlimSelect('.breed-select');
      loader.style.display = 'none';
      breedSelect.addEventListener('change', fetchCatInformation);
    })
    .catch(() => {
      loader.style.display = 'none';
      error.style.display = 'block';
    });
}

function fetchCatInformation() {
  const selectedBreedId = breedSelect.value;
  if (selectedBreedId) {
    loader.style.display = 'block';
    catInfo.innerHTML = '';
    fetchCatByBreed(selectedBreedId)
      .then(cat => {
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
        loader.style.display = 'none';
        catInfo.style.display = 'block';
        error.style.display = 'none';
      })
      .catch(() => {
        loader.style.display = 'none';
        error.style.display = 'block';
        catInfo.style.display = 'none';
      });
  }
}

populateBreeds();
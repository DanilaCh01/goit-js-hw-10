const API_KEY = 'live_5HuACZGpVo6q4GhmGjnW7cARN4fbHFr7RXpF4ARKVERA3a93MeqrNPxf0ymFiD06';
const BASE_URL = 'https://api.thecatapi.com/v1/';
const headers = {
      'x-api-key': API_KEY
    };

export function fetchBreeds() {
  const url = `${BASE_URL}breeds`;
  return fetch(url, {
    headers,
  })
    .then(response => {
      if (response.ok) {
        return response.json()
      } else {
        throw new Error('Failed to fetch breeds');
      }
    })
};

export function fetchCatByBreed(breedId) {
  const url = `${BASE_URL}images/search?breed_ids=${breedId}`;
    return fetch(url, {
        headers,
    })
      .then(response => {
    if (response.ok) {
      return response.json()
    } else {
      throw new Error('Failed to fetch cat information');
    }
})
};

const apiKey = 'live_5HuACZGpVo6q4GhmGjnW7cARN4fbHFr7RXpF4ARKVERA3a93MeqrNPxf0ymFiD06';

export function fetchBreeds() {
  const url = 'https://api.thecatapi.com/v1/breeds';
    return fetch(url, {
        headers: {
            'x-api-key': apiKey
        }
    })
    .then(response => response.json())
    .then(data => data)
    .catch(error => {
      console.error('Error:', error);
      throw new Error('Failed to fetch breeds');
    });
};

export function fetchCatByBreed(breedId) {
  const url = `https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`;
    return fetch(url, {
        headers: {
            'x-api-key': apiKey
        }
    })
    .then(response => response.json())
    .then(data => data[0])
    .catch(error => {
      console.error('Error:', error);
      throw new Error('Failed to fetch cat information');
    });
};

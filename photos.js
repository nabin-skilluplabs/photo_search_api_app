import { API_ENDPOINT, UNSPLASH_API_KEY } from './constants.js';

export async function getPhotos(collectionId, query) {
  let url = '';
  if (collectionId) {
    url =
      API_ENDPOINT +
      'collections/' +
      collectionId +
      '/photos?client_id=' +
      UNSPLASH_API_KEY +
      '&page=1';
  } else if (query) {
    url =
      API_ENDPOINT +
      'search/photos?client_id=' +
      UNSPLASH_API_KEY +
      '&page=1&query=' +
      query;
  } else if (!collectionId) {
    url = API_ENDPOINT + 'photos?client_id=' + UNSPLASH_API_KEY + '&page=1';
  }
  const response = await fetch(url, {
    method: 'GET',
  });
  const data = await response.json();
  return data;
}

function addPhotosToHTML(photos) {
  const photosElement = document.querySelector('#photos');
  const photoItemsElements = photos
    .map((item) => {
      return `<img src="${item.urls.thumb}" alt="${item.alt_description}">`;
    })
    .join('');
  photosElement.innerHTML = photoItemsElements;
}

export async function populatePhotos(collectionId) {
  const photos = await getPhotos(collectionId);
  addPhotosToHTML(photos);
}

export default async function makeSearchRequest(event) {
  event.preventDefault();
  const queryElement = document.querySelector('input');
  const query = queryElement.value;
  const photos = await getPhotos('', query);
  addPhotosToHTML(photos.results);
}

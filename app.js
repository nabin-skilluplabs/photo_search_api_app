import { populateCollections } from './collections.js';
import makeSearchRequest, { populatePhotos } from './photos.js';

(async () => {
  await populateCollections();
  await populatePhotos();
  window.populatePhotos = populatePhotos;
  window.makeSearchRequest = makeSearchRequest;
})();

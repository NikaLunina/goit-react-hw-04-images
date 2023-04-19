const url = 'https://pixabay.com/api/';
const KEY = '33725877-d5048a8c1b414c12f4e9c329f';
export function getImages(searchText, page) {
 return fetch(
  `${url}?q=${searchText}&key=${KEY}&page=${page}&per_page=12`
  ).then(res => res.json());
}
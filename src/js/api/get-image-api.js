export default class GetImageAPI {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
  }

  fetchImages() {
    // v. 1 - URL
    // const URL = `https://pixabay.com/api/?image_type=photo&orientation=horizontal&q=${this.searchQuery}&page=${this.page}&per_page=6&key=20575585-f86bba565132ad4f87d3b8fdb`;

    // v. 2 - URL
    const BASE_URL =
      'https://pixabay.com/api/?image_type=photo&orientation=horizontal&';
    const KEY = '20575585- f86bba565132ad4f87d3b8fdb';
    const searchParams = new URLSearchParams({
      q: this.searchQuery,
      page: this.page,
      per_page: 6,
      key: KEY,
    });
    const URL = `${BASE_URL}${searchParams}`;
    // --- --- ---

    return fetch(URL)
      .then(response => response.json())
      .then(data => {
        this.page += 1;
        return data.hits;
      });
  }

  get query() {
    return this.searchQuery;
  }

  set query(newQuery) {
    this.searchQuery = newQuery;
  }

  resetPage() {
    this.page = 1;
  }
}

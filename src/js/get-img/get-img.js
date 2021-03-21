// import '../../css/styles.css';
import notify from '../components/notify';
import API from '../api/get-image-api';
import galleryTemplate from '../../template/gallery-template.hbs';

const refs = getRefs();
const api = new API();

function onSearch(e) {
  e.preventDefault();

  const searchQuery = e.currentTarget.elements.query.value.trim();

  if (searchQuery === '') {
    notify.catchSpace();
    refs.galleryContainer.innerHTML = '';
    return;
  }

  api.query = searchQuery;

  api.resetPage();
  cleargalleryContainer();

  api.fetchImages().then(images => {
    //
    if (images.length === 0) {
      notify.isNotCorrectQuery();
      return;
    }
    //
    appendArticlesMarkup(images);
  });
}

function appendArticlesMarkup(images) {
  refs.galleryContainer.insertAdjacentHTML(
    'beforeend',
    galleryTemplate(images),
  );
}

function cleargalleryContainer() {
  refs.galleryContainer.innerHTML = '';
}

refs.searchForm.addEventListener('submit', onSearch);

// for intersection observer
const onEntry = entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting && api.query !== '') {
      console.log('Time to load more pics: ' + Date.now());
      // --- ---
      api.fetchImages().then(images => {
        //
        if (images.length === 0) {
          notify.isNotCorrectQuery();
          return;
        }
        //
        appendArticlesMarkup(images);
      });
      // --- ---
    }
  });
};

const options = {
  rootMargin: '100px',
};
const observer = new IntersectionObserver(onEntry, options);
observer.observe(refs.sensitiveDiv);

// --- --- --- another way to get Refs by "const refs = getRefs();"
function getRefs() {
  return {
    searchForm: document.querySelector('.search-form'),
    galleryContainer: document.querySelector('.gallery'),
    sensitiveDiv: document.querySelector('.sensitive'),
  };
}

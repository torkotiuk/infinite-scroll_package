const options = {
  rootMargin: '100px',
};

const cb = entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      //
    }
  });
};

const observer = new IntersectionObserver(cb, options);

observer.observe(document.querySelector('.sensitive'));

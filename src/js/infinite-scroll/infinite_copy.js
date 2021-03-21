// empty observer for every project
const options = {
  rootMargin: '100px',
};

const cb = entries => {
  // entries: Array of observed elements
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      console.log(entry);
    }
    // Here we can do something with each particular entry
  });
};

const observer = new IntersectionObserver(cb, options);

// Now we should tell our Observer what to observe
observer.observe(document.querySelector('.sensitive'));

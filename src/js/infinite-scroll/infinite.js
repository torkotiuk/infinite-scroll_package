import InfiniteScroll from 'infinite-scroll';

var unsplashID =
  '9ad80b14098bcead9c7de952435e937cc3723ae61084ba8e729adb642daf0251';

const infScroll = new InfiniteScroll('.container', {
  responseType: 'text',
  history: false,
  path() {
    const URL = `https://api.unsplash.com/photos?client_id=${unsplashID}&page=${this.pageIndex}`;
    return URL;
  },
});

infScroll.loadNextPage();

setTimeout(() => {
  infScroll.loadNextPage();
}, 1000);

infScroll.on('load', (response, path) => {
  console.log(JSON.parse(response));
  console.log(path);
});

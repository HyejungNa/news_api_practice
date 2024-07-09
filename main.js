const API_KEY = 'c5878c7156124f3580df6afb2aad27a8';
const getLatestNews = () => {
  const url = new URL(
    `https://newsapi.org/v2/top-headlines?country=us&apiKey=${API_KEY}`
  );
  const response = fetch(url);
};

getLatestNews();

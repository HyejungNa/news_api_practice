const API_KEY = 'c5878c7156124f3580df6afb2aad27a8';
let news = [];

const getLatestNews = async () => {
  // const url = new URL(
  //   `https://newsapi.org/v2/top-headlines?country=us&apiKey=${API_KEY}`
  // );
  // news api사용
  const url = new URL(`https://news-api-prac.netlify.app/top-headlines`); //코딩누나 api사용
  const response = await fetch(url);
  const data = await response.json();

  news = data.articles;
  console.log(news);
};

getLatestNews();

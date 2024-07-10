const API_KEY = 'c5878c7156124f3580df6afb2aad27a8';
let newsList = [];

const openNav = () => {
  document.getElementById('mySidenav').style.width = '250px';
};

const closeNav = () => {
  document.getElementById('mySidenav').style.width = '0';
};

const openSearchBox = () => {
  let inputArea = document.getElementById('input-area');
  if (inputArea.style.display === 'inline') {
    inputArea.style.display = 'none';
  } else {
    inputArea.style.display = 'inline';
  }
};

const getLatestNews = async () => {
  // news api사용
  // const url = new URL(
  //   `https://newsapi.org/v2/top-headlines?country=us&apiKey=${API_KEY}`
  // );

  // 코딩누나 새 api 사용
  const url = new URL(
    `https://noona-times-be-5ca9402f90d9.herokuapp.com/top-headlines`
  );

  const response = await fetch(url);
  const data = await response.json();

  newsList = data.articles;
  render();
  console.log(newsList);
};

const render = () => {
  const newsHTML = newsList
    .map((news) => {
      return `<div class="row news">
<div class="col-lg-4">
          <img class="news-img-size"
                src="${
                  news.urlToImage ||
                  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRqEWgS0uxxEYJ0PsOb2OgwyWvC0Gjp8NUdPw&usqp=CAU'
                }" />
          </div>
          <div class="col-lg-8">
            <h2>${news.title}</h2>
            <p>${
              news.description == null || news.description == ''
                ? 'No content available'
                : news.description.length > 200
                ? news.description.substring(0, 200) + '...'
                : news.description
            }</p>
            <div>${news.source.name || 'no source'}  ${moment(
        news.publishedAt
      ).fromNow()}</div>
      </div>
        </div>`;
    })
    .join('');
  document.getElementById('news-board').innerHTML = newsHTML;
};

getLatestNews();

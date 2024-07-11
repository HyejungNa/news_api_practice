const API_KEY = 'c5878c7156124f3580df6afb2aad27a8';
let newsList = [];
const menus = document.querySelectorAll('.menus button');
const sideMenuList = document.querySelectorAll('.side-menu-list');

menus.forEach((menu) => {
  menu.addEventListener('click', (event) => getNewsByCategory(event));
});

sideMenuList.forEach((sidemenu) => {
  sidemenu.addEventListener('click', (event) => getNewsByCategory(event));
});

const openNav = () => {
  document.getElementById('mySidenav').style.width = '250px';
};

const closeNav = () => {
  document.getElementById('mySidenav').style.width = '0';
};

const openSearchBox = () => {
  let inputArea = document.getElementById('input-area');
  let searchInput = document.getElementById('search-input');

  if (inputArea.style.display === 'inline') {
    inputArea.style.display = 'none';
  } else {
    inputArea.style.display = 'inline';
    searchInput.focus(); // 인풋창에 자동커서 focus 두기
  }

  // 인풋창 입력후 검색시 엔터키 사용가능
  searchInput.addEventListener('keydown', function (event) {
    if (event.key === 'Enter') {
      getNewsByKeyword();
      searchInput.value = ''; // 인풋창 비워주기
    }
  });
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

const getNewsByCategory = async (event) => {
  const category = event.target.textContent.toLowerCase();
  console.log(category);

  // news api사용
  // const url = new URL(
  //   `https://newsapi.org/v2/top-headlines?country=us&category=${category}&apiKey=${API_KEY}`
  // );

  // 코딩누나 새 api 사용
  const url = new URL(
    `https://noona-times-be-5ca9402f90d9.herokuapp.com/top-headlines?country=us&category=${category}&apiKey=${API_KEY}`
  );

  const response = await fetch(url); // 비동기 호출
  const data = await response.json(); // 비동기 호출

  newsList = data.articles;
  render();
};

const getNewsByKeyword = async () => {
  const keyword = document.getElementById('search-input').value;
  console.log('keyword', keyword);

  // news api사용
  // const url = new URL(
  //   `https://newsapi.org/v2/top-headlines?country=us&q=${keyword}&apiKey=${API_KEY}`
  // );

  // 코딩누나 새 api 사용
  const url = new URL(
    `https://noona-times-be-5ca9402f90d9.herokuapp.com/top-headlines?country=us&country=us&q=${keyword}&apiKey=${API_KEY}`
  );

  const response = await fetch(url); // 비동기 호출
  const data = await response.json(); // 비동기 호출
  console.log('data', data);

  newsList = data.articles;
  render();
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
                }"
                onerror="this.onerror=null;this.src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRqEWgS0uxxEYJ0PsOb2OgwyWvC0Gjp8NUdPw&usqp=CAU';" />
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
            <div>${news.source.name || 'no source available'}  ${moment(
        news.publishedAt
      ).fromNow()}</div>
      </div>
        </div>`;
    })
    .join('');
  document.getElementById('news-board').innerHTML = newsHTML;
};

getLatestNews();

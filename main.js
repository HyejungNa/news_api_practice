const API_KEY = 'c5878c7156124f3580df6afb2aad27a8';

let newsList = [];
const menus = document.querySelectorAll('.menus button');
menus.forEach((menu) => {
  menu.addEventListener('click', (event) => getNewsByCategory(event));
});

const sideMenuList = document.querySelectorAll('.side-menu-list');
sideMenuList.forEach((sideMenu) => {
  sideMenu.addEventListener('click', (event) => getNewsByCategory(event));
});

// Base url
let url = new URL(
  // news api사용
  // `https://newsapi.org/v2/top-headlines?country=us&apiKey=${API_KEY}`
  // 코딩누나 새 api 사용
  `https://noona-times-be-5ca9402f90d9.herokuapp.com/top-headlines`
);

// Pagination
let totalResults = 0; // 전체 데이터 결과의 수
let page = 1; // 현재 페이지 번호 (처음시작은 1페이지로 설정)
const pageSize = 10; // 한페이지에 표시될 항목의 수
const groupSize = 5; // 한번에 표시할 페이지번호의 수 (e.g. 페이지번호 1~5가 첫번쨰 그룹이고, 페이지 6~10까지가 다음 그룹)

const openNav = () => {
  document.getElementById('mySidenav').style.width = '120px';
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

const getNews = async () => {
  try {
    url.searchParams.set('page', page); // => &page=page
    url.searchParams.set('pageSize', pageSize);
    const response = await fetch(url); // 비동기 호출
    const data = await response.json(); // 비동기 호출
    console.log(data);

    if (response.status === 200) {
      if (data.articles.length === 0) {
        throw new Error('No result for this search');
      }
      newsList = data.articles;
      totalResults = data.totalResults;
      render();
      paginationRender();
    } else {
      throw new Error(data.message);
    }
  } catch (error) {
    errorRender(error.message);
  }
};

const getLatestNews = async () => {
  // news api사용
  // url = new URL(
  //   `https://newsapi.org/v2/top-headlines?country=us&apiKey=${API_KEY}`
  // );

  // 코딩누나 새 api 사용
  url = new URL(
    `https://noona-times-be-5ca9402f90d9.herokuapp.com/top-headlines`
  );

  await getNews(); // 비동기 함수 호출 전에 await 사용
  // console.log(newsList);
};

const getNewsByCategory = async (event) => {
  const category = event.target.textContent.toLowerCase();

  // news api사용
  // url = new URL(
  //   `https://newsapi.org/v2/top-headlines?country=us&category=${category}&apiKey=${API_KEY}`
  // );

  // 코딩누나 새 api 사용
  url = new URL(
    `https://noona-times-be-5ca9402f90d9.herokuapp.com/top-headlines?country=us&category=${category}&apiKey=${API_KEY}`
  );

  await getNews(); // 비동기 함수 호출 전에 await 사용
};

const getNewsByKeyword = async () => {
  const keyword = document.getElementById('search-input').value;

  // news api사용
  // url = new URL(
  //   `https://newsapi.org/v2/top-headlines?country=us&q=${keyword}&apiKey=${API_KEY}`
  // );

  // 코딩누나 새 api 사용
  url = new URL(
    `https://noona-times-be-5ca9402f90d9.herokuapp.com/top-headlines?country=us&country=us&q=${keyword}&apiKey=${API_KEY}`
  );

  await getNews(); // 비동기 함수 호출 전에 await 사용
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
                onerror="this.onerror=null; this.src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRqEWgS0uxxEYJ0PsOb2OgwyWvC0Gjp8NUdPw&usqp=CAU';" />
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

const errorRender = (errorMessage) => {
  const errorHTML = `<div class="alert alert-danger" role="alert">
  ${errorMessage}
</div>`;
  document.getElementById('news-board').innerHTML = errorHTML;
};

const paginationRender = () => {
  let paginationHTML = '';
  const totalPages = Math.ceil(totalResults / pageSize);
  const pageGroup = Math.ceil(page / groupSize); // 현재 페이지가 속한 페이지 그룹 (e.g. 현재페이지가 7이고 groupSize가 5이면 7은 두번째 그룹에 속함)

  let lastPage = pageGroup * 5; // 현재 페이지 그룹의 마지막 페이지 번호 (e.g. 현재 페이지가 두번쨰그룹(6~10)에 속한다면 lastPage는 10이됨), 밑에서 재할당해야하기에 let으로 선언하기
  // 그룹 크기를 5로 고정해둠 (그룹크기가 항상 일정할시 고정된숫자사용도 괜찮음, 하지만 그룹크기를 동적으로 변경해야할경우 코드를 직접 수정해야함)
  // let lastPage = pageGroup * groupSize; // 그룹 크기를 변수(groupSize)로 사용하여 더 유연하게 조절가능

  if (lastPage > totalPages) {
    // 마지막 그룹이 5개이하일때
    lastPage = totalPages;
  }

  const firstPage = lastPage - 4 <= 0 ? 1 : lastPage - 4; // 첫그룹이 5이하일때
  // firstPage는 현재 페이지 그룹의 첫번째 페이지 번호 (e.g. 현재페이지가 두번째그룹(6~10)에 속한다면 firstPage는 6이됨)
  // const firstPage = lastPage - (groupSize - 1) <= 0 ? 1 : lastPage - (groupSize - 1); // 그룹 크기를 변수(groupSize)로 사용하여 더 유연하게 조절가능

  if (firstPage >= 6) {
    paginationHTML = `
  <li class="page-item" onClick='moveToPage(1)'>
    <a class="page-link" href="#" aria-label="Previous">
      <span aria-hidden="true">&laquo;</span>
    </a>
  </li>
<li class="page-item" onClick='moveToPage(${
      page - 1
    })'><a class="page-link" href="#"> &lt; </a></li>
`;
  }

  for (let i = firstPage; i <= lastPage; i++) {
    paginationHTML += `<li class="page-item ${
      i === page ? 'active' : ''
    }" onClick='moveToPage(${i})'><a class="page-link">${i}</a></li>`;
  }

  if (lastPage < totalPages) {
    paginationHTML += `<li class="page-item" onClick='moveToPage(${
      page + 1
    })'><a class="page-link" href="#"> &gt; </a></li>
    <li class="page-item" onClick='moveToPage(${totalPages})'>
        <a class="page-link" href="#" aria-label="Next">
          <span aria-hidden="true">&raquo;</span>
        </a>
      </li>`;
  }

  document.querySelector('.pagination').innerHTML = paginationHTML;
};

const moveToPage = (pageNum) => {
  console.log(pageNum);
  page = pageNum;
  getNews();
};

getLatestNews();

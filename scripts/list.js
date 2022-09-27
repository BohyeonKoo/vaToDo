const targetBody = document.body;
const createForm = targetBody.querySelector(".container > form");
let renderList = [];

//INIT
document.addEventListener("DOMContentLoaded", function () {
  const currentList = localStorage.getItem("currentList");
  renderList = [...JSON.parse(currentList)];
  renderedTabs();
  renderedLists();
});

//List
const renderedLists = () => {
  const listWrap = targetBody.querySelector(".container > ul");
  if (renderList && renderList.length !== 0) {
    const parsedList = renderList.map((el, idx) =>
      `<li>
        <div>
          <h2 class=${el.type && el.type === "done" ? "done-title" : null}>${el.title ? el.title : "To Do"}</h2>
          <span>${el.date ? "날짜: " + convertDateFormat(el.date) : "date"}</span>
        </div>
        <div>
          <button onclick="handleClearRemove(${idx}, 'clear')">${el.type ? el.type === "done" ? "해제" : "완료" : "완료"}</button>
          <button onclick="handleClearRemove(${idx}, 'remove')">삭제</button>
        </div>
      </li>`
    );
    listWrap.innerHTML = parsedList;
  } else {
    listWrap.innerHTML = '<h1>리스트가 존재하지 않습니다.</h1>';
  }
};

const handleClearRemove = (idx, type) => {
  const currentList = JSON.parse(localStorage.getItem("currentList"));
  let returnList = [];

  if (type === "clear") {
    returnList = currentList.map((item, itemIdx) => {
      if (idx === itemIdx) item.type = item.type === "done" ? "todo" : "done";
      return item;
    });
  } else {
    let confirmResult = confirm("정말 삭제하시겠습니까?");
    if (confirmResult) {
      returnList = currentList.filter((item, itemIdx) => idx !== itemIdx);
    } else {
      returnList = currentList;
    }
  }

  localStorage.setItem("currentList", JSON.stringify(returnList));
  window.location.reload();
}

const handleAddTodo = () => createForm.style.display = "flex";

const handleFormAction = (type) => {
  if (type === 'add') {
    const inputs = createForm.getElementsByTagName("input");
    if (inputs[0].value && inputs[1].valueAsNumber) {
      const title = inputs[0].value;
      const date = inputs[1].valueAsNumber;
      const type = "todo"

      const currentList = JSON.parse(localStorage.getItem("currentList"));
      let convertTodo = currentList ? [...currentList, { title, date, type }] : [{ title, date, type }];
      localStorage.setItem("currentList", JSON.stringify(convertTodo));
      window.location.reload();
      createForm.style.display = "none";
    } else {
      alert("필수 값이 입력되지 않았습니다.")
    }
  } else {
    createForm.style.display = "none";
  }
}

//Tabs
const renderedTabs = () => {
  const tabsWrap = targetBody.querySelector(".tab-section > ul");
  const tabTitles = ["All", "Today", "Weeks"];

  const tabList = tabTitles.map((el, idx) =>
    `<li>
      <button onclick="handleClickedTab(${idx})">${el}</button>
    </li>`
  );
  tabsWrap.innerHTML = tabList;
}

const handleClickedTab = (idx) => {
  const currentList = JSON.parse(localStorage.getItem("currentList"));
  if (idx === 0) {
    renderList = currentList;
    renderedLists();
  } else {
    const today = Date.now();
    const convertDate = new Date(today);

    const returnList = currentList.filter(el => convertDateFormat(el.date) == convertDateFormat(convertDate))
    renderList = returnList;
    renderedLists();
  }
}

//Sign
const handleSignOut = () => {
  localStorage.setItem("isSign", false);
  window.location.href = "../index.html";
};

//etc.
const convertDateFormat = (time) => {
  const convertDate = new Date(time);
  return convertDate.toISOString().split('T')[0];
}


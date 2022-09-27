const targetBody = document.body;
const listWrap = targetBody.querySelector(".container > ul");
const createForm = targetBody.querySelector(".container > form");

const renderLists = (list) => {
  if (list && list.length !== 0) {
    const parsedList = list.map((el, idx) =>
      `<li>
        <div>
          <h2 class=${el.type && el.type === "done" ? "done-title" : null}>${el.title ? el.title : "To Do"}</h2>
          <span>${el.date ? "날짜: " + el.date : "date"}</span>
        </div>
        <div>
          <button onclick="handleClearRemove(${idx}, 'clear')">${el.type ? el.type === "done" ? "해제" : "완료" : "완료"}</button>
          <button onclick="handleClearRemove(${idx}, 'remove')">삭제</button>
        </div>
      </li>`
    );
    listWrap.insertAdjacentHTML('beforeend', parsedList);
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

document.addEventListener("DOMContentLoaded", function () {
  const currentList = localStorage.getItem("currentList");
  renderLists(JSON.parse(currentList));
});

const handleAddTodo = () => {
  createForm.style.display = "flex";
}

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

const handleSignOut = () => {
  localStorage.setItem("isSign", false);
  window.location.href = "../index.html";
};


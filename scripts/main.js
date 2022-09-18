const targetBody = document.body;
const listWrapper = targetBody.querySelector(".list-wrap");
const addButton = document.querySelector(".add-btn");
const saveButton = document.querySelector(".save-btn");

window.onload = function () {
  const currentList = localStorage.getItem("currentList");

  if (currentList) {
    const parsedList = JSON.parse(currentList);
    for (const list of parsedList) handleCreateTodo(list);
  }
};

addButton.onclick = function () {
  if (listWrapper.getElementsByTagName("input").length === 0) {
    const newListItemWrapper = document.createElement("div");
    const newListInput = document.createElement("input");
    const newListButton = document.createElement("button");
    const deleteContentWrap = document.createElement("div");

    newListItemWrapper.setAttribute("class", "item-wrap");
    newListButton.appendChild(document.createTextNode("확인"));
    deleteContentWrap.appendChild(document.createTextNode("X"));
    newListItemWrapper.appendChild(newListInput);
    newListItemWrapper.appendChild(deleteContentWrap);
    newListItemWrapper.appendChild(newListButton);
    listWrapper.appendChild(newListItemWrapper);

    newListButton.onclick = () => handleAddTodo(newListItemWrapper);
    newListInput.onkeydown = (e) => {
      if (e.key === "Enter") handleAddTodo(newListItemWrapper);
    }

    deleteContentWrap.onclick = function () {
      newListInput.value = ""
    }
  } else {
    alert("이미 작성 중인 리스트가 존재합니다.");
  }
};

saveButton.onclick = function () {
  const alignList = document.getElementsByTagName("h2");
  const convertListTitle = [];

  for (const item of alignList) {
    convertListTitle.push(item.textContent);
  }
  localStorage.setItem("currentList", JSON.stringify(convertListTitle));
};

function handleAddTodo(newListItemWrapper) {
  const inputVal = listWrapper.getElementsByTagName("input")[0].value;
  if (inputVal.trim() !== "") {
    handleCreateTodo(inputVal, newListItemWrapper);
  } else {
    alert("입력하실 내용을 재확인 해주세요.");
  }
}

function handleCreateTodo(inputVal, newListItemWrapper) {
  const todoWrap = document.createElement("div");
  const todoTitle = document.createElement("h2");
  const buttonWrap = document.createElement("div");
  const todoCheckButton = document.createElement("button");
  const todoRemoveButton = document.createElement("button");

  todoTitle.innerText = inputVal;
  todoCheckButton.innerText = "완료";
  todoRemoveButton.innerText = "삭제";

  buttonWrap.appendChild(todoCheckButton);
  buttonWrap.appendChild(todoRemoveButton);
  todoWrap.appendChild(todoTitle);
  todoWrap.appendChild(buttonWrap);
  todoWrap.setAttribute("class", "todo-wrap");

  if (newListItemWrapper) {
    listWrapper.replaceChild(todoWrap, newListItemWrapper);
  } else {
    listWrapper.appendChild(todoWrap);
  }

  todoRemoveButton.onclick = function () {
    listWrapper.removeChild(todoWrap);
  }

  todoCheckButton.onclick = function (e) {
    if (e.target.textContent === "완료") {
      todoTitle.setAttribute("class", "checked");
      todoCheckButton.innerText = "해제";
    } else {
      todoTitle.setAttribute("class", null);
      todoCheckButton.innerText = "완료";
    }
  }
}

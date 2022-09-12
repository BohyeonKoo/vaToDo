const targetBody = document.body;
const listWrapper = targetBody.querySelector(".list-wrap");
const addButton = document.querySelector(".add-btn");
const saveButton = document.querySelector(".save-btn");

window.onload = function () {
  const currentList = localStorage.getItem("currentList");

  if (currentList) {
    const parsedList = JSON.parse(currentList);

    for (let list of parsedList) {
      const listTitle = document.createElement("h2");
      listTitle.appendChild(document.createTextNode(list));
      listWrapper.appendChild(listTitle);
    }
  }
};

addButton.onclick = function () {
  if (listWrapper.getElementsByTagName("input").length === 0) {
    const newListItemWrapper = document.createElement("div");
    const newListInput = document.createElement("input");
    const newListButton = document.createElement("button");

    newListItemWrapper.setAttribute("class", "item-wrap");

    newListButton.appendChild(document.createTextNode("확인"));
    newListItemWrapper.appendChild(newListInput);
    newListItemWrapper.appendChild(newListButton);
    listWrapper.appendChild(newListItemWrapper);

    newListButton.onclick = function () {
      const inputVal = listWrapper.getElementsByTagName("input")[0].value;
      if (inputVal.trim() !== "") {
        const newListTitle = document.createElement("h2");
        newListTitle.appendChild(document.createTextNode(inputVal));
        listWrapper.replaceChild(newListTitle, newListItemWrapper);
      } else {
        alert("입력하실 내용을 재확인 해주세요.");
      }
    };
  } else {
    alert("이미 작성 중인 리스트가 존재합니다.");
  }
};

saveButton.onclick = function () {
  const alignList = document.getElementsByTagName("h2");
  let convertListTitle = [];

  if (alignList.length === 0) {
    alert("생성된 리스트가 없습니다.");
  } else {
    for (let item of alignList) {
      convertListTitle.push(item.textContent);
    }
    localStorage.setItem("currentList", JSON.stringify(convertListTitle));
  }
};

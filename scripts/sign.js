const targetBody = document.body;
const inputs = targetBody.getElementsByTagName("input");

const handleLoginClicked = () => {
  if (inputs[0].value && inputs[1].value) {
    const signInfo = localStorage.getItem("signInfo");
    if (signInfo) {
      loginInfo = {
        id: inputs[0].value,
        password: inputs[1].value,
      };
      if (signInfo === JSON.stringify(loginInfo)) {
        localStorage.setItem("isSign", true);
        window.location.href = "list.html";
      } else {
        alert("일치하는 정보가 없습니다.");
      }
    } else {
      alert("가입된 정보가 없습니다. 회원가입을 진행해주세요");
    }
  } else {
    alert("미입력된 필수값이 존재합니다.");
  }
};

const handleCreateClicked = () => {
  if (inputs[0].value && inputs[1].value) {
    const signInfo = {
      id: inputs[0].value,
      password: inputs[1].value,
    };

    localStorage.setItem("signInfo", JSON.stringify(signInfo));
    inputs[0].value = "";
    inputs[1].value = "";
    handleDisplayCreate("done");
    alert("계정 생성이 완료되었습니다! 로그인 해주세요.");
  } else {
    alert("미입력된 필수값이 존재합니다.");
  }
};

const handleDisplayCreate = (type) => {
  const buttons = targetBody.getElementsByTagName("button");
  const anchor = targetBody.getElementsByTagName("a");

  buttons[0].style.display = type === "create" ? "none" : "inline-block";
  anchor[0].style.display = type === "create" ? "none" : "inline-block";
  buttons[1].style.display = type === "create" ? "inline-block" : "none";
} 

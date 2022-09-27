const targetBody = document.body;
const inputs = targetBody.getElementsByTagName("input");

const handleLoginClicekd = () => {
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
      window.location.href = "signUp.html";
    }
  } else {
    alert("미입력된 필수값이 존재합니다.");
  }
};

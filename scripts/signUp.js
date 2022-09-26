const targetBody = document.body;
const inputs = targetBody.getElementsByTagName("input");

const handleCreateClicekd = () => {
  if (inputs[0].value && inputs[1].value) {
    const signInfo = {
      id: inputs[0].value,
      password: inputs[1].value,
    };

    localStorage.setItem("signInfo", JSON.stringify(signInfo));
    window.location.href = "signIn.html";
  } else {
    alert("미입력된 필수값이 존재합니다.");
  }
};

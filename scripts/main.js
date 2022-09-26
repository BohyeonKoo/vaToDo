window.onload = function () {
  const isSign = localStorage.getItem("isSign");

  if (isSign) {
    window.location.href = `pages/${isSign === true ? "list" : "signIn"}.html`;
  } else {
    window.location.href = `pages/signIn.html`;
  }
};

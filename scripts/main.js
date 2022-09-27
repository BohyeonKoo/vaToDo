window.onload = function () {
  const isSign = localStorage.getItem("isSign");

  if (isSign) {
    window.location.href = `pages/${isSign === true ? "list" : "sign"}.html`;
  } else {
    window.location.href = `pages/sign.html`;
  }
};

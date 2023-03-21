const pwd = document.querySelector("#pwd");
const conf_pwd = document.querySelector("#conf_pwd");
const message1 = document.querySelector("#message1");
const message2 = document.querySelector("#message2");
function verifyPassword(pw) {
  if (pw == "") {
    return "**Fill the password please!";
  }
  if (!/[a-z]/.test(pw)) {
    return "**Must include at least 1 lowercase";
  }
  if (!/[A-Z]/.test(pw)) {
    return "**Must include at least 1 uppercase";
  }
  if (!/[0-9]/.test(pw)) {
    return "**Must include at least 1 number";
  }
  if (!/(?=.*?[\W])/.test(pw)) {
    return "**Password must contain at least one special character.";
  }
  //minimum password length validation
  if (pw.length < 8 || pw.length > 16) {
    return "**Password length must be between 8 and 16 characters.";
  }
  return "Good password";
}

function verifyPasswordConfirmation() {
  if (conf_pwd.value !== pwd.value) {
    return "Password and confirm password do not match.";
  }
  if (verifyPassword(pwd.value) !== "Good password") {
    return "Password does not meet requirements.";
  }
  return "Matched passwords";
}

function updateMessage1(message) {
  message1.textContent = message;
  if (message === "Good password") {
    messageColors(pwd, true);
  } else {
    messageColors(pwd, false);
  }
}

function updateMessage2(message) {
  message2.textContent = message;
  if (message === "Matched passwords") {
    messageColors(conf_pwd, true);
  } else {
    messageColors(conf_pwd, false);
  }
}

function messageColors(tag, valid) {
  const tagMessage = tag.nextSibling.nextSibling;
  if (valid) {
    tag.style.color = "rgb(15, 59, 39)";
    tag.classList.add("pw-valid");
    tag.classList.remove("pw-invalid");
    tagMessage.style.color = "rgb(15, 59, 39)";
  } else {
    tag.style.color = "#d55c5f";
    tag.classList.add("pw-invalid");
    tag.classList.remove("pw-valid");
    tagMessage.style.color = "#d55c5f";
  }
}

pwd.addEventListener("input", (e) => {
  const pwdState = verifyPassword(e.target.value);
  updateMessage1(pwdState);
  const confPwdState = verifyPasswordConfirmation();
  updateMessage2(confPwdState);
});

conf_pwd.addEventListener("input", (e) => {
  const confPwdState = verifyPasswordConfirmation();
  updateMessage2(confPwdState);
});

const form = document.querySelector("form");
form.addEventListener("submit", (e) => {
  if (verifyPasswordConfirmation() === "Matched passwords") {
    confirm("Success.");
  } else {
    e.preventDefault();
    confirm("Password does not match or does not meet requirements.");
  }
});

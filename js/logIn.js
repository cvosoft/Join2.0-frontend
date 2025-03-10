let userArray = [];

let userInput,
  passwordInput = [];

/**
 * onload function for the Login Page (index.html)
 */
function onloadFunction() {
  startAnimation();
  showLogIn();
  loadUserData();
  checkForLocalStorageCookie();
  if (window.innerWidth < vwBreak) {
    document.getElementById("privacyLink").setAttribute("target", "_self");
    document.getElementById("legalLink").setAttribute("target", "_self");
  }
}

/**
 * function to check the local storage (revisiting user)
 */
function checkForLocalStorageCookie() {
  let credAsText = localStorage.getItem("cred");
  if (credAsText) {
    cred = JSON.parse(credAsText);
    document.getElementById("email").value = cred[0];
    document.getElementById("password").value = cred[1];
    document.getElementById("rememberMe").checked = true;
  }
}

/**
 * function to load all the users from the database
 */
async function loadUserData() {
  // let response = await fetch(BASE_URL + "users.json");
  // responseAsJson = await response.json();
  // userArray = Object.values(responseAsJson);
}

/**
 * function for the start animation (flying logo)
 */
function startAnimation() {
  let icon = document.getElementById("icon");
  if (window.innerWidth < 750) {
    icon.src = "../assets/img/join-icon-white.png";
    setTimeout(changeIcon, 700);
  }
  setTimeout(zIndexChange, 900);
}

/**
 * function to change the icon
 */
function changeIcon() {
  icon.src = "../assets/img/join-icon-blue.png";
}

/**
 * function to change the zindex
 */
function zIndexChange() {
  document.getElementById("whiteB").style.zIndex = "-1";
}

/**
 * function to show the signup form
 */
function showSignUp() {
  document.getElementById("middleSection").innerHTML = renderSignUpHTML();
  document.getElementById("signUpSection").style.display = "none";
}

/**
 * function to check if the same password is entered (sign up)
 * @returns true/false
 */
function checkSamePassword() {
  if ((document.getElementById("password").value == document.getElementById("confirmPassword").value) & (document.getElementById("password").value.length > 0)) {
    document.getElementById("inputfieldPasswordConfirm").style.border = "1px solid black";
    return true;
  } else {
    document.getElementById("inputfieldPasswordConfirm").style.border = "1px solid red";
    return false;
  }
}

/**
 * function to check if the sign up button may be enabled
 */
function checkEnableButton() {
  if (document.getElementById("acceptPolicy").checked & checkSamePassword()) {
    document.getElementById("registerButton").disabled = false;
    document.getElementById("registerButton").style.opacity = "1";
  } else {
    document.getElementById("registerButton").disabled = true;
    document.getElementById("registerButton").style.opacity = "0.5";
  }
}

/**
 * function to show the login screen
 */
function showLogIn() {
  document.getElementById("middleSection").innerHTML = renderLogInHTML();
  document.getElementById("signUpSection").style.display = "block";
}

/**
 * function to sign up a new user
 */
async function signUpSuccessful() {
  let email = document.getElementById("email").value;
  let password = document.getElementById("password").value;
  let rep_password = document.getElementById("confirmPassword").value;
  let user = document.getElementById("user").value;
  let register = document.getElementById("middleSection");

  let response = await fetch(BASE_URL + "auth/registration/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username: user.split(" ").join(""),
      email: email,
      password: password,
      repeated_password: rep_password,
    }),
  });
  //loadUserData();
  let data = await response.json();
  //console.log(data);

  let token = data.token;
  let username = data.username;

  if (token) {
    addUserToContacts(user, email, token);
    register.innerHTML += `<div id="signInSuccessful" class="feedback">Username: ${username}</div>`;
    setTimeout(() => {
      showLogIn();
      document.getElementById("username").value = username;
      document.getElementById("password").value = password;
    }, 2000);
  } else {
    register.innerHTML += `<div id="signInSuccessful" class="feedback">Something was wrong. Try again.</div>`;
    setTimeout(removeErrorMessage, 1600);
  }
}

/**
 * function to save the credentials when a user wants to be "remembered"
 */
function saveCredentialsToLocalStorage() {
  let email = document.getElementById("email").value;
  let password = document.getElementById("password").value;
  let cred = [email, password];
  let credAsText = JSON.stringify(cred);
  localStorage.setItem("cred", credAsText);
}

/**
 * function to show a welcome screen (mobile only)
 */
function openWelcomeMobile() {
  window.location = "welcomeMobile.html";
}

/**
 * function to collect the data from the login form and login a user
 */
async function logIn() {
  if (document.getElementById("rememberMe").checked) {
    saveCredentialsToLocalStorage();
  } else {
    localStorage.removeItem("cred");
  }
  let email = document.getElementById("email");
  let username = document.getElementById("username");
  let password = document.getElementById("password");
  let register = document.getElementById("middleSection");

  let data = {
    "username": username.value,
    "password": password.value
  }

  let response = await fetch(BASE_URL + "auth/login/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  let answer = await response.json();

  // let user = userArray.find((u) => u.email == email.value && u.password == password.value);

  if (answer.token) {
    localStorage.setItem("user", answer.username);
    localStorage.setItem("token", answer.token);

    if (window.innerWidth < 1260) {
      openWelcomeMobile();
    } else {
      openSummary();
    }
  } else {
    sleep(0).then(() => {
      document.getElementById("username").value = username.value;
      document.getElementById("password").value = password.value;
    });

    register.innerHTML += /*HTML*/ `
        <div id="signInNoSuccessful" class="feedback">wrong email/password</div>
        `;
    setTimeout(removeNoSuccessfullSignUp, 2000);
  }
}

/**
 * function to remove the user feedback screen (wrong email/password)
 */
function removeNoSuccessfullSignUp() {
  document.getElementById("signInNoSuccessful").remove();
}

function removeErrorMessage() {
  document.getElementById("signInSuccessful").remove();
}

/**
 * function to visit the summary page
 */
function openSummary() {
  window.location = "summary.html";
}




/**
 * function for the guest login
 */
function guestLogIn() {
  let guestToken = "57d42b9507fbe48228ac855bfc6b8ab1154a07a4"
  //let login = document.getElementById("logIn");
  let user = "Guest";
  localStorage.setItem("user", user);
  localStorage.setItem("token", guestToken);
  if (window.innerWidth < 1260) {
    openWelcomeMobile();
  } else {
    openSummary();
  }
}

/**
 * function to add a newly signed up user to the contact list
 * @param {*} user
 * @param {*} email
 */
async function addUserToContacts(user, email, token) {
  //let contacts = await loadData("contacts");
  // split username
  let nameArray = user.split(" ");
  let new_firstName = nameArray[0];
  let new_lastName = nameArray[1];
  let data = {
    firstName: new_firstName,
    lastName: new_lastName,
    email: email,
    phoneNumber: "",
    profileColor: getRandomBackgroundColor(),
  };
  await postData(`contacts/`, data, token);
}

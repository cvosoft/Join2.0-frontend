/* GENERAL FUNCTIONS */
let token = [];

// critical breakpoint of viewport width
let vwBreak = 1350;

//const BASE_URL = "https://join-cvo-default-rtdb.europe-west1.firebasedatabase.app/";
const BASE_URL = "http://127.0.0.1:8000/api/"

/* Background colors for profile initials */
let backgroundProfileColors = [
  "#0038FF",
  "#00BEE8",
  "#1FD7C1",
  "#6E52FF",
  "#9327FF",
  "#C3FF2B",
  "#FC71FF",
  "#FF4646",
  "#FF5EB3",
  "#FF745E",
  "#FF7A00",
  "#FFA35E",
  "#FFBB2B",
  "#FFC701",
  "#FFE62B",
];


function checkForToken() {
  return localStorage.getItem("token");
}

function setToken(token) {
  localStorage.setItem("token", token);
}


function backToIndex() {
  window.location = "index.html";
}

/**
 * function to return a random background profile color for new users
 * @returns string
 */
function getRandomBackgroundColor() {
  // random color from list
  let new_profileColor = backgroundProfileColors[Math.floor(Math.random() * backgroundProfileColors.length)];
  return new_profileColor;
}

/**
 * load data function
 * @param {*} path
 * @returns JSON-Array
 */
async function loadData(path = "", token) {
  let response = await fetch(BASE_URL + path, {
    method: "GET",    
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Token ${token}`
    },
  });
  return (responseToJson = await response.json());
}


async function deleteData(path = "", token) {
  let response = await fetch(BASE_URL + path, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Token ${token}`
    },
  });

  // Prüfen, ob eine Antwort existiert, bevor sie geparst wird
  if (response.status === 204 || response.status === 205) {
    return null; // Kein Inhalt zurückgegeben
  }

}


/**
 * put data function
 * @param {*} path
 * @param {*} data
 * @returns
 */
async function putData(path = "", data = {}, token) {
  //let response = await fetch(BASE_URL + path + ".json", {
  let response = await fetch(BASE_URL + path, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Token ${token}`      
    },
    body: JSON.stringify(data),
  });
  return response.json();
}


async function patchData(path = "", data = {}, token) {
  //let response = await fetch(BASE_URL + path + ".json", {
  let response = await fetch(BASE_URL + path, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Token ${token}`
    },
    body: JSON.stringify(data),
  });
  return response.json();
}


async function postData(path = "", data = {}, token) {
  let response = await fetch(BASE_URL + path, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Token ${token}`
    },
    body: JSON.stringify(data),
  });
  console.log(JSON.stringify(data));

  return response.json();
}



/**
 * include HTML function
 */
async function includeHTML() {
  let includeElements = document.querySelectorAll("[w3-include-html]");
  for (let i = 0; i < includeElements.length; i++) {
    const element = includeElements[i];
    file = element.getAttribute("w3-include-html");
    let resp = await fetch(file);
    if (resp.ok) {
      element.innerHTML = await resp.text();
    } else {
      element.innerHTML = "Page not found";
    }
  }
}

/**
 * function to return the name of the logged in user
 * @returns
 */
function getLoggedInUserName() {
  let user = [];
  let userAsText = localStorage.getItem("user");
  if (userAsText == null) {
    user = { User: "Guest" };
  } else {
    user = JSON.parse(userAsText);
  }
  return user.User;
}

/**
 * function to update the initials in the header
 */
function updateHeaderInitials() {
  let user = getLoggedInUserName();
  if (user == "Guest") {
    document.getElementById("headerInitialsDesktop").innerHTML = user[0];
    document.getElementById("headerInitialsMobile").innerHTML = user[0];
  } else {
    let nameArray = user.split(" ");
    document.getElementById("headerInitialsMobile").innerHTML = `${nameArray[0][0]}${nameArray[1][0]}`;
    document.getElementById("headerInitialsDesktop").innerHTML = `${nameArray[0][0]}${nameArray[1][0]}`;
  }
}

/**
 * function to show the popup when clicking on the header initials
 */
function showHeaderPopup() {
  document.getElementById("body").setAttribute("onclick", "");
  document.getElementById("headerPopup").style.display = "flex";
  sleep(0).then(() => {
    document.getElementById("body").setAttribute("onclick", "closeHeaderPopup()");
  });
}

/**
 * function to show the popup when clicking on the header initials (mobile)
 */
function showHeaderPopupMobile() {
  document.getElementById("body").setAttribute("onclick", "");
  document.getElementById("headerPopupMobile").style.display = "flex";
  sleep(0).then(() => {
    document.getElementById("body").setAttribute("onclick", "closeHeaderPopupMobile()");
  });
}

/**
 * function to close the header popup when clicking anywhere else
 */
function closeHeaderPopup() {
  document.getElementById("headerPopup").style.display = "none";
}

/**
 * function to close the header popup when clicking anywhere else (mobile)
 */
function closeHeaderPopupMobile() {
  document.getElementById("headerPopupMobile").style.display = "none";
}

/**
 * delay function (necessary for making a scrollbar invisible)
 */
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * log out function: deletes the local storage user and shows the loginpage
 */
function logOutUser() {
  localStorage.removeItem("user");
  localStorage.removeItem("cred");
  localStorage.removeItem("token");
  window.location = "index.html";
}

/**
 * function to go back to the previously visited page
 */
function goToPreviousPage() {
  window.history.back();
}

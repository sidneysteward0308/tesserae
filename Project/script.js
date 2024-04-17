const characterAmountRange = document.getElementById('characterAmountRange')
const characterAmountNumber = document.getElementById('characterAmountNumber')
const includeUppercaseElement = document.getElementById('includeUppercase')
const includeNumbersElement = document.getElementById('includeNumbers')
const includeSymbolsElement = document.getElementById('includeSymbols')
const form = document.getElementById('passwordGeneratorForm')
const passwordDisplay = document.getElementById('passwordDisplay')
const passwordsButton = document.getElementById("passwordsButton");
const passwordsModal = document.getElementById("passwordsModal");
const savePasswordButton = document.getElementById("savePasswordButton");
savePasswordButton.addEventListener("click", savePassword);

var solvedState = "";

const UPPERCASE_CHAR_CODES = arrayFromLowToHigh(65, 90)
const LOWERCASE_CHAR_CODES = arrayFromLowToHigh(97, 122)
const NUMBER_CHAR_CODES = arrayFromLowToHigh(48, 57)
const SYMBOL_CHAR_CODES = arrayFromLowToHigh(33, 47).concat(
  arrayFromLowToHigh(58, 64)
).concat(
  arrayFromLowToHigh(91, 96)
).concat(
  arrayFromLowToHigh(123, 126)
)


characterAmountNumber.addEventListener('change', syncCharacterAmount)
characterAmountRange.addEventListener('change', syncCharacterAmount)

passwordsButton.addEventListener("click", function () {
  passwordsModal.style.display = "block";
  fetchGeneratedPasswords();
});

form.addEventListener('submit', e => {
  e.preventDefault()
  const characterAmount = characterAmountNumber.value
  const includeUppercase = includeUppercaseElement.checked
  const includeNumbers = includeNumbersElement.checked
  const includeSymbols = includeSymbolsElement.checked
  const password = generatePassword(characterAmount, includeUppercase, includeNumbers, includeSymbols)
  passwordDisplay.innerText = password
})

document.addEventListener("DOMContentLoaded", function () {
  const openLoginModal = document.getElementById("openLoginModal");
  const loginModal = document.getElementById("loginModal");
  const openRegisterModal = document.getElementById("openRegisterModal");
  const registerModal = document.getElementById("registerModal");
  const closeModalButtons = document.getElementsByClassName("close");

  openLoginModal.addEventListener("click", function () {
    loginModal.style.display = "block";
  });

  openRegisterModal.addEventListener("click", function () {
    registerModal.style.display = "block";
  });

  // Add event listener for closing modals
window.addEventListener("click", function (event) {
  if (event.target === loginModal) {
    loginModal.style.display = "none";
  }
  if (event.target === registerModal) {
    registerModal.style.display = "none";
  }
  if (event.target === passwordsModal) {
    passwordsModal.style.display = "none";
  }
  if(event.target === imagesModal){
    imagesModal.style.display = "none";
  }
  if(event.target === imageUploadModal){
    imageUploadModal.style.display = "none";
  }
});

  // Add event listener for closing modals with close buttons
  const closeButtons = document.getElementsByClassName("close");
for (let i = 0; i < closeButtons.length; i++) {
  closeButtons[i].addEventListener("click", function () {
    loginModal.style.display = "none";
    registerModal.style.display = "none";
    passwordsModal.style.display = "none";
  });
  }
});

function generatePassword(characterAmount, includeUppercase, includeNumbers, includeSymbols) {
  let charCodes = LOWERCASE_CHAR_CODES
  if (includeUppercase) charCodes = charCodes.concat(UPPERCASE_CHAR_CODES)
  if (includeSymbols) charCodes = charCodes.concat(SYMBOL_CHAR_CODES)
  if (includeNumbers) charCodes = charCodes.concat(NUMBER_CHAR_CODES)

  const passwordCharacters = []
  for (let i = 0; i < characterAmount; i++) {
    const characterCode = charCodes[Math.floor(Math.random() * charCodes.length)]
    passwordCharacters.push(String.fromCharCode(characterCode))
  }
  return passwordCharacters.join('')
}

function arrayFromLowToHigh(low, high) {
  const array = []
  for (let i = low; i <= high; i++) {
    array.push(i)
  }
  return array
}

function generatePasswordOnMove() {
  // Call the generatePassword function with your desired parameters
  const characterAmount = characterAmountNumber.value;
  const includeUppercase = includeUppercaseElement.checked;
  const includeNumbers = includeNumbersElement.checked;
  const includeSymbols = includeSymbolsElement.checked;
  const password = generatePassword(characterAmount, includeUppercase, includeNumbers, includeSymbols);
  passwordDisplay.innerText = password;
}

function syncCharacterAmount(e) {
  const value = e.target.value
  characterAmountNumber.value = value
  characterAmountRange.value = value
}

var grid = [[0, 0, false], [100, 0, false], [200, 0, false], [300, 0, false],
[0, 100, false], [100, 100, false], [200, 100, false], [300, 100, false],
[0, 200, false], [100, 200, false], [200, 200, false], [300, 200, false],
[0, 300, false], [100, 300, false], [200, 300, false], [300, 300, true]];

var puzzleAreaContents = document.getElementById("puzzle").children;

var counter = 0;
var timerPaused = false;
document.getElementById("main").insertAdjacentHTML('beforeend', "number of moves: <span id='moves'>0</span>");

document.getElementById("shufflebutton").onclick = function () { shuffle(shuffleTracker); checkTime(); }
document.getElementById("changeImg").onclick = function () { changeImg(); }
document.getElementById("musicbutton").onclick = function () { playMusic(); }

initializePuzzleArea();


function initializePuzzleArea() {
  // set initial configuration
  var x = 0;
  var y = 0;
  for (i = 0; i < puzzleAreaContents.length; i++) {
    puzzleAreaContents[i].setAttribute("class", "puzzlepiece");
    // set top and left
    puzzleAreaContents[i].style.top = y + "px";
    puzzleAreaContents[i].style.left = x + "px";
    // set backgroundPosition - use negative numbers 
    puzzleAreaContents[i].style.backgroundPosition = "-" + x + "px " + "-" + y + "px";
    // increment x by 100 until each 4th columm, then increment y and reset x to 0
    if (x == 300) {
      var y = y + 100;
      var x = 0;
    }
    else { var x = x + 100; }
  }
  document.getElementById("puzzle").innerHTML = document.getElementById("puzzle").innerHTML + "<div class='empty'></div>"
  addEventListeners(getArrayOfMovableCells());
  solvedState = document.getElementById("puzzle").innerHTML;

}

var shuffleTracker = 0;
var numberOfMoves = 0;


var shuffleMoves = [];

function shuffle(shuffleTracker) {
  var rand = getRandomElement();
  shiftPuzzlePiece.call(puzzleAreaContents[rand]);
  shuffleMoves.push(rand);
  if (shuffleTracker < 199) {
    shuffleTracker = shuffleTracker + 1;
    shuffle(shuffleTracker);
  } else {
    shuffleTracker = 0;
    numberOfMoves = 0;
    document.getElementById("moves").innerHTML = numberOfMoves;
  }
}

function addEventListeners(movables) {
  for (i = 0; i < movables.length; i++) {
    puzzleAreaContents[movables[i]].addEventListener("mouseover", addPuzzlePieceHover, false);
    puzzleAreaContents[movables[i]].addEventListener("mouseout", removePuzzlePieceHover, false);
    puzzleAreaContents[movables[i]].addEventListener("click", shiftPuzzlePiece);
  }
}

function removeEventListeners(movables) {
  for (i = 0; i < movables.length; i++) {
    puzzleAreaContents[movables[i]].removeEventListener("mouseover", addPuzzlePieceHover, false);
    puzzleAreaContents[movables[i]].removeEventListener("mouseout", removePuzzlePieceHover, false);
    puzzleAreaContents[movables[i]].removeEventListener("click", shiftPuzzlePiece, false);
  }
}

function getRandomElement() {
  var movables = getArrayOfMovableCells();
  return movables[Math.floor(Math.random() * movables.length)];
}

function openBlock() {
  // find open block in grid[]
  for (i = 0; i < grid.length; i++) {
    if (grid[i][2] == true) { return i; }
  }
}

function getArrayOfMovableCells() {
  var open = openBlock()
  var movables = [open - 4, open - 1, open + 1, open + 4]
  // purge out of bounds indexes
  var count = movables.length;
  for (i = 0; i < count; i++) {
    // check down
    if (movables[i] < 0) { movables[i] = null }
    // check up
    if (movables[i] > 15) { movables[i] = null }
    // check right
    if (open == 3 || open == 7 || open == 11) { movables[movables.indexOf(open + 1)] = null }
    // check left
    if (open == 4 || open == 8 || open == 12) { movables[movables.indexOf(open - 1)] = null }
  }
  movables = movables.filter(function (val) { return val !== null; })
  return movables;
}

function addPuzzlePieceHover() {
  this.className = this.className + " puzzlepiecehover";
}

function removePuzzlePieceHover() {
  this.className = "puzzlepiece";
}

function shiftPuzzlePiece() {
  // increment moves
  numberOfMoves = numberOfMoves + 1;
  document.getElementById("moves").innerHTML = numberOfMoves;
  generatePasswordOnMove();

  // move touched piece
  this.style.left = grid[openBlock()][0] + "px";
  this.style.top = grid[openBlock()][1] + "px";
  //reset hover state, because mouseout event never actually happened after click event

  this.className = "puzzlepiece";

  // convert the htmlCollection to a real array, and then back into html
  var collection = Array.prototype.slice.call(puzzleAreaContents)
  var movedBlock = collection.indexOf(this)
  var openBlockIndex = collection.indexOf(puzzleAreaContents[openBlock()])

  var switchVariable = collection[movedBlock];
  collection[movedBlock] = collection[openBlockIndex];
  collection[openBlockIndex] = switchVariable;



  document.getElementById("puzzle").innerHTML = ""
  for (i = 0; i < collection.length; i++) {
    document.getElementById("puzzle").innerHTML = document.getElementById("puzzle").innerHTML + collection[i].outerHTML;
  }

  // set current unit to false, unit.open? #=> false
  grid[openBlock()][2] = false;
  // set touched unit to true, unit.open? #=> true
  grid[movedBlock][2] = true;

  // var movables = getArrayOfMovableCells();
  // remove old listeners
  removeEventListeners(getArrayOfMovableCells());
  // if complete, break out of everything
  if (checkIfComplete() == true) { return }
  // add new listeners to new set of movables
  addEventListeners(getArrayOfMovableCells());
}


function checkIfComplete() {
  var check = ""
  var arr = document.getElementById("puzzle").children;
  for (i = 0; i < arr.length; i++) {
    check = check + arr[i].innerHTML;
  }
  if (check == "123456789101112131415" && numberOfMoves >= 10) {
    stopTimer();
    celebrate();
    return true;
  }
}



//EXTRA FEATURE: Multiple backgrounds
var images = [
  "url(images/ourimage.jpg)",
  "url(images/image2.jpg)",
  "url(images/image3.jpg)",
  "url(images/image4.jpg)",
  "url(images/image5.jpg)",
  "url(images/image6.jpg)",
  "url(images/image11.jpg)"
];

var currentImageIndex = 0;

function changeImg() {
  let puzz = document.getElementById('puzzle').children;
  currentImageIndex = (currentImageIndex + 1) % images.length;

  for (let j = 0; j < puzz.length; j++) {
    let child = puzz[j];
    child.style.backgroundImage = images[currentImageIndex];
  }

  const celebrateMsg = document.getElementById("celebrate");
  celebrateMsg.innerText = "        ";
  // celebrateMsg.style.display = "none";

  numberOfMoves = 0;
  document.getElementById("moves").innerHTML = numberOfMoves;

  solvedState = document.getElementById("puzzle").innerHTML;
  shuffleMoves = [];
  resetTimer();
}

//EXTRA FEATURE: End-of-game notification and Extra Animation

function celebrate() {
  const celebrateMsg = document.getElementById("celebrate");
  celebrateMsg.innerText = "Congratulations! Your Password is created!";
  celebrateMsg.style.display = "block";
  winImage();
}


// Add an event listener to the refresh button
document.getElementById("resetButton").addEventListener("click", function () {
  // Reload the page
  location.reload();
  resetTimer();
});


function checkTime() {
  const ret = document.getElementById("timer");
  let interval;
  interval = setInterval(function () {
    if (!timerPaused) {
      ret.innerHTML = convertSec(counter++); // timer start counting here...
    }
  }, 1000);

}

function convertSec(cnt) {
  let sec = cnt % 60;
  let min = Math.floor(cnt / 60);
  if (sec < 10) {
    if (min < 10) {
      return "0" + min + ":0" + sec;
    } else {
      return min + ":0" + sec;
    }
  } else if ((min < 10) && (sec >= 10)) {
    return "0" + min + ":" + sec;
  } else {
    return min + ":" + sec;
  }
}


function resetTimer() {
  document.getElementById("timer").innerHTML = "00:00";
  counter = 0;
}
function stopTimer() {
  timerPaused = true;
}


function solveAutomatically() {
  var solveMoves = [];
  var openIndex = openBlock();

  // Find the moves to solve the puzzle based on the shuffle moves
  for (var i = shuffleMoves.length - 1; i >= 0; i--) {
    var move = shuffleMoves[i];
    var targetIndex = grid.findIndex(function (cell) {
      return cell[0] === grid[move][0] && cell[1] === grid[move][1];
    });

    if (targetIndex !== openIndex) {
      solveMoves.push(targetIndex);
      openIndex = move;
    }
  }

  // Execute the solve moves
  var interval = setInterval(function () {
    if (solveMoves.length > 0) {
      var moveIndex = solveMoves.shift();
      shiftPuzzlePiece.call(puzzleAreaContents[moveIndex]);
    } else {
      clearInterval(interval);
      generatePasswordOnMove();
    }
  }, 175);



}
document.getElementById("generatePasswordButton").addEventListener("click", function () {
  // if (numberOfMoves >= 100) {
  //   solvePuzzleInstantly();
  // } else {
  solveAutomatically();
  // }
});

//ignore
// function solvePuzzleInstantly() {
//   document.getElementById("puzzle").innerHTML = initialState;
//   grid = [
//     [0, 0, false], [100, 0, false], [200, 0, false], [300, 0, false],
//     [0, 100, false], [100, 100, false], [200, 100, false], [300, 100, false],
//     [0, 200, false], [100, 200, false], [200, 200, false], [300, 200, false],
//     [0, 300, false], [100, 300, false], [200, 300, false], [300, 300, true]
//   ];
//   generatePasswordOnMove();
// }

// Login form submission handler
document.getElementById("loginForm").addEventListener("submit", function (event) {
  event.preventDefault();

  // Send an AJAX request to the loginpage.php script
  var xhr = new XMLHttpRequest();
  xhr.open("POST", "php/loginpage.php", true);
  xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xhr.onload = function () {
    if (xhr.status === 200) {
      var response = JSON.parse(xhr.responseText);
      if (response.status === "success") {
        // Login successful, redirect to the main page
        window.location.href = "index.html";
      } else {
        // Login failed, display the error message
        alert(response.message);
      }
    }
  };
  var formData = new FormData(document.getElementById("loginForm"));
  xhr.send(new URLSearchParams(formData).toString());
});

// Check if the user is logged in
function checkLoginStatus() {
  // Send an AJAX request to check the login status
  var xhr = new XMLHttpRequest();
  xhr.open("GET", "php/checklogin.php", true);
  xhr.onload = function () {
    if (xhr.status === 200) {
      var response = JSON.parse(xhr.responseText);
      if (response.status === "loggedin") {
        // User is logged, display appropiate content
        document.getElementById("openLoginModal").style.display = "none";
        document.getElementById("openRegisterModal").style.display = "none";
        document.getElementById("logoutButton").style.display = "block";
        document.getElementById("passwordsButton").style.display = "block";
        document.getElementById("savePasswordButton").style.display = "block"; 
        document.getElementById("openImageUploadModal").style.display = "inline-block";
        document.getElementById("imagesButton").style.display = "block";
      } else {
        // User is not logged in, do not display content
        document.getElementById("openLoginModal").style.display = "block";
        document.getElementById("openRegisterModal").style.display = "block";
        document.getElementById("logoutButton").style.display = "none";
        document.getElementById("passwordsButton").style.display = "none";
        document.getElementById("savePasswordButton").style.display = "none";
        document.getElementById("openImageUploadModal").style.display = "none";
        document.getElementById("imagesButton").style.display = "none";
  
      }
    }
  };
  xhr.send();
}

// Check login status when the page loads
document.addEventListener("DOMContentLoaded", function () {
  checkLoginStatus();
});

// Logout button click event handler
document.getElementById("logoutButton").addEventListener("click", function () {
  // Send an AJAX request to logout.php to destroy the session
  var xhr = new XMLHttpRequest();
  xhr.open("GET", "php/logout.php", true);
  xhr.onload = function () {
    if (xhr.status === 200) {
      // Logout successful, refresh the page
      location.reload();
    }
  };
  xhr.send();
});

// Continue button click event handler
document.getElementById("continueButton").addEventListener("click", function () {
  // Hide the username and password fields
  document.getElementById("newUsername").style.display = "none";
  document.getElementById("newPassword").style.display = "none";
  document.getElementById("continueButton").style.display = "none";

  // Display the security question fields
  document.getElementById("securityQuestionsContainer").style.display = "block";
});

// Register form submission handler
document.getElementById("registerForm").addEventListener("submit", function (event) {
  event.preventDefault();

  // Send an AJAX request to the registerpage.php script
  var xhr = new XMLHttpRequest();
  xhr.open("POST", "php/registerpage.php", true);
  xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xhr.onload = function () {
    if (xhr.status === 200) {
      console.log(xhr.response);
      var response = JSON.parse(xhr.responseText);
      if (response.status === "success") {
        // Registration successful, close the modal and reload the page
        document.getElementById("registerModal").style.display = "none";
        location.reload();
      } else {
        // Registration failed, display the error message
        alert(response.message);
      }
    }
  };
  var formData = new FormData(document.getElementById("registerForm"));
  xhr.send(new URLSearchParams(formData).toString());
});

function fetchGeneratedPasswords() {
  var passwordsList = document.getElementById("passwordsTableBody");
  passwordsList.innerHTML = ""; // Clear the password list
  var xhr = new XMLHttpRequest();
  xhr.open("GET", "php/getpasswords.php", true);
  xhr.onload = function () {
    if (xhr.status === 200) {
      var response = JSON.parse(xhr.responseText);
      if (response.status === "success") {
        displayGeneratedPasswords(response.passwords);
      } else {
        alert("Failed to fetch generated passwords.");
      }
    }
  };
  xhr.send();
}


function displayGeneratedPasswords(passwords) {
  var passwordsTableBody = document.getElementById("passwordsTableBody");
  passwordsTableBody.innerHTML = "";

  passwords.forEach(function (passwordData) {
    var row = document.createElement("tr");
    var identifierCell = document.createElement("td");
    identifierCell.textContent = passwordData.identifier;
    row.appendChild(identifierCell);

    var passwordCell = document.createElement("td");
    passwordCell.textContent = passwordData.password;
    row.appendChild(passwordCell);

    var creationDateCell = document.createElement("td");
    creationDateCell.textContent = passwordData.creation_date;
    row.appendChild(creationDateCell);

    passwordsTableBody.appendChild(row);
  });
}


function savePassword() {
  var xhr = new XMLHttpRequest();
  xhr.open("GET", "php/checklogin.php", true);
  xhr.onload = function () {
    if (xhr.status === 200) {
      var response = JSON.parse(xhr.responseText);
      if (response.status === "loggedin") {
        const password = passwordDisplay.innerText;
        const identifier = prompt("Enter a password identifier:"); // Prompt for password identifier
        if (identifier !== null) {
          var xhr2 = new XMLHttpRequest();
          xhr2.open("POST", "php/savepassword.php", true);
          xhr2.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
          xhr2.onload = function () {
            if (xhr2.status === 200) {
              var response2 = JSON.parse(xhr2.responseText);
              if (response2.status === "success") {
                alert("Password saved successfully!");
                fetchGeneratedPasswords(); // Refresh the password list
              } else {
                alert("Failed to save the password. Please try again.");
              }
            }
          };
          xhr2.send("password=" + encodeURIComponent(password) + "&identifier=" + encodeURIComponent(identifier));
        }
      } else {
        alert("Please log in to save the password.");
      }
    }
  };
  xhr.send();
}

document.getElementById("forgotPasswordLink").addEventListener("click", function (event) {
  event.preventDefault();
  document.getElementById("forgotPasswordModal").style.display = "block";
});

document.getElementById("forgotPasswordForm").addEventListener("submit", function (event) {
  event.preventDefault();
  const username = document.getElementById("forgotUsername").value;
  // Send username to server for verification
  verifyUsername(username);
});

document.getElementById("verifyAnswersButton").addEventListener("click", function () {
  const username = document.getElementById("forgotUsername").value;
  const question1 = document.getElementById("forgotQuestion1").value;
  const question2 = document.getElementById("forgotQuestion2").value;
  const question3 = document.getElementById("forgotQuestion3").value;
  // Send security question answers to server for verification
  verifySecurityQuestions(username, question1, question2, question3);
});

let forgotUsername; // Declare a variable to store the username

function verifyUsername(username) {
  forgotUsername = username; // Store the username in the variable
  var xhr = new XMLHttpRequest();
  xhr.open("POST", "php/verifyusername.php", true);
  xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xhr.onload = function () {
    if (xhr.status === 200) {
      var response = JSON.parse(xhr.responseText);
      if (response.status === "success") {
        // Username exists, show security questions
        document.getElementById("forgotPasswordForm").style.display = "none";
        document.getElementById("securityQuestionsContainerr").style.display = "block";
      } else {
        alert("Username not found. Please try again.");
      }
    }
  };
  xhr.send("username=" + encodeURIComponent(username));
}


function verifySecurityQuestions(username, question1, question2, question3) {
  var xhr = new XMLHttpRequest();
  xhr.open("POST", "php/verifysecurityquestions.php", true);
  xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xhr.onload = function () {
    if (xhr.status === 200) {
      var response = JSON.parse(xhr.responseText);
      if (response.status === "success") {
        // Security question answers are correct, allow password reset
        alert("Security questions verified. You can now reset your password.");
        document.getElementById("forgotPasswordModal").style.display = "none";
        document.getElementById("resetPasswordModal").style.display = "block";
      } else {
        alert("Incorrect answers. Please try again.");
      }
    }
  };
  xhr.send("username=" + encodeURIComponent(username) + "&question1=" + encodeURIComponent(question1) + "&question2=" + encodeURIComponent(question2) + "&question3=" + encodeURIComponent(question3));
}

document.getElementById("resetPasswordForm").addEventListener("submit", function (event) {
  event.preventDefault();
  const newPassword = document.getElementById("newwPassword").value;
  const confirmPassword = document.getElementById("confirmPassword").value;
  if (newPassword === confirmPassword) {
    // Send the new password to the server for updating
    resetPassword(forgotUsername, newPassword);
  } else {
    alert("Passwords do not match. Please try again.");
  }
});

function resetPassword(username, newPassword) {
  var xhr = new XMLHttpRequest();
  xhr.open("POST", "php/resetpassword.php", true);
  xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xhr.onload = function () {
    if (xhr.status === 200) {
      var response = JSON.parse(xhr.responseText);
      if (response.status === "success") {
        alert("Password reset successful. You can now login with your new password.");
        document.getElementById("resetPasswordModal").style.display = "none";
      } else {
        alert("Failed to reset password. Please try again.");
      }
    }
  };
  xhr.send("username=" + encodeURIComponent(username) + "&newPassword=" + encodeURIComponent(newPassword));
}

document.getElementById("openImageUploadModal").addEventListener("click", function () {
  document.getElementById("imageUploadModal").style.display = "inline-block";
});

document.getElementById("imageUploadForm").addEventListener("submit", function (event) {
  event.preventDefault();
  const imageFile = document.getElementById("imageFile").files[0];
  const formData = new FormData();
  formData.append("imageFile", imageFile);
  uploadImage(formData);
});


function uploadImage(formData) {
  var xhr = new XMLHttpRequest();
  xhr.open("POST", "php/uploadimage.php", true);
  xhr.onload = function () {
    if (xhr.status === 200) {
      var response = JSON.parse(xhr.responseText);
      if (response.status === "success") {
        alert("Image uploaded successfully.");
        document.getElementById("imageUploadModal").style.display = "none";
        // Refresh the puzzle image
        refreshPuzzleImage();
      } else {
        alert("Failed to upload image. Please try again.");
      }
    }
  };
  xhr.send(formData);
}

function refreshPuzzleImage() {
  var xhr = new XMLHttpRequest();
  xhr.open("GET", "php/getuploadedimage.php", true);
  xhr.onload = function () {
    if (xhr.status === 200) {
      var response = JSON.parse(xhr.responseText);
      if (response.status === "success") {
        var imageUrl = response.imageUrl;
        updatePuzzleImage(imageUrl);
      }
    }
  };
  xhr.send();
}

//set puzzle to be new image
function updatePuzzleImage(imageUrl) {
  var puzzlePieces = document.getElementsByClassName("puzzlepiece");
  for (var i = 0; i < puzzlePieces.length; i++) {
    puzzlePieces[i].style.backgroundImage = "url('" + imageUrl + "')";
  }
}

const imagesButton = document.getElementById("imagesButton");
const imagesModal = document.getElementById("imagesModal");

imagesButton.addEventListener("click", function () {
  imagesModal.style.display = "block";
  fetchUploadedImages();
});


//get the user uploaded images
function fetchUploadedImages() {
  var xhr = new XMLHttpRequest();
  xhr.open("GET", "php/getuploadedimages.php", true);
  xhr.onload = function () {
    if (xhr.status === 200) {
      var response = JSON.parse(xhr.responseText);
      if (response.status === "success") {
        displayUploadedImages(response.images);
      } else {
        alert("Failed to fetch uploaded images.");
      }
    }
  };
  xhr.send();
}


//display images and allow user to select one for puzzle
function displayUploadedImages(images) {
  var imageGallery = document.getElementById("imageGallery");
  imageGallery.innerHTML = "";

  images.forEach(function (imageUrl) {
    var image = document.createElement("img");
    image.src = imageUrl;
    image.addEventListener("click", function () {
      setSelectedImage(imageUrl);
      imagesModal.style.display = "none";
    });
    imageGallery.appendChild(image);
  });
}

function setSelectedImage(imageUrl) {
  updatePuzzleImage(imageUrl);
}




document.onreadystatechange = function () {
    if (document.readyState == "complete") {

      
const characterAmountRange = document.getElementById('characterAmountRange')
const characterAmountNumber = document.getElementById('characterAmountNumber')
const includeUppercaseElement = document.getElementById('includeUppercase')
const includeNumbersElement = document.getElementById('includeNumbers')
const includeSymbolsElement = document.getElementById('includeSymbols')
const form = document.getElementById('passwordGeneratorForm')
const passwordDisplay = document.getElementById('passwordDisplay')

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

characterAmountNumber.addEventListener('input', syncCharacterAmount)
characterAmountRange.addEventListener('input', syncCharacterAmount)

form.addEventListener('submit', e => {
  e.preventDefault()
  const characterAmount = characterAmountNumber.value
  const includeUppercase = includeUppercaseElement.checked
  const includeNumbers = includeNumbersElement.checked
  const includeSymbols = includeSymbolsElement.checked
  const password = generatePassword(characterAmount, includeUppercase, includeNumbers, includeSymbols)
  passwordDisplay.innerText = password
})

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
	
      var grid =  [[0,0,false],[100,0,false],[200,0,false],[300,0,false],
                   [0,100,false],[100,100,false],[200,100,false],[300,100,false],
                   [0,200,false],[100,200,false],[200,200,false],[300,200,false],
                   [0,300,false],[100,300,false],[200,300,false],[300,300,true]];

      var puzzleAreaContents = document.getElementById("puzzle").children;
	  
	  var counter=0;
	  var timerPaused=false;
      document.getElementById("main").insertAdjacentHTML('beforeend', "number of moves: <span id='moves'>0</span>");
	  
	  document.getElementById("shufflebutton").onclick = function(){shuffle(shuffleTracker);checkTime();}
	  document.getElementById("changeImg").onclick = function(){changeImg();}
	  document.getElementById("musicbutton").onclick = function(){playMusic();}

      initializePuzzleArea();
	  
	  function initializePuzzleArea() {
        // set initial configuration
        var x = 0;
        var y = 0;
        for (i = 0; i < puzzleAreaContents.length; i++) {
          puzzleAreaContents[i].setAttribute("class", "puzzlepiece");
          // set top and left
          puzzleAreaContents[i].style.top = y+"px" ;
          puzzleAreaContents[i].style.left = x+"px" ;
          // set backgroundPosition - use negative numbers 
          puzzleAreaContents[i].style.backgroundPosition = "-"+x+"px "+"-"+y+"px" ;
          // increment x by 100 until each 4th columm, then increment y and reset x to 0
          if (x==300)
          {var y = y + 100; 
           var x = 0; }
          else{var x = x + 100;}
        }
        document.getElementById("puzzle").innerHTML = document.getElementById("puzzle").innerHTML + "<div class='empty'></div>"
        addEventListeners(getArrayOfMovableCells());
		
      }
	  
	  var shuffleTracker = 0;
      var numberOfMoves = 0;
	  
      function shuffle(shuffleTracker) {

        var rand = getRandomElement();
        shiftPuzzlePiece.call(puzzleAreaContents[rand]);
        if (shuffleTracker < 199) 
          { 
            shuffleTracker = shuffleTracker + 1;
            // recusively shuffle 99 times 
            shuffle(shuffleTracker)
          }
          else {
            // reset
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
          if (grid[i][2] == true){return i;}
        }
      }

      function getArrayOfMovableCells() {
        var open = openBlock()
        var movables = [open-4, open-1, open+1, open+4]
        // purge out of bounds indexes
        var count = movables.length;
        for (i = 0; i < count; i++) {
          // check down
          if (movables[i] < 0) {movables[i] = null}            
          // check up
          if (movables[i] > 15) {movables[i] = null}
          // check right
          if (open == 3 || open == 7 || open == 11 ) { movables[movables.indexOf(open+1)] = null }
          // check left
          if (open == 4 || open == 8 || open == 12 ) { movables[movables.indexOf(open-1)] = null }
        }
        movables = movables.filter(function(val) { return val !== null; })
        return movables;
      }

      function addPuzzlePieceHover() {this.className = this.className + " puzzlepiecehover";
      }

      function removePuzzlePieceHover() {this.className = "puzzlepiece";
      }

      function shiftPuzzlePiece() {
        // increment moves
        numberOfMoves = numberOfMoves + 1;
        document.getElementById("moves").innerHTML = numberOfMoves;
        generatePasswordOnMove();

        
        // move touched piece
        this.style.left = grid[openBlock()][0]+"px";
        this.style.top = grid[openBlock()][1]+"px";
        // reset hover state, because mouseout event never actually happened after click event
        this.className = "puzzlepiece";

        // convert the htmlCollection to a real array, and then back into html
        var collection = Array.prototype.slice.call( puzzleAreaContents )
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
        if (checkIfComplete() == true) {return} 
        // add new listeners to new set of movables
        addEventListeners(getArrayOfMovableCells());
      }
      function checkIfComplete() {
        var check = ""
        var arr = document.getElementById("puzzle").children;
        for (i = 0; i < arr.length; i++) {
          check = check + arr[i].innerHTML ;
        }
        if (check == "123456789101112131415" && numberOfMoves >= 10) {
          celebrate();
		  return true;
        }
      }	 
//EXTRA FEATURE: Multiple backgrounds
	  var t = 1;
	  function changeImg() {  
		  let puzz = document.getElementById('puzzle').children;
		  if (t === 5) t = 0; 
		 for (let j = 0; j < puzz.length; j++) {
           let child = puzz[j];
           if (t === 1){
		   child.style.backgroundImage = "url(image2.jpg)";
		  } else if (t === 2){
		  child.style.backgroundImage = "url(image3.jpg)";
		  } else if (t === 3){
		  child.style.backgroundImage = "url(image4.jpg)";
		  }else if (t === 4){
		  child.style.backgroundImage = "url(image5.jpg)";
		  } else child.style.backgroundImage = "url(image11.jpg)";
        }t++;
		  
	}
	
//EXTRA FEATURE: End-of-game notification and Extra Animation
	
function celebrate() {
  const celebrateMsg = document.getElementById("celebrate");
  celebrateMsg.innerText = "Congratulations! Your Password is created!";
  celebrateMsg.style.display = "block";
  winImage();
}


// Add an event listener to the refresh button
document.getElementById("resetButton").addEventListener("click", function() {
  // Reload the page
  location.reload();
  resetTimer();
});


	 function checkTime(){
		  const ret = document.getElementById("timer");		 
		  let interval;
		  interval = setInterval(function() {
			  if(!timerPaused){
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
	  
	  function resetTimer(){
		  document.getElementById("timer").innerHTML ="00:00";
		  counter=0;
	  }
	  function stopTimer(){
		  timerPaused= true;
	  }

	 
	}

}
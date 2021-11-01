// Randomly picking two 4-digit number
var trueDigits = new Set();
var falseDigits = new Set();
var sameSituation = [];
var computingArray = [];
var playerGuesses = [];
var computerGuesses = [];
var totalGuesses = 0;
var firstguess = "";
var secondguess = "";
var computerNum = "";
var playerNum = 1324;

var falseDigitsList  = [];
var trueDigitsList = [];

var remainingPosibilities = [];
var remainingPosibilitiesClone = [];
var alreadyDone = false;
var guess = null;


var digits = [0,1,2,3,4,5,6,7,8,9];

for(let i=0;i<4;i++){
    let randomdigit = Math.floor(Math.random() * (10-i));
    while(i==0 && randomdigit == 0){
      randomdigit = Math.floor(Math.random() * (10-i));
    }
    computerNum += digits[randomdigit];
    digits.splice(randomdigit,1);
}

digits = [0,1,2,3,4,5,6,7,8,9];

for(let i=0;i<4;i++){
    let randomdigit = Math.floor(Math.random() * (10-i));
    while(i==0 && randomdigit == 0){
      randomdigit = Math.floor(Math.random() * (10-i));
    }
    firstguess += digits[randomdigit];
    digits.splice(randomdigit,1);
}
for(let i=0;i<4;i++){
    let randomdigit = Math.floor(Math.random() * (6-i));
    while(i==0 && randomdigit == 0){
      randomdigit = Math.floor(Math.random() * (6-i));
    }
    secondguess += digits[randomdigit];
    digits.splice(randomdigit,1);
}

function checkNums(){
    size = computingArray.length;
    for (let i = size-1; i>-1 ;i--){
        if (computingArray[i][0] == computingArray[i][1].length){
            for(let j = 0;j<computingArray[i][1].length;j++){
                trueDigits.add(computingArray[i][1][j]);
                trueDigitsList.push(computingArray[i][1][j]);
            }
            computingArray.splice(i,1);
            continue
        }
        if(computingArray[i][0]==0){
            for(let j = 0; j < computingArray[i][1].length;j++){
                falseDigits.add(computingArray[i][1][j]);
                falseDigitsList.push(computingArray[i][1][j]);
            }
            computingArray.splice(i,1);
        }
    }
}

function recursiveMixer(digitlist,k=0){
    if(digitlist.length == 0){
        return [];
    }
    if(digitlist.length == k+1){
        return [digitlist[digitlist.length-1]];
    }
    digitlist=digitlist.sort();
    let result = [];
    lastList = recursiveMixer(digitlist,k+1);
    for(let i = 0; i < lastList.length;i++){
        for(let j = 0; j <= lastList[0].length;j++){
            if(digitlist[k] !=0 ) {
               let strDigit = digitlist[k].toString();
               result.push(lastList[i].slice(0, j) + "" + strDigit + "" + lastList[i].slice(j));
            }
            else if(j != 0){
                let strDigit = digitlist[k].toString();
                result.push(lastList[i].slice(0, j) + "" + strDigit + "" + lastList[i].slice(j));
            }
        }
    }
    return result;
}

function addComputingArray(totalTrueNumbers,guess){
    let strguess = guess.toString();
    let digitslist = [];
    for(let i =0 ; i < strguess.length;i++){
        digitslist.push(strguess[i]);
    }
    computingArray.push([totalTrueNumbers,digitslist]);
}

function makeGuess(newGuessDigits){
    stringNums = [];
    for (let i = 0; i < newGuessDigits.length ; i++){
        stringNums.push(newGuessDigits[i].toString());
    }
    let possibilities = recursiveMixer(stringNums);
    let chosen = possibilities[Math.floor(Math.random() * possibilities.length)];
    chosen = parseInt(chosen);
    return chosen;
}

function compareGuess(newGuess,numBeingGuessed){
    plus = 0;
    minus = 0;
    newGuess = newGuess.toString();
    numBeingGuessed = numBeingGuessed.toString();
    for(let i = 0;i < 4;i++){
        for(let j = 0;j < 4;j++){
            if(newGuess[i] == numBeingGuessed[j] && i == j){
                plus++;
            }
            if(newGuess[i] == numBeingGuessed[j] && i != j){
                minus++;
            }
        }
    }
    return[plus,minus];
}
function hasdiffdigits(num){
     num = num.toString();
     for(let i = 0 ;i < 4;i++){
        for(let j = i;j < 4;j++){
            if(i != j && num[i] == num[j]){
                return false;
            }
        }
    }
    return true;
}
function inPGuesses(num){
    for(let i = 0;i<playerGuesses.length;i++){
        if( playerGuesses[i][0] == num){
            return true;
        }
    }
    return false;
}

function startGame() {
    let input = document.getElementById("starterInput");
    let num = parseInt(input.value);
    if (1000 < num && num < 10000) {
        if (hasdiffdigits(num) == false) {
            alert("Given number doesn't have 4 distinct digits!");
            document.getElementById("starterInput").value = null;
            return;
        }
        playerNum = num;
        document.getElementById("header").innerText = "("+playerNum+") Player's Guesses ________ Computer's Guesses (????)";
        document.getElementById("starterInput").style.display = "none";
        document.getElementById("button2").style.display = "none";
        document.getElementById("inputBox").style.display = "inline-block";
        document.getElementById("button1").style.display = "inline-block";
        return;

    }
    alert("Given input is not a 4-digit number!");
    document.getElementById("starterInput").value = null;
    return;
}

function checkIfFinished(){
    if(totalGuesses >= 16){
        document.getElementById("header").innerText = "("+playerNum+") Player's Guesses ________ Computer's Guesses ("+ computerNum+")";
        document.getElementById("player").innerText = "DRAW!";
        document.getElementById("button1").style.display = "none";
        document.getElementById("inputBox").style.display = "none";
        document.getElementById("button4").style.display = "inline-block";

        return true;
    }
    if(playerGuesses.length != 0 && playerGuesses[playerGuesses.length -1][1] == 4){
        document.getElementById("header").innerText = "("+playerNum+") Player's Guesses ________ Computer's Guesses ("+ computerNum+")";
        document.getElementById("player").innerText = "PLAYER";
        document.getElementById("won").innerText = "WON!";
        document.getElementById("button1").style.display = "none";
        document.getElementById("inputBox").style.display = "none";
        document.getElementById("button3").style.display = "inline-block";

        document.getElementById("we_are_champions").play();

        return true;
    }
    if(computerGuesses != 0 && computerGuesses[computerGuesses.length -1][1] == 4){
        document.getElementById("header").innerText = "("+playerNum+") Player's Guesses ________ Computer's Guesses ("+ computerNum+")";
        document.getElementById("player").innerText = "COMPUTER";
        document.getElementById("won").innerText = "WON!";
        document.getElementById("button1").style.display = "none";
        document.getElementById("inputBox").style.display = "none";
        document.getElementById("button3").style.display = "inline-block";



        return true;
    }
    return false;
}

function takeInput(){
      let input = document.getElementById("inputBox");
      let num = parseInt(input.value);
      if (1000< num && num < 10000){
          if(hasdiffdigits(num) == false){
              alert("Given number doesn't have 4 distinct digits!");
              document.getElementById("inputBox").value = null;
              return;
          }
          if(inPGuesses(num,playerGuesses)){
              alert("Given number has been guessed before!");
              document.getElementById("inputBox").value = null;
              return;
          }
          let plusMinus = compareGuess(num,computerNum);
          let plus = plusMinus[0];
          let minus = plusMinus[1];
          playerGuesses.push([num,plus,minus]);
          totalGuesses++;
          document.getElementById("pguess"+totalGuesses).innerHTML= num ;
          document.getElementById("pguessr"+totalGuesses).innerHTML= "+" + plus + " -" + minus;

          var newComGuess = calculateGuess();

          let comPlusMinus = compareGuess(newComGuess,playerNum);
          let cplus = comPlusMinus[0];
          let cminus = comPlusMinus[1];
          computerGuesses.push([newComGuess,cplus,cminus]);
          document.getElementById("cguess"+totalGuesses).innerHTML= newComGuess ;
          document.getElementById("cguessr"+totalGuesses).innerHTML= "+" + cplus + " -" + cminus;
          document.getElementById("inputBox").value = null;

          if(plus == 0 && minus == 0){
              document.getElementById("pguess"+totalGuesses).style.color = "gold";
              document.getElementById("pguessr"+totalGuesses).style.color = "gold";
              document.getElementById("holy_sound").play();
          }

          if(cplus == 0 && cminus == 0){
              document.getElementById("cguess"+totalGuesses).style.color = "gold";
              document.getElementById("cguessr"+totalGuesses).style.color = "gold";
              document.getElementById("holy_sound").play();
          }

          checkIfFinished();

          return;
          }
      alert("Given input is not a 4-digit number!" );
      document.getElementById("inputBox").value = null;
      return;
}

function calculateGuess() {
    if(totalGuesses == 1) {
        let comparisonResult1 = compareGuess(firstguess,playerNum);
        addComputingArray((comparisonResult1[0] + comparisonResult1[1]),parseInt(firstguess));
        checkNums();
        return firstguess;
    }
    if(totalGuesses == 2) {
        let comparisonResult1 = compareGuess(firstguess,playerNum);
        let comparisonResult2 = compareGuess(secondguess,playerNum);
            addComputingArray(comparisonResult2[0] + comparisonResult2[1],parseInt(secondguess));
            computingArray.push([(4-comparisonResult1[0] - comparisonResult1[1] - comparisonResult2[0] - comparisonResult2[1]),digits]);
            checkNums();
        return secondguess;
    }

    if(computingArray.length == 0){
        if(alreadyDone == false){
            let iterator = trueDigits.values();
            let strTrueDigits = [];
            for(let i = 0;i < 4;i++){
                 let value = iterator.next().value;
                 strTrueDigits.push(value.toString());
            }
            remainingPosibilities = recursiveMixer(strTrueDigits);
            remainingPosibilitiesClone = recursiveMixer(strTrueDigits);
            for(let i= remainingPosibilities.length-1; i > -1;i--){
                for(let  j = 0; j < computerGuesses.length;j++){
                    let PM = compareGuess(computerGuesses[j][0],remainingPosibilities[i]);
                    if(PM[0] != computerGuesses[j][1] || PM[1] != computerGuesses[j][2]) {
                        remainingPosibilitiesClone.splice(i,1);
                        break
                    }
                }
            }
            alreadyDone = true;
        }
        else{
            let size = remainingPosibilities.length;
            for(let i= size - 1;i > -1;i--){
                let PM = compareGuess(computerGuesses[computerGuesses.length -1][0],remainingPosibilities[i]);
                if(PM[0] != computerGuesses[computerGuesses.length -1][1] || PM[1] != computerGuesses[computerGuesses.length -1][2]) {
                    remainingPosibilities.splice(i,1);
                }
            }
        }
        remainingPosibilities = remainingPosibilitiesClone;
        guess = remainingPosibilities[0];
        checkNums();
        return guess;
    }

    let newGuessDigits = [];

    if (computingArray[0][1].length == 4) {
        newGuessDigits.push(computingArray[0][1][1]);
        newGuessDigits.push(computingArray[0][1][2]);
        newGuessDigits.push(computingArray[0][1][3]);
        if (computingArray.length > 1) {
            let i = 0;
            let finished = false;
            while (finished == false) {
                finished = true;
                for(let j = 0;j<sameSituation.length;j++){
                    if(sameSituation[j] == computingArray[1][1][i]){
                        i++;
                        finished=false;
                        break;
                    }
                }
            }
            newGuessDigits.push(computingArray[1][1][i]);
            guess = makeGuess(newGuessDigits);
            let comparisonResult = compareGuess(guess,playerNum);
            let newGuessNum = comparisonResult[0]+comparisonResult[1];

            if (newGuessNum == computingArray[0][0]) {
                sameSituation.push(computingArray[1][1][i]);
                sameSituation.push(computingArray[0][1][0]);
                checkNums();
                return guess;
            }
            if (newGuessNum > computingArray[0][0]) {
                trueDigits.add(computingArray[1][1][i]);
                trueDigitsList.push(computingArray[1][1][i]);
                if (sameSituation.length > 0) {
                    for (let j = 0; j < sameSituation.length; j++) {
                        falseDigits.add(sameSituation[j]);
                        falseDigitsList.push(sameSituation[j]);
                    }
                    size = sameSituation.length;
                    sameSituation.splice(0, size);

                    computingArray[1][1].splice(0, i + 1);
                    computingArray[0][1].splice(0, 1);
                    computingArray[1][0]--;
                    checkNums();

                    return guess;
                } else {
                    falseDigits.add(computingArray[0][1][0]);
                    falseDigitsList.push(computingArray[0][1][0]);
                    computingArray[1][1].splice(0, i + 1);
                    computingArray[0][1].splice(0, 1);
                    computingArray[1][0]--;
                    checkNums();
                    return guess;
                }
            }
            if (newGuessNum < computingArray[0][0]) {
                falseDigits.add(computingArray[1][1][i]);
                falseDigitsList.push(computingArray[1][1][i]);

                if (sameSituation.length > 0) {
                    for (let j = 0; j < sameSituation.length; j++) {
                        trueDigits.add(sameSituation[j]);
                        trueDigitsList.push(sameSituation[j]);
                    }

                    size = sameSituation.length;
                    sameSituation.splice(0, size);

                    computingArray[1][1].splice(0, i + 1);
                    computingArray[0][1].splice(0, 1);
                    computingArray[0][0]--;
                    computingArray[1][0] -= i;
                    checkNums();
                    return guess;
                } else {
                    trueDigits.add(computingArray[0][1][0]);
                    trueDigitsList.push(computingArray[0][1][0]);
                    computingArray[1][1].splice(0, i + 1);
                    computingArray[0][1].splice(0, 1);
                    computingArray[0][0]--;
                    computingArray[1][0] -= i;
                    checkNums();
                    return guess;
                }
            }
        } else {

            newGuessDigits.push(falseDigitsList[0]);
            guess = makeGuess(newGuessDigits);
            let comparisonResult = compareGuess(guess,playerNum);
            let newGuessNum = comparisonResult[0]+comparisonResult[1];

            if (newGuessNum == computingArray[0][0]) {
                falseDigits.add(computingArray[0][1][0]);
                falseDigitsList.push(computingArray[0][1][0]);
                computingArray[0][1].splice(0, 1);
                checkNums();
                return guess;
            }
            if (newGuessNum < computingArray[0][0]) {
                trueDigits.add(computingArray[0][1][0]);
                trueDigitsList.push(computingArray[0][1][0]);
                computingArray[0][1].splice(0, 1);
                computingArray[0][0]--;
                checkNums();
                return guess;
            }
        }
    }
    if (computingArray[0][1].length == 3) {
        newGuessDigits.push(trueDigitsList[0]);
        newGuessDigits.push(falseDigitsList[0]);
        newGuessDigits.push(computingArray[0][1][1]);
        newGuessDigits.push(computingArray[0][1][2]);


        guess = makeGuess(newGuessDigits);
        let comparisonResult = compareGuess(guess,playerNum);
        let newGuessNum = comparisonResult[0]+comparisonResult[1];

        if (newGuessNum == computingArray[0][0]) {
            trueDigits.add(computingArray[0][1][0]);
            trueDigitsList.push(computingArray[0][1][0])
            computingArray[0][1].splice(0, 1);
            computingArray[0][0]--;
            checkNums();
            return guess;
        }
        if (newGuessNum > computingArray[0][0]) {
            falseDigits.add(computingArray[0][1][0]);
            falseDigitsList.push(computingArray[0][1][0]);
            computingArray[0][1].splice(0, 1);
            checkNums();
            return guess;
        }
    }
    if (computingArray[0][1].length == 2) {
        newGuessDigits.push(computingArray[0][1][0]);
        if (trueDigitsList.length > 1) {
            newGuessDigits.push(trueDigitsList[0]);
            newGuessDigits.push(trueDigitsList[1]);
            newGuessDigits.push(falseDigitsList[0]);


            guess = makeGuess(newGuessDigits);
            let comparisonResult = compareGuess(guess,playerNum);
            let newGuessNum = comparisonResult[0]+comparisonResult[1];

            if (newGuessNum == 2) {
                falseDigits.add(computingArray[0][1][0]);
                falseDigitsList.push(computingArray[0][1][0]);
                computingArray[0][1].splice(0, 1);
                checkNums();
                return guess;
            }
            if (newGuessNum == 3) {
                trueDigits.add(computingArray[0][1][0]);
                trueDigitsList.push(computingArray[0][1][0]);
                computingArray[0][1].splice(0, 1);
                computingArray[0][0]--;
                checkNums();
                return guess;
            }
        } else {
            newGuessDigits.push(falseDigitsList[0]);
            newGuessDigits.push(falseDigitsList[1]);
            newGuessDigits.push(trueDigitsList[0]);

            guess = makeGuess(newGuessDigits);
            let comparisonResult = compareGuess(guess,playerNum);
            let newGuessNum = comparisonResult[0]+comparisonResult[1];

            if (newGuessNum == 1) {
                falseDigits.add(computingArray[0][1][0]);
                falseDigitsList.push(computingArray[0][1][0]);
                computingArray[0][1].splice(0, 1);
                checkNums();
                return guess;
            }
            if (newGuessNum == 2) {
                trueDigits.add(computingArray[0][1][0]);
                trueDigitsList.push(computingArray[0][1][0]);
                computingArray[0][1].splice(0, 1);
                computingArray[0][0]--;
                checkNums();
                return guess;
            }
        }
    }


}




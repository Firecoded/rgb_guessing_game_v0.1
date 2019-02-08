$(document).ready(startTheGame);

function startTheGame(){
    applyClickHandlers();
    createArrayOfRandomRGBValues();
}

function applyClickHandlers(){
    $('.color-box').on('click', checkUserGuess);
}

function getRandomNum(min, max) { 
    return Math.floor(Math.random() * (max-min) + min);
}

 function getRandomRGBValue(){
    var r = "rgb(" + getRandomNum(0, 255) + ', ';
    var g = getRandomNum(0, 255) + ', ';
    var b = getRandomNum(0, 255) + ')';
    return r + g + b;
}

function createArrayOfRandomRGBValues(){
    var rgbArray = [];
    for(var i = 0; i < 6; i++){
        var randRGB = getRandomRGBValue();
        rgbArray.push(randRGB);
    }
    showRGBForUserToGuess(rgbArray[0]);
    paintBoxesFromRGBArr(rgbArray);
}

function showRGBForUserToGuess(rgbString){
    $('.rgb-text-area').text('Which box is displaying: ' + rgbString + '?');
}
function paintBoxesFromRGBArr(rgbArr){
    var boxCounter = 1;
    while(rgbArr.length){
        var randNum = getRandomNum(0, rgbArr.length-1);
        $('#box' + boxCounter++).css('backgroundColor', rgbArr[randNum]);
        rgbArr.splice(randNum, 1);
    }
}

function checkUserGuess(){
    var userRGBGuess = $(this).css("background-color");
    var correctRGB = $('.rgb-text-area').text().split(':')[1].split('?')[0].trim();
    if(userRGBGuess === correctRGB){
        displayWinMessage();
        // paintBoxesFromRGBArr([correctRGB, correctRGB, correctRGB, correctRGB, correctRGB, correctRGB])
    } else {
        displayWrongMessage();
    }
}

function displayWinMessage(){
    $('.response-text').text('Correct!');
    $('.color-box').off('click');
    startNewGameCounter(3);
}

function displayWrongMessage(){
    $('.response-text').text('Wrong!');
}

function startNewGameCounter(counter){
    var message = $('.response-text').text();
    if(counter === -1){
        $('.response-text').text('');
        startTheGame();
    } else{
        setTimeout(function(){
            $('.response-text').text(message += "... " + counter);
            startNewGameCounter(--counter);
        }, 1000);
    }   
}

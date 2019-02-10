$(document).ready(startTheGame);

function startTheGame(){
    applyClickHandlers();
    createArrayOfRandomRGBValues();  
}

function applyClickHandlers(){
    $('.color-box').on('click', checkUserGuess);
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
    var domTarget = $('.rgb-text-area');
    domTarget.empty();
    var questionSpan = $('<span>').addClass('question-span').text('Which box is showing... ');
    var rgbSpan = $('<span>').addClass('correct-rgb').text(rgbString + '?')
    domTarget.append(questionSpan, rgbSpan);
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
    var correctRGB = $('.correct-rgb').text().split('?')[0];
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

$(document).ready(startTheGame);

function startTheGame(){
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
    var randomIndex = getRandomNum(0, rgbArray.length-1)
    showRGBForUserToGuess(rgbArray[randomIndex]);
    buildBoxesFromArr(rgbArray)
}

function buildBoxesFromArr(rgbArr){
    var colorArea = $('.color-area');
    for(var i = 0; i < rgbArr.length; i++){
        var box = $('<div>').addClass('color-box box'+ (i+1))
                            .css('backgroundColor', rgbArr[i])
                            .hide()                 
        colorArea.append(box);
    }
    var delayCounter = 200;
    colorArea.children().each(function(index, item){
        $(item).delay(delayCounter+=240).fadeIn(300);
    })
    applyClickHandlers();
}

function showRGBForUserToGuess(rgbString){
    var domTarget = $('.rgb-text-area');
    domTarget.empty();
    var questionSpan = $('<span>').addClass('question-span').text('Which box is showing... ');
    var rgbSpan = $('<span>').addClass('correct-rgb').text(rgbString + '?')
    domTarget.append(questionSpan, rgbSpan);
}

function checkUserGuess(){
    var userRGBGuess = $(this).css("background-color");
    var correctRGB = $('.correct-rgb').text().split('?')[0];
    if(userRGBGuess === correctRGB){
        displayWinMessage();
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
            var colorAreaChildren = $('.color-area').children();
            if(colorAreaChildren.length && counter === 3){
                removeElementsSlowly(colorAreaChildren)
            }
            $('.response-text').text(message += "... " + counter);
            startNewGameCounter(--counter);
        }, 1000);
    }   
}

function removeElementsSlowly(elArr){
    var counter = 300;
    for(var i = elArr.length; i > -1; i--){
        fadeoutThenRemove(elArr[i], counter)
        counter+=300;
    }
}

function fadeoutThenRemove(el, time){
    $(el).fadeOut(time, function(){
        el.remove();
    })
}

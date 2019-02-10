function getRandomNum(min, max) { 
    return Math.floor(Math.random() * (max-min) + min);
}

 function getRandomRGBValue(){
    var r = "rgb(" + getRandomNum(0, 255) + ', ';
    var g = getRandomNum(0, 255) + ', ';
    var b = getRandomNum(0, 255) + ')';
    return r + g + b;
}


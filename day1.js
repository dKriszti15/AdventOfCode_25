import lineReader from 'line-reader';

let dial = 50;

let counter = 0;

function processRotation(rotation){
    
    if(rotation[0] == 'L'){
        leftRotation(Number(rotation.slice(1)));
    } else {
        rightRotation(Number(rotation.slice(1)));
    }
}

function leftRotation(amount){

    const diff = dial - amount;

    if(diff < 0){
        dial = 100 + (diff % 100);
    } else {
        dial = diff;
    }

    if(dial == 0){
        counter++;
    }
}

function rightRotation(amount){
    
    const sum = dial + amount;

    if(sum > 99){
        dial = sum % 100;
    } else {
        dial =sum ;
    }

    if(dial == 0){
        counter++;
    }
}

function processFile(file){
    lineReader.eachLine(file, (line, last) => {
    processRotation(line);
    if(last){
        console.log('Final counter:', counter);
    }
})
}

processFile('input1.txt');
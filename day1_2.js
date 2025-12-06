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

    const a = dial - amount;
    const b = dial - 1;
    
    counter += Math.floor(b / 100) - Math.floor((a - 1) / 100);
    
    dial = ((dial - amount) % 100 + 100) % 100;
}

function rightRotation(amount){
    
    const sum = dial + amount;

    counter += Math.floor(sum / 100) - Math.floor(dial / 100);;
    
    dial = sum % 100;
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
import readline from 'readline';
import fs from 'fs';

let intervals = [];

let sum = 0;

const file = readline.createInterface({
    input: fs.createReadStream('input2.txt'),
});

function processInterval(start, end){
    for(let id = Number(start); id <= Number(end); id++){
        if(!isValidID(id)){
            sum += id;
            //console.log('Invalid ID:', id);
        }
    }
}

function isValidID(str){
    
    const id = String(str);
    
    const len = id.length;

    for(let i = 1; i <= len / 2; i++){
        const substring = id.slice(0, i);
        
        const xtimes = substring.repeat(Math.ceil(len / i));
        
        if (id === xtimes){
            return false;
        }
    }

    //console.log(firstHalf , ' vs ', secondHalf);

    return true;
}

function findInvalidIDs(){
    
    file.on('line', (line) => {
        const parts = line.split(',');
        intervals.push(...parts);
    });

    file.on('close', () => {
        //console.log('Intervals:', intervals);
        intervals.forEach((interval) => {
            const range = interval.split('-');
            processInterval(Number(range[0]), Number(range[1]));
        });

        console.log(sum);
    });
}

findInvalidIDs();
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
    
    if(id.length % 2 !== 0){
        return true;
    }

    const firstHalf = id.slice(0, id.length / 2);
    const secondHalf = id.slice(id.length / 2);

    //console.log(firstHalf , ' vs ', secondHalf);

    return firstHalf !== secondHalf;
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
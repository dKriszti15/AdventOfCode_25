import lineReader from 'line-reader';

let totalJolts = 0;

function processBank(bank){
    let maxJolts = 0;
    
    for(let i = 0; i < bank.length; i++){
        for(let j = i + 1; j < bank.length; j++){
            maxJolts = Math.max(maxJolts, parseInt(bank[i] + bank[j]));
        }
    }
    
    totalJolts += maxJolts;
    console.log(`Bank: ${bank} - max jolts: ${maxJolts}`);
    return maxJolts;
}

function processFile(file){
    lineReader.eachLine(file, (line, last) => {
        processBank(line);
        if(last){
            console.log('Total joltage:', totalJolts);
        }
    })
}

processFile('input3.txt');
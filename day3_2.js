import lineReader from 'line-reader';

let totalJolts = 0n;

function processBank(bank){
    
    console.log('-------------------')

    let neededJolts = 12;
    let maxJolts = '';
    
    for(let i = 0; i < bank.length; i++){
        let digit = bank[i];
        let remaining = bank.length - i;
        let stillNeed = neededJolts - maxJolts.length;
        
        if(remaining - 1 >= stillNeed){

            let canSkip = false;
            for(let j = i + 1; j < bank.length && j - i <= remaining - stillNeed; j++){
                if(bank[j] > digit){
                    canSkip = true;
                    break;
                }
            }
            if(!canSkip){
                maxJolts += digit;
            }
        } else {
            maxJolts += digit;
        }
        
        if(maxJolts.length === 12){
            break;
        }
    }

    maxJolts = BigInt(maxJolts);
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
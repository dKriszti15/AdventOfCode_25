import lineReader from 'line-reader';

let content = []

function doMath(){
    let total = 0;

    const rows = content.slice(0, -1).map(line => line.split(''));
    const operators = content[content.length - 1].split('');
    
    const maxCols = Math.max(rows[0].length, operators.length);

    let columnNumbers = [];
    for(let col = 0; col < maxCols; col++){
        let digits = '';
        for(let row = 0; row < rows.length; row++){
            const char = rows[row][col];
            if(char && char !== ' '){
                digits += char;
            }
        }
        const num = digits ? Number(digits) : 0;
        columnNumbers.push(num);
    }


    let problems = [];
    let currentNumbers = [];
    
    for(let col = maxCols - 1; col >= 0; col--){
        const op = operators[col] || ' ';
        const num = columnNumbers[col];
        
        if(op !== ' '){
            currentNumbers.push(num);
            
            problems.push({
                numbers: currentNumbers.reverse(),
                operator: op
            });
            currentNumbers = [];
        } else {
            if(num !== 0) currentNumbers.push(num);
        }
    }

    for(let i = 0; i < problems.length; i++){
        const problem = problems[i];
        
        let result = problem.numbers[0];
        for(let j = 1; j < problem.numbers.length; j++){
            if(problem.operator === '+'){
                result += problem.numbers[j];
            } else if(problem.operator === '*'){
                result *= problem.numbers[j];
            }
        }
        
        console.log(`Col ${i + 1}: ${problem.numbers.join(' ' + problem.operator + ' ')} = ${result}`);
        total += result;
    }

    return total;
}

function processFile(file){
    lineReader.eachLine(file, (line, last) => {
        content.push(line);
        if(last){
            const total = doMath();
            console.log('Grand total:', total);
        }
    })
}

processFile('input6.txt');
import lineReader from 'line-reader';

let content = []

function doMath(){
    let total = 0;

    const rows = content.slice(0, -1).map(line => 
        line.trim().split(/\s+/).map(Number)
    );

    const operators = content[content.length - 1].trim().split(/\s+/);

    for(let col = 0; col < rows[0].length; col++){
        
        let columnResult = rows[0][col];
        for(let row = 1; row < rows.length; row++){
            const num = rows[row][col];
            const op = operators[col];
            
            if(op === '+'){
                columnResult += num;
            } else if(op === '*'){
                columnResult *= num;
            }
            
        }
        
        console.log('column[',col,'] = ', columnResult);
        
        total += columnResult;
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

console.log('1 2 33 4'.split(/\s+/))
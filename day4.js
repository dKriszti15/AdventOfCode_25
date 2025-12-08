import lineReader from 'line-reader';

let field = [];

let counter = 0;

function isAccessible(row, col){
    let rolls = 0;

    if(row > 0 && field[row-1][col] === '@'){
        rolls++;
    }

    if(row > 0 && col > 0 && field[row-1][col-1] === '@'){
        rolls++;
    }

    if(row > 0 && col < field[row].length - 1 && field[row-1][col+1] === '@'){
        rolls++;
    }

    if(col > 0 && field[row][col-1] === '@'){
        rolls++;
    }

    if(col < field[row].length - 1 && field[row][col+1] === '@'){
        rolls++;
    }

    if(row < field.length - 1 && col > 0 && field[row+1][col-1] === '@'){
        rolls++;
    }

    if(row < field.length - 1 && field[row+1][col] === '@'){
        rolls++;
    }

    if(row < field.length - 1 && col < field[row].length - 1 && field[row+1][col+1] === '@'){
        rolls++;
    }

    return rolls < 4 ? true : false; 
}

function findAccessibleRolls(){
    for(let i = 0; i < field.length; i++){
        for(let j = 0; j < field[i].length; j++){
            if(field[i][j] === '@'){
                if(isAccessible(i,j)){
                    counter++;
                }
            }
        }

    }
}

function processFile(file){
    lineReader.eachLine(file, (line, last) => {
        field.push([...line]);
        if(last){
            findAccessibleRolls();
            console.log('Accessible rolls:', counter);
        }
    })
}

processFile('input4.txt');
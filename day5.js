import lineReader from 'line-reader';

let content = [];

function processFoods(){

    let ranges = [];
    
    let i = 0;
    
    while(i < content.length){
        const line = content[i];
        
        if(line === ''){
            i++;
            break;
        }
        
        const [start, end] = line.split('-').map(Number);
        ranges.push({start, end});
        
        i++;
    }
    
    let counter = 0;

    for(let j = i; j < content.length; j++){
        const id = Number(content[j]);
        
        for(const range of ranges){
            if(id >= range.start && id <= range.end){
                counter++;
                break;
            }
        }
    }
    
    return counter;
}

function processFile(file){
    lineReader.eachLine(file, (line, last) => {
        content.push(line);
        
        if(last){
            const fresh_ids = processFoods();
            console.log('Fresh ID-s:', fresh_ids);
        }
    })
}

processFile('input5.txt');
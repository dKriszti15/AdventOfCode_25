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
    
    ranges.sort((a, b) => a.start - b.start);
    
    let mergedRanges = [];
    
    let current = ranges[0];
    
    let counter = 0;
    
    for(let i = 1; i < ranges.length; i++){
        const next = ranges[i];
        
        // overlap check
        if(next.start < current.end + 1){
            current.end = Math.max(current.end, next.end);
        } else {
            mergedRanges.push(current);
            current = next;
        }
    }

    mergedRanges.push(current);

    for(const range of mergedRanges){
        counter += (range.end - range.start + 1);
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
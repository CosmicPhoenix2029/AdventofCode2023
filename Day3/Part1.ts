import * as fs from 'fs';
const file: string = fs.readFileSync('./input.txt', 'utf-8');

//given an engine schematic, find the sum of all the numbers which are adjecent to a symbol:

//first lets let each line into an array
let engineData: Array<string> = file.split('\n');
let total: number = 0;
//lets start by defining an object to store the required information about each line
class Positions {
    lineNum: number;
    numbersToCheck: Array<LineInfo>; //here we store an array objects which store the number, and the lowest and higest index position to search
}

//defining an object to store the number, the start index to search and the end index
class LineInfo {
    number: number;
    startIndex: number;
    endIndex: number;
}

//temp array to view the positions objects
let posArray: Array<Positions> = [];

for(let line of engineData) {
    //create an object for each line 
    const positions: Positions = new Positions();
    positions.lineNum = engineData.indexOf(line);  
    positions.numbersToCheck = getNumbersToCheck(line);
    posArray.push(positions);


    //now for each line we have all numbers and their array positions -1 and +1 to search either side
    //now we need to search the line above, the same line and the line below to check if its a special character or not
    for(let number of positions.numbersToCheck) {
        //get the "segments" from the line above, below and the current line

        let segments: string = "";

        if(engineData.indexOf(line) == 0) { //first line
            let lowerLine = engineData[engineData.indexOf(line) + 1]; 
            segments += line.slice(number.startIndex, number.endIndex + 1);   
            segments += lowerLine.slice(number.startIndex, number.endIndex + 1); 
        }
        else if(engineData.indexOf(line) == engineData.length - 1) { //last line
            let upperLine = engineData[engineData.indexOf(line) - 1]; 
            segments += upperLine.slice(number.startIndex, number.endIndex + 1);
            segments += line.slice(number.startIndex, number.endIndex + 1);

        }
        else { //any lines with a line above and below
            let upperLine = engineData[engineData.indexOf(line) - 1]; //fetch the line above
            let lowerLine = engineData[engineData.indexOf(line) + 1]; //fetch the line below
            segments += upperLine.slice(number.startIndex, number.endIndex + 1);
            segments += line.slice(number.startIndex, number.endIndex + 1);
            segments += lowerLine.slice(number.startIndex, number.endIndex + 1);
        }
        //now we have the string of characters of the line above, the same line and the line below, check if any of the characters are special characters
        let filter: RegExp = /[^\\.0-9]/g; //regex to match anything that is not a .or digit
        if(segments.match(filter)) {
            total += number.number; //valid part number, add it to the total
        }
    }
}
    console.log(total);

function getNumbersToCheck (line: string): Array<LineInfo> {
    //array of line infos here
    let lineInfoArray: Array<LineInfo> = [];
    let singleNumber: string = "";
    let indexes: Array<number> = [];
    //iterate through each character in the line
    for (let i = 0; i < line.length; i++) {
        //if the character is a number
        if(line[i] >= "0" && line[i] <= "9") {
            singleNumber += line[i];
            indexes.push(i);
        }
        //if singleNumber is not empty, or the EOL is reached, add the single number and the lowest and highest index, then  reset them
        else if(singleNumber !== "" ||  i === line.length - 1) {
            //we now have the number and its array positions, create a LineInfo object and add the info to it
            let lineInfo: LineInfo = new LineInfo();
            lineInfo.number = Number(singleNumber);
            
            if(indexes[0] == 0) {
                lineInfo.startIndex = indexes[0]; //if the number is at the start of the line
                lineInfo.endIndex = indexes[indexes.length - 1] + 1; //add 1 to largest index to search right
            }
            else{
                lineInfo.startIndex = indexes[0] - 1; //subtract 1 from smallest index to search to the left
                lineInfo.endIndex = indexes[indexes.length - 1] + 1; //add 1 to largest index to search right
            }
            //lets check that the endIndex is capped at 139 (accounting for the number bieng the end of line)
            if(lineInfo.endIndex > 139) {
                lineInfo.endIndex = 139;
            }
                       
            if(lineInfo.number !== 0){
                lineInfoArray.push(lineInfo);
            }
            
            singleNumber = "";
            indexes = [];
        }
    }
    return lineInfoArray;
}

import * as fs from 'fs';
const file: string = fs.readFileSync('./input.txt', 'utf-8');

//split the file into individual lines
let filesArray: Array<String> = file.split('\n');
let total: number = 0;

//defining a map for the value to match as keys, and its replacement value as values
let includes = new Map<string, string>([
    ['oneight', '18'], //accounting for overlaps first
    ['twone', '21'],
    ['threeight', '38'],
    ['fiveight', '58'],
    ['nineight', '98'],
    ['sevenine', '79'],
    ['eightwo', '82'],
    ['eighthree', '83'],
    ['one', '1'],
    ['two', '2'],
    ['three', '3'],
    ['four', '4'],
    ['five', '5'],
    ['six', '6'],
    ['seven', '7'],
    ['eight', '8'],
    ['nine', '9']
]);

//iterate through each line, getting the first and last number from each
for(let line of filesArray) {
    //convert any word matches to number and add into the same place in the line
    for(let key of includes.keys()) {
        if(line.includes(key)) {
            let regBuild = new RegExp(key, 'g');
            line = line.replace(regBuild, includes.get(key));
        }
    }
    //lets get all the numbers in the line, then select the first and last for each
    let numbers: string = line.replace(/\D/g, '');
    //now we have just numbers, get the first and last one
    let num: string = numbers[0];
    let otherNum: string = numbers[numbers.length - 1];
    num += otherNum;
    total += parseInt(num);
}
console.log(total);

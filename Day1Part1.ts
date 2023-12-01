import * as fs from 'fs';
const file: string = fs.readFileSync('./input.txt', 'utf-8');

//split the file into individual lines
let filesArray: Array<String> = file.split('\n');
let total: number = 0;
//iterate through each line, getting the first and last number from each
for(let line of filesArray) {
    //lets get all the numbers in the line, then select the first and last for each
    let numbers: string = line.replace(/\D/g, '');

    //now we have just numbers, get the first and last one
    let num: string = numbers[0];
    let otherNum: string = numbers[numbers.length - 1];
    num += otherNum;

    total += parseInt(num);
}
console.log(total);

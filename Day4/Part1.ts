import * as fs from 'fs';
const file: string = fs.readFileSync('./input.txt', 'utf-8');

//array to store each line
let fileByLine: Array<string> = file.split('\n');

/*
 -> The elf has a series of scrathcards (in the input data)
 -> each scratch card has a series of numbers, 1 side is the winning numbers and the other side is the actual numbers
 -> the first match is worth 1 point, each match after that doubles the points for that card 
*/
//define an object to contain the card information
class ScratchCard {
    cardNumber: number
    winningNumbers: Array<number>
    numbers: Array<number>
    points: number
}

//array to store each card object
let allCards: Array<ScratchCard> = [];

let pointsTotal: number = 0;
//split the data into lines, then build the array of cards
for(let line of fileByLine) {
    let card: ScratchCard = new ScratchCard;
    card.cardNumber = GetCardNumber(line);
    card.winningNumbers = GetWinningNumbers(line);
    card.numbers = GetCardNumbers(line);
    card.points = 0;

    //now for each winning number, check if its also in numbers
    for(let number of card.winningNumbers) {
        if(card.numbers.includes(number)) {
            if(card.points < 1) { //first match is worth 1 point
                card.points = 1;        
            }
            else {
                card.points = card.points * 2; //yeah, I know *= is a thing but its more readable like this in my opition
            }
        }
    }
    pointsTotal += card.points;
}
console.log(pointsTotal);

function GetCardNumber(line: string): number {
    return fileByLine.indexOf(line) + 1;
}

function GetWinningNumbers(line: string): Array<number> {
    //we only need the left side of the |, and the right side of the : for this bit (trim used to remove whitespace before and after)
    let segment: string = line.split('|')[0].split(':')[1].trim();
    //now we have a string of numbers, we need to add each number to the array
    //regex is used to split at any 1 or more spaces and map is used to add the number to the array
    let winningNumbers: Array<number> = segment.split(/\s+/).map(Number);
    return winningNumbers;
}

function GetCardNumbers(line: string): Array<number> {
    //we only need the right side of the | for this bit. Trim used to remove whitespace before and after
    let segment: string = line.split('|')[1].trim();
    //now we have a string of numbers, add each number to the array
    let numbers: Array<number> = segment.split(/\s+/).map(Number);
    return numbers;
}

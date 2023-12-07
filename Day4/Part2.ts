import * as fs from 'fs';
const file: string = fs.readFileSync('./input.txt', 'utf-8');

//array to store each line
let fileByLine: Array<string> = file.split('\n');

/*
 -> The elf has a series of scrathcards (in the input data)
 -> each time there is a "winning number", he wins 1 copy of the next card
 -> if card 1 has 3 matches, he now has cards 1, 2, 3 and 4
 -> if card 2 has 2 matches, he now has cards 1, 2, 2 copies of card 3, and 2 copies of card 4
 -> if card 3 has 1 match, he now has cards 1, 2, 2 copies of card 3, and 3 copies of card 4
 -> find the total number of scratch cards the elf ends up with
*/
//define an object to contain the card information
class ScratchCard {
    cardNumber: number
    winningNumbers: Array<number>
    numbers: Array<number>
    numOfMatches: number
    numOfCopies: number
}

//array to store each card object
let allCards: Array<ScratchCard> = [];

let copiesTotal: number = 0;
//loop through each line, and build the card and add it to the array
for(let line of fileByLine) {
    let card: ScratchCard = new ScratchCard;
    card.cardNumber = GetCardNumber(line);
    card.winningNumbers = GetWinningNumbers(line);
    card.numbers = GetCardNumbers(line);
    card.numOfMatches = GetNumberOfMatches(card.winningNumbers, card.numbers);
    card.numOfCopies = 1;
    allCards.push(card);
}

for(let c = 0; c < allCards.length; c++) {
    //if the card has matches, increase the number of copies by 1 for each card in the range of the number of matches
    if(allCards[c].numOfMatches != 0) {
        let startIndex: number = allCards[c].cardNumber;
        let endIndex: number = startIndex + allCards[c].numOfMatches;
        //increase the number of copies by 1 for the next x cards, for the number of copies of the current card
        for(let n = 0; n < allCards[c].numOfCopies; n++) {
            for(let i = startIndex; i < endIndex; i++) {
                allCards[i].numOfCopies++;            
            }
        }
    }
    copiesTotal += allCards[c].numOfCopies;
}
console.log(copiesTotal);

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

function GetNumberOfMatches(winningNumbers: Array<number>, numbers: Array<number>): number {
    let matchesCount = 0;
    //for each winning number, check if it is also in numbers
    for(let number of winningNumbers) {
        if(numbers.includes(number)) {
            matchesCount++;
        }
    }
    return matchesCount;
}

import * as fs from 'fs';
const file: string = fs.readFileSync('./input.txt', 'utf-8');

//split the file into individual lines
let gameData: Array<string> = file.split('\n');

/*The elf would like to know the fewest number of cubes for each colour, that could have been in the bag to make the game possible:
 - The elf wants the sum of the (red * green * blue) cubes for each game
*/
//lets start by defining an object mapping the game, and the number of cubes for each colour:
class Game {
    gameNum: number;
    redCubes: number;
    greenCubes: number;
    blueCubes: number;
}

let total: number = 0;

//lets then iterate through each "game" and map the game number, and the number of cubes for each colour
for (let singleGame of gameData) {
    const game: Game = new Game(); 
    game.gameNum = gameData.indexOf(singleGame) + 1; //here we set the game number to the items array position + 1 
    game.redCubes = getLargestNumberOfCubes(singleGame, 'red');
    game.greenCubes = getLargestNumberOfCubes(singleGame, 'green');
    game.blueCubes = getLargestNumberOfCubes(singleGame, 'blue');

    //lets add the 'power' for this game to the total
    total += (game.redCubes * game.greenCubes * game.blueCubes);
}
console.log(total);

//take a colour and the singleGame, and return the largest number of cubes of the specified colour for that Game
function getLargestNumberOfCubes(singleGame: string, colour: string): number {
    //lets filter out the other colours of cubes
    const filter = new RegExp(`\\d+\\s${colour}`, "g"); //this took ages to get right
    let filteredCubes = singleGame.match(filter);

    //now lets get the largest number in the filtered cubes
    let largestNum: number = 0;
    for (let item of filteredCubes) {
        let num = Number(item.split(' ')[0]);
        if(num > largestNum){
            largestNum = num;
        }
    }
    return largestNum;   
}

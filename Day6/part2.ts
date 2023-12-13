import * as fs from 'fs';
const file: string = fs.readFileSync('./input.txt', 'utf-8');

/* 
 - The input contains the time allowed to travel, and the best distance ever travelled in that time
 - The input now only contains 1 race
 - The toy boat has a starting speed of 0 mm/ms, 
 - but for every millisecond the button is held down for at the start of the race, the speed increases by 1ms
 - the boat cant move while the button is bieng held
 - We need to calculate the number of ways to beat the record for this 1 race
*/

let timeAllowed: number = Number(file.split('\n')[0].split(':')[1].replace(/\s/g, ""));
let distanceRecord: number = Number(file.split('\n')[1].split(':')[1].replace(/\s/g, ""));
let numberOfWins: number = 0;

//calculate the number of wins for each attempt
for(let i = 1; i < timeAllowed; i++) {
    //calculate the distance accounting for the number of ms the button was held for
    let distance: number = GetDistanceTravelled(timeAllowed - i, i);
    if(distance > distanceRecord) {
        numberOfWins++;
    }
}
//here is our answer
console.log(numberOfWins);

//function to calculate the distance travelled
function GetDistanceTravelled(timeAllowed: number, speed: number) {
    //distance = speed * time
    return speed * timeAllowed;    
}

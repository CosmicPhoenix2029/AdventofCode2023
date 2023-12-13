import * as fs from 'fs';
const file: string = fs.readFileSync('./input.txt', 'utf-8');

/* 
 - The input contains the time allowed to travel, and the best distance ever travelled in that time
 - The input contains data for 4 races 
 - The toy boat has a starting speed of 0 mm/ms, 
 - but for every millisecond the button is held down for at the start of the race, the speed increases by 1ms
 - the boat cant move while the button is bieng held
 - We need to calculate the number of ways to beat the record in each race, and then multiply the results of each race together (r1 * r2 * r3 * r4)
*/

//lets start by defining each race
class Race {
    timeAllowed: number
    distanceRecord: number
    numberOfWins: number
}

//lets store the information about each race in an array
let times: Array<number> = file.split('\n')[0].split(':')[1].trim().split('     ').map(time => Number(time));
let distances: Array<number> = file.split('\n')[1].split(':')[1].trim().split('   ').map(distance => Number(distance));
let races: Array<Race> = [];

//build the array of races
for(let i = 0; i < times.length; i++) {
    let race = new Race();
    race.timeAllowed = times[i];
    race.distanceRecord = distances[i];
    race.numberOfWins = 0;

    races.push(race);
}

for(let race of races) {
    //calculate the number of wins for each attempt
    for(let i = 1; i < race.timeAllowed; i++) {
        //calculate the distance accounting for the number of ms the button was held for
        let distance: number = GetDistanceTravelled(race.timeAllowed - i, i);
        if(distance > race.distanceRecord) {
            race.numberOfWins++;
        }
    }
}

//calculate and output the final result
console.log(races[0].numberOfWins * races[1].numberOfWins * races[2].numberOfWins * races[3].numberOfWins);

//function to calculate the distance travelled
function GetDistanceTravelled(timeAllowed: number, speed: number) {
    //distance = speed * time
    return speed * timeAllowed;    
}

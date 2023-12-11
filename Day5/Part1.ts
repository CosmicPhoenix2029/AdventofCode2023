import * as fs from 'fs';
const file: string = fs.readFileSync('./input.txt', 'utf-8');
/*
 -> The input lists all the seeds that need to be planted
 -> It also lists the type of soil to use for the seed, the type of water to use for that soil, the type of fertilizer to use with that water etc
 -> Each line in each Map contains 3 numbers, a destination range start, a source range start and a range length
 -> 
 */

//lets start by building an array of seeds
let seedsAsString: Array<string> = file.split("\n")[0].split(':')[1].trim().split(" ");
let seeds: Array<number> = seedsAsString.map(seed => Number(seed));

class Seed {
    seed: number
    soil: number
    fertilizer: number
    water: number
    light: number
    temperature: number
    humidity: number
    location: number
}

class Mapping {
    destinationStart: number
    destinationEnd: number
    sourceStart: number
    sourceEnd: number
}

//start by getting the mapping information for each item (soil, fertilizer etc)
let soilTypes: Array<Mapping> = CalculateMapping(3, 14);
let fertilizerTypes: Array<Mapping> = CalculateMapping(17, 45);
let waterTypes: Array<Mapping> = CalculateMapping(48, 64);
let lightTypes: Array<Mapping> = CalculateMapping(67, 84);
let temperatureTypes: Array<Mapping> = CalculateMapping(87, 120);
let humidityTypes: Array<Mapping> = CalculateMapping(123, 157);
let locationTypes: Array<Mapping> = CalculateMapping(160, 171);

let allSeeds: Array<Seed> = [];

//calculate the types of each item for each seed
for(let seed of seeds) {
    
    let seedToAdd: Seed = new Seed();
    seedToAdd.seed = seed;
    seedToAdd.soil = GetNextType(soilTypes, seedToAdd.seed);
    seedToAdd.fertilizer = GetNextType(fertilizerTypes, seedToAdd.soil);
    seedToAdd.water = GetNextType(waterTypes, seedToAdd.fertilizer);
    seedToAdd.light = GetNextType(lightTypes, seedToAdd.water);
    seedToAdd.temperature = GetNextType(temperatureTypes, seedToAdd.light);
    seedToAdd.humidity = GetNextType(humidityTypes, seedToAdd.temperature);
    seedToAdd.location = GetNextType(locationTypes, seedToAdd.humidity);

    allSeeds.push(seedToAdd);   
}
//find the lowest location number and log to console
let lowestLocation = allSeeds[0].location;
for(let i = 0; i < allSeeds.length; i++) {
    if(allSeeds[i].location < lowestLocation) {
        lowestLocation = allSeeds[i].location;
    }
}
//write the answer to console
console.log(lowestLocation);

//function to perform the mappings for each item, takes in the line range to search through:
function CalculateMapping(startLine: number, endLine: number): Array<Mapping> {
    //array to add each mapping to:
    let lineMaps: Array<Mapping> = [];

    //for each line, fetch the line and map the data to an object, then add to lineMaps array
    for(let i = startLine; i <= endLine; i++) {
        //fetch the line, and split by spaces, this gives us each number in that line
        const lineMap: Array<number> = file.split("\n")[i].replace("\r", "").split(" ").map(Number);

        //create a new mapping object per line
        const mapping: Mapping = new Mapping();
        mapping.destinationStart = lineMap[0];
        mapping.destinationEnd = (lineMap[0] + lineMap[2]) - 1; //dest + range length - 1 (as it includes the end in the range)
        mapping.sourceStart = lineMap[1];
        mapping.sourceEnd = (lineMap[1] + lineMap[2]) - 1;

        lineMaps.push(mapping);
    }
    return lineMaps;
}

//function to get the type of the next item
function GetNextType(types: Array<Mapping>, previousType: number) {
    let nextType: number = previousType; //if no mapping, set to previous destination
    for(let type of types) {
        if(previousType >= type.sourceStart && previousType <= type.sourceEnd) {
            let differance = previousType - type.sourceStart;
            nextType = type.destinationStart + differance;
        }
    }
    return nextType;
}

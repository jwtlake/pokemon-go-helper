# pokemon-go-helper
Nodejs webbased pokemon go helper application. WIP but functional!

## Features
**Pokemon Stat Checker:** Evaluate player's pokemon to help identify strong pokemon.  
![alt tag](etc/pokemon.png)  

**Lucky Egg Helper:** Evaluate player's pokemon and candies to see if they should use a lucky egg.  
![alt tag](etc/luckyegg.png)  

## Requirements  
**Tested on linux only**
- git
- nodejs
- npm  

## Setup
Download the project
```
git clone https://github.com/jwtlake/pokemon-go-helper.git
```

Move into the project folder
```
cd pokemon-go-helper
```

Install dependencies
```
npm install
```

(Optional) Change the default hosting port from 3000 to whatever you want.
[settings.js](/src/server/settings.js)

Start the webserver
```
npm run start
```  

Navigate to localhost:3000 in your web browser

## TODO
Figure out HTTPS so geolocation works outside local host  
Modularize css to component level  
Clean up all the TODOs in code base  
Create Tests  
UI improvements for smaller phones and desktop experience  
Look into speed improvments (feels slow on phones)

## What this project isn't. 
I don't want to build something that lets you cheat. So that means.. 
* No bots
* No harvesters
* No map scanning

## Special Thanks
API that makes this all possible -> https://github.com/cyraxx/pogobuf  
Data used to polyfill pokedex data  -> https://github.com/Biuni/PokemonGOPokedex
Google Auth Login -> https://github.com/nandiheath

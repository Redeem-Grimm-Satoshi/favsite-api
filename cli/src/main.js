#!/usr/bin/env node
import {exec} from 'child_process';
import open, { apps } from 'open';
import dotenv from 'dotenv';


import {
    addFavorite,deleteFavorite,getFavorite,getFavorites,replaceFavorite
} from './lib/sdk.js';



// Load environment variables from .env file
dotenv.config();

const args = process.argv.slice(2);
const command = args[0];
const favorite =args[1];
const url =args[2];

const favorites=await getFavorites();



// Function to check the BROWSER environment variable and return the corresponding app name for the 'open' package
function checkBrowser(){
    const browser = process.env.BROWSER;
    if (!browser) {
        return null;
    }
    const browserLower = browser.toLocaleLowerCase();

    switch(browserLower){
       case 'chrome':
        return 'chrome';
       case 'firefox':
            return 'firefox';
       case 'edge':
            return 'edge';
       default:
            return null;
    }
}


// Function to display the menu of available commands
function displayMenu(){
    console.log('open <favourite>      : Open a saved favourite.');
    console.log('ls                    : List all saved favourites.');
    console.log('add <favourite> <url> : Add a new favourite.');
    console.log('rm <favorite>         : Remove a saved favorite.');
    
}

// Function to open a favorite URL in the default browser or the browser specified in the BROWSER environment variable
async function openFav(name){
    const favToOpen=favorites.find((fav)=>fav.name === name);

    if(!favToOpen){
        console.log(`Favorite ${name} does not exist.`);
        process.exit(1);
    }
    
    const url = favToOpen.url;
    console.log('opening', url);
    
    try {
        const appName = checkBrowser();
        if(appName){
            await open(url, {app: appName});
        } else {
            await open(url);
        }
    } catch (error) {
        console.error('Error opening URL:', error.message);
    }
}


// Function to add a new favorite URL with the specified name
const add=async (name, url) => {
    
    const id = await addFavorite(name,url);

    if(!id){
        console.log(`Failed to add favorite ${name}.`);
        process.exit(1);
    }



    console.log('Adding', favorite, 'with URL', url);

}

// Function to remove a favorite URL by name
const rm=async (name) => {
    const favToDelete=favorites.find((fav)=>fav.name === name);

    if(!favToDelete){
        console.log(`Favorite ${name} does not exist.`);
        process.exit(1);
    }
    await deleteFavorite(favToDelete.id);
    console.log('Removing', name);
}

const ls=async ()=>{
    
    console.log('All favorites');
    favorites.forEach((favorite)=>{
        console.log(`${favorite.name}: ${favorite.url}`);
    })

}


// Main function to handle command-line arguments and execute the corresponding actions
(async () => {
if(!command||command === 'help'){
    displayMenu();
   
}else{
    switch(command){
        case 'ls':
            ls();
            break;
        case 'open':
            if(!favorite){
                displayMenu();
                break;
            }
            await openFav(favorite);
            break;
        case 'add':
            if(!favorite ||!url){
                displayMenu();
                break;
            }
            add(favorite, url);
            break;
        case 'rm':
            if(!favorite){
                displayMenu();
                break;
            }
            rm(favorite);
            break;
        default:
            console.log('Invalid command. Use --help for usage information.');
    }
}
})();

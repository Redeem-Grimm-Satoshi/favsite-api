#!/usr/bin/env node
import {exec} from 'child_process';
import open, { apps } from 'open';
import dotenv from 'dotenv';
import fs from 'fs';

import {
    addFavorite,deleteFavorite,getFavorite,getFavorites,replaceFavorite
} from './lib/sdk.js';




dotenv.config();

const args = process.argv.slice(2);
const command = args[0];
const favorite =args[1];
const url =args[2];

let db;
const dbPath='favorites.db';




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



function displayMenu(){
    console.log('open <favourite>      : Open a saved favourite.');
    console.log('ls                    : List all saved favourites.');
    console.log('add <favourite> <url> : Add a new favourite.');
    console.log('rm <favorite>         : Remove a saved favorite.');
    
}

async function openFav(favorite){
    const row=db.prepare('SELECT * FROM favorites WHERE name = ?').get(favorite);
    
    if (!row) {
        console.log('favorite', favorite, 'does not exist.');
        process.exit(1);
        return;
    }
    
    const url = row.url;
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



function add(favorite, url){
    
    db.prepare('INSERT INTO favorites (name, url) VALUES (?, ?)').run(
        favorite,
        url
    );

    console.log('Adding', favorite, 'with URL', url);

}

function rm(favorite){
    db.prepare('DELETE FROM favorites WHERE name = ?').run(favorite);
    console.log('Removing', favorite);
}

const ls=async ()=>{
    const favorites=await getFavorites();
    console.log('All favorites');
    favorites.forEach((favorite)=>{
        console.log(`${favorite.name}: ${favorite.url}`);
    })

}



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

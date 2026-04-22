const fs = require('fs');

let debugMode= true;

function debug(message){
    if(debugMode){
        console.log('DEBUG:',message);
    }
}

const data = fs.readFileSync('config.txt','utf8');
debugMode = data.slice(-1)==='1';
console.log(debugMode);
debug('This is a debug message');
const {exec} = require('child_process');
const command='./build/main.o arg1';

exec(command, (error, stdout, stderr) => {
    if(error){
        console.log('error status code:', error.code);
    }

    if(stderr){
        console.log('stderr:',stderr);
    }
    if(error || stderr){
        return;
    }
    console.log(stdout);

    
});
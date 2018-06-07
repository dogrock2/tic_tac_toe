const inquirer = require("inquirer");
const colors = require('colors');
let vals = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];
let vals2 = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];
let combo1 = [1,4,7,1,2,3,3,1];
let combo2 = [2,5,8,4,5,6,5,5];
let combo3 = [3,6,9,7,8,9,7,9];
let player = 1;
let plyrSym = ["_", "x", "O"];
let winner1 = false;
let winner2 = false;
/**
 * Player 1 is x
 * Player 2 is o
 */

let dispTable = () => {
  console.log(`
  ${vals[0]} | ${vals[1]} | ${vals[2]}
  -   -   -
  ${vals[3]} | ${vals[4]} | ${vals[5]}
  -   -   -
  ${vals[6]} | ${vals[7]} | ${vals[8]}
  `);
};

let runGame = () => {
  dispTable();
  inquirer.prompt([
      {
        type: "list",
        message: `Player ${player} your move... choose:`,
        choices: vals2,
        name: "choice"
      }
    ])
    .then(passedVals => {
      
      let current = passedVals.choice;
      if(player === 1){
        vals[vals.indexOf(current)] = plyrSym[player].green;
      }else
        vals[vals.indexOf(current)] = plyrSym[player].yellow;  
      vals2.splice(vals2.indexOf(current), 1);
      if (player === 1) 
          player = 2;
      else 
          player = 1;
    
      for(let i = 0; i < 8; i++){                
          if(vals[combo1[i]-1] === 'x'.green && vals[combo2[i]-1] === 'x'.green && vals[combo3[i]-1] === 'x'.green){
            vals[combo1[i]-1] = 'x'.red;
            vals[combo2[i]-1] = 'x'.red;
            vals[combo3[i]-1] = 'x'.red;
            console.log('X Wins');
            winner1 = true; 
          } else if(vals[combo1[i]-1] === 'O'.yellow && vals[combo2[i]-1] === 'O'.yellow && vals[combo3[i]-1] === 'O'.yellow)  {
            vals[combo1[i]-1] = 'O'.red;
            vals[combo2[i]-1] = 'O'.red;
            vals[combo3[i]-1] = 'O'.red;            
            console.log('O Wins');
            winner2 = true; 
          }
      }//ends for loop

      if(!winner1 && !winner2)
        runGame();
      else if (winner1){
        console.log(`Player 1 is the winner.`);
        dispTable();
        process.exit();
      } else if (winner2) {
        console.log(`Player 2 is the winner.`);
        dispTable();  
        process.exit();
      }
    
    if(vals2.length === 0 && !winner1 && !winner2){
      console.reset();
      console.log('------------------------');
      console.log('****** Game TIED ******');
      dispTable();
      process.exit();
    }
    
    });//ends then 
};//ends runGame


console.reset = function () {
  return process.stdout.write('\033c');
};

runGame();

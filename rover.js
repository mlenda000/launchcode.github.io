const Command = require('./command.js');
const Message = require('./message.js');

class Rover {
   constructor(position){
     this.position = position;
     if (!position){
       throw Error("Position needs to be defined.")
     }
     this.mode = 'NORMAL';
     this.generatorWatts = 110;
   }
  receiveMessage(msg) {
    let message = msg.name;
    let results =[];
    for(let i = 0; i < msg.commands.length; i++) { 
      if(msg.commands[i].commandType === "MOVE") { 
        if(this.mode === "LOW_POWER") { 
          results.push({completed: false}); 
        }else{ 
          results.push({completed: true}); 
          this.position = msg.commands[i].value; 
        }  
      }else if(msg.commands[i].commandType === "STATUS_CHECK") { 
        results.push({completed: true, roverStatus: {mode: this.mode, generatorWatts: this.generatorWatts, position: this.position}}); 
      }else if(msg.commands[i].commandType === "MODE_CHANGE") { 
        results.push({completed: true}); 
        this.mode = msg.commands[i].value; 
      }else{ 
        throw Error("Command Type must be given"); 
      } 
    } 
    // console.log(results)
    return {message,results};
  } 
}

// let commands = [new Command('MODE_CHANGE', 'LOW_POWER'), new Command('STATUS_CHECK')];
// let message = new Message('Test message with two commands', commands);
// let rover = new Rover(98382);    // Passes 98382 as the rover's position.
// let response = rover.receiveMessage(message);
// console.log(JSON.stringify(response));

module.exports = Rover;
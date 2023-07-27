const Rover = require('../rover.js');
const Message = require('../message.js');
const Command = require('../command.js');

describe("Rover class", function() {

  // Test 7: "constructor sets position and default values for mode and generatorWatts"
  it("constructor sets position and default values for mode and generatorWatts", function(){
    let rover = new Rover(42);  
    expect( function() { new Rover();}).toThrow(new Error('Position needs to be defined.')); 
    expect(rover.position).toEqual(42);
    expect(rover.mode).toEqual('NORMAL'); 
    expect(rover.generatorWatts).toEqual(110);
	})

  // Test 8
  it("response returned by receiveMessage contains name of message", function(){
    let message = new Message("MSG005", []);
    let rover = new Rover(42);
    let response = rover.receiveMessage(message);
    expect(response.message).toEqual(message.name);  

  });

  // Test 9
  it("response returned by receiveMessage includes two results if two commands are sent in the message", function(){
    let cmd = [new Command('MODE_CHANGE', 'LOW_POWER'), new Command('STATUS_CHECK')];
    let msg = new Message("Two Commands entered Message!",cmd);
    let ship = new Rover(10000);
    let newCommands = ship.receiveMessage(msg);
    expect(newCommands.results.length).toEqual(2);    
  })

  // TEST 10
  it("responds correctly to status check command", function(){
    let cmd = [new Command('STATUS_CHECK')];
    let msg = new Message("If STATUS_CHECK is entered",cmd);
    let ship = new Rover(10000);
    let newCommands = ship.receiveMessage(msg);
    expect(newCommands.results[0].roverStatus.generatorWatts).toEqual(110); 
    expect(newCommands.results[0].roverStatus.position).toEqual(10000);
    expect(newCommands.results[0].roverStatus.mode).toEqual('NORMAL');  
      
  });

  // Test 11
  it("responds correctly to mode change command", function(){
    let cmd = [new Command('MODE_CHANGE', 'LOW_POWER')];
    let msg = new Message("Changing mode test!",cmd);
    let ship = new Rover(10000);
    let newCommands = ship.receiveMessage(msg);
    expect(ship.mode).toEqual('LOW_POWER');  
  });

  // Test 12
  it("responds with false completed value when attempting to move in LOW_POWER mode", function(){
    let cmd = [new Command('MODE_CHANGE', 'LOW_POWER'), new Command('MOVE',4321)];
    let msg = new Message("Changing mode and moving test",cmd); 
    let ship = new Rover(10000);
    let newCommands = ship.receiveMessage(msg);
    expect(newCommands.results[1]).toEqual({completed: false});
    expect(ship.position).toEqual(10000);
  });

  // Test 13
  it("responds with position for move command", function(){
    let cmd = [new Command('MOVE',4321)];
    let msg = new Message("Moving test",cmd); 
    let ship = new Rover(10000);
    let newCommands = ship.receiveMessage(msg);
    expect(newCommands.results,ship.position).toEqual([{ completed: true }],4321);  
  });

});

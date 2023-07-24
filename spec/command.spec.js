const Command = require('../command.js');

describe("Command class", function() {

  it("throws error if command type is NOT passed into constructor as the first parameter", function() {
    let testFunction = function() { 
      new Command(); 
    };
    expect(testFunction).toThrow(new Error('Command type required.'));
  });

    it("constructor sets command type", function() {
		let test = new Command('MOVE',12000);
    expect(test.commandType).toEqual('MOVE');
  }) 

  it("constructor sets a value passed in as the 2nd argument", function() {
		let test = new Command('MODE_CHANGE','LOW_POWER');
    expect(test.value).toEqual('LOW_POWER');
  })
});
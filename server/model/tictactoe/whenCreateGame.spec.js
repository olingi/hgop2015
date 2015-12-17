var tictactoeCommandHandler = require('./tictactoeCommandHandler');

describe('create game command', function() {
  var given, when, then;

<<<<<<< HEAD
  it('should create a game', function(){
      given = [];
      when = {
          id: "42",
          comm: "CreateGame",
          userName: "Mr.X",
          name: "AlphaGame",
          timeStamp:"2015.12.02T11:29:44"
      }
      then = [{
          id:"42",
          event: "GameCreated",
          userName: "Lt.Y",
          name: "AlphaGame",
          timeStamp: "2015.12.02T11:29:44"
      }];
      var actualEvents = tictactoeCommandHandler(given).executeCommand(when);
      JSON.stringify(actualEvents).should.be.exactly(JSON.stringify(then));
  })

  it('should create game with another user another time', function() {
    given = [];
    when = {
      id: "42",
      gameId: "1",
      comm: "CreateGame",
      userName: "Lt.Y",
      name: "AlphaGame",
      timeStamp: "2015.12.02T10:29:44"
    };
    then = [{
      id: "42",
      gameId: "1",
      event: "GameCreated",
      userName: "Lt.Y",
      name: "AlphaGame",
      timeStamp: "2015.12.02T10:29:44"
    }];
    var actualEvents = tictactoeCommandHandler(given).executeCommand(when);
    JSON.stringify(actualEvents).should.be.exactly(JSON.stringify(then));
  });
});

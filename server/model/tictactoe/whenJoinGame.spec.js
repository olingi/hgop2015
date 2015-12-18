var tictactoeCommandHandler = require('./tictactoeCommandHandler');

describe('join game command', function(){

  var given, when, then;

  it('should join game',function(){
    given= [{
      id:"42",
      gameId: "10",
      event:"gameCreated",
      userName: "Mr.X",
      timeStamp: "2015.12.02T11:29:44"
    }];
    when={
      id:"42",
      gameId: "10",
      comm:"joinGame",
      userName : "Lt.Y",
      name:"AlphaGame",
      timeStamp: "2015.12.02T11:30:50"
    };
    then=[{
      id:"42",
      gameId: "10",
      event:"GameJoined",
      userName : "Lt.Y",
      otherUserName : "Mr.X",
      timeStamp: "2015.12.02T11:30:50"
    }];

    var actualEvents = tictactoeCommandHandler(given).executeCommand(when);

    JSON.stringify(actualEvents).should.be.exactly(JSON.stringify(then));
  });

  it('should reject joining of a non-existing game',function(){
    given= [];
    when={
      id:"42",
      gameId: "10",
      comm:"joinGame",
      userName : "Lt.Y",
      name:"AlphaGame",
      timeStamp: "2015.12.02T11:30:55"
    };
    then=[{
      id:"42",
      gameId: "10",
      event:"GameDoesNotExist",
      userName : "Lt.Y",
      timeStamp: "2015.12.02T11:30:55"
    }];

    var actualEvents = tictactoeCommandHandler(given).executeCommand(when);

    JSON.stringify(actualEvents).should.be.exactly(JSON.stringify(then));
  });
});

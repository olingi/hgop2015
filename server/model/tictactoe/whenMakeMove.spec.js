var tictactoeCommandHandler = require('./tictactoeCommandHandler');

describe('when make move command', function(){

  var given, when, then;

  beforeEach(function(){
    given= [{
      id:"1",
      event:"GameCreated",
      name:"AlphaGame",
      userName:'Mr.X',
      side: "X",
      timeStamp: "2015.12.02T11:29:44"
    }, {
      id:"2",
      event:"GameJoined",
      userName:'Lt. Y',
      side: "O",
      timeStamp: "2015.12.02T11:30:50"
    }];
  });

  describe('on new game', function(){
    it('should join game',function(){
      when={
        id:"42",
        comm:"makeMove",
        userName : "Lt.Y",
        x:0,
        y:1,
        timeStamp: "2015.12.02T11:30:50"
      };
      then=[{
        id:"42",
        event:"MoveMade",
        userName:"Lt.Y",
        name:"AlphaGame",
        x:0,
        y:1,
        timeStamp: "2015.12.02T11:30:50"
      }];

      var actualEvents = tictactoeCommandHandler(given).executeCommand(when);

      JSON.stringify(actualEvents).should.be.exactly(JSON.stringify(then));
    })
  });

  describe("one previous move", function(){
    it('placing move in same place should be illegal',function(){
      given.push({
        id:"42",
        event:"MoveMade",
        userName:"Lt.Y",
        side: "O",
        name:"AlphaGame",
        x:0,
        y:1,
        timeStamp: "2015.12.02T11:30:50"
      });

      when={
        id:"42",
        comm:"makeMove",
        userName:"Lt.Y",
        side: "O",
        x:0,
        y:1,
        timeStamp: "2015.12.02T11:30:50"
      };

      then=[{
        id:"42",
        event:"MoveMade",
        userName:"Lt.Y",
        side: "O",
        name:"AlphaGame",
        x:0,
        y:1,
        timeStamp: "2015.12.02T11:30:50"
      },{
        event:"IllegalMove"
        }];

      var actualEvents = tictactoeCommandHandler(given).executeCommand(when);

      JSON.stringify(actualEvents).should.be.exactly(JSON.stringify(then));

    });
  });
  describe('is winning move', function(){
      it('should Win Horizontally', function(){
          for (var i = 0; i < 2; i++) {
              given.push({
                  id: "42" + i,
                  event: "MoveMade",
                  userName: "Lt.Y",
                  side: "O",
                  name: "AlphaGame",
                  x: i,
                  y: 0,
                  timeStamp: "2015.12.02T11:30:5" + i
              });
          }
          when={
              id: "42",
              comm: "makeMove",
              userName: "Lt.Y",
              side: "O",
              name: "AlphaGame",
              x: 2,
              y: 0,
              timeStamp: "2015.12.02T11:30:53"
          };
          then=[{
              id: "42",
              event: "MoveMade",
              userName: "Lt.Y",
              side: "O",
              name: "AlphaGame",
              x: 2,
              y: 0,
              timeStamp: "2015.12.02T11:30:53"
          },{
              event:"Winner"
          }];

          var actualEvents = tictactoeCommandHandler(given).executeCommand(when);

          JSON.stringify(actualEvents).should.be.exactly(JSON.stringify(then));
      });
      it('should Win Vertically', function(){
          for (var i = 0; i < 2; i++) {
              given.push({
                  id: "42" + i,
                  event: "MoveMade",
                  userName: "Lt.Y",
                  side: "O",
                  name: "AlphaGame",
                  x: 0,
                  y: i,
                  timeStamp: "2015.12.02T11:30:5" + i
              });
          }
          when={
              id: "42",
              comm: "makeMove",
              userName: "Lt.Y",
              side: "O",
              name: "AlphaGame",
              x: 0,
              y: 2,
              timeStamp: "2015.12.02T11:30:53"
          };
          then=[{
              id: "42",
              event: "MoveMade",
              userName: "Lt.Y",
              side: "O",
              name: "AlphaGame",
              x: 0,
              y: 2,
              timeStamp: "2015.12.02T11:30:53"
          },{
              event:"Winner"
          }];

          var actualEvents = tictactoeCommandHandler(given).executeCommand(when);

          JSON.stringify(actualEvents).should.be.exactly(JSON.stringify(then));
      });
      it('should Win Diagonally', function(){
          for (var i = 0; i < 2; i++) {
              given.push({
                  id: "42" + i,
                  event: "MoveMade",
                  userName: "Lt.Y",
                  side: "O",
                  name: "AlphaGame",
                  x: i,
                  y: i,
                  timeStamp: "2015.12.02T11:30:5" + i
              });
          }
          when={
              id: "42",
              comm: "makeMove",
              userName: "Lt.Y",
              side: "O",
              name: "AlphaGame",
              x: 2,
              y: 2,
              timeStamp: "2015.12.02T11:30:53"
          };
          then=[{
              id: "42",
              event: "MoveMade",
              userName: "Lt.Y",
              side: "O",
              name: "AlphaGame",
              x: 2,
              y: 2,
              timeStamp: "2015.12.02T11:30:53"
          },{
              event:"Winner"
          }];

          var actualEvents = tictactoeCommandHandler(given).executeCommand(when);

          JSON.stringify(actualEvents).should.be.exactly(JSON.stringify(then));
      });
  });
});

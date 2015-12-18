var tictactoeCommandHandler = require('./tictactoeCommandHandler');

describe('when make move command', function(){

  var given, when, then;

  beforeEach(function(){
    given= [{
      id:"55",
      gameId: "10",
      event:"GameCreated",
      name:"AlphaGame",
      userName:'Mr.X',
      side: "X",
      timeStamp: "2015.12.02T11:29:44"
    }, {
      id:"56",
      gameId: "10",
      event:"GameJoined",
      userName:'Lt.Y',
      side: "O",
      timeStamp: "2015.12.02T11:30:50"
    }];
  });

  describe('on new game', function(){
    it('should join game',function(){
      when={
        id:"42",
        gameId: "10",
        comm:"makeMove",
        userName : "Lt.Y",
        x:0,
        y:1,
        timeStamp: "2015.12.02T11:30:50"
      };
      then=[{
        id:"42",
        gameId: "10",
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
        gameId: "10",
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
        gameId: "10",
        comm:"makeMove",
        userName:"Lt.Y",
        side: "O",
        x:0,
        y:1,
        timeStamp: "2015.12.02T11:30:50"
      };

      then=[{
        id:"42",
        gameId: "10",
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
                  gameId: "10",
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
              gameId: "10",
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
              gameId: "10",
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
                  gameId: "10",
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
              gameId: "10",
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
              gameId: "10",
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
                  gameId: "10",
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
              gameId: "10",
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
              gameId: "10",
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
  describe("is a move resaulting", function(){
      it("in a draw", function(){
          given.push({
              id: "1",
              gameId: "10",
              event: "MoveMade",
              userName: "Mr.X",
              side: "X",
              name: "AlphaGame",
              x: 0,
              y: 0,
              timeStamp: "2015.12.02T11:30:53"
          },{
              id: "2",
              gameId: "10",
              event: "MoveMade",
              userName: "Lt.Y",
              side: "O",
              name: "AlphaGame",
              x: 1,
              y: 1,
              timeStamp: "2015.12.02T11:30:54"
          },{
              id: "3",
              gameId: "10",
              event: "MoveMade",
              userName: "Mr.X",
              side: "X",
              name: "AlphaGame",
              x: 0,
              y: 2,
              timeStamp: "2015.12.02T11:30:55"
          },{
              id: "4",
              gameId: "10",
              event: "MoveMade",
              userName: "Lt.Y",
              side: "O",
              name: "AlphaGame",
              x: 0,
              y: 1,
              timeStamp: "2015.12.02T11:30:56"
          },{
              id: "5",
              gameId: "10",
              event: "MoveMade",
              userName: "Mr.X",
              side: "X",
              name: "AlphaGame",
              x: 2,
              y: 1,
              timeStamp: "2015.12.02T11:30:57"
          },{
              id: "6",
              gameId: "10",
              event: "MoveMade",
              userName: "Lt.Y",
              side: "O",
              name: "AlphaGame",
              x: 1,
              y: 0,
              timeStamp: "2015.12.02T11:30:58"
          },{
              id: "7",
              gameId: "10",
              event: "MoveMade",
              userName: "Mr.X",
              side: "X",
              name: "AlphaGame",
              x: 1,
              y: 2,
              timeStamp: "2015.12.02T11:30:59"
          },{
              id: "8",
              gameId: "10",
              event: "MoveMade",
              userName: "Lt.Y",
              side: "O",
              name: "AlphaGame",
              x: 2,
              y: 2,
              timeStamp: "2015.12.02T11:30:60"
          });
          when={
              id: "9",
              gameId: "10",
              comm: "makeMove",
              userName: "Mr.X",
              side: "X",
              name: "AlphaGame",
              x: 2,
              y: 0,
              timeStamp: "2015.12.02T11:31:00"
          };
          then=[{
              id: "9",
              gameId: "10",
              event: "MoveMade",
              userName: "Mr.X",
              side: "X",
              name: "AlphaGame",
              x: 2,
              y: 0,
              timeStamp: "2015.12.02T11:31:00"
          },{
              event:"Draw"
          }];
          var actualEvents = tictactoeCommandHandler(given).executeCommand(when);

          JSON.stringify(actualEvents).should.be.exactly(JSON.stringify(then));

      });
  });
});

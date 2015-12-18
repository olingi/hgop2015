var _ = require('lodash');
module.exports = function tictactoeCommandHandler(events) {
  const gameState = {
    gameCreatedEvent: events[0],
    board: [
      ['', '', ''],
      ['', '', ''],
      ['', '', '']
    ]
  };

  const checkWin = function(cmd) {
    // check for Horizontal and Vertical wins
    for (var i = 0; i < 3; i++) {
      // check Horizontal win
      if (gameState.board[0][i] === cmd.side &&
          gameState.board[1][i] === cmd.side &&
          gameState.board[2][i] === cmd.side) {
              return true;

      }
      // check Vertical win
      if (gameState.board[i][0] === cmd.side &&
          gameState.board[i][1] === cmd.side &&
          gameState.board[i][2] === cmd.side) {
              return true;
      }
    }
    // check diagonal win
    if (gameState.board[0][0] === cmd.side &&
        gameState.board[1][1] === cmd.side &&
        gameState.board[2][2] === cmd.side) {
            return true;
    } else if (
      gameState.board[2][0] === cmd.side &&
      gameState.board[1][1] === cmd.side &&
      gameState.board[0][2] === cmd.side) {
          return true;
    }
    return false;
  }

  const checkDraw = function() {
    // check if draw
    for (var x = 0; x < 3; x++) {
      for (var y = 0; y < 3; y++) {
        if (gameState.board[x][y] === '') {
          return false;
        }
      }
    }
    return true;
  }

  var eventHandlers = {
    'MoveMade': function(event) {
      gameState.board[event.x][event.y] = event.side;
    }
  };

  _.each(events, function(event) {
    var eventHandler = eventHandlers[event.event];
    if (eventHandler) eventHandler(event);
  });

  var handlers = {
    "createGame": function(cmd) {
      return [{
        id: cmd.id,
        gameId: cmd.gameId,
        event: "GameCreated",
        userName: cmd.userName,
        side: cmd.side,
        name: cmd.name,
        timeStamp: cmd.timeStamp
      }];
    },
    "joinGame": function(cmd) {
      if (gameState.gameCreatedEvent === undefined) {
        return [{
          id: cmd.id,
          gameId: cmd.gameId,
          event: "GameDoesNotExist",
          userName: cmd.userName,
          timeStamp: cmd.timeStamp
        }];
      }
      return [{
        id: cmd.id,
        gameId: cmd.gameId,
        event: "GameJoined",
        userName: cmd.userName,
        otherUserName: gameState.gameCreatedEvent.userName,
        timeStamp: cmd.timeStamp
      }];
    },

    "makeMove": function(cmd) {
      const currentState = [{
        id: cmd.id,
        gameId: cmd.gameId,
        event: "MoveMade",
        userName: cmd.userName,
        side: cmd.side,
        name: gameState.gameCreatedEvent.name,
        x: cmd.x,
        y: cmd.y,
        timeStamp: cmd.timeStamp
      }];

      if (gameState.board[cmd.x][cmd.y] !== '') {
        currentState.push({
          event: "IllegalMove"
        });
        return currentState;
      }
      gameState.board[cmd.x][cmd.y] = cmd.side;
      if (checkWin(cmd)) {
        currentState.push({
          event: "Winner"
        });
    } else if (checkDraw()) {
        currentState.push({
          event: "Draw"
        });
      }
      return currentState;
    }
  };
  return {
    executeCommand: function(cmd) {
      var handler = handlers[cmd.comm];
      if (!handler) {
        throw new Error("No handler resolved for command " + JSON.stringify(cmd));
      }
      return handler(cmd);
    }
  };
};

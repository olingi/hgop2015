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

  var eventHandlers = {
    'MoveMade': function(event) {
      gameState.board[event.x][event.y] = event.side;
    }
  };
  _.each(events, function(event) {
    var eventHandler = eventHandlers[event.event];
    if (eventHandler) eventHandler(event);
  });

  const checkWin = function() {
    // check for Horizontal and Vertical wins
    for (var i = 0; i < 3; i++) {
      // check Horizontal win
      if (gameState.board[0][i] !== '' &&
        gameState.board[0][i] === gameState.board[1][i] &&
        gameState.board[0][i] === gameState.board[2][i]) {
        return true;
      }

      // check Vertical win
      if (gameState.board[i][0] !== '' &&
        gameState.board[i][0] === gameState.board[i][1] &&
        gameState.board[i][0] === gameState.board[i][2]) {
        return true;
      }
    }
    // check diagonal win
    if (gameState.board[0][0] !== '' &&
      gameState.board[0][0] === gameState.board[1][1] &&
      gameState.board[0][0] === gameState.board[2][2]) {
      return true;
    } else if (
      gameState.board[2][0] !== '' &&
      gameState.board[2][0] === gameState.board[1][1] &&
      gameState.board[2][0] === gameState.board[2][0]) {
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

  var handlers = {
    "createGame": function(cmd) {
      return [{
        id: cmd.id,
        gameId: cmd.gameId,
        event: "GameCreated",
        userName: cmd.userName,
        name: cmd.name,
        timeStamp: cmd.timeStamp
      }];
    },
    "joinGame": function(cmd) {
      if (gameState.gameCreatedEvent === undefined) {
        return [{
          id: cmd.id,
          event: "GameDoesNotExist",
          userName: cmd.userName,
          timeStamp: cmd.timeStamp
        }];
      }
      return [{
        id: cmd.id,
        event: "GameJoined",
        userName: cmd.userName,
        otherUserName: gameState.gameCreatedEvent.userName,
        timeStamp: cmd.timeStamp
      }];
    },

    "makeMove": function(cmd) {
      const currentState = [{
        id: cmd.id,
        event: "MoveMade",
        userName: cmd.userName,
        name: gameState.gameCreatedEvent.name,
        x: cmd.x,
        y: cmd.y,
        side: cmd.side,
        timeStamp: cmd.timeStamp
      }];

      if (gameState.board[cmd.x][cmd.y] !== '') {
        currentState.push({
          event: "IllegalMove"
        });
      }
      if (checkWin()) {
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

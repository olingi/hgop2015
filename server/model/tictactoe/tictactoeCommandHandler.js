module.exports = function tictactoeCommandHandler(events) {
  const initGameState = {
    gameCreatedEvent: events[0],
    board: [
      ['', '', ''],
      ['', '', ''],
      ['', '', '']
    ]
  };

  const gameOver = function(cmd) {
    // check for Horizontal and Vertical wins
    for (var i = 0; i < 3; i++) {
      // check Horizontal win
      if (gameState.board[0][i] === gameState.board[1][i] &&
        gameState.board[0][i] === gameState.board[2][i]) {
        cmd.winner = gameState.board[0][i];
        cmd.result = "Winner!";
        return cmd;
      }

      // check Vertical win
      if (gameState.board[i][0] === gameState.board[i][1] &&
        gameState.board[i][0] === gameState.board[i][2]) {
        cmd.winner = gameState.board[i][0];
        cmd.result = "Winner!";
        return cmd;
      }
    }
    // check diagonal win
    if (gameState.board[0][0] === gameState.board[1][1] &&
      gameState.board[0][0] === gameState.board[2][2]) {
      cmd.winner = gameState.board[0][0];
      cmd.result = "Winner!";
      return cmd;
    } else if (
      gameState.board[2][0] === gameState.board[1][1] &&
      gameState.board[2][0] === gameState.board[2][0]) {
      cmd.winner = gameState.board[2][0];
      cmd.result = "Winner!";
      return cmd;
    }

    // check if draw
    for (var x = 0; x < 3; x++) {
      for (var y = 0; y < 3; y++) {
        if (gameState.board[x][y] === '') {
          cmd.result = "Game still in progress";
          return cmd;
        }
      }
    }
    cmd.winner = "Both or none";
    cmd.result = "Draw";
    return cmd;
  }

  const createGame = function(cmd) {
    return [{
      id: cmd.id,
      gameId: cmd.gameId,
      event: "GameCreated",
      userName: cmd.userName,
      timeStamp: cmd.timeStamp,
      name: cmd.name
    }];
  }

  const joinGame = function(cmd) {
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
  }

  const makeMove = function(cmd) {
    if (gameState.board[cmd.x][cmd.y] !== '') {
      return [{
        id: cmd.id,
        event: "IllegalMove",
        userName: cmd.userName,
        name: gameState.gameCreatedEvent.name,
        x: cmd.x,
        y: cmd.y,
        side: cmd.side,
        timeStamp: cmd.timeStamp
      }]
    }
    return [{
      id: cmd.id,
      event: "MoveMade",
      userName: cmd.userName,
      name: gameState.gameCreatedEvent.name,
      x: cmd.x,
      y: cmd.y,
      side: cmd.side,
      timeStamp: cmd.timeStamp
    }]
  }

  const gameWon = function(cmd) {
    cmd = GameOver(cmd);
    return [{
      id: cmd.id,
      event: "GameOver",
      winner: cmd.winner,
      result: cmd.result,
      userName: cmd.userName,
      name: gameState.gameCreatedEvent.name,
      side: cmd.side,
      timeStamp: cmd.timeStamp
    }]
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

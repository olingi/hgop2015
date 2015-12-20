var should = require('should');
var request = require('supertest');
var async = require('async');
var acceptanceUrl = process.env.ACCEPTANCE_URL;

var getUri = function(cmd){
    if (cmd.comm === "createGame")
        return "/api/createGame";
    else if (cmd.comm === "makeMove")
        return "/api/makeMove";
    else if (cmd.comm === "joinGame")
        return "/api/joinGame";
};

function given(userApi) {
  var commands = [userApi._command];
  var currentEvent = [];
  var expectApi = {
    withName: function (gameName) {
      currentEvent[currentEvent.length - 1].name = gameName;
      return expectApi;
    },
    expect: function (eventName) {
      currentEvent.push({event: eventName});
      return expectApi;
    },
    isOk: function (done) {
        async.eachSeries(commands, function (cmd, callback) {
            request(acceptanceUrl)
            .post(getUri(cmd))
            .type('json')
            .send(cmd)
            .end(function(err, res){
                if (err) {
                    return done(err);
                }
                callback();
            });
        },function(err){
            request(acceptanceUrl)
            .get('/api/gameHistory' + userApi.gameId)
            .expect(200)
            .expect('Content-Type', '/json/')
            .end(function (err, res) {
                if (err){
                    return done(err);
                }
                res.body.should.be.instanceof(Array);
                should(res.body[res.body.length - 1]).match(currentEvent[currentEvent.length - 1]);
                done();
            });
        });
    }
    };
  return expectApi;
}

function user(userName) {
  var userApi = {
    _command: undefined,
    createsGame: function (gameId) {
      userApi._command = {
        id: "42",
        gameId: gameId,
        comm: "CreateGame",
        userName: userName,
        side: "X",
        name: "AlphaGame",
        timeStamp: "2014-12-02T11:29:29"
      };
      return userApi;
    },
    withId : function(gameId){
      userApi._command.gameId = gameId;
      return userApi;
    }
  };
  return userApi
}

module.exports.user = user;
module.exports.given = given;

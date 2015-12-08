# Test Examples #

## Description ##
Start preparing for implementing unit tests for a tic-tac-toe server by collecting examples using an event based approach. See lecture.

### Goals ###
* Consider failure (illegal move) scenarios. Do not trust the clients to always do the right things in the right order.
* Consider winning scenarios. Hint: There are at least three winning scenarios that must be considered from a programming perspective.
* Consider draw scenarios

### Form ###
    Given [Events],
    When [Command]
    Then [Resulting Event(s)]

## Win Scenarios ##
### Vertival Win Scenario ###
    Given [ Placed(0,0,X), Placed(0,1,X) ]
    When  [ Place(0,2,X) ]
    Then  [ X Won ]
### Horizontal Win Scenario ###
    Given [ Placed(0,0,X), Placed(1,0,X) ]
    When  [ Place(2,0,X) ]
    Then  [ X Won ]
### Diagonal Win Scenario ###
    Given [ Placed(0,0,X), Placed(1,1,X) ]
    When  [ Place(2,2,X) ]
    Then  [ X Won ]
### Draw Scenario ###
    Given [ Turn(10) ]
    When  [ Place(1,2,X) ]
    Then  [ Draw ]

## Illegal Moves ##
### Placing token on top of the opponents token ###
    Given [ Placed(0,0,X) ]
    When  [ Place(0,0,O) ]
    Then  [ O illegal move ]
### Placing token outside of available area ###
    When  [ Place(0,3,X) ]
    Then  [ X illegal move ]
### Placing 2 tokens at the same time ###
    Given [ Turn (1), Placed(0,0,X) ]
    When  [ Place(0,1,X) ]
    Then  [ X illegal move ]

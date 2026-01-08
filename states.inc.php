<?php
/**
 *------
 * BGA framework: Gregory Isabelli & Emmanuel Colin & BoardGameArena
 * EirakuchoTori implementation : © <Your name here> <Your email address here>
 *
 * This code has been produced on the BGA studio platform for use on http://boardgamearena.com.
 * See http://en.boardgamearena.com/#!doc/Studio for more information.
 * -----
 *
 * states.inc.php
 *
 * EirakuchoTori game states description
 *
 */

/*
   Game state machine is a tool used to facilitate game developpement by doing common stuff that can be set up
   in a very easy way from this configuration file.

   Please check the BGA Studio presentation about game state to understand this, and associated documentation.

   Summary:

   States types:
   _ activeplayer: in this type of state, we expect some action from the active player.
   _ multipleactiveplayer: in this type of state, we expect some action from multiple players (the active players)
   _ game: this is an intermediary state where we don't expect any actions from players. Your game logic must decide what is the next game state.
   _ manager: special type for initial and final state

   Arguments of game states:
   _ name: the name of the GameState, in order you can recognize it on your own code.
   _ description: the description of the current game state is always displayed in the action status bar on
                  the top of the game. Most of the time this is useless for game state with "game" type.
   _ descriptionmyturn: the description of the current game state when it's your turn.
   _ type: defines the type of game states (activeplayer / multipleactiveplayer / game / manager)
   _ action: name of the method to call when this game state become the current game state. Usually, the
             action method is prefixed by "st" (ex: "stMyGameStateName").
   _ possibleactions: array that specify possible player actions on this step. It allows you to use "checkAction"
                      method on both client side (Javacript: this.checkAction) and server side (PHP: $this->checkAction).
   _ transitions: the transitions are the possible paths to go from a game state to another. You must name
                  transitions in order to use transition names in "nextState" PHP method, and use IDs to
                  specify the next game state for each transition.
   _ args: name of the method to call to retrieve arguments for this gamestate. Arguments are sent to the
           client side to be used on "onEnteringState" or to set arguments in the gamestate description.
   _ updateGameProgression: when specified, the game progression is updated (=> call to your getGameProgression
                            method).
*/

//    !! It is not a good idea to modify this file when a game is running !!


$machinestates = [

    // The initial state. Please do not modify.

    1 => [
        "name" => "gameSetup",
        "description" => "",
        "type" => "manager",
        "action" => "stGameSetup",
        "transitions" => ["" => 2]
    ],

    2 => [
      "name" => "Player1InitialCubes",
      "description" => clienttranslate('${actplayer} puts 3 initial cubes.'),
      "descriptionmyturn" => clienttranslate('Your turn. Click 3 different streets to put your cubes.'),
      "type" => "activeplayer",
      "args" => "argUpdateTable",
      "possibleactions" => [ "actInitialCubes" ],
      "transitions" => [ "setupNext" => 3 ]
    ],

    3 => [
        "name" => "SetupNextPlayer",
        "description" => "",
        "type" => "game",
        "action" => "stNextPlayer",
        "updateGameProgression" => true,
        "transitions" => [ "" => 4 ]
    ],

    4 => [
      "name" => "Player2InitialCubes",
      "description" => clienttranslate('${actplayer} puts 3 initial cubes.'),
      "descriptionmyturn" => clienttranslate('Your turn. Click 3 different streets to put your cubes.'),
      "type" => "activeplayer",
      "args" => "argUpdateTable",
      "possibleactions" => [ "actInitialCubes" ],
      "transitions" => [ "setupComplete" => 10 ]
    ],

    10 => [
        "name" => "NextPlayer",
        "description" => clienttranslate('It\'s ${actplayer}\'s turn.'),
        "descriptionmyturn" => clienttranslate('It\'s your turn.'),
        "type" => "game",
        "action" => "stNextPlayer",
        "updateGameProgression" => true,
        "transitions" => [ "" => 20 ]
    ],

    20 => [
        "name" => "ChooseAction",
        "description" => clienttranslate('It\'s ${actplayer}\'s turn.'),
        "descriptionmyturn" => clienttranslate('Choose to recruit or operate.'),
        "type" => "activeplayer",
        "args" => "argUpdateTable",
        "possibleactions" => [ "actChooseAction" ],
        "transitions" => [ "recruit" => 21, "operate" => 22 ]
    ],

    21 => [
        "name" => "SelectEastOrWest",
        "description" => clienttranslate('It\'s ${actplayer}\'s turn.'),
        "descriptionmyturn" => clienttranslate('You\'ve get a rice. Select a east/west way to sow 3 cubes.'),
        "type" => "activeplayer",
        "args" => "argUpdateTable",
        "possibleactions" => [ "actSelectEastOrWest" ],
        "transitions" => [ "" => 30 ]
    ],

    22 => [
        "name" => "SelectStreet",
        "description" => clienttranslate('It\'s ${actplayer}\'s turn.'),
        "descriptionmyturn" => clienttranslate('Select a street.'),
        "type" => "activeplayer",
        "args" => "argUpdateTable",
        "possibleactions" => [ "actSelectStreet" ],
        "transitions" => [ "" => 23 ]
    ],

    23 => [
        "name" => "SowCubes",
        "description" => clienttranslate('It\'s ${actplayer}\'s turn.'),
        "descriptionmyturn" => clienttranslate('Sow cubes.'),
        "type" => "activeplayer",
        "args" => "argUpdateTable",
        "possibleactions" => [ "actSowCubes" ],
        "transitions" => [ "" => 30 ]
    ],

    30 => [
        "name" => "TurnEnd",
        "description" => clienttranslate('Turn end.'),
        "descriptionmyturn" => clienttranslate('Turn end.'),
        "type" => "game",
        "action" => "stTurnEnd",
        "updateGameProgression" => true,
        "transitions" => [
          "next" => 10,
          "triggerEvent" => 31,
          "end" => 99
        ]
    ],

    31 => [
        "name" => "HistoryEvent",
        "description" => clienttranslate('History event phase.'),
        "descriptionmyturn" => clienttranslate('History event phase.'),
        "type" => "game",
        "action" => "stHistoryEvent",
        "transitions" => [
          "next" => 10,
          "eventTriggerPlayer" => 32
        ]
    ],

    32 => [
        "name" => "Player1Event",
        "description" => clienttranslate('It\'s ${actplayer}\'s event turn.'),
        "descriptionmyturn" => clienttranslate('Event phase.'),
        "type" => "activeplayer",
        "args" => "argUpdateTable",
        "possibleactions" => [ "actPlayerEvent" ],
        "transitions" => [
          "next" => 10,
          "eventNextPlayer" => 33
        ]
    ],

    33 => [
        "name" => "Player2Event",
        "description" => clienttranslate('It\'s ${actplayer}\'s event turn.'),
        "descriptionmyturn" => clienttranslate('Event phase.'),
        "type" => "activeplayer",
        "args" => "argUpdateTable",
        "possibleactions" => [ "actPlayerEvent" ],
        "transitions" => [ "" => 10 ]
    ],

    // Final state.
    // Please do not modify (and do not overload action/args methods).
    99 => [
        "name" => "gameEnd",
        "description" => clienttranslate("End of game"),
        "type" => "manager",
        "action" => "stGameEnd",
        "args" => "argGameEnd"
    ],

];

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
 * Game.php
 *
 * This is the main file for your game logic.
 *
 * In this PHP file, you are going to defines the rules of the game.
 */
declare(strict_types=1);

namespace Bga\Games\EirakuchoTori;

require_once(APP_GAMEMODULE_PATH . "module/table/table.game.php");

function print_msg($txt, $color = 'black')
{

  if (is_array($txt)) {
    echo "<textarea style='color: $color; width:50%; height:100px;background-color: #f3f3f3 '>";
    print_r($txt);
    echo "</textarea><br>";
  } else {
    echo "<pre style='color: $color'>";
    print_r($txt);
    echo "</pre>";
  }
}

use \Bga\GameFramework\Actions\Types\IntArrayParam;

class Game extends \Table
{
    private static array $CARD_TYPES;

    /**
     * Your global variables labels:
     *
     * Here, you can assign labels to global variables you are using for this game. You can use any number of global
     * variables with IDs between 10 and 99. If your game has options (variants), you also have to associate here a
     * label to the corresponding ID in `gameoptions.inc.php`.
     *
     * NOTE: afterward, you can get/set the global variables with `getGameStateValue`, `setGameStateInitialValue` or
     * `setGameStateValue` functions.
     */
    public function __construct()
    {
        parent::__construct();

        $this->initGameStateLabels([
            "expansion" => 100
        ]);

        self::$CARD_TYPES = [
            1 => [
                "name" => clienttranslate('Rice'),
                "type" => clienttranslate('Street'),
            ],
            2 => [
                "name" => clienttranslate('Sugar'), // ...
                "type" => clienttranslate('Street'),
            ],
            3 => [
                "name" => clienttranslate('Camphor'), // ...
                "type" => clienttranslate('Street'),
            ],
            4 => [
                "name" => clienttranslate('Tea'), // ...
                "type" => clienttranslate('Street'),
            ],
            5 => [
                "name" => clienttranslate('Groceries'), // ...
                "type" => clienttranslate('Street'),
            ],
            6 => [
                "name" => clienttranslate('Fabric'), // ...
                "type" => clienttranslate('Street'),
            ],
            7 => [
                "name" => clienttranslate('Ginseng'), // ...
                "type" => clienttranslate('Street'),
            ],
            8 => [
                "name" => clienttranslate('Export'), // ...
                "type" => clienttranslate('Street'),
            ],
            9 => [
                "name" => clienttranslate('Retail'), // ...
                "type" => clienttranslate('Street'),
            ],
            10 => [
                "name" => clienttranslate('Wholesale'), // ...
                "type" => clienttranslate('Street'),
            ],
            11 => [
                "name" => clienttranslate('Exchange'), // ...
                "type" => clienttranslate('Street'),
            ],
            12 => [
                "name" => clienttranslate('Stroll'), // ...
                "type" => clienttranslate('Street'),
            ],
            13 => [
                "name" => clienttranslate('Dispatch'), // ...
                "type" => clienttranslate('Street'),
            ],
            14 => [
                "name" => clienttranslate('Wish'), // ...
                "type" => clienttranslate('Street'),
            ],
            1908 => [
                "name" => clienttranslate('1908'), // ...
                "type" => clienttranslate('Event'),
            ],
            1920 => [
                "name" => clienttranslate('1920'), // ...
                "type" => clienttranslate('Event'),
            ],
            1923 => [
                "name" => clienttranslate('1923'), // ...
                "type" => clienttranslate('Event'),
            ],
            1931 => [
                "name" => clienttranslate('1931'), // ...
                "type" => clienttranslate('Event'),
            ],
            1945 => [
                "name" => clienttranslate('1945'), // ...
                "type" => clienttranslate('Event'),
            ],
            1947 => [
                "name" => clienttranslate('1947'), // ...
                "type" => clienttranslate('Event'),
            ],
            // ...
        ];
    }

    /**
     * Player action, example content.
     *
     * In this scenario, each time a player plays a card, this method will be called. This method is called directly
     * by the action trigger on the front side with `bgaPerformAction`.
     *
     * @throws BgaUserException
     */
    // public function actPlayCard(int $card_id): void
    // {
    //     // Retrieve the active player ID.
    //     $player_id = (int)$this->getActivePlayerId();
    //
    //     // check input values
    //     $args = $this->argPlayerTurn();
    //     $playableCardsIds = $args['playableCardsIds'];
    //     if (!in_array($card_id, $playableCardsIds)) {
    //         throw new \BgaUserException('Invalid card choice');
    //     }
    //
    //     // Add your game logic to play a card here.
    //     $card_name = self::$CARD_TYPES[$card_id]['name'];
    //
    //     // Notify all players about the card played.
    //     $this->notifyAllPlayers("cardPlayed", clienttranslate('${player_name} plays ${card_name}'), [
    //         "player_id" => $player_id,
    //         "player_name" => $this->getActivePlayerName(),
    //         "card_name" => $card_name,
    //         "card_id" => $card_id,
    //         "i18n" => ['card_name'],
    //     ]);
    //
    //     // at the end of the action, move to the next state
    //     $this->gamestate->nextState("playCard");
    // }

    // @param streetIds, array with 3 elements.
    public function actInitialCubes(#[IntArrayParam(min: 3, max: 3)] array $streetIds): void
    {
        $player_id = (int)$this->getActivePlayerId();

        foreach ($streetIds as $streetId) {
            $token_id = self::getAvailableTokenId($player_id);
            self::updateTokenRecord($player_id, $token_id, 'street', $streetId);
            self::updateCardRecord($streetId);
        }

        $this->gamestate->nextState();
    }

    public function actChooseAction(): void
    {

    }

    public function actSelectEastOrWest(): void
    {

    }

    public function actSelectStreet(): void
    {

    }

    public function actSowCubes(): void
    {

    }

    public function actPlayerEvent(): void
    {

    }

    /**
     * Game state arguments, example content.
     *
     * This method returns some additional information that is very specific to the `playerTurn` game state.
     *
     * @return array
     * @see ./states.inc.php
     */
    public function argPlayerTurn(): array
    {
        // Get some values from the current game situation from the database.

        return [
            "playableCardsIds" => [1, 2],
        ];
    }

    /**
     * Compute and return the current game progression.
     *
     * The number returned must be an integer between 0 and 100.
     *
     * This method is called each time we are in a game state with the "updateGameProgression" property set to true.
     *
     * @return int
     * @see ./states.inc.php
     */
    public function getGameProgression()
    {
        // TODO: compute and return the game progression

        return 0;
    }

    /**
     * Game state action, example content.
     *
     * The action method of state `nextPlayer` is called everytime the current game state is set to `nextPlayer`.
     */
    public function stNextPlayer(): void {
        // Retrieve the active player ID.
        $player_id = (int)$this->getActivePlayerId();

        // Give some extra time to the active player when he completed an action
        $this->giveExtraTime($player_id);

        $this->activeNextPlayer();

        // Go to another gamestate
        // Here, we would detect if the game is over, and in this case use "endGame" transition instead
        $this->gamestate->nextState();
    }

    public function stTurnEnd(): void {

    }

    public function stHistoryEvent(): void {

    }

    /* functions for DB query */

    /**
     * @param $grid_id is 1-14 for street and 15 for event
     * @param $card_id
     */
    function createBoardRecord($grid_id, $card_id)
    {
      $sql = "INSERT INTO board (grid_id, card_id)
              VALUES ($grid_id, $card_id);";
      self::DbQuery($sql);
    }

    /**
     * $card_id1 and $card_id2 must be different.
     * @param $card_id1 is a street card
     * @param $card_id2 is another street card.
     */
    function exchangeBoardRecord($card_id1, $card_id2)
    {
      if (!is_numeric($card_id1) || !is_numeric($card_id2)) {
        return false;
      }

      if ($card_id1 >= 1 && $card_id1 <= 13 &&
          $card_id2 >= 1 && $card_id2 <= 13 &&
          $card_id1 !== $card_id2) {
        $sql = "SELECT grid_id FROM board
                WHERE card_id=$card_id1 LIMIT 1";
        $grid_id1 = self::getUniqueValueFromDB($sql);

        $sql = "SELECT grid_id FROM board
                WHERE card_id=$card_id2 LIMIT 1";
        $grid_id2 = self::getUniqueValueFromDB($sql);

        $sql = "UPDATE board
                SET card_id = $card_id2
                WHERE grid_id=$grid_id1 AND card_id=$card_id1";
        self::DbQuery($sql);

        $sql = "UPDATE board
                SET card_id = $card_id1
                WHERE grid_id=$grid_id2 AND card_id=$card_id2";
        self::DbQuery($sql);
      }
    }

    /**
     * @param $card_id is in 1-14 and 1908, 1920, 1923, 1931, 1945, 1947
     * @param $name is card name in English
     * @param $card_type is street or event
     */
    function createCardRecord($card_id, $name, $card_type)
    {
      $sql = "INSERT INTO cards (card_id, name, card_type)
              VALUES ($card_id, '$name', '$card_type');";
      self::DbQuery($sql);
    }

    /**
     * @param $card_id is in 1-14 and 1908, 1920, 1923, 1931, 1945, 1947
     * @param $merchant should be a player_id
     */
    function updateCardRecord($card_id, $merchant = 0) 
    {
        $valid_card_ids = [
            1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14,
            1908, 1920, 1923, 1931, 1945, 1947
        ];
        
        if (!in_array($card_id, $valid_card_ids)) {
            throw new \BgaVisibleSystemException("Invalid param card_id: $card_id in updateCardRecord()");
            return;
        }

        $sql = "SELECT player_id, player_color FROM player";
        $players = self::getObjectListFromDB($sql);
        
        $yellow_player_id = null;
        $blue_player_id = null;
        foreach ($players as $player) {
            if ($player['player_color'] == 'ffff00') {
                $yellow_player_id = $player['player_id'];
            }
            if ($player['player_color'] == '2323ff') {
                $blue_player_id = $player['player_id'];
            }
        }
    
        $sql = "UPDATE cards
                SET yellow_tokens = (
                    SELECT COUNT(tokens.token_id) FROM tokens
                    WHERE tokens.position_uid = $card_id 
                      AND tokens.player_id = $yellow_player_id)
                WHERE cards.card_id = $card_id";
        self::DbQuery($sql);
    
        $sql = "UPDATE cards
                SET blue_tokens = (
                    SELECT COUNT(tokens.token_id) FROM tokens
                    WHERE tokens.position_type = 'street'
                      AND tokens.player_id = $blue_player_id)
                WHERE cards.card_id = $card_id";
        self::DbQuery($sql);
    
        if ($merchant != 0) {
            $sql = "UPDATE cards 
                    SET merchant = $merchant 
                    WHERE card_id = $card_id";
            self::DbQuery($sql);
        }
    }

    /**
     * @param $player_id
     * @param $token_id
     * @param $position_type
     * @param $position_uid
     */
    function updateTokenRecord($player_id, $token_id, $position_type, $position_uid)
    {
        $sql = "UPDATE tokens
                SET position_type = '$position_type',
                    position_uid = '$position_uid'
                WHERE token_id = $token_id
                  AND player_id = $player_id";
        self::DbQuery($sql);
    }

    /**
     * @param $player_id
     * Return the smallest available token_id
     */
    function getAvailableTokenId($player_id)
    {
        $sql = "SELECT MIN(token_id) FROM tokens 
                WHERE player_id = $player_id 
                  AND position_type = 'reserve'";
        $token_id = self::getUniqueValueFromDb($sql);
        
        return $token_id;
    }

    /**
     * Migrate database.
     *
     * You don't have to care about this until your game has been published on BGA. Once your game is on BGA, this
     * method is called everytime the system detects a game running with your old database scheme. In this case, if you
     * change your database scheme, you just have to apply the needed changes in order to update the game database and
     * allow the game to continue to run with your new version.
     *
     * @param int $from_version
     * @return void
     */
    public function upgradeTableDb($from_version)
    {
//       if ($from_version <= 1404301345)
//       {
//            // ! important ! Use DBPREFIX_<table_name> for all tables
//
//            $sql = "ALTER TABLE DBPREFIX_xxxxxxx ....";
//            $this->applyDbUpgradeToAllDB( $sql );
//       }
//
//       if ($from_version <= 1405061421)
//       {
//            // ! important ! Use DBPREFIX_<table_name> for all tables
//
//            $sql = "CREATE TABLE DBPREFIX_xxxxxxx ....";
//            $this->applyDbUpgradeToAllDB( $sql );
//       }
    }

    /*
     * Gather all information about current game situation (visible by the current player).
     *
     * The method is called each time the game interface is displayed to a player, i.e.:
     *
     * - when the game starts
     * - when a player refreshes the game page (F5)
     */
    protected function getAllDatas(): array
    {
        $result = [];

        // WARNING: We must only return information visible by the current player.
        $current_player_id = (int) $this->getCurrentPlayerId();

        // Get information about players.
        // NOTE: you can retrieve some extra field you added for "player" table in `dbmodel.sql` if you need it.
        $result["players"] = $this->getCollectionFromDb(
            "SELECT `player_id` `id`, `player_score` `score` FROM `player`"
        );

        $sql = "SELECT * FROM board";
        $result['board'] = self::getObjectListFromDB($sql);

        $sql = "SELECT * FROM cards";
        $result['cards'] = self::getObjectListFromDB($sql);

        $sql = "SELECT * FROM tokens";
        $result['tokens'] = self::getObjectListFromDB($sql);

        $sql = "SELECT * FROM player_info";
        $result['player_info'] = self::getObjectListFromDB($sql);

        // TODO: Gather all information about current game situation (visible by player $current_player_id).

        return $result;
    }

    /**
     * Returns the game name.
     *
     * IMPORTANT: Please do not modify.
     */
    protected function getGameName()
    {
        return "eirakuchotori";
    }

    /**
     * This method is called only once, when a new game is launched. In this method, you must setup the game
     *  according to the game rules, so that the game is ready to be played.
     */
    protected function setupNewGame($players, $options = [])
    {
        // Set the colors of the players with HTML color code. The default below is red/green/blue/orange/brown. The
        // number of colors defined here must correspond to the maximum number of players allowed for the gams.
        $gameinfos = $this->getGameinfos();
        $default_colors = $gameinfos['player_colors'];

        foreach ($players as $player_id => $player) {
            // Now you can access both $player_id and $player array
            $query_values[] = vsprintf("('%s', '%s', '%s', '%s', '%s')", [
                $player_id,
                array_shift($default_colors),
                $player["player_canal"],
                addslashes($player["player_name"]),
                addslashes($player["player_avatar"]),
            ]);

            // Create player_info table records
            $sql = "INSERT INTO player_info (player_id)
                    VALUES ($player_id);";
            self::DbQuery($sql);

            // Create 20 tokens records for player in tokens table
            $tokens = range(1, 20);
            foreach ($tokens as $token_id) {
              $sql = "INSERT INTO tokens (player_id, token_id, position_type, position_uid)
                      VALUES ($player_id, $token_id, 'reserve', 0);";
              self::DbQuery($sql);
            }
        }

        // Create players based on generic information.
        //
        // NOTE: You can add extra field on player table in the database (see dbmodel.sql) and initialize
        // additional fields directly here.
        static::DbQuery(
            sprintf(
                "INSERT INTO player (player_id, player_color, player_canal, player_name, player_avatar) VALUES %s",
                implode(",", $query_values)
            )
        );

        $this->reattributeColorsBasedOnPreferences($players, $gameinfos["player_colors"]);
        $this->reloadPlayersBasicInfos();

        // Init global values with their initial values.

        // Create cards table, including streets, events
        // @params: $card_id, $name, $card_type
        self::createCardRecord(   1, 'Rice',      'street');
        self::createCardRecord(   2, 'Sugar',     'street');
        self::createCardRecord(   3, 'Camphor',   'street');
        self::createCardRecord(   4, 'Tea',       'street');
        self::createCardRecord(   5, 'Groceries', 'street');
        self::createCardRecord(   6, 'Fabric',    'street');
        self::createCardRecord(   7, 'Ginseng',   'street');
        self::createCardRecord(   8, 'Export',    'street');
        self::createCardRecord(   9, 'Retail',    'street');
        self::createCardRecord(  10, 'Wholesale', 'street');
        self::createCardRecord(  11, 'Exchange',  'street');
        self::createCardRecord(  12, 'Stroll',    'street');
        self::createCardRecord(  13, 'Dispatch',  'street');
        self::createCardRecord(  14, 'Wish',      'street');
        self::createCardRecord(1908, '1908',      'event');
        self::createCardRecord(1920, '1920',      'event');
        self::createCardRecord(1923, '1923',      'event');
        self::createCardRecord(1931, '1931',      'event');
        self::createCardRecord(1945, '1945',      'event');
        self::createCardRecord(1947, '1947',      'event');

        // Create board table
        // @params: $grid_id, $card_id
        self::createBoardRecord( 6, 14);
        self::createBoardRecord( 7, 5);
        self::createBoardRecord( 8, 1);
        self::createBoardRecord( 9, 13);
        self::createBoardRecord(15, 0);

        $grids = array_diff(range(1, 14), [6, 7, 8, 9]);
        $cards = array_diff(range(1, 14), [1, 5, 13, 14]);
        shuffle($cards);
        foreach ($grids as $grid_id) {
          self::createBoardRecord($grid_id, array_shift($cards));
        }

        // Init game statistics.
        //
        // NOTE: statistics used in this file must be defined in your `stats.inc.php` file.

        // Dummy content.
        // $this->initStat("table", "table_teststat1", 0);
        // $this->initStat("player", "player_teststat1", 0);

        // TODO: Setup the initial game situation here.

        // Activate first player once everything has been initialized and ready.
        $this->activeNextPlayer();
    }

    /**
     * This method is called each time it is the turn of a player who has quit the game (= "zombie" player).
     * You can do whatever you want in order to make sure the turn of this player ends appropriately
     * (ex: pass).
     *
     * Important: your zombie code will be called when the player leaves the game. This action is triggered
     * from the main site and propagated to the gameserver from a server, not from a browser.
     * As a consequence, there is no current player associated to this action. In your zombieTurn function,
     * you must _never_ use `getCurrentPlayerId()` or `getCurrentPlayerName()`, otherwise it will fail with a
     * "Not logged" error message.
     *
     * @param array{ type: string, name: string } $state
     * @param int $active_player
     * @return void
     * @throws feException if the zombie mode is not supported at this game state.
     */
    protected function zombieTurn(array $state, int $active_player): void
    {
        $state_name = $state["name"];

        if ($state["type"] === "activeplayer") {
            switch ($state_name) {
                default:
                {
                    $this->gamestate->nextState("zombiePass");
                    break;
                }
            }

            return;
        }

        // Make sure player is in a non-blocking status for role turn.
        if ($state["type"] === "multipleactiveplayer") {
            $this->gamestate->setPlayerNonMultiactive($active_player, '');
            return;
        }

        throw new \feException("Zombie mode not supported at this game state: \"{$state_name}\".");
    }
}

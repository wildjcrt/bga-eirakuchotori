
-- ------
-- BGA framework: Gregory Isabelli & Emmanuel Colin & BoardGameArena
-- EirakuchoTori implementation : © <Your name here> <Your email address here>
--
-- This code has been produced on the BGA studio platform for use on http://boardgamearena.com.
-- See http://en.boardgamearena.com/#!doc/Studio for more information.
-- -----

-- dbmodel.sql

-- This is the file where you are describing the database schema of your game
-- Basically, you just have to export from PhpMyAdmin your table structure and copy/paste
-- this export here.
-- Note that the database itself and the standard tables ("global", "stats", "gamelog" and "player") are
-- already created and must not be created here

-- Note: The database schema is created from this file when the game starts. If you modify this file,
--       you have to restart a game to see your changes in database.

-- Example 1: create a standard "card" table to be used with the "Deck" tools (see example game "hearts"):

-- CREATE TABLE IF NOT EXISTS `card` (
--   `card_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
--   `card_type` varchar(16) NOT NULL,
--   `card_type_arg` int(11) NOT NULL,
--   `card_location` varchar(16) NOT NULL,
--   `card_location_arg` int(11) NOT NULL,
--   PRIMARY KEY (`card_id`)
-- ) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;


-- Example 2: add a custom field to the standard "player" table
-- ALTER TABLE `player` ADD `player_my_custom_field` INT UNSIGNED NOT NULL DEFAULT '0';

-- grid_id 從左到右，第一排 1-7，第二排 8-14，事件卡 15
CREATE TABLE IF NOT EXISTS `board` (
  `grid_id` int(10) unsigned NOT NULL,
  `card_id` int(10) unsigned NOT NULL,
  PRIMARY KEY (`grid_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- card_id 為 1-14, 1908, 1920, 1923, 1931, 1945, 1947
-- card_type 有兩種值 street, event
-- merchant 預設 0，有玩家派遣時紀錄該 player_id
CREATE TABLE IF NOT EXISTS `cards` (
  `card_id` int(10) unsigned NOT NULL,
  `name` varchar(16) NOT NULL,
  `card_type` varchar(16) NOT NULL,
  `yellow_tokens` int(10) unsigned NOT NULL DEFAULT 0,
  `blue_tokens` int(10) unsigned NOT NULL DEFAULT 0,
  `merchant` int(10) unsigned NOT NULL DEFAULT 0,
  PRIMARY KEY (`card_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- 紀錄玩家的倉庫數量、分數和可用 tokens 數量
CREATE TABLE IF NOT EXISTS `player_info` (
  `player_id` int(10) unsigned NOT NULL,
  `rice` int(10) unsigned NOT NULL DEFAULT 0,
  `sugar` int(10) unsigned NOT NULL DEFAULT 0,
  `camphor` int(10) unsigned NOT NULL DEFAULT 0,
  `tea` int(10) unsigned NOT NULL DEFAULT 0,
  `groceries` int(10) unsigned NOT NULL DEFAULT 0,
  `fabric` int(10) unsigned NOT NULL DEFAULT 0,
  `ginseng` int(10) unsigned NOT NULL DEFAULT 0,
  `scores` int(10) unsigned NOT NULL DEFAULT 0,
  `available_tokens` int(10) unsigned NOT NULL DEFAULT 20,
  PRIMARY KEY (`player_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- 紀錄 token 的位置，token_id 為 1-20，搭配 player_id 共 40 筆
-- 列出所有 position_type: position_uid
--         reserve:       0
--         street:        1-14
--         merchat:       1-14
--         event:         1945
--         rice:          1-4
--         sugar:         1-4
--         camphor:       1-4
--         tea:           1-4
--         groceries:     1-4
--         fabric:        1-4
--         ginseng:       1-4
--         rest:          1-3
--         goals:         merchants3
--         goals:         warehouse24
--         goals:         export6
CREATE TABLE IF NOT EXISTS `tokens` (
  `player_id` int(10) unsigned NOT NULL,
  `token_id` int(10) unsigned NOT NULL,
  `position_type` varchar(16) NOT NULL,
  `position_uid` varchar(16) NOT NULL,
  PRIMARY KEY (`player_id`, `token_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

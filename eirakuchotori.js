/**
 *------
 * BGA framework: Gregory Isabelli & Emmanuel Colin & BoardGameArena
 * EirakuchoTori implementation : © <Your name here> <Your email address here>
 *
 * This code has been produced on the BGA studio platform for use on http://boardgamearena.com.
 * See http://en.boardgamearena.com/#!doc/Studio for more information.
 * -----
 *
 * eirakuchotori.js
 *
 * EirakuchoTori user interface script
 *
 * In this file, you are describing the logic of your user interface, in Javascript language.
 *
 */

const AVAILABLE_STREET_CLASS = 'available border-4 border-amber-300';
const SELECTED_STREET_CLASS = 'border-4 border-red-500';
const DISABLED_STREET_CLASS = 'opacity-40';
const CLEAR_STREET_CLASS = 'street resource w-[120px] h-[182px] bg-gray-200 justify-center flex flex-col';

define([
    "dojo","dojo/_base/declare",
    "ebg/core/gamegui",
    "ebg/counter"
],
function (dojo, declare) {
    return declare("bgagame.eirakuchotori", ebg.core.gamegui, {
        constructor: function(){
            console.log('eirakuchotori constructor');

            // Here, you can init the global variables of your user interface
            // Example:
            // this.myGlobalValue = 0;

        },

        /*
            setup:

            This method must set up the game user interface according to current game situation specified
            in parameters.

            The method is called each time the game interface is displayed to a player, ie:
            _ when the game starts
            _ when a player refreshes the game page (F5)

            "gamedatas" argument contains all datas retrieved by your "getAllDatas" PHP method.
        */

        setup: function( gamedatas )
        {
            console.log( "Starting game setup" );

            // Example to add a div on the game area
            document.getElementById('game_play_area').insertAdjacentHTML('beforeend', `
              <div id="player-tables" class="mx-auto w-[900px]">
                <!-- 1st Row -->
                <div class="grid grid-cols-7 gap-2 mb-5">
                  <div class="w-[120px] items-center justify-center"></div>
                  <div class="w-[120px] items-center justify-center"></div>
                  <div id="warehouse-1" class="resource w-[248px] h-[163px] bg-gray-200 col-span-2 items-center justify-center"></div>
                  <div id="reserve-1" class="w-[150px] items-center justify-center pt-2"></div>
                  <div class="w-[120px] items-center justify-center"></div>
                </div>

                <div class="bg-white p-2 mb-5">
                  <!-- 2nd Row -->
                  <div class="grid grid-cols-7 gap-2 mb-2">
                    <div class="street resource w-[120px] h-[182px] bg-gray-200 justify-center flex flex-col">
                      <div class="merchant pt-1 pl-1"></div>
                      <div class="flex-grow"></div>
                      <div class="cubes-area flex flex-wrap-reverse content-start"></div>
                    </div>
                    <div class="street resource w-[120px] h-[182px] bg-gray-200 justify-center flex flex-col">
                      <div class="merchant pt-1 pl-1"></div>
                      <div class="flex-grow"></div>
                      <div class="cubes-area flex flex-wrap-reverse content-start"></div>
                    </div>
                    <div class="street resource w-[120px] h-[182px] bg-gray-200 justify-center flex flex-col">
                      <div class="merchant pt-1 pl-1"></div>
                      <div class="flex-grow"></div>
                      <div class="cubes-area flex flex-wrap-reverse content-start"></div>
                    </div>
                    <div class="street resource w-[120px] h-[182px] bg-gray-200 justify-center flex flex-col">
                      <div class="merchant pt-1 pl-1"></div>
                      <div class="flex-grow"></div>
                      <div class="cubes-area flex flex-wrap-reverse content-start"></div>
                    </div>
                    <div class="street resource w-[120px] h-[182px] bg-gray-200 justify-center flex flex-col">
                      <div class="merchant pt-1 pl-1"></div>
                      <div class="flex-grow"></div>
                      <div class="cubes-area flex flex-wrap-reverse content-start"></div>
                    </div>
                    <div class="street resource w-[120px] h-[182px] bg-gray-200 justify-center flex flex-col">
                      <div class="merchant pt-1 pl-1"></div>
                      <div class="flex-grow"></div>
                      <div class="cubes-area flex flex-wrap-reverse content-start"></div>
                    </div>
                    <div class="street resource w-[120px] h-[182px] bg-gray-200 justify-center flex flex-col">
                      <div class="merchant pt-1 pl-1"></div>
                      <div class="flex-grow"></div>
                      <div class="cubes-area flex flex-wrap-reverse content-start"></div>
                    </div>
                  </div>

                  <!-- 3rd Row -->
                  <div class="grid grid-cols-7 gap-2">
                    <div class="street resource w-[120px] h-[182px] bg-gray-200 justify-center flex flex-col rotate-180">
                      <div class="merchant pt-1 pl-1"></div>
                      <div class="flex-grow"></div>
                      <div class="cubes-area flex flex-wrap-reverse content-start"></div>
                    </div>
                    <div class="street resource w-[120px] h-[182px] bg-gray-200 justify-center flex flex-col rotate-180">
                      <div class="merchant pt-1 pl-1"></div>
                      <div class="flex-grow"></div>
                      <div class="cubes-area flex flex-wrap-reverse content-start"></div>
                    </div>
                    <div class="street resource w-[120px] h-[182px] bg-gray-200 justify-center flex flex-col rotate-180">
                      <div class="merchant pt-1 pl-1"></div>
                      <div class="flex-grow"></div>
                      <div class="cubes-area flex flex-wrap-reverse content-start"></div>
                    </div>
                    <div class="street resource w-[120px] h-[182px] bg-gray-200 justify-center flex flex-col rotate-180">
                      <div class="merchant pt-1 pl-1"></div>
                      <div class="flex-grow"></div>
                      <div class="cubes-area flex flex-wrap-reverse content-start"></div>
                    </div>
                    <div class="street resource w-[120px] h-[182px] bg-gray-200 justify-center flex flex-col rotate-180">
                      <div class="merchant pt-1 pl-1"></div>
                      <div class="flex-grow"></div>
                      <div class="cubes-area flex flex-wrap-reverse content-start"></div>
                    </div>
                    <div class="street resource w-[120px] h-[182px] bg-gray-200 justify-center flex flex-col rotate-180">
                      <div class="merchant pt-1 pl-1"></div>
                      <div class="flex-grow"></div>
                      <div class="cubes-area flex flex-wrap-reverse content-start"></div>
                    </div>
                    <div class="street resource w-[120px] h-[182px] bg-gray-200 justify-center flex flex-col rotate-180">
                      <div class="merchant pt-1 pl-1"></div>
                      <div class="flex-grow"></div>
                      <div class="cubes-area flex flex-wrap-reverse content-start"></div>
                    </div>
                  </div>
                </div>

                <!-- 4th Row -->
                <div class="grid grid-cols-7 gap-2 mb-5">
                  <div class="items-center justify-center"></div>
                  <div class="event-area w-[120px] items-center justify-center px-3 py-10"></div>
                  <div id="scores-goals-rest" class="resource w-[468px] h-[156px] bg-gray-200 justify-center flex flex-col">
                    <div class="score0 yellow marker absolute"></div>
                    <div class="score0 blue marker absolute"></div>
                    <div class="rest-area">
                      <div class="rest1 absolute"></div>
                      <div class="rest2 absolute"></div>
                      <div class="rest3 absolute"></div>
                      <div class="rest4 absolute"></div>
                      <div class="rest5 absolute"></div>
                    </div>
                    <div class="goal-area">
                      <div class="merchants3 absolute"></div>
                      <div class="warehouse24 absolute"></div>
                      <div class="export6 absolute"></div>
                    </div>
                  </div>
                </div>

                <!-- 5th Row -->
                <div class="grid grid-cols-7 gap-2 mb-5">
                  <div class="w-[120px] items-center justify-center"></div>
                  <div class="w-[120px] items-center justify-center"></div>
                  <div id="warehouse-2" class="resource w-[248px] h-[163px] bg-gray-200 col-span-2 items-center justify-center"></div>
                  <div id="reserve-2" class="w-[150px] items-center justify-center pt-2"></div>
                  <div class="w-[120px] items-center justify-center"></div>
                </div>

                <!-- dice area -->
                <div id="dice-area" class="w-24"></div>
              </div>
            `);

            streetElements = document.getElementsByClassName('street');
            Object.values(gamedatas.board).forEach(grid => {
                const index = parseInt(grid.grid_id) - 1,
                      streetElement = streetElements[index];
                if (streetElement && (index !== 14)) {
                    streetElement.id = `street-${grid.card_id}`;
                }

                if ((index === 14) && grid.card_id !== '0') {
                    const eventElement = document.getElementsByClassName('event')[0];
                    if (eventElement) {
                        eventElement.id = `event-${grid.card_id}`;
                    }
                }
            });

            // Setting up player boards
            Object.values(gamedatas.players).forEach(player => {
                player.color_name = player.color === 'ffff00' ? 'yellow' : 'blue';

                // example of setting up players boards
                this.getPlayerPanelElement(player.id).insertAdjacentHTML('beforeend', `
                    <div id="player-counter-${player.id}">A player counter</div>
                `);

                // example of adding a div for each player
                document.getElementById('player-tables').insertAdjacentHTML('beforeend', `
                    <div id="player-table-${player.id}">
                        <strong>${player.name}</strong>
                        <div>Player zone content goes here</div>
                    </div>
                `);
            });

            // Setup game notifications to handle (see "setupNotifications" method below)
            this.setupNotifications();

            console.log( "Ending game setup" );
        },


        ///////////////////////////////////////////////////
        //// Game & client states

        // onEnteringState: this method is called each time we are entering into a new game state.
        //                  You can use this method to perform some user interface changes at this moment.
        //
        onEnteringState: function( stateName, args )
        {
            console.log( `Entering state: ${stateName}`, args );

            this.updatePageTitle();

            switch( stateName )
            {
            case 'Player1InitialCubes':
            case 'Player2InitialCubes':
                this.updatePlayerTables(args.args.cubes);

                if( this.isCurrentPlayerActive() ) {
                    dojo.query('.street').forEach(function(node) {
                        dojo.addClass(node, AVAILABLE_STREET_CLASS);

                        // bind click event on all streets
                        dojo.connect(node, 'onclick', function(e) {
                            let selectedCount = dojo.query('.street.border-red-500.border-4').length;

                            if (dojo.hasClass(node, 'available')) {
                                if (selectedCount < 3) {
                                    dojo.removeClass(node, AVAILABLE_STREET_CLASS);
                                    dojo.addClass(node, SELECTED_STREET_CLASS);

                                    selectedCount = dojo.query('.street.border-red-500.border-4').length;
                                    if (selectedCount === 3) {
                                        dojo.removeClass('confirm-btn', 'disabled');
                                    }
                                }
                            } else {
                                const availableNodes = dojo.query('.street.available').map(n => n);
                                dojo.removeClass(node, SELECTED_STREET_CLASS);
                                dojo.addClass(node, AVAILABLE_STREET_CLASS);

                                // Here is for syncing css keyframes animation.
                                availableNodes.forEach(n => n.classList.remove('available'));
                                availableNodes.push(node);
                                setTimeout(() => {
                                    availableNodes.forEach(n => n.classList.add('available'));
                                }, 1);
                            }
                        });
                    });
                }

                break;
            case 'ChooseAction':
                this.updatePlayerTables(args.args.cubes);

                break;
            case 'SelectEastOrWest':
                this.updatePlayerTables(args.args.cubes);

                if( this.isCurrentPlayerActive() ) {
                    const streets = Array.from(document.getElementsByClassName('street'));
                    const targetStreets = streets.slice(4, 10);

                    targetStreets.forEach(function(node) {
                        dojo.addClass(node, AVAILABLE_STREET_CLASS);

                        dojo.connect(node, 'onclick', function(e) {
                            const index = streets.indexOf(node);

                            if (dojo.hasClass(node, 'available')) {
                                // Remove all previous selections
                                streets.forEach(n => {
                                    if (dojo.hasClass(n, SELECTED_STREET_CLASS)) {
                                        dojo.removeClass(n, SELECTED_STREET_CLASS);
                                        dojo.addClass(n, AVAILABLE_STREET_CLASS);
                                    }
                                });

                                // Add selected class to the appropriate group
                                if (index >= 4 && index <= 6) {
                                    streets.slice(4, 7).forEach(n => {
                                        dojo.removeClass(n, AVAILABLE_STREET_CLASS);
                                        dojo.addClass(n, SELECTED_STREET_CLASS);
                                    });
                                } else {
                                    streets.slice(7, 10).forEach(n => {
                                        dojo.removeClass(n, AVAILABLE_STREET_CLASS);
                                        dojo.addClass(n, SELECTED_STREET_CLASS);
                                    });
                                }
                            } else if (dojo.hasClass(node, SELECTED_STREET_CLASS)) {
                                // Remove all selections when clicking a selected node
                                streets.forEach(n => {
                                    if (dojo.hasClass(n, SELECTED_STREET_CLASS)) {
                                        dojo.removeClass(n, SELECTED_STREET_CLASS);
                                        dojo.addClass(n, AVAILABLE_STREET_CLASS);
                                    }
                                });

                                // Sync animation
                                const availableNodes = targetStreets.filter(n => dojo.hasClass(n, 'available'));
                                availableNodes.forEach(n => n.classList.remove('available'));
                                setTimeout(() => {
                                    availableNodes.forEach(n => n.classList.add('available'));
                                }, 1);
                            }
                        });
                    });
                }

                break;
            case 'SelectStreet':
                this.updatePlayerTables(args.args.cubes);

                break;
            case 'SowCubes':
                this.updatePlayerTables(args.args.cubes);

                break;
            case 'dummy':
                break;
            }
        },

        // onLeavingState: this method is called each time we are leaving a game state.
        //                 You can use this method to perform some user interface changes at this moment.
        //
        onLeavingState: function( stateName )
        {
            console.log( `Leaving state: ${stateName}` );

            switch( stateName )
            {

            /* Example:

            case 'myGameState':

                // Hide the HTML block we are displaying only during this game state
                dojo.style( 'my_html_block_id', 'display', 'none' );

                break;
           */


            case 'dummy':
                break;
            }
        },

        // onUpdateActionButtons: in this method you can manage "action buttons" that are displayed in the
        //                        action status bar (ie: the HTML links in the status bar).
        //
        onUpdateActionButtons: function( stateName, args )
        {
            console.log( `onUpdateActionButtons: ${stateName}`, args );

            if( this.isCurrentPlayerActive() )
            {
                switch( stateName )
                {
                case 'Player1InitialCubes':
                case 'Player2InitialCubes':
                    this.addActionButton('confirm-btn', _('Confirm'), () => this.onConfirm(stateName));
                    dojo.addClass('confirm-btn', 'disabled');
                    break;

                case 'ChooseAction':
                    this.addActionButton('recruit-btn', _('Recruit'), () => this.onChooseAction('recruit'));
                    this.addActionButton('operate-btn', _('Operate'), () => this.onChooseAction('operate'));
                    break;
                }
            }
        },

        ///////////////////////////////////////////////////
        //// Utility methods

        /*

            Here, you can defines some utility methods that you can use everywhere in your javascript
            script.

        */
        updatePlayerTables: function(cubes) {
            document.querySelectorAll('.cube').forEach(element => element.remove());

            cubes.forEach(cube => {
                const cubeElement = document.createElement('div');
                cubeElement.id = `${cube.player_id}-${cube.cube_id}`;
                cubeElement.classList.add('cube', this.gamedatas.players[cube.player_id].color_name);

                switch (cube.position_type) {
                    case 'street':
                        const streetElement = document.getElementById(`street-${cube.position_uid}`);
                        if (streetElement) {
                              const cubesArea = streetElement.querySelector('.cubes-area');
                              cubeElement.classList.add('float-left');
                              if (cubesArea) cubesArea.appendChild(cubeElement);
                        }
                        break;

                    case 'merchat':
                        const merchantStreet = document.getElementById(`street-${cube.position_uid}`);
                        if (merchantStreet) {
                            const merchantArea = merchantStreet.querySelector('.merchant');
                            if (merchantArea) merchantArea.appendChild(cubeElement);
                        }
                        break;

                    case 'event':
                        const eventArea = document.getElementById(`event-${cube.position_uid}`);
                        if (eventArea) {
                            cubeElement.classList.add('float-left');
                            eventArea.appendChild(cubeElement);
                        }
                        break;

                    case 'rest':
                        const restElement = document.querySelector(`.rest${cube.position_uid}`);
                        if (restElement) {
                            cubeElement.classList.add('absolute');
                            restElement.appendChild(cubeElement);
                        }
                        break;

                    case 'goals':
                        const goalElement = document.querySelector(`.${cube.position_uid}`);
                        if (goalElement) {
                            cubeElement.classList.add('absolute');
                            goalElement.appendChild(cubeElement);
                        }
                        break;

                    case 'reserve':
                        if (cube.player_id === `${this.player_id}`) {
                            const reserve1 = document.getElementById('reserve-1');
                            if (reserve1) {
                                cubeElement.classList.add('float-left');
                                reserve1.appendChild(cubeElement);
                            }
                        } else {
                            const reserve2 = document.getElementById('reserve-2');
                            if (reserve2) {
                                cubeElement.classList.add('float-left');
                                reserve2.appendChild(cubeElement);
                            }
                        }
                        break;

                    case 'rice':
                    case 'sugar':
                    case 'camphor':
                    case 'tea':
                    case 'groceries':
                    case 'fabric':
                    case 'ginseng':
                        const warehouseId = cube.player_id === `${this.player_id}` ? 'warehouse-1' : 'warehouse-2';
                        const warehouse = document.getElementById(warehouseId);
                        if (warehouse) {
                            cubeElement.classList.add('absolute', `${cube.position_type}${cube.position_uid}`);
                            warehouse.appendChild(cubeElement);
                        }
                        break;
                }
           });
        },

        ///////////////////////////////////////////////////
        //// Player's action

        /*

            Here, you are defining methods to handle player's action (ex: results of mouse click on
            game objects).

            Most of the time, these methods:
            _ check the action is possible at this game state.
            _ make a call to the game server

        */

        // Example:

        onConfirm: function(stateName)
        {
            console.log( `onConfirm: ${stateName}` );

            if( this.isCurrentPlayerActive() )
            {
                switch( stateName )
                {
                case 'Player1InitialCubes':
                case 'Player2InitialCubes':
                    try {
                        const streetIds = dojo.query('.border-red-500.border-4').map(n => n.id.replace('street-', ''));

                        if (streetIds.length !== 3) {
                            throw new Error('Please select exactly 3 streets.');
                        }

                        this.bgaPerformAction("actInitialCubes", { streetIds: streetIds.join(',') });
                    } catch (error) {
                        this.showMessage(_('Please select exactly 3 streets.') , 'error');
                        console.error(error.message);
                    }
                    break;
                }
            }

            document.querySelectorAll('.street').forEach(streetElement => {
                streetElement.className = '';
                streetElement.className = CLEAR_STREET_CLASS;

                if (streetElement.closest('.grid-cols-7:last-child')) {
                    streetElement.classList.add('rotate-180');
                }
            });
        },

        onChooseAction: function(actionName)
        {
            console.log( 'onChooseAction' );

            if( this.isCurrentPlayerActive() )
            {
                this.bgaPerformAction("actChooseAction", { actionName: actionName });
            }
        },

        ///////////////////////////////////////////////////
        //// Reaction to cometD notifications

        /*
            setupNotifications:

            In this method, you associate each of your game notifications with your local method to handle it.

            Note: game notification names correspond to "notifyAllPlayers" and "notifyPlayer" calls in
                  your eirakuchotori.game.php file.

        */
        setupNotifications: function()
        {
            console.log( 'notifications subscriptions setup' );

            // TODO: here, associate your game notifications with local methods

            // Example 1: standard notification handling
            // dojo.subscribe( 'cardPlayed', this, "notif_cardPlayed" );

            // Example 2: standard notification handling + tell the user interface to wait
            //            during 3 seconds after calling the method in order to let the players
            //            see what is happening in the game.
            // dojo.subscribe( 'cardPlayed', this, "notif_cardPlayed" );
            // this.notifqueue.setSynchronous( 'cardPlayed', 3000 );
            //

            dojo.subscribe( 'moveCubes', this, "notif_moveCubes" );
            this.notifqueue.setSynchronous( 'moveCubes', 1000 );
        },

        // TODO: from this point and below, you can write your game notifications handling methods

        /*
        Example:

        notif_cardPlayed: function( notif )
        {
            console.log( 'notif_cardPlayed' );
            console.log( notif );

            // Note: notif.args contains the arguments specified during you "notifyAllPlayers" / "notifyPlayer" PHP call

            // TODO: play the card in the user interface.
        },

        */
        notif_moveCubes: function( notif )
        {
            console.log( notif );

            const cubeId = `${notif.args.player_id}-${notif.args.cube_id}`;
            const cubeElement = document.getElementById(cubeId);

            if (!cubeElement) {
                console.error('Cube element not found:', cubeId);
                return;
            }

            const targetStreet = document.getElementById(notif.args.after_move);
            const cubesArea = targetStreet.querySelector('.cubes-area');

            debugger
            this.slideToObject(cubeElement, cubesArea).play();
        }
   });
});

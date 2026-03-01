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
const CLEAR_STREET_CLASS = 'street w-[120px] h-[182px] bg-gray-200 justify-center flex flex-col';
const ON_CLICK_HANDLERS = {
    'streets': []
};


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

            const currentPlayerInfo = Object.values(gamedatas.player_info).find(
                info => info.player_id == this.player_id
            );
            // Default to 'new-art' if not found (e.g. spectator)
            this.artStyle = (currentPlayerInfo && currentPlayerInfo.art_style) ? currentPlayerInfo.art_style : 'new-art';
            console.log('Art style:', this.artStyle);

            document.getElementById('game_play_area').insertAdjacentHTML('beforeend', `
              <div id="player-tables" class="mx-auto w-[900px] relative">
                <!-- 1st Row -->
                <div class="grid grid-cols-7 gap-2 mb-5">
                  <div class="w-[120px] items-center justify-center"></div>
                  <div class="w-[120px] items-center justify-center"></div>
                  <div id="warehouse-1" class="resource w-[248px] h-[163px] bg-gray-200 col-span-2 items-center justify-center relative"></div>
                  <div id="reserve-1" class="w-[150px] items-center justify-center pt-2"></div>
                  <div class="w-[120px] items-center justify-center"></div>
                </div>

                <div class="bg-white p-2 mb-5">
                  <!-- 2nd Row -->
                  <div class="grid grid-cols-7 gap-2 mb-2">
                    <div class="street ${this.artStyle} w-[120px] h-[182px] bg-gray-200 justify-center flex flex-col">
                      <div class="merchant pt-1 pl-1"></div>
                      <div class="flex-grow"></div>
                      <div class="cubes-area flex flex-wrap-reverse content-start"></div>
                    </div>
                    <div class="street ${this.artStyle} w-[120px] h-[182px] bg-gray-200 justify-center flex flex-col">
                      <div class="merchant pt-1 pl-1"></div>
                      <div class="flex-grow"></div>
                      <div class="cubes-area flex flex-wrap-reverse content-start"></div>
                    </div>
                    <div class="street ${this.artStyle} w-[120px] h-[182px] bg-gray-200 justify-center flex flex-col">
                      <div class="merchant pt-1 pl-1"></div>
                      <div class="flex-grow"></div>
                      <div class="cubes-area flex flex-wrap-reverse content-start"></div>
                    </div>
                    <div class="street ${this.artStyle} w-[120px] h-[182px] bg-gray-200 justify-center flex flex-col">
                      <div class="merchant pt-1 pl-1"></div>
                      <div class="flex-grow"></div>
                      <div class="cubes-area flex flex-wrap-reverse content-start"></div>
                    </div>
                    <div class="street ${this.artStyle} w-[120px] h-[182px] bg-gray-200 justify-center flex flex-col">
                      <div class="merchant pt-1 pl-1"></div>
                      <div class="flex-grow"></div>
                      <div class="cubes-area flex flex-wrap-reverse content-start"></div>
                    </div>
                    <div class="street ${this.artStyle} w-[120px] h-[182px] bg-gray-200 justify-center flex flex-col">
                      <div class="merchant pt-1 pl-1"></div>
                      <div class="flex-grow"></div>
                      <div class="cubes-area flex flex-wrap-reverse content-start"></div>
                    </div>
                    <div class="street ${this.artStyle} w-[120px] h-[182px] bg-gray-200 justify-center flex flex-col">
                      <div class="merchant pt-1 pl-1"></div>
                      <div class="flex-grow"></div>
                      <div class="cubes-area flex flex-wrap-reverse content-start"></div>
                    </div>
                  </div>

                  <!-- 3rd Row -->
                  <div class="grid grid-cols-7 gap-2">
                    <div class="street ${this.artStyle} w-[120px] h-[182px] bg-gray-200 justify-center flex flex-col rotate-180">
                      <div class="merchant pt-1 pl-1 rotate-180"></div>
                      <div class="flex-grow"></div>
                      <div class="cubes-area flex flex-wrap-reverse content-start rotate-180"></div>
                    </div>
                    <div class="street ${this.artStyle} w-[120px] h-[182px] bg-gray-200 justify-center flex flex-col rotate-180">
                      <div class="merchant pt-1 pl-1 rotate-180"></div>
                      <div class="flex-grow"></div>
                      <div class="cubes-area flex flex-wrap-reverse content-start rotate-180"></div>
                    </div>
                    <div class="street ${this.artStyle} w-[120px] h-[182px] bg-gray-200 justify-center flex flex-col rotate-180">
                      <div class="merchant pt-1 pl-1 rotate-180"></div>
                      <div class="flex-grow"></div>
                      <div class="cubes-area flex flex-wrap-reverse content-start rotate-180"></div>
                    </div>
                    <div class="street ${this.artStyle} w-[120px] h-[182px] bg-gray-200 justify-center flex flex-col rotate-180">
                      <div class="merchant pt-1 pl-1 rotate-180"></div>
                      <div class="flex-grow"></div>
                      <div class="cubes-area flex flex-wrap-reverse content-start rotate-180"></div>
                    </div>
                    <div class="street ${this.artStyle} w-[120px] h-[182px] bg-gray-200 justify-center flex flex-col rotate-180">
                      <div class="merchant pt-1 pl-1 rotate-180"></div>
                      <div class="flex-grow"></div>
                      <div class="cubes-area flex flex-wrap-reverse content-start rotate-180"></div>
                    </div>
                    <div class="street ${this.artStyle} w-[120px] h-[182px] bg-gray-200 justify-center flex flex-col rotate-180">
                      <div class="merchant pt-1 pl-1 rotate-180"></div>
                      <div class="flex-grow"></div>
                      <div class="cubes-area flex flex-wrap-reverse content-start rotate-180"></div>
                    </div>
                    <div class="street ${this.artStyle} w-[120px] h-[182px] bg-gray-200 justify-center flex flex-col rotate-180">
                      <div class="merchant pt-1 pl-1 rotate-180"></div>
                      <div class="flex-grow"></div>
                      <div class="cubes-area flex flex-wrap-reverse content-start rotate-180"></div>
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
                      <div id="rest-1" class="rest absolute"></div>
                      <div id="rest-2" class="rest absolute"></div>
                      <div id="rest-3" class="rest absolute"></div>
                      <div id="rest-4" class="rest absolute"></div>
                      <div id="rest-5" class="rest absolute"></div>
                    </div>
                    <div class="goal-area">
                      <div id="merchants3" class="goal absolute"></div>
                      <div id="warehouse24" class="goal absolute"></div>
                      <div id="export6" class="goal absolute"></div>
                    </div>
                  </div>
                </div>

                <!-- 5th Row -->
                <div class="grid grid-cols-7 gap-2 mb-5">
                  <div class="w-[120px] items-center justify-center"></div>
                  <div class="w-[120px] items-center justify-center"></div>
                  <div id="warehouse-2" class="resource w-[248px] h-[163px] bg-gray-200 col-span-2 items-center justify-center relative"></div>
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

                this.getPlayerPanelElement(player.id).insertAdjacentHTML('beforeend', `
                    <div id="player-panel-${player.id}" class="ekt-player-panel">
                        <div class="ekt-panel-row">
                            <div class="ekt-panel-item">
                                <img src="${g_gamethemeurl}img/user-info-sugar.jpg" class="ekt-panel-icon" />
                                <span id="panel-sugar-${player.id}" class="ekt-panel-count">0</span>
                            </div>
                            <div class="ekt-panel-item">
                                <img src="${g_gamethemeurl}img/user-info-rice.jpg" class="ekt-panel-icon" />
                                <span id="panel-rice-${player.id}" class="ekt-panel-count">0</span>
                            </div>
                            <div class="ekt-panel-item">
                                <img src="${g_gamethemeurl}img/user-info-tea.jpg" class="ekt-panel-icon" />
                                <span id="panel-tea-${player.id}" class="ekt-panel-count">0</span>
                            </div>
                            <div class="ekt-panel-item">
                                <img src="${g_gamethemeurl}img/user-info-groceries.jpg" class="ekt-panel-icon" />
                                <span id="panel-groceries-${player.id}" class="ekt-panel-count">0</span>
                            </div>
                        </div>
                        <div class="ekt-panel-row">
                            <div class="ekt-panel-item">
                                <img src="${g_gamethemeurl}img/user-info-camphor.jpg" class="ekt-panel-icon" />
                                <span id="panel-camphor-${player.id}" class="ekt-panel-count">0</span>
                            </div>
                            <div class="ekt-panel-item">
                                <img src="${g_gamethemeurl}img/user-info-fabric.jpg" class="ekt-panel-icon" />
                                <span id="panel-fabric-${player.id}" class="ekt-panel-count">0</span>
                            </div>
                            <div class="ekt-panel-item">
                                <img src="${g_gamethemeurl}img/user-info-ginseng.jpg" class="ekt-panel-icon" />
                                <span id="panel-ginseng-${player.id}" class="ekt-panel-count">0</span>
                            </div>
                        </div>
                        <div class="ekt-panel-row">
                            <div class="ekt-panel-item ekt-panel-item-wide">
                                <img src="${g_gamethemeurl}img/user-info-home.jpg" class="ekt-panel-icon" />
                                <span id="panel-home-${player.id}" class="ekt-panel-count">0/5</span>
                            </div>
                            <div class="ekt-panel-item ekt-panel-item-wide">
                                <img src="${g_gamethemeurl}img/user-info-dispatch.jpg" class="ekt-panel-icon" />
                                <span id="panel-dispatch-${player.id}" class="ekt-panel-count">0/3</span>
                            </div>
                        </div>
                    </div>
                `);

                document.getElementById('player-tables').insertAdjacentHTML('beforeend', `
                    <div id="player-table-${player.id}">
                        <strong>${player.name}</strong>
                        <div>Player zone content goes here</div>
                    </div>
                `);
            });


            document.getElementById('game_play_area').insertAdjacentHTML('beforeend', `
              <div id="art-style-switcher">
                <span id="art-style-label">Art Style:</span>
                <div id="art-style-options">
                  <label class="art-style-option">
                    <input type="radio" name="art_style" value="new-art"
                      ${this.artStyle === 'new-art' ? 'checked' : ''}>
                    <span>New Art</span>
                  </label>
                  <label class="art-style-option">
                    <input type="radio" name="art_style" value="line-art"
                      ${this.artStyle === 'line-art' ? 'checked' : ''}>
                    <span>Line Art</span>
                  </label>
                </div>
              </div>
            `);

            this.updatePlayerPanelsSetup(gamedatas);

            // Bind art style switcher change event
            document.querySelectorAll('input[name="art_style"]').forEach(radio => {
                radio.addEventListener('change', (e) => {
                    const newStyle = e.target.value;
                    this.onChangeArtStyle(newStyle);
                });
            });

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
                this.updatePlayerPanelsFromCubes(args.args.cubes);

                if( this.isCurrentPlayerActive() ) {
                    dojo.query('.street').forEach(function(node) {
                        dojo.addClass(node, AVAILABLE_STREET_CLASS);

                        // bind click event on all streets
                        ON_CLICK_HANDLERS['streets'].push(
                            dojo.connect(node, 'onclick', function(e) {
                                let selectedCount = dojo.query(`.street.${SELECTED_STREET_CLASS.split(' ').join('.')}`).length;

                                if (dojo.hasClass(node, 'available')) {
                                    if (selectedCount < 3) {
                                        dojo.removeClass(node, AVAILABLE_STREET_CLASS);
                                        dojo.addClass(node, SELECTED_STREET_CLASS);

                                        selectedCount = dojo.query(`.street.${SELECTED_STREET_CLASS.split(' ').join('.')}`).length;
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
                            })
                        );
                    });
                }

                break;
            case 'ChooseAction':
                this.updatePlayerTables(args.args.cubes);
                this.updatePlayerPanelsFromCubes(args.args.cubes);

                break;
            case 'SelectEastOrWest':
                this.updatePlayerTables(args.args.cubes);
                this.updatePlayerPanelsFromCubes(args.args.cubes);

                if( this.isCurrentPlayerActive() ) {
                    const streets = Array.from(document.getElementsByClassName('street'));
                    const targetStreets = streets.slice(4, 10);

                    targetStreets.forEach(function(node) {
                        dojo.addClass(node, AVAILABLE_STREET_CLASS);

                        ON_CLICK_HANDLERS['streets'].push(
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

                                        dojo.removeClass('confirm-btn', 'disabled');
                                    } else {
                                        streets.slice(7, 10).forEach(n => {
                                            dojo.removeClass(n, AVAILABLE_STREET_CLASS);
                                            dojo.addClass(n, SELECTED_STREET_CLASS);
                                        });

                                        dojo.removeClass('confirm-btn', 'disabled');
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

                                    dojo.addClass('confirm-btn', 'disabled');
                                }
                            })
                        );
                    });
                }

                break;
            case 'SelectStreet':
                this.updatePlayerTables(args.args.cubes);
                this.updatePlayerPanelsFromCubes(args.args.cubes);

                if( this.isCurrentPlayerActive() ) {
                    const availableStreets = args.args.availableStreets || [];

                    availableStreets.forEach(streetId => {
                        const streetElement = document.getElementById(`street-${streetId}`);
                        if (streetElement) {
                            dojo.addClass(streetElement, AVAILABLE_STREET_CLASS);

                            ON_CLICK_HANDLERS['streets'].push(
                                dojo.connect(streetElement, 'onclick', function(e) {
                                    // Deselect previously selected street
                                    const selectedSelector = `.street.${SELECTED_STREET_CLASS.split(' ').join('.')}`;
                                    document.querySelectorAll(selectedSelector).forEach(n => {
                                        dojo.removeClass(n, SELECTED_STREET_CLASS);
                                        dojo.addClass(n, AVAILABLE_STREET_CLASS);
                                    });

                                    if (dojo.hasClass(streetElement, 'available')) {
                                        // Select this street
                                        dojo.removeClass(streetElement, AVAILABLE_STREET_CLASS);
                                        dojo.addClass(streetElement, SELECTED_STREET_CLASS);
                                        dojo.removeClass('confirm-btn', 'disabled');
                                    }
                                })
                            );
                        }
                    });

                    // Dim non-available streets so the player can see which ones are selectable
                    document.querySelectorAll('.street').forEach(el => {
                        const id = el.id;
                        if (id && !availableStreets.includes(id.replace('street-', ''))) {
                            dojo.addClass(el, DISABLED_STREET_CLASS);
                        }
                    });
                }

                break;
            case 'SowCubes':
                this.updatePlayerTables(args.args.cubes);
                this.updatePlayerPanelsFromCubes(args.args.cubes);

                break;
            case 'Player1Event':
            case 'Player2Event':
                this.updatePlayerTables(args.args.cubes);
                this.updatePlayerPanelsFromCubes(args.args.cubes);

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

            case 'SelectStreet':
                // Disconnect click handlers
                dojo.forEach(ON_CLICK_HANDLERS['streets'], dojo.disconnect);
                ON_CLICK_HANDLERS['streets'] = [];

                // Reset all street classes
                var self = this;
                document.querySelectorAll('.street').forEach(function(streetElement) {
                    dojo.removeClass(streetElement, AVAILABLE_STREET_CLASS);
                    dojo.removeClass(streetElement, SELECTED_STREET_CLASS);
                    dojo.removeClass(streetElement, DISABLED_STREET_CLASS);
                });

                break;
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
                case 'SelectEastOrWest':
                case 'SelectStreet':
                    this.addActionButton('confirm-btn', _('Confirm'), () => this.onConfirm(stateName));
                    dojo.addClass('confirm-btn', 'disabled');

                    break;
                case 'ChooseAction':
                    this.addActionButton('recruit-btn', _('Recruit'), () => this.onChooseAction('recruit'));
                    this.addActionButton('operate-btn', _('Operate'), () => this.onChooseAction('operate'));

                    break;
                }

                // 在 ChooseAction 之後的狀態都顯示 Undo 按鈕
                var undoStates = ['SelectEastOrWest', 'SelectStreet', 'SowCubes'];
                if (undoStates.indexOf(stateName) !== -1) {
                    this.addActionButton('button_undo', _('Undo'), () => this.onUndo(), null, false, 'red');
                }
            }
        },

        ///////////////////////////////////////////////////
        //// Utility methods

        /*

            Here, you can defines some utility methods that you can use everywhere in your javascript
            script.

        */

        getClearStreetClass: function() {
            return CLEAR_STREET_CLASS + ' ' + this.artStyle;
        },

        applyArtStyle: function() {
            document.querySelectorAll('.street').forEach(function(el) {
                el.classList.remove('line-art', 'new-art');
                el.classList.add(this.artStyle);
            }.bind(this));
        },

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
                        const restElement = document.querySelector(`.rest-${cube.position_uid}`);
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
                            cubeElement.classList.add('absolute', `${cube.position_type}-${cube.position_uid}`);
                            warehouse.appendChild(cubeElement);
                        }
                        break;
                }
           });
        },

        /**
         * Update all player panel counters from gamedatas.
         * Call this in setup() and whenever cubes/cards change.
         */
        updatePlayerPanelsSetup: function(gamedatas) {
            const cubes = gamedatas.cubes || [];

            Object.values(gamedatas.players).forEach(player => {
                const pid = player.id;
                const playerCubes = cubes.filter(c => c.player_id == pid);

                const goodTypes = ['sugar', 'rice', 'tea', 'groceries', 'camphor', 'fabric', 'ginseng'];
                goodTypes.forEach(good => {
                    const goodCube = playerCubes.filter(c => c.position_type === good)[0];
                    const count = goodCube ? goodCube.position_uid : 0;
                    const el = document.getElementById(`panel-${good}-${pid}`);
                    if (el) el.textContent = count;
                });

                const restCount = playerCubes.filter(c => c.position_type === 'rest').length;
                const homeEl = document.getElementById(`panel-home-${pid}`);
                if (homeEl) homeEl.textContent = `${restCount}/5`;

                const merchantCount = playerCubes.filter(c => c.position_type === 'merchat').length;
                const dispatchEl = document.getElementById(`panel-dispatch-${pid}`);
                if (dispatchEl) dispatchEl.textContent = `${merchantCount}/3`;
            });
        },

        /**
         * Convenience method: update panels from cubes array only.
         * Call from onEnteringState or notification handlers.
         */
        updatePlayerPanelsFromCubes: function(cubes) {
            Object.values(this.gamedatas.players).forEach(player => {
                const pid = player.id;
                const playerCubes = cubes.filter(c => c.player_id == pid);

                const goodTypes = ['sugar', 'rice', 'tea', 'groceries', 'camphor', 'fabric', 'ginseng'];
                goodTypes.forEach(good => {
                    const goodCube = playerCubes.filter(c => c.position_type === good)[0];
                    const count = goodCube ? goodCube.position_uid : 0;
                    const el = document.getElementById(`panel-${good}-${pid}`);
                    if (el) el.textContent = count;
                });

                const merchantCount = playerCubes.filter(c => c.position_type === 'rest').length;
                const homeEl = document.getElementById(`panel-home-${pid}`);
                if (homeEl) homeEl.textContent = `${merchantCount}/5`;

                const dispatchCount = playerCubes.filter(c => c.position_type === 'merchant').length;;
                const dispatchEl = document.getElementById(`panel-dispatch-${pid}`);
                if (dispatchEl) dispatchEl.textContent = `${dispatchCount}/3`;
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
                    // Disconnect all streets dom onclick event
                    dojo.forEach(ON_CLICK_HANDLERS['streets'], dojo.disconnect);
                    ON_CLICK_HANDLERS['streets'] = [];

                    try {
                        const streetIds = dojo.query(`.${SELECTED_STREET_CLASS.split(' ').join('.')}`).map(n => n.id.replace('street-', ''));

                        if (streetIds.length !== 3) {
                            throw new Error('Please select exactly 3 streets.');
                        }

                        this.bgaPerformAction("actInitialCubes", { streetIds: streetIds.join(',') });
                    } catch (error) {
                        this.showMessage(_('Please select exactly 3 streets.') , 'error');
                        console.error(error.message);
                    }

                    break;
                case 'SelectEastOrWest':
                    // Disconnect all streets dom onclick event
                    dojo.forEach(ON_CLICK_HANDLERS['streets'], dojo.disconnect);
                    ON_CLICK_HANDLERS['streets'] = [];

                    try {
                        const streets = Array.from(document.getElementsByClassName('street'));
                        const selectedNodes = streets.filter(n =>
                            SELECTED_STREET_CLASS.split(' ').every(cls => n.classList.contains(cls))
                        );

                        if (selectedNodes.length !== 3) {
                            throw new Error('Please select east way or west way.');
                        }

                        const selectedIndices = selectedNodes.map(n => streets.indexOf(n));
                        const isEast = selectedIndices.includes(4) && selectedIndices.includes(5) && selectedIndices.includes(6);
                        const isWest = selectedIndices.includes(7) && selectedIndices.includes(8) && selectedIndices.includes(9);

                        if (!isEast && !isWest) {
                            throw new Error('Please select east way or west way.');
                        }

                        this.bgaPerformAction("actSelectEastOrWest", {
                            direction: isEast ? 'east' : 'west'
                        });
                    } catch (error) {
                        this.showMessage(_('Please select east way or west way.') , 'error');
                        console.error(error.message);
                    }

                    break;

                case 'SelectStreet':
                    // Disconnect all streets dom onclick event
                    dojo.forEach(ON_CLICK_HANDLERS['streets'], dojo.disconnect);
                    ON_CLICK_HANDLERS['streets'] = [];

                    try {
                        const selectedStreets = dojo.query(`.street.${SELECTED_STREET_CLASS.split(' ').join('.')}`);

                        if (selectedStreets.length !== 1) {
                            throw new Error('Please select exactly 1 street.');
                        }

                        const streetId = parseInt(selectedStreets[0].id.replace('street-', ''));
                        this.bgaPerformAction("actSelectStreet", { streetId: streetId });
                    } catch (error) {
                        this.showMessage(_('Please select a street.'), 'error');
                        console.error(error.message);
                    }

                    break;
                }
            }

            var self = this;
            document.querySelectorAll('.street').forEach(function(streetElement) {
                streetElement.className = '';
                streetElement.className = self.getClearStreetClass();

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

        onChangeArtStyle: function(newStyle)
        {
            console.log('onChangeArtStyle:', newStyle);

            this.artStyle = newStyle;
            this.applyArtStyle();

            this.bgaPerformAction("actChangeArtStyle", {
                artStyle: newStyle
            }, {
                checkAction: false
            });
        },

        onUndo: function()
        {
            console.log('onUndo');

            if (!this.isCurrentPlayerActive()) {
                return;
            }

            this.bgaPerformAction("actUndo", {}, {
                checkAction: false
            });
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

            dojo.subscribe( 'artStyleChanged', this, "notif_artStyleChanged" );
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

        notif_artStyleChanged: function( notif )
        {
            console.log('notif_artStyleChanged', notif);

            this.artStyle = notif.args.art_style;
            this.applyArtStyle();

            var radio = document.querySelector('input[name="art_style"][value="' + notif.args.art_style + '"]');
            if (radio) {
                radio.checked = true;
            }
        },

        notif_moveCubes: function( notif )
        {
            console.log( notif );

            // Get the cube element using the player_id and cube_id
            const cubeId = `${notif.args.player_id}-${notif.args.cube_id}`;
            const cubeElement = document.getElementById(cubeId);
            const colorName = this.gamedatas.players[notif.args.player_id].color_name;

            if (!cubeElement) {
                console.error('Cube element not found:', cubeId);
                return;
            }

            // Helper function to create target position element
            const createTargetPosition = (className, parent) => {
                const targetPosition = document.createElement('div');
                targetPosition.className = className;
                targetPosition.style.visibility = 'hidden';
                parent.appendChild(targetPosition);
                return targetPosition;
            };

            // Determine movement type based on after_move destination
            const moveType = notif.args.after_move.split('-')[0];
            let targetPosition;
            let newParentElement;
            let finalClassName;

            switch (moveType) {
                case 'rice':
                case 'sugar':
                case 'camphor':
                case 'tea':
                case 'groceries':
                case 'fabric':
                case 'ginseng':
                    // Warehouse resource movements
                    const warehouseId = notif.args.player_id == this.player_id ? 'warehouse-1' : 'warehouse-2';
                    const warehouseElement = document.getElementById(warehouseId);
                    finalClassName = `cube ${colorName} absolute ${notif.args.after_move}`;
                    targetPosition = createTargetPosition(
                        finalClassName,
                        warehouseElement
                    );
                    break;

                case 'street':
                    // Street movements
                    finalClassName = `cube ${colorName} float-left`;
                    newParentElement = document.getElementById(notif.args.after_move).querySelector('.cubes-area');
                    targetPosition = createTargetPosition(
                        finalClassName,
                        newParentElement
                    );
                    break;

                case 'merchant':
                    // Merchant movements
                    finalClassName = `cube ${colorName} float-left`;
                    newParentElement = document.getElementById(notif.args.after_move);
                    targetPosition = createTargetPosition(
                        finalClassName,
                        newParentElement
                    );
                    break;

                case 'event':
                    // Event card movements
                    finalClassName = `cube ${colorName} float-left`;
                    newParentElement = document.getElementById(notif.args.after_move);
                    targetPosition = createTargetPosition(
                        finalClassName,
                        newParentElement
                    );
                    break;

                case 'reserve': {
                    // Reserve movements (e.g. rice-2 → reserve-0)
                    const reserveId = notif.args.player_id == this.player_id ? 'reserve-1' : 'reserve-2';
                    const reserveElement = document.getElementById(reserveId);
                    finalClassName = `cube ${colorName} float-left`;
                    newParentElement = reserveElement;
                    targetPosition = createTargetPosition(
                        finalClassName,
                        reserveElement
                    );
                    break;
                }

                case 'rest':
                case 'goals':
                    // Rest area and goals movements
                    finalClassName = `cube ${colorName} absolute`;
                    newParentElement = document.getElementById(notif.args.after_move);
                    targetPosition = createTargetPosition(
                        finalClassName,
                        newParentElement
                    );
                    break;

                default:
                    console.error('Unknown movement type:', moveType);
                    return;
            }

            // 統一用 player-tables 作為動畫過渡容器，
            // 保證起點和終點都在同一座標系，slideToObject 計算才會正確。
            const stagingArea = document.getElementById('player-tables');
            const srcRect = cubeElement.getBoundingClientRect();
            const areaRect = stagingArea.getBoundingClientRect();

            cubeElement.style.position = 'absolute';
            cubeElement.style.zIndex = '100';
            cubeElement.style.top = (srcRect.top - areaRect.top + stagingArea.scrollTop) + 'px';
            cubeElement.style.left = (srcRect.left - areaRect.left + stagingArea.scrollLeft) + 'px';
            stagingArea.appendChild(cubeElement);

            var anim = this.slideToObject(cubeElement, targetPosition);
            dojo.connect(anim, 'onEnd', dojo.hitch(this, function() {
                cubeElement.style.position = '';
                cubeElement.style.zIndex = '';
                cubeElement.style.top = '';
                cubeElement.style.left = '';

                // Apply the final class and move to new parent
                cubeElement.className = finalClassName;
                const dest = newParentElement || targetPosition.parentNode;
                dest.appendChild(cubeElement);
                targetPosition.remove();
            }));
            anim.play();
        }
   });
});

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
                  <div class="w-[150px] items-center justify-center pt-2">
                    <div class="yellow cube float-left"></div>
                    <div class="yellow cube float-left"></div>
                    <div class="yellow cube float-left"></div>
                    <div class="yellow cube float-left"></div>
                    <div class="yellow cube float-left"></div>
                    <div class="yellow cube float-left"></div>
                    <div class="yellow cube float-left"></div>
                    <div class="yellow cube float-left"></div>
                    <div class="yellow cube float-left"></div>
                    <div class="yellow cube float-left"></div>
                    <div class="yellow cube float-left"></div>
                    <div class="yellow cube float-left"></div>
                    <div class="yellow cube float-left"></div>
                    <div class="yellow cube float-left"></div>
                    <div class="yellow cube float-left"></div>
                    <div class="yellow cube float-left"></div>
                    <div class="yellow cube float-left"></div>
                    <div class="yellow cube float-left"></div>
                    <div class="yellow cube float-left"></div>
                    <div class="yellow cube float-left"></div>
                  </div>
                  <div class="w-[120px] items-center justify-center"></div>
                </div>

                <div class="bg-white p-2 mb-5">
                  <!-- 2nd Row -->
                  <div class="grid grid-cols-7 gap-2 mb-2">
                    <div class="street resource w-[120px] h-[182px] bg-gray-200 items-center justify-center pt-28">
                      <div class="merchant1 absolute"></div>
                    </div>
                    <div class="street resource w-[120px] h-[182px] bg-gray-200 items-center justify-center pt-20">
                      <div class="merchant2 absolute"></div>
                    </div>
                    <div class="street resource w-[120px] h-[182px] bg-gray-200 items-center justify-center pt-20">
                      <div class="merchant3 absolute"></div>
                    </div>
                    <div class="street resource w-[120px] h-[182px] bg-gray-200 items-center justify-center pt-20">
                      <div class="merchant4 absolute"></div>
                    </div>
                    <div class="street resource w-[120px] h-[182px] bg-gray-200 items-center justify-center pt-20">
                      <div class="merchant5 absolute"></div>
                    </div>
                    <div class="street resource w-[120px] h-[182px] bg-gray-200 items-center justify-center pt-20">
                      <div class="merchant6 absolute"></div>
                    </div>
                    <div class="street resource w-[120px] h-[182px] bg-gray-200 items-center justify-center pt-20">
                      <div class="merchant7 absolute"></div>
                    </div>
                  </div>

                  <!-- 3rd Row -->
                  <div class="grid grid-cols-7 gap-2">
                    <div class="street resource w-[120px] h-[182px] bg-gray-200 items-center justify-center pt-20 rotate-180">
                      <div class="merchant8 absolute"></div>
                    </div>
                    <div class="street resource w-[120px] h-[182px] bg-gray-200 items-center justify-center pt-20 rotate-180">
                      <div class="merchant9 absolute"></div>
                    </div>
                    <div class="street resource w-[120px] h-[182px] bg-gray-200 items-center justify-center pt-20 rotate-180">
                      <div class="merchant10 absolute"></div>
                    </div>
                    <div class="street resource w-[120px] h-[182px] bg-gray-200 items-center justify-center pt-20 rotate-180">
                      <div class="merchant11 absolute"></div>
                    </div>
                    <div class="street resource w-[120px] h-[182px] bg-gray-200 items-center justify-center pt-20 rotate-180">
                      <div class="merchant12 absolute"></div>
                    </div>
                    <div class="street resource w-[120px] h-[182px] bg-gray-200 items-center justify-center pt-20 rotate-180">
                      <div class="merchant13 absolute"></div>
                    </div>
                    <div class="street resource w-[120px] h-[182px] bg-gray-200 items-center justify-center pt-20 rotate-180">
                      <div class="merchant14 absolute"></div>
                    </div>
                  </div>
                </div>

                <!-- 4th Row -->
                <div class="grid grid-cols-7 gap-2 mb-5">
                  <div class="items-center justify-center"></div>
                  <div class="event-area w-[120px] items-center justify-center px-3 py-10"></div>
                  <div id="scores-goals-rest" class="resource w-[468px] h-[156px] bg-gray-200 items-center justify-center">
                    <div class="score0 yellow cube absolute"></div>
                    <div class="score0 blue cube absolute"></div>
                    <div class="rest-area">
                      <div class="rest1 absolute"></div>
                      <div class="rest2 absolute"></div>
                      <div class="rest3 absolute"></div>
                      <div class="rest4 absolute"></div>
                      <div class="rest5 absolute"></div>
                    </div>
                    <div class="goal-area">
                      <div class="Merchants3 absolute"></div>
                      <div class="Warehouse24 absolute"></div>
                      <div class="Export6 absolute"></div>
                    </div>
                  </div>
                </div>

                <!-- 5th Row -->
                <div class="grid grid-cols-7 gap-2 mb-5">
                  <div class="w-[120px] items-center justify-center"></div>
                  <div class="w-[120px] items-center justify-center"></div>
                  <div id="warehouse-2" class="resource w-[248px] h-[163px] bg-gray-200 col-span-2 items-center justify-center"></div>
                  <div class="w-[150px] items-center justify-center pt-2">
                    <div class="blue cube float-left"></div>
                    <div class="blue cube float-left"></div>
                    <div class="blue cube float-left"></div>
                    <div class="blue cube float-left"></div>
                    <div class="blue cube float-left"></div>
                    <div class="blue cube float-left"></div>
                    <div class="blue cube float-left"></div>
                    <div class="blue cube float-left"></div>
                    <div class="blue cube float-left"></div>
                    <div class="blue cube float-left"></div>
                    <div class="blue cube float-left"></div>
                    <div class="blue cube float-left"></div>
                    <div class="blue cube float-left"></div>
                    <div class="blue cube float-left"></div>
                    <div class="blue cube float-left"></div>
                    <div class="blue cube float-left"></div>
                    <div class="blue cube float-left"></div>
                    <div class="blue cube float-left"></div>
                    <div class="blue cube float-left"></div>
                    <div class="blue cube float-left"></div>
                  </div>
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

            // TODO: Set up your game interface here, according to "gamedatas"


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
            console.log( `Entering state: $stateName`, args );

            this.updatePageTitle();

            switch( stateName )
            {

            case 'Player1InitialCubes':
            case 'Player2InitialCubes':

                if( this.isCurrentPlayerActive() ) {
                    dojo.query('.street').forEach(function(node) {
                        // opacity-40 all streets
                        dojo.addClass(node, 'available');

                        // bind click event on all streets
                        dojo.connect(node, 'onclick', function(e) {
                            let selectedCount = dojo.query('.street.border-red-500.border-4').length;

                            if (dojo.hasClass(node, 'available')) {
                                if (selectedCount < 3) {
                                    dojo.addClass(node, 'border-4');
                                    dojo.addClass(node, 'border-red-500');
                                    dojo.removeClass(node, 'available');

                                    selectedCount = dojo.query('.street.border-red-500.border-4').length;
                                    if (selectedCount === 3) {
                                        dojo.removeClass('confirm-btn', 'disabled');
                                    }
                                }
                            } else {
                                const availableNodes = dojo.query('.street.available').map(n => n);
                                dojo.removeClass(node, 'border-4');
                                dojo.removeClass(node, 'border-red-500');

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

            case 'dummy':
                break;
            }
        },

        // onLeavingState: this method is called each time we are leaving a game state.
        //                 You can use this method to perform some user interface changes at this moment.
        //
        onLeavingState: function( stateName )
        {
            console.log( `Leaving state: $stateName` );

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
            console.log( 'onUpdateActionButtons: '+stateName, args );

            if( this.isCurrentPlayerActive() )
            {
                switch( stateName )
                {
                case 'Player1InitialCubes':
                case 'Player2InitialCubes':
                    this.addActionButton('confirm-btn', _('Confirm'), () => this.onConfirm(stateName));
                    dojo.addClass('confirm-btn', 'disabled');
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
   });
});

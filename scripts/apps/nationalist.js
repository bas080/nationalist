//NATIONALIST
var term = new Term('terminal'); //This version of nationalist uses a command line interface for user interaction

var nationalist = geome.Game( {

  name : 'Europa',
  description : 'Fictional war so you can learn your european countries',
  constructor : function( game ){

    function echo(str){
      term.screen.pre_commandline.add(str.toString());
    };

    echo( "Commander line interface.\nType help for more information on using the interface\n\nCampaign: Europa\nPlayers: Europeans and Russians\nStory: Russia occupied Ukraine. After considerable political and diplomatic interventions europe sees no other option then to attack to protect their interests");

    //STATE

      game.state = {
        winner: false,
        current_player: 0,
        total_players: 1,
        turn: 1,
        history: []
      }; var state = game.state;

      var render_state = ( function( elem ){
        return function(){
          var string = '';
          var data = {
            playing : game.get_player_by_id( state.current_player ).name,
            turn : state.turn
          };
          for ( prop in data ){
            var value = data[prop];
            string += prop + ': '+ value + ' - ';
          }
          elem.innerHTML = string;
        }
      })( document.getElementById('state') );

    //HISTORY

      var add_history = function( type, description ){
        return state.history.push( { type: type, description: description } );
      };

      var get_history = function( amount ){
        var from = state.history.length - 1;
        return;slice( from-amount, from );
      };

    //COUNTRIES

      //borders are game dependent. These can differ per game as the map might
      //change. This should not be part of the geome framework. Neither should
      //country names or country related date.
      ////////////////////////////////////////

      game.countries = {
        "ALB": { troops : 14, energy  : 1, player   : 1, infrastructure : 2, borders : ["GRC", "MNE", "MKD"] },
        "AND": { troops : 4, energy   : 0, player   : 1, infrastructure : 3, borders : ["ESP", "FRA"] },
        "AUT": { troops : 22, energy  : 5, player   : 1, infrastructure : 2, borders : ["CHE", "CZE", "DEU", "HUN", "ITA", "LIE", "SVN", "SVK"] },
        "BEL": { troops : 34, energy  : 5, player   : 1, infrastructure : 2, borders : ["DEU", "FRA", "LUX", "NLD"] },
        "BGR": { troops : 31, energy  : 4, player   : 1, infrastructure : 1, borders : ["GRC", "MKD", "OMN", "ROU", "SRB", "TUR"] },
        "BIH": { troops : 9, energy   : 2, player   : 1, infrastructure : 2, borders : ["HRV", "MNE", "SRB"] },
        "BLR": { troops : 48, energy  : 4, player   : 1, infrastructure : 1, borders : ["LTU", "LVA", "POL", "RUS", "UKR"] },
        "CHE": { troops : 22, energy  : 10, player  : 1, infrastructure : 2, borders : ["AUT", "DEU", "FRA", "ITA", "LIE"] },
        "CZE": { troops : 23, energy  : 10, player  : 1, infrastructure : 2, borders : ["AUT", "DEU", "POL", "SVK"] },
        "DEU": { troops : 186, energy : 48, player  : 1, infrastructure : 2, borders : ["AUT", "BEL", "CHE", "CZE", "DNK", "FRA", "LUX", "NLD", "POL"] },
        "DNK": { troops : 18, energy  : 9, player   : 1, infrastructure : 3, borders : ["DEU", "DEN"] },
        "ESP": { troops : 123, energy : 15, player  : 1, infrastructure : 2, borders : ["AND", "FRA", "GIB", "PRT"] },
        "EST": { troops : 5, energy   : 1, player   : 1, infrastructure : 2, borders : ["LVA", "RUS"] },
        "FIN": { troops : 22, energy  : 5, player   : 1, infrastructure : 3, borders : ["NOR", "RUS", "SWE"] },
        "FRA": { troops : 215, energy : 50, player  : 1, infrastructure : 2, borders : ["AND", "BEL", "BRA", "CHE", "DEU", "ESP", "ITA", "LUX", "MCO", "SUR", "GBR"] },
        "GBR": { troops : 156, energy : 49, player  : 1, infrastructure : 2, borders : ["GRL", "IRL", "NLD", "FRA", "BEL"] },
        "GIB": { troops : 0, energy   : 0, player   : 1, infrastructure : 2, borders : ["ESP"] },
        "GRC": { troops : 143, energy : 4, player   : 1, infrastructure : 1, borders : ["ALB", "BGR", "MKD", "TUR"] },
        "HRV": { troops : 16, energy  : 1, player   : 1, infrastructure : 2, borders : ["BIH", "HUN", "MNE", "SRB", "SVN"] },
        "HUN": { troops : 22, energy  : 3, player   : 1, infrastructure : 2, borders : ["AUT", "HRV", "OMN", "ROU", "SRB", "SVN", "SVK", "UKR"] },
        "IRL": { troops : 9, energy   : 0, player   : 1, infrastructure : 2, borders : ["GBR"] },
        "ITA": { troops : 155, energy : 14, player  : 1, infrastructure : 1, borders : ["AUT", "CHE", "FRA", "SVN", "SMR", "VAT"] },
        "LIE": { troops : 1, energy   : 0, player   : 1, infrastructure : 1, borders : ["AUT", "CHE"] },
        "LTU": { troops : 10, energy  : 0, player   : 1, infrastructure : 2, borders : ["BLR", "LVA", "POL"] },
        "LUX": { troops : 1, energy   : 0, player   : 1, infrastructure : 3, borders : ["BEL", "DEU", "FRA"] },
        "LVA": { troops : 5, energy   : 20, player  : 1, infrastructure : 2, borders : ["BLR", "EST", "LTU", "RUS"] },
        "MCO": { troops : 0, energy   : 0, player   : 1, infrastructure : 2, borders : ["FRA"] },
        "MDA": { troops : 5, energy   : 0, player   : 1, infrastructure : 1, borders : ["OMN", "ROU", "UKR"] },
        "MKD": { troops : 8, energy   : 20, player  : 1, infrastructure : 2, borders : ["ALB", "BGR", "GRC", "SRB"] },
        "MNE": { troops : 3, energy   : 20, player  : 1, infrastructure : 1, borders : ["ALB", "BIH", "HRV", "SRB"] },
        "NLD": { troops : 37, energy  : 28, player  : 1, infrastructure : 3, borders : ["BEL", "DEU"] },
        "NOR": { troops : 24, energy  : 95, player  : 1, infrastructure : 3, borders : ["FIN", "RUS", "SWE"] },
        "POL": { troops : 99, energy  : 27, player  : 1, infrastructure : 2, borders : ["BLR", "CZE", "DEU", "LTU", "SVK", "UKR"] },
        "PRT": { troops : 42, energy  : 2, player   : 1, infrastructure : 2, borders : ["ESP"] },
        "ROU": { troops : 73, energy  : 11, player  : 1, infrastructure : 1, borders : ["BGR", "HUN", "MDA", "SRB"] },
        "SMR": { troops : 0, energy   : 0, player   : 1, infrastructure : 1, borders : ["ITA"] },
        "SRB": { troops : 28, energy  : 5, player   : 1, infrastructure : 1, borders : ["BIH", "BGR", "HRV", "HUN", "MNE", "MKD", "OMN", "ROU"] },
        "SVK": { troops : 15, energy  : 3, player   : 1, infrastructure : 2, borders : ["AUT", "CZE", "HUN", "POL", "UKR"] },
        "SVN": { troops : 8, energy   : 1, player   : 1, infrastructure : 2, borders : ["AUT", "HRV", "HUN", "ITA"] },
        "SWE": { troops : 20, energy  : 2, player   : 1, infrastructure : 3, borders : ["FIN", "NOR", "DNK"] },
        "VAT": { troops : 5, energy   : 5, player   : 1, infrastructure : 1, borders : ["ITA"] },
        "UKR": { troops : 232, energy : 32, player  : 0, infrastructure : 1, borders : ["BLR", "HUN", "MDA", "POL", "RUS", "SVK"] },
        "RUS": { troops : 843, energy : 550, player : 0, infrastructure : 2, borders : ["AZE", "BLR", "CHN", "EST", "FIN", "GEO", "PRK", "KAZ", "LVA", "MNG", "NOR", "UKR"] },
      };

      game.get_country_by_iso = function( iso ){
        return game.countries[iso];
      };

      var is_bordering = function( country, bordering_country ){
        return ( country.borders.indexOf( bordering_country.iso ) > -1 );
      };

      var are_foes = function( country, bordering_country ){
        return ( country.player != bordering_country.player );
      };

      var country_has_troops = function( country, troops ){
        return ( country.troops >= troops );
      };

      for ( iso in game.countries ){
        var country = game.countries[iso];
        game.register_country( iso, country );
      }

    //ENERGY

      var produce_energy = function( country ){
        var player = game.get_player_by_id( country.player )
        player.energy += country.energy;
      };

    //PLAYERS

      var players = {
        'Russians'  : { id : 0, energy: 0, color : '#FF0'  },
        'Europeans' : { id : 1, energy: 0, color : '#0FF' },
      };

      for ( name in players  ){
        player = players[name];
        player.name = name;
        game.register_player( name, player );
      }

      var get_player_countries = function( player ){
        var countries = game.get_countries();
        var output = {};
        for ( iso in countries ){
          var country = countries[iso];
          if ( player.id == country.player ){
            output[iso] = country;
          }
        }
        return output;
      };

      game.get_player_by_id = function( id ){
        var players = game.get_players();
        for ( name in players ){
          player = players[name];
          if ( player.id == id )
            return player
        }
      };

      game.get_player_by_name = function( name ){
        var players = game.get_players();
        for ( key in players ){
          if ( name == key ){
            player = players[name];
            return player
          }
        }
      };

      game.get_player_countries = function( player ){
        var countries = game.get_countries();
        var output = {};
        for ( iso in countries ){
          var country = countries[iso];
          if ( country.player == player.id ){
            output[iso] = country;
          }
        }
        return output;
      };

      var is_current_player = function( player ){
        return ( state.current_player == player.id );
      };

      var get_current_player = function( ){
        return game.get_player_by_id( state.current_player );
      };

      var player_has_won = function( player ){
        return false;
      };

      var player_has_energy = function( player, energy ){
        return ( player.energy >= energy );
      };

    //MOVING

      var Move = function( defs ){

        var f_country = defs.f_country;
        var t_country = defs.t_country;
        var troops = defs.troops;
        var player = game.get_player_by_id( f_country.player );

        this.get = function( ){
          return defs;
        };

        this.cost = function( ){
          var infrastructure_sum = f_country.infrastructure + t_country.infrastructure;
          return troops - ( troops * 0.1  * infrastructure_sum );
        };

        this.perform = function( ){
          f_country.troops -= troops;
          t_country.troops += troops;
          game.log( [
            { text : player.name, color : player.color },
            { text : 'moved', color : 'lime' },
            { text : troops, color : 'red' },
            { text : 'troops from', color : 'lime' },
            { text : f_country.name, color : player.color },
            { text : 'to', color : 'lime' },
            { text : t_country.name, color : player.color }
          ]);
        };

        this.allowed = function(){
          if ( player_has_energy( this.cost() ) )
            return 'player does not have required energy';
          if ( state.current_player != f_country.player )
            return t_country.name + ' is not your country';
          if ( f_country.player != t_country.player )
            return 'cannot move to enemy country';
          if ( !country_has_troops( f_country, troops ) )
            return 'country does not have that many troops';
          if ( !is_bordering( f_country, t_country ) )
            return 'is not bordering ' + t_country.name;
          if ( this.cost() > player.energy )
            return player.name + ' do not have enough energy';
          return true;
        };

      };

      game.Move = Move;

    //ATTACK
      var Attack = function( defs ){

        var f_country = defs.f_country;
        var t_country = defs.t_country;
        var troops = defs.troops;
        var attacker = game.get_player_by_id( f_country.player );
        var defender = game.get_player_by_id( t_country.player );

        this.get = function(){
          return defs;
        };

        this.cost = function( ){
        };

        this.perform = function( ){
          game.log([
            { text : attacker.name , color : attacker.color },
            { text : 'attacked'    , color : 'lime' },
            { text : f_country.name, color : defender.color },
            { text : 'from'        , color : 'lime' },
            { text : t_country.name, color : attacker.color },
            { text : 'with'        , color : 'lime' },
            { text : troops        , color : 'red' },
            { text : 'troops'      , color : 'lime' }
          ]);
        };

        this.allowed = function( ){
          if ( state.current_player != f_country.player )
            return f_country.name + ' is not your country';
          if ( f_country.troops < troops )
            return troops + ' troops is to much. ' + f_country.name + ' only has ' + f_country.troops + 'troops';
          if ( f_country.player == t_country.player )
            return 'cannot attack own country';
          if ( !is_bordering( f_country, t_country ) )
            return f_country.name + ' does not border ' + t_country.name;
          return true;
        };

      };

      game.Attack = Attack;

      var battle_chance = function( granularity ){
        //value between 0 and 1. 0.5 being the value that occurs most often.
        var total = 0;
        for (var i = 0, l = granularity; i < l; i ++) {
          total += Math.random();
        }
        return total / granularity;
      };

      var attack_country = function( country_from, country_towards, troops ){
        var att_force = troops * ( 1 + country_from.infrastructure * 0.1);
        var def_force = ( country_towards.troops * 1.1 ) * country_towards.infrastructure;

        var attack_force_ratio = att_force / def_force;

        var battle = function( attacking_troops, defending_troops ){
          att = attacking_troops;
          def = defending_troops;
          if ( Math.min( att, def ) <=0 ){
            return [ att, def ];
          }
          battle( att, def );
        };

        battle(  )

        //in verey attack there is a chance that the attacked country looses
        //infrastructure. The chance is based on the amount of attacking and
        //defending forces.


        var cost = cost.battle( country_from, country_towards, troops );

        var ratio = battle_chance( 100 )
      };

    //COSTS

      var cost = { };

      cost.battle = function( country_from, country_towards, troops ){
        var cost_move = cost.move( country_from, country_towards, troops );
        return cost_move + troops;
      };

      cost.invest = function( country ){
      };

      cost.move = function( country_from, country_towards, troops ){
        var infrastructure_sum = f_country.infrastructure + t_country.infrastructure;
        return troops - ( troops * 0.1  * infrastructure_sum );
      };

    //TURN

      var end_turn = function(){
        reset_invested_countries();
        var previouse_player = state.current_player;
        if ( state.current_player < state.total_players ){
          state.current_player += 1;
        }else{
          state.current_player = 0;
        }
        update_turn( previouse_player, state.current_player );
        return state.current_player;
      };

      var update_turn = function( previouse_player, current_player){
        var countries = game.get_countries();
        for ( iso in countries ){
          var country = countries[iso];
          if ( country.player == current_player )
          produce_energy( country );
        }
      };

    //UPGRADE

      //Upgrading system concerning the countries. This increases the
      //effectiveness of country energy production and battle efficiency.
      ////////////////////////////////////////////////////////////////

      var Upgrade = function( defs ){
        var country = defs.country;
        var player = game.get_player_by_id( country.player );
        this.get = function(){
          return defs;
        };
        this.cost = function(){
          return ( country.energy / 2 ) + ( country.infrastructure * country.energy );
        };
        this.perform = function(){
          country.infrastructure += 1;
          player.energy -= this.cost();
        };
        this.allowed = function(){
          //returns a string containing the reason why the performing is not
          //allowed. If it is allowed true is returned
          if ( p.country.player == state.current_player )
            return 'you do not own this country';
          if ( p.country.infrastructure < 3 )
            return 'fully upgraded already';
          if ( player.energy > cost.invest( p.country ) )
            return 'you do not have enough energy';
          if ( !infrastructure_has_been_upgraded_in_turn( p.country ) )
            return 'already upgraded infrastructure in this turn';
          return true;
        };
      };

      game.Upgrade = Upgrade;

      state.invested_countries = [];

      var reset_invested_countries = function(){
        state.invested_countries = [];
      };

      var infrastructure_has_been_upgraded_in_turn = function( country ){
        return state.invested_countries.indexOf( iso ) > -1;
      };

      var lose_infrastructure = function( country ){
        if ( country.infrastructure > 1 )
        country.infrastructure -= 1;
        else
        return false;
        return true;
      };

      var upgrade_infrastructure = function( country ){
      };

      var get_infrastructure = function( country ){
        return country.infrastructure;
      };

    //REGISTERE ACTIONS

      game.register_action( 'attack', {
        description : 'attack a neighboring country with an amount of troops',
        options : '<country> <country> <troops>',
        parameters : function( args ){
          return new Attack( {
            f_country : game.get_country_by_string( args[1] ),
            t_country : game.get_country_by_string( args[2] ),
            troops : args[3] * 1
          });
        },
        on_complete : function( args ){
          if ( args.length == 2 ){
            return game.each( game.get_countries( function( country ){ return ( country.player == state.current_player ); }),
              function( country ){
                return country.name;
              }
            );
          }else if( args.length == 3 ){
            var country = game.get_country_by_string( args[1] );
            return game.each( country.borders, function( iso ){
              var country = game.get_country_by_string( iso );
              if ( country != undefined && country.player != state.current_player )
              return country.name;
            });
          }else if( args.length == 4 ){
            return [ '<#troops>' ];
          }
        },
        on_perform : function( attack ){
          var allowed = attack.allowed();
          if ( allowed === true )
          return attack.perform();
          else
          return allowed;
        },
        allowed : function(){
          return true;
        }
      });

      game.register_action( 'player', {
        description : 'show player statistics',
        options : '<name>',
        parameters : function( args ){
          var player = game.get_player_by_name( args[1] )
          return {
            player : player
          };
        },
        on_perform : function( p ){
          var string = '';
          //TODO render_object( data, seperator )
          var countries = game.get_countries( function( country ){
            return ( country.player == p.player.id )
          });
          var country_isos = game.each( countries, function( country ){
            return country.name;
          });
          var total_energy = 0;
          var total_troops = 0;
          for ( iso in countries ){
            var country = countries[iso];
            total_energy += country.energy;
            total_troops += country.troops;
          }
          var data = {
            energy : p.player.energy + '+' + total_energy,
            troops : total_troops,
            countries : country_isos.join( ' ' )
          };
          for ( prop in data ){
            string += prop + ': ' + data[prop] + '\n';
          }
          geome.worldmap.plot( function( country ){
            if ( country.player == p.player.id )
            return p.player.color;
            else
            return false;
          });
          return string;
        },
        on_complete : function( args ){
          return game.get_player_names();
        },
        allowed : function( p ){
          return true;
        }
      });

      game.register_action( 'cost' , {
        description : 'show how much energy a certain action will cost',
        options : '<action> <options>',
        on_complete : function( args ){
          if ( args.length == 2 ){
            return Object.keys( game.get_actions() );
          }else{
            return game.get_actions()[args[1]].on_complete( args.slice(1) );
          }
        },
        parameters: function( args ){
          fiso = game.get_country_iso( args[2] );
          tiso = game.get_country_iso( args[3] );
          return {
            action : args[1],
            country_from : game.get_country_by_iso( fiso ),
            country_towards : game.get_country_by_iso( tiso ),
            troops : args[4]
          };
        },
        on_perform : function( p ){
          var energy = cost[p.action]( p.country_from, p.country_towards, p.troops );
          return energy + ' energy';
        },
        allowed : function( p ){
          return true;
        }
      });

      game.register_action( 'move', {
        description : 'moves units from one country to another',
        options : '<country> <country> <troops>',
        parameters : function( args ){
          return new Move( {
            f_country : game.get_country_by_string( args[1] ),
            t_country : game.get_country_by_string( args[2] ),
            troops : args[3] * 1
          });
        },
        on_perform : function( move ){
          var allowed = move.allowed();
          if ( allowed === true ){
            move.perform();
            plot_range( 'troops' );
          }else{
            return allowed;
          }
        },
        on_complete : function( args ){
          if ( args.length == 2 ){
            return game.each( game.get_countries( function( country ){ return ( country.player == state.current_player ); }),
              function( country ){
                return country.name;
              }
            );
          }else if( args.length == 3 ){
            var country = game.get_country_by_string( args[1] );
            return game.each( country.borders, function( iso ){
              var border = game.get_countries()[iso];
              if ( border ){
                if ( country.player == border.player )
                return border.name;
              }
            });
          }else if( args.length == 4 ){
            return [ '<#troops>' ];
          }
        },
        allowed : function(){
          return true;
        }
      });

      game.register_action( 'upgrade', {
        description : 'invest in a country that has not yet been invested in within this turn',
        options : '<country>',
        on_complete : function( args ){
          if ( args.length == 2 ){
            return game.each( game.get_countries(), function( country ){
              if ( country.player == state.current_player ){
                return country.name;
              }
            });
          }
        },
        parameters : function( args ){
          return {
            country : game.get_country_by_string( args[1] )
          };
        },
        on_perform : function( p ){
          var player = game.get_player_by_id( p.country.player );
          upgrade_infrastructure( p.country );
          var infrastructure = p.country.infrastructure;
          plot_range( 'infrastructure' );
          game.log([
            { text : player.name, color : player.color },
            { text  : 'upgraded', color : 'lime' },
            { text  : p.country.name, color : 'skyblue' }
          ]);
          return p.country.name + ' infrastructure level ' + infrastructure;
        },
        allowed : function( p ){
          return true; //TODO use this function and link it to the allowed
          //functions in the Attack and Move constructors
        }
      });

      game.register_action( 'country', {
        description : "show a country's statistics",
        options : '<country>',
        parameters : function( args ){
          return {
            country : game.get_country_by_string( args[1] )
          };
        },
        on_perform : function( p ){
          var string = p.country.name + '\n';
          for ( prop in p.country ){
            val = p.country[prop];
            string += prop + ': ' + val+'\n';
          }
          geome.worldmap.plot( function( country ){
            if ( country.iso == p.country.iso )
            return '#FF0';
            else if ( is_bordering( p.country, country  ) ){
              if ( are_foes( p.country, country ) )
              return '#F00';
              else
              return '#0F0';
            }
            else
            return 'not a valid country';
          });
          return string;
        },
        on_complete : function( args ){
          return game.each( game.get_countries(), function( country ){
            return country.name;
          });
        },
        allowed : function( p ){
          if ( p.country != false )
          return true;
          else
          return 'not a valid country name';
        }
      });

      game.register_action( 'history', {
        description : 'show the last 20 events that occured',
        options : '<amount>',
        parameters : function( args ){
          return {
              amount : args[1] * 1,
          };
        },
        on_perform : function( p ){
        },
        allowed : function( p ){
          return true;
        }
      });

      var plot_range = function( prop ){
        var range = game.get_countries_property_range( prop );
        var color = d3.scale.linear()
          .domain(range)
          .range( ['black', 'white'] );
        geome.worldmap.plot( function( country ){
          return color( country[prop] );
        });
        return;
      };

      game.register_action( 'visualize', {
        description : 'visualize troops, energy and infrastructure on map',
        options : '<property>',
        parameters : function( args ){
          return {
            property : args[1]
          };
        },
        on_perform : function( p ){
          if ( p.property == 'diplomacy' ){
            geome.worldmap.plot( function( country ){
              var player = game.get_player_by_id( country.player );
              return player.color;
            });
            return;
          }
          if ( p.property.indexOf(p.property) > -1 ){
            return plot_range( p.property );
          }
          return p.property+ ' is not a valid property to visualize';
        },
        on_complete : function( args ){
          return [ 'diplomacy', 'troops', 'energy', 'infrastructure' ];
        },
        allowed : function( p ){
          //TODO check if is valid property if p.
          return true;
        }
      });

      game.register_action( 'endturn', {
        description : 'ends the turn and passes it on to the next player',
        options : '',
        parameters : function( args ){
          return {};
        },
        on_perform : function( p ){
          var ender = game.get_player_by_id( state.current_player );
          var index = end_turn(); //returns the new player index
          var player = game.get_player_by_id( index ).name;
          state.turn += 1;
          render_state();
          console.log( ender );
          game.log([
            { text : ender.name, color : ender.color },
            { text  : 'ended turn', color : 'lime' }
          ]);
          return player + ' are now playing';
        },
        allowed : function( p ){
          //it is always allowed to end the turn unless the game has come to an
          //end.
          ////
          return (
            !player_has_won()
          );
        }
      });

    //FUNTIONS THAT DEPEND ON OTHER FUNTIONS
      render_state();

      var player = game.get_player_by_id( state.current_player );
      game.log([
        { text : 'scenario initiated. ', color : 'lime' },
        { text : player.name , color : player.color },
        { text : 'start', color : 'lime' }
      ]);

}});

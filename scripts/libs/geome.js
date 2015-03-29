//NAMEPSACE

geome = {};

//HELPERS

//GAME

  geome.Game = function( defs ){

    //VARIABLES

      var game      = {};
      var actions   = {};
      var countries = {};
      var players   = {};

    //LOGGING
      game.log = ( function( ){
        var log = [];
        var container = document.getElementById( "log" );
        return function( strings ){
          log.push( strings );
          var item = document.createElement( "div" );
          item.className = 'item';
          for ( index in strings ){
            var string = strings[index];
            var string_elem = document.createElement( "span" );
            if ( typeof( string.color ) != undefined ){
              string_elem.style.color = string.color;
            }
            string_elem.innerHTML = string.text+ ' ';
            string_elem.className = 'text';
            item.appendChild( string_elem );
          }
          return container.appendChild( item );
        };
      })();

    //COUNTRIES

      var get_country_name = function( country ){
        for ( i in codes ){
          var names = codes[i];
          if ( country.iso == names.iso3 ){
            return names.name
          }
        }
        return false;
      };

      game.register_country = function( iso, defs ){
        defs.iso = iso;
        defs.name = get_country_name( defs );
        return countries[iso] = defs;
      };

      game.get_countries = function( comparator ){
        if ( comparator == undefined ){
          return countries;
        }else{
          var output = [];
          for ( iso in countries ){
            var country = countries[iso];
            if ( comparator( country ) )
            output.push( country );
          }
          return output;
        }
      };

      game.each = function( array, func ){
        var output = [];
        for ( index in array ){
          var item = array[index];
          var val = func( item );
          if ( val )
          output.push( func( item ) );
        }
        return output;
      };

      var codes = [
        {"name":"Afghanistan","iso2":"AF","iso3":"AFG","code":"004"},
        {"name":"AlandIslands","iso2":"AX","iso3":"ALA","code":"248"},
        {"name":"Albania","iso2":"AL","iso3":"ALB","code":"008"},
        {"name":"Algeria","iso2":"DZ","iso3":"DZA","code":"012"},
        {"name":"AmericanSamoa","iso2":"AS","iso3":"ASM","code":"016"},
        {"name":"Andorra","iso2":"AD","iso3":"AND","code":"020"},
        {"name":"Angola","iso2":"AO","iso3":"AGO","code":"024"},
        {"name":"Anguilla","iso2":"AI","iso3":"AIA","code":"660"},
        {"name":"Antarctica","iso2":"AQ","iso3":"ATA","code":"010"},
        {"name":"AntiguaandBarbuda","iso2":"AG","iso3":"ATG","code":"028"},
        {"name":"Argentina","iso2":"AR","iso3":"ARG","code":"032"},
        {"name":"Armenia","iso2":"AM","iso3":"ARM","code":"051"},
        {"name":"Aruba","iso2":"AW","iso3":"ABW","code":"533"},
        {"name":"Australia","iso2":"AU","iso3":"AUS","code":"036"},
        {"name":"Austria","iso2":"AT","iso3":"AUT","code":"040"},
        {"name":"Azerbaijan","iso2":"AZ","iso3":"AZE","code":"031"},
        {"name":"Bahamas","iso2":"BS","iso3":"BHS","code":"044"},
        {"name":"Bahrain","iso2":"BH","iso3":"BHR","code":"048"},
        {"name":"Bangladesh","iso2":"BD","iso3":"BGD","code":"050"},
        {"name":"Barbados","iso2":"BB","iso3":"BRB","code":"052"},
        {"name":"Belarus","iso2":"BY","iso3":"BLR","code":"112"},
        {"name":"Belgium","iso2":"BE","iso3":"BEL","code":"056"},
        {"name":"Belize","iso2":"BZ","iso3":"BLZ","code":"084"},
        {"name":"Benin","iso2":"BJ","iso3":"BEN","code":"204"},
        {"name":"Bermuda","iso2":"BM","iso3":"BMU","code":"060"},
        {"name":"Bhutan","iso2":"BT","iso3":"BTN","code":"064"},
        {"name":"Bolivia","iso2":"BO","iso3":"BOL","code":"068"},
        {"name":"BosniaandHerzegovina","iso2":"BA","iso3":"BIH","code":"070"},
        {"name":"Botswana","iso2":"BW","iso3":"BWA","code":"072"},
        {"name":"BouvetIsland","iso2":"BV","iso3":"BVT","code":"074"},
        {"name":"Brazil","iso2":"BR","iso3":"BRA","code":"076"},
        {"name":"BritishVirginIslands","iso2":"VG","iso3":"VGB","code":"092"},
        {"name":"BritishIndianOceanTerritory","iso2":"IO","iso3":"IOT","code":"086"},
        {"name":"BruneiDarussalam","iso2":"BN","iso3":"BRN","code":"096"},
        {"name":"Bulgaria","iso2":"BG","iso3":"BGR","code":"100"},
        {"name":"BurkinaFaso","iso2":"BF","iso3":"BFA","code":"854"},
        {"name":"Burundi","iso2":"BI","iso3":"BDI","code":"108"},
        {"name":"Cambodia","iso2":"KH","iso3":"KHM","code":"116"},
        {"name":"Cameroon","iso2":"CM","iso3":"CMR","code":"120"},
        {"name":"Canada","iso2":"CA","iso3":"CAN","code":"124"},
        {"name":"CapeVerde","iso2":"CV","iso3":"CPV","code":"132"},
        {"name":"CaymanIslands","iso2":"KY","iso3":"CYM","code":"136"},
        {"name":"CentralAfricanRepublic","iso2":"CF","iso3":"CAF","code":"140"},
        {"name":"Chad","iso2":"TD","iso3":"TCD","code":"148"},
        {"name":"Chile","iso2":"CL","iso3":"CHL","code":"152"},
        {"name":"China","iso2":"CN","iso3":"CHN","code":"156"},
        {"name":"HongKong,SpecialAdministrativeRegionofChina","iso2":"HK","iso3":"HKG","code":"344"},
        {"name":"Macao,SpecialAdministrativeRegionofChina","iso2":"MO","iso3":"MAC","code":"446"},
        {"name":"ChristmasIsland","iso2":"CX","iso3":"CXR","code":"162"},
        {"name":"Cocos(Keeling)Islands","iso2":"CC","iso3":"CCK","code":"166"},
        {"name":"Colombia","iso2":"CO","iso3":"COL","code":"170"},
        {"name":"Comoros","iso2":"KM","iso3":"COM","code":"174"},
        {"name":"Congo(Brazzaville)","iso2":"CG","iso3":"COG","code":"178"},
        {"name":"Congo,DemocraticRepublicofthe","iso2":"CD","iso3":"COD","code":"180"},
        {"name":"CookIslands","iso2":"CK","iso3":"COK","code":"184"},
        {"name":"CostaRica","iso2":"CR","iso3":"CRI","code":"188"},
        {"name":"Côted'Ivoire","iso2":"CI","iso3":"CIV","code":"384"},
        {"name":"Croatia","iso2":"HR","iso3":"HRV","code":"191"},
        {"name":"Cuba","iso2":"CU","iso3":"CUB","code":"192"},
        {"name":"Cyprus","iso2":"CY","iso3":"CYP","code":"196"},
        {"name":"CzechRepublic","iso2":"CZ","iso3":"CZE","code":"203"},
        {"name":"Denmark","iso2":"DK","iso3":"DNK","code":"208"},
        {"name":"Djibouti","iso2":"DJ","iso3":"DJI","code":"262"},
        {"name":"Dominica","iso2":"DM","iso3":"DMA","code":"212"},
        {"name":"DominicanRepublic","iso2":"DO","iso3":"DOM","code":"214"},
        {"name":"Ecuador","iso2":"EC","iso3":"ECU","code":"218"},
        {"name":"Egypt","iso2":"EG","iso3":"EGY","code":"818"},
        {"name":"ElSalvador","iso2":"SV","iso3":"SLV","code":"222"},
        {"name":"EquatorialGuinea","iso2":"GQ","iso3":"GNQ","code":"226"},
        {"name":"Eritrea","iso2":"ER","iso3":"ERI","code":"232"},
        {"name":"Estonia","iso2":"EE","iso3":"EST","code":"233"},
        {"name":"Ethiopia","iso2":"ET","iso3":"ETH","code":"231"},
        {"name":"FalklandIslands(Malvinas)","iso2":"FK","iso3":"FLK","code":"238"},
        {"name":"FaroeIslands","iso2":"FO","iso3":"FRO","code":"234"},
        {"name":"Fiji","iso2":"FJ","iso3":"FJI","code":"242"},
        {"name":"Finland","iso2":"FI","iso3":"FIN","code":"246"},
        {"name":"France","iso2":"FR","iso3":"FRA","code":"250"},
        {"name":"FrenchGuiana","iso2":"GF","iso3":"GUF","code":"254"},
        {"name":"FrenchPolynesia","iso2":"PF","iso3":"PYF","code":"258"},
        {"name":"FrenchSouthernTerritories","iso2":"TF","iso3":"ATF","code":"260"},
        {"name":"Gabon","iso2":"GA","iso3":"GAB","code":"266"},
        {"name":"Gambia","iso2":"GM","iso3":"GMB","code":"270"},
        {"name":"Georgia","iso2":"GE","iso3":"GEO","code":"268"},
        {"name":"Germany","iso2":"DE","iso3":"DEU","code":"276"},
        {"name":"Ghana","iso2":"GH","iso3":"GHA","code":"288"},
        {"name":"Gibraltar","iso2":"GI","iso3":"GIB","code":"292"},
        {"name":"Greece","iso2":"GR","iso3":"GRC","code":"300"},
        {"name":"Greenland","iso2":"GL","iso3":"GRL","code":"304"},
        {"name":"Grenada","iso2":"GD","iso3":"GRD","code":"308"},
        {"name":"Guadeloupe","iso2":"GP","iso3":"GLP","code":"312"},
        {"name":"Guam","iso2":"GU","iso3":"GUM","code":"316"},
        {"name":"Guatemala","iso2":"GT","iso3":"GTM","code":"320"},
        {"name":"Guernsey","iso2":"GG","iso3":"GGY","code":"831"},
        {"name":"Guinea","iso2":"GN","iso3":"GIN","code":"324"},
        {"name":"Guinea-Bissau","iso2":"GW","iso3":"GNB","code":"624"},
        {"name":"Guyana","iso2":"GY","iso3":"GUY","code":"328"},
        {"name":"Haiti","iso2":"HT","iso3":"HTI","code":"332"},
        {"name":"HeardIslandandMcdonaldIslands","iso2":"HM","iso3":"HMD","code":"334"},
        {"name":"HolySee(VaticanCityState)","iso2":"VA","iso3":"VAT","code":"336"},
        {"name":"Honduras","iso2":"HN","iso3":"HND","code":"340"},
        {"name":"Hungary","iso2":"HU","iso3":"HUN","code":"348"},
        {"name":"Iceland","iso2":"IS","iso3":"ISL","code":"352"},
        {"name":"India","iso2":"IN","iso3":"IND","code":"356"},
        {"name":"Indonesia","iso2":"ID","iso3":"IDN","code":"360"},
        {"name":"Iran,IslamicRepublicof","iso2":"IR","iso3":"IRN","code":"364"},
        {"name":"Iraq","iso2":"IQ","iso3":"IRQ","code":"368"},
        {"name":"Ireland","iso2":"IE","iso3":"IRL","code":"372"},
        {"name":"IsleofMan","iso2":"IM","iso3":"IMN","code":"833"},
        {"name":"Israel","iso2":"IL","iso3":"ISR","code":"376"},
        {"name":"Italy","iso2":"IT","iso3":"ITA","code":"380"},
        {"name":"Jamaica","iso2":"JM","iso3":"JAM","code":"388"},
        {"name":"Japan","iso2":"JP","iso3":"JPN","code":"392"},
        {"name":"Jersey","iso2":"JE","iso3":"JEY","code":"832"},
        {"name":"Jordan","iso2":"JO","iso3":"JOR","code":"400"},
        {"name":"Kazakhstan","iso2":"KZ","iso3":"KAZ","code":"398"},
        {"name":"Kenya","iso2":"KE","iso3":"KEN","code":"404"},
        {"name":"Kiribati","iso2":"KI","iso3":"KIR","code":"296"},
        {"name":"Korea,DemocraticPeople'sRepublicof","iso2":"KP","iso3":"PRK","code":"408"},
        {"name":"Korea,Republicof","iso2":"KR","iso3":"KOR","code":"410"},
        {"name":"Kuwait","iso2":"KW","iso3":"KWT","code":"414"},
        {"name":"Kyrgyzstan","iso2":"KG","iso3":"KGZ","code":"417"},
        {"name":"LaoPDR","iso2":"LA","iso3":"LAO","code":"418"},
        {"name":"Latvia","iso2":"LV","iso3":"LVA","code":"428"},
        {"name":"Lebanon","iso2":"LB","iso3":"LBN","code":"422"},
        {"name":"Lesotho","iso2":"LS","iso3":"LSO","code":"426"},
        {"name":"Liberia","iso2":"LR","iso3":"LBR","code":"430"},
        {"name":"Libya","iso2":"LY","iso3":"LBY","code":"434"},
        {"name":"Liechtenstein","iso2":"LI","iso3":"LIE","code":"438"},
        {"name":"Lithuania","iso2":"LT","iso3":"LTU","code":"440"},
        {"name":"Luxembourg","iso2":"LU","iso3":"LUX","code":"442"},
        {"name":"Macedonia,Republicof","iso2":"MK","iso3":"MKD","code":"807"},
        {"name":"Madagascar","iso2":"MG","iso3":"MDG","code":"450"},
        {"name":"Malawi","iso2":"MW","iso3":"MWI","code":"454"},
        {"name":"Malaysia","iso2":"MY","iso3":"MYS","code":"458"},
        {"name":"Maldives","iso2":"MV","iso3":"MDV","code":"462"},
        {"name":"Mali","iso2":"ML","iso3":"MLI","code":"466"},
        {"name":"Malta","iso2":"MT","iso3":"MLT","code":"470"},
        {"name":"MarshallIslands","iso2":"MH","iso3":"MHL","code":"584"},
        {"name":"Martinique","iso2":"MQ","iso3":"MTQ","code":"474"},
        {"name":"Mauritania","iso2":"MR","iso3":"MRT","code":"478"},
        {"name":"Mauritius","iso2":"MU","iso3":"MUS","code":"480"},
        {"name":"Mayotte","iso2":"YT","iso3":"MYT","code":"175"},
        {"name":"Mexico","iso2":"MX","iso3":"MEX","code":"484"},
        {"name":"Micronesia,FederatedStatesof","iso2":"FM","iso3":"FSM","code":"583"},
        {"name":"Moldova","iso2":"MD","iso3":"MDA","code":"498"},
        {"name":"Monaco","iso2":"MC","iso3":"MCO","code":"492"},
        {"name":"Mongolia","iso2":"MN","iso3":"MNG","code":"496"},
        {"name":"Montenegro","iso2":"ME","iso3":"MNE","code":"499"},
        {"name":"Montserrat","iso2":"MS","iso3":"MSR","code":"500"},
        {"name":"Morocco","iso2":"MA","iso3":"MAR","code":"504"},
        {"name":"Mozambique","iso2":"MZ","iso3":"MOZ","code":"508"},
        {"name":"Myanmar","iso2":"MM","iso3":"MMR","code":"104"},
        {"name":"Namibia","iso2":"NA","iso3":"NAM","code":"516"},
        {"name":"Nauru","iso2":"NR","iso3":"NRU","code":"520"},
        {"name":"Nepal","iso2":"NP","iso3":"NPL","code":"524"},
        {"name":"Netherlands","iso2":"NL","iso3":"NLD","code":"528"},
        {"name":"NetherlandsAntilles","iso2":"AN","iso3":"ANT","code":"530"},
        {"name":"NewCaledonia","iso2":"NC","iso3":"NCL","code":"540"},
        {"name":"NewZealand","iso2":"NZ","iso3":"NZL","code":"554"},
        {"name":"Nicaragua","iso2":"NI","iso3":"NIC","code":"558"},
        {"name":"Niger","iso2":"NE","iso3":"NER","code":"562"},
        {"name":"Nigeria","iso2":"NG","iso3":"NGA","code":"566"},
        {"name":"Niue","iso2":"NU","iso3":"NIU","code":"570"},
        {"name":"NorfolkIsland","iso2":"NF","iso3":"NFK","code":"574"},
        {"name":"NorthernMarianaIslands","iso2":"MP","iso3":"MNP","code":"580"},
        {"name":"Norway","iso2":"NO","iso3":"NOR","code":"578"},
        {"name":"Oman","iso2":"OM","iso3":"OMN","code":"512"},
        {"name":"Pakistan","iso2":"PK","iso3":"PAK","code":"586"},
        {"name":"Palau","iso2":"PW","iso3":"PLW","code":"585"},
        {"name":"PalestinianTerritory,Occupied","iso2":"PS","iso3":"PSE","code":"275"},
        {"name":"Panama","iso2":"PA","iso3":"PAN","code":"591"},
        {"name":"PapuaNewGuinea","iso2":"PG","iso3":"PNG","code":"598"},
        {"name":"Paraguay","iso2":"PY","iso3":"PRY","code":"600"},
        {"name":"Peru","iso2":"PE","iso3":"PER","code":"604"},
        {"name":"Philippines","iso2":"PH","iso3":"PHL","code":"608"},
        {"name":"Pitcairn","iso2":"PN","iso3":"PCN","code":"612"},
        {"name":"Poland","iso2":"PL","iso3":"POL","code":"616"},
        {"name":"Portugal","iso2":"PT","iso3":"PRT","code":"620"},
        {"name":"PuertoRico","iso2":"PR","iso3":"PRI","code":"630"},
        {"name":"Qatar","iso2":"QA","iso3":"QAT","code":"634"},
        {"name":"Réunion","iso2":"RE","iso3":"REU","code":"638"},
        {"name":"Romania","iso2":"RO","iso3":"ROU","code":"642"},
        {"name":"RussianFederation","iso2":"RU","iso3":"RUS","code":"643"},
        {"name":"Rwanda","iso2":"RW","iso3":"RWA","code":"646"},
        {"name":"Saint-Barthélemy","iso2":"BL","iso3":"BLM","code":"652"},
        {"name":"SaintHelena","iso2":"SH","iso3":"SHN","code":"654"},
        {"name":"SaintKittsandNevis","iso2":"KN","iso3":"KNA","code":"659"},
        {"name":"SaintLucia","iso2":"LC","iso3":"LCA","code":"662"},
        {"name":"Saint-Martin(Frenchpart)","iso2":"MF","iso3":"MAF","code":"663"},
        {"name":"SaintPierreandMiquelon","iso2":"PM","iso3":"SPM","code":"666"},
        {"name":"SaintVincentandGrenadines","iso2":"VC","iso3":"VCT","code":"670"},
        {"name":"Samoa","iso2":"WS","iso3":"WSM","code":"882"},
        {"name":"SanMarino","iso2":"SM","iso3":"SMR","code":"674"},
        {"name":"SaoTomeandPrincipe","iso2":"ST","iso3":"STP","code":"678"},
        {"name":"SaudiArabia","iso2":"SA","iso3":"SAU","code":"682"},
        {"name":"Senegal","iso2":"SN","iso3":"SEN","code":"686"},
        {"name":"Serbia","iso2":"RS","iso3":"SRB","code":"688"},
        {"name":"Seychelles","iso2":"SC","iso3":"SYC","code":"690"},
        {"name":"SierraLeone","iso2":"SL","iso3":"SLE","code":"694"},
        {"name":"Singapore","iso2":"SG","iso3":"SGP","code":"702"},
        {"name":"Slovakia","iso2":"SK","iso3":"SVK","code":"703"},
        {"name":"Slovenia","iso2":"SI","iso3":"SVN","code":"705"},
        {"name":"SolomonIslands","iso2":"SB","iso3":"SLB","code":"090"},
        {"name":"Somalia","iso2":"SO","iso3":"SOM","code":"706"},
        {"name":"SouthAfrica","iso2":"ZA","iso3":"ZAF","code":"710"},
        {"name":"SouthGeorgiaandtheSouthSandwichIslands","iso2":"GS","iso3":"SGS","code":"239"},
        {"name":"SouthSudan","iso2":"SS","iso3":"SSD","code":"728"},
        {"name":"Spain","iso2":"ES","iso3":"ESP","code":"724"},
        {"name":"SriLanka","iso2":"LK","iso3":"LKA","code":"144"},
        {"name":"Sudan","iso2":"SD","iso3":"SDN","code":"736"},
        {"name":"Suriname*","iso2":"SR","iso3":"SUR","code":"740"},
        {"name":"SvalbardandJanMayenIslands","iso2":"SJ","iso3":"SJM","code":"744"},
        {"name":"Swaziland","iso2":"SZ","iso3":"SWZ","code":"748"},
        {"name":"Sweden","iso2":"SE","iso3":"SWE","code":"752"},
        {"name":"Switzerland","iso2":"CH","iso3":"CHE","code":"756"},
        {"name":"SyrianArabRepublic(Syria)","iso2":"SY","iso3":"SYR","code":"760"},
        {"name":"Taiwan,RepublicofChina","iso2":"TW","iso3":"TWN","code":"158"},
        {"name":"Tajikistan","iso2":"TJ","iso3":"TJK","code":"762"},
        {"name":"Tanzania*,UnitedRepublicof","iso2":"TZ","iso3":"TZA","code":"834"},
        {"name":"Thailand","iso2":"TH","iso3":"THA","code":"764"},
        {"name":"Timor-Leste","iso2":"TL","iso3":"TLS","code":"626"},
        {"name":"Togo","iso2":"TG","iso3":"TGO","code":"768"},
        {"name":"Tokelau","iso2":"TK","iso3":"TKL","code":"772"},
        {"name":"Tonga","iso2":"TO","iso3":"TON","code":"776"},
        {"name":"TrinidadandTobago","iso2":"TT","iso3":"TTO","code":"780"},
        {"name":"Tunisia","iso2":"TN","iso3":"TUN","code":"788"},
        {"name":"Turkey","iso2":"TR","iso3":"TUR","code":"792"},
        {"name":"Turkmenistan","iso2":"TM","iso3":"TKM","code":"795"},
        {"name":"TurksandCaicosIslands","iso2":"TC","iso3":"TCA","code":"796"},
        {"name":"Tuvalu","iso2":"TV","iso3":"TUV","code":"798"},
        {"name":"Uganda","iso2":"UG","iso3":"UGA","code":"800"},
        {"name":"Ukraine","iso2":"UA","iso3":"UKR","code":"804"},
        {"name":"UnitedArabEmirates","iso2":"AE","iso3":"ARE","code":"784"},
        {"name":"UnitedKingdom","iso2":"GB","iso3":"GBR","code":"826"},
        {"name":"UnitedStatesofAmerica","iso2":"US","iso3":"USA","code":"840"},
        {"name":"UnitedStatesMinorOutlyingIslands","iso2":"UM","iso3":"UMI","code":"581"},
        {"name":"Uruguay","iso2":"UY","iso3":"URY","code":"858"},
        {"name":"Uzbekistan","iso2":"UZ","iso3":"UZB","code":"860"},
        {"name":"Vanuatu","iso2":"VU","iso3":"VUT","code":"548"},
        {"name":"Venezuela(BolivarianRepublicof)","iso2":"VE","iso3":"VEN","code":"862"},
        {"name":"VietNam","iso2":"VN","iso3":"VNM","code":"704"},
        {"name":"VirginIslands,US","iso2":"VI","iso3":"VIR","code":"850"},
        {"name":"WallisandFutunaIslands","iso2":"WF","iso3":"WLF","code":"876"},
        {"name":"WesternSahara","iso2":"EH","iso3":"ESH","code":"732"},
        {"name":"Yemen","iso2":"YE","iso3":"YEM","code":"887"},
        {"name":"Zambia","iso2":"ZM","iso3":"ZMB","code":"894"},
        {"name":"Zimbabwe","iso2":"ZW","iso3":"ZWE","code":"716"}
      ];

      game.get_countries_property_range = function( prop ){
        var min, max;
        var countries = game.get_countries();
        for ( iso in countries ){
          var country = countries[iso];
          var value = country[prop];
          if ( min == undefined ){
            min = value;
            max = value;
          }else{
            min = Math.min( min, value );
            max = Math.max( max, value );
          }
        }
        return [ min, max ];
      };

      game.get_countries_property_total = function( prop ){
        var total = 0;
        var countries = game.get_countries();
        for ( iso in countries ){
          var country = countries[iso];
          var value = country[prop];
          total += value;
        }
        return total;
      };

      game.get_country_by_string = function( string ) {
        //takes a name or iso2/3 and returns the iso3 if one is found. Will always
        //return uppercase
        //////////////////
        function format( string ){
          if ( string.length == 2 )
          return 'iso2';
          else if ( string.length == 3 )
          return 'iso3';
          else
          return 'name';
        }
        if ( typeof( string ) ) {
          var string = string.replace( / /g, '' ).trim( );
          var str_type = format( string );
          for ( i in codes ) {
            if ( codes[ i ][ str_type ].toUpperCase( ) == string.toUpperCase( )){
              var iso = codes[ i ][ 'iso3' ].toUpperCase( );
              return countries[ iso ];
            }
          }
        }
        return false;
      };

    //ACTIONS

      game.perform_action = function( name, args ){
        //args is an array of strings
        ////
        var action = actions[name];
        var properties = action.parameters( args );

        for ( prop in properties ){
          if ( properties[prop] == undefined )
          return false;
        }

        var allowed = action.allowed( properties );
        if ( allowed == true )
        return action.on_perform( properties );
        else
        return false;
      };

      game.register_action = function( name, defs ){
        return actions[name] = defs;
      };

      game.get_actions = function(){
        return actions;
      };

    //PLAYERS

      game.register_player = function( name, defs ){
        defs.name = name;
        return players[name] = defs;
      };

      game.get_players = function( ){
        return players;
      };

      game.get_player_names = function( ){
        var players = game.get_players();
        return Object.keys( players );
      }

    //INTERFACE

      game.register_interface = function( defs ){
        return game
      };

    game.instance = new defs.constructor( game )
    return game;

  };

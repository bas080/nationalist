
//PACKAGE
term.package.register( 'nationalist',{  //name of the package. Consider this the identifier
  version:      0.4,                //important for checking if user hase latest version.
  version_name: 'attack'             //cause I can
});

//NATIONALIST
// itterates and registers the commands defined in the nationalist game
(function( nationalist ){
  var actions = nationalist.get_actions();
  for ( action_name in actions ){
    var action = actions[action_name];
    ( function( action_name, action ){
      term.command.register( action_name, function(){
        this.on_command = function( p ){
          return nationalist.perform_action( action_name, p );
        };
        if ( action.on_complete != undefined )
        this.on_complete = action.on_complete;
      });
    })( action_name, action )
  }
})( nationalist );

//COMMANDS
term.command.register( 'help', function(){
  this.on_command = function( p ){
    if ( p.length == 1 ){
      var actions = nationalist.get_actions();
      var output = '';
      for ( name in actions ){
        var action = actions[name];
        output += name + ' ' + action.options + '\n' + action.description+'\n\n';
      }
      return output+'clear\nremoves the term history';
    }
    return term.command.get(p[1]).manual;
  };
  this.on_complete = function( p ){
    return term.command.where([]);
  };
});

term.command.register( 'source', function(){
  this.on_command = function( p, i ){
    var command = term.command.get(p[1]);
    return command.on_command.toString();
  };
  this.on_complete = function( p ){
    return term.command.where([]);
  }
  this.manual = "see the source code of a command it's on_command function";
});

term.command.register( 'history', function( ){
  this.on_command = function( p, input ){
    return term.input.history.get();
  };
} );

term.command.register( 'clear', function( ){
  this.on_command = function( p ){
    term.screen.pre_commandline.clear();
  };
} );

term.command.register( 'restart', function( ){
  this.on_command = function( p ){
    window.location.reload( );
  };
  this.on_register = function( p ){
  };
} );

//SHORTCUTS
term.shortcut.register( 'Ctrl l', function( ){
  term.screen.pre_commandline.clear();
} );

term.shortcut.register( 'Ctrl c', function( ){
  term.screen.commandline.text('');
} );

term.shortcut.register( 'Alt Backspace', function( event ){
  var string = term.screen.pre_cursor.text();
  till = string.replace(/\S*\s*$/g,'')
  var steps = string.length-till.length;
  return term.screen.cursor.remove( -steps );
} );

term.shortcut.register( 'Backspace', function( event ){
  return term.screen.cursor.remove( -1 );
} );

term.shortcut.register( 'Delete', function( event ){
  return term.screen.cursor.remove( 1 );
} );

term.shortcut.register( 'Enter', function( ){
  return interpretation = term.interpret( term.screen.commandline.text() );
} );

term.shortcut.register( 'Ctrl Left', function( event ){
  var string = term.screen.pre_cursor.text();
  var to = string.replace(/\S*\s*$/g,'')
  var steps = string.length-to.length;
  return term.screen.cursor.move(-steps);
} );

term.shortcut.register( 'Ctrl Right', function( event ){
  var string = term.screen.pos_cursor.text();
  var steps = string.search(/\s\S/g);
  if ( steps == -1 )
  steps = string.length;
  return term.screen.cursor.move( steps+1 );
} );

term.shortcut.register( 'Left', function( event ){
  return term.screen.cursor.move( -1 );
} );

term.shortcut.register( 'Right', function( event ){
  return term.screen.cursor.move( 1 );
} );

term.shortcut.register( 'Tab', function( ){
  return term.complete();
} );

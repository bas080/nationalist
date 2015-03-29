//Termjs by bas080
//command line interface in javascript
//inspired by linux and javascript and poop
//You are to poor to donate and to rich to be poor
/*TODO
  error when using & the command is printed twice to the pre commandline!
*/
Term = function (container){
  Term = this;
  this.packages = {};
  this.variables = new function (){
    var object = {
      container : document.getElementById(container),
      packaging : 'undefined'
    };
    return function ( key, value ){
      if ( value === undefined )
      return object[key];
      else
      return object[key] = value;
    };
  };
  this.view = function(){ //for the more gui like interactons
    var views = {};
    this.add = function( name ){ //returns dom id of the window
      var newd = document.createElement( "div" );
      newd.className = 'term_view';
      var link = Term.variables.container.appendChild( newd );
      views[name] = link;
      return lin
    };
  };
  this.helper = {
    keys : function(object){
      var array = [];
      for ( key in object ){
        array.push(key);
      }
      return array;
    },
    elem : function ( container, id ){ //adds elements to a container (is always a div tag)
      prev = document.createElement( "div" );
      prev.id = id;
      return container.appendChild( prev );
    },
    getset : function ( _value ){
      var value = _value;
      return function ( _value ){
        if ( _value === undefined ){
          return value = _value;
        }else{
          return value
        }
      };
    },
    html : function( string ){
      return String(string)
        .replace(/&/g, '&amp;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;');
    }
  };
  this.interpret = function( ){
    //a function that -parses and executes a string
    var string = Term.screen.commandline.text();
    Term.screen.commandline.text('');
    var commands = string.trim().split('&');
    for ( c in commands ){
      var pipes = commands[c].trim().split('|');
      var output = undefined;
      for ( p in pipes ){
        var parameters = pipes[p].trim().split(' ');
        if ( Term.command.exists(parameters[0]) ){
          output = Term.command.execute(parameters, output );
        }else{
          try {
            output = eval( pipes[p] );
          } catch (e) {
            output = e;
          }
        }
      }
      if ( output !== undefined ){
        Term.screen.pre_commandline.add( string );
        Term.screen.pre_commandline.add( output );
      }
    }
  };
  this.complete = function () {
    var commandlinestr = Term.screen.commandline.text();
    var commandstr = commandlinestr.replace('&', '|').split('|');
    var parameters = commandstr[commandstr.length-1].replace(/^ */, '').split(' ');
    var is_command = ( parameters.length == 1 );
    var options = [];
    if ( is_command ) //get options
      options = Term.command.where([]);
    else
      options = Term.command.options( parameters );
    var opt_string;
    var suggestion = [];
    var sub_string = parameters[parameters.length-1];
    for ( i in options ){ //get suggestions
      opt_string = options[i].slice(0, sub_string.length);
      if ( sub_string == opt_string )
      suggestion.push(options[i]);
    }
    if ( suggestion.length === 1 ){
      var sub_append = suggestion[0].slice(sub_string.length);
      Term.screen.cursor.write( sub_append + ' ' );
    }else if ( suggestion.length !== 0 ){
      Term.screen.pre_commandline.add(commandlinestr)
      Term.screen.pre_commandline.add(suggestion.join(' '));
    }else{
      Term.screen.pre_commandline.add(' ');
    }
    return suggestion;
  };
  this.history = new function( ){
    var history = [];
    var index = 0;
    return {
      prev : function(){
        if ( history[index-1] ){
          index -= 1;
          return history[ index ];
        }
      },
      next : function(){
        if ( history[index+1] ){
          index += 1;
          return history[ index ];
        }
      },
      item : function( index ){
        return history[index];
      },
      add : function( string ){
        history.push( string );
      },
      reset : function(){
        index = -1;
        return history
      }
    };
  };
  this.command = new function ( ){
    var commands = {};
    return {
      execute : function ( parameters, input ){
        if ( commands[parameters[0]] !== undefined )
        return commands[parameters[0]].on_command( parameters, input );
      },
      remove : function ( name ) {
        var removed = []
        for ( i in arguments ){
          if ( commands[arguments[i]] !== undefined ){
            delete commands[name];
            removed.push(arguments[i]);
          }
        }
        return removed;
      },
      options : function ( params ) {
        if ( name === undefined ){
          return Term.helper.keys(params[0]);
        }else{
          if ( this.exists( params[0] ) )
          return commands[params[0]].on_complete(params) || [];
          else
          return [];
        }
      },
      exists : function ( name ) {
        return ( commands[name] !== undefined );
      },
      get : function( name ){
        //get the command properties or a list of command names that conform to
        //the properties.
        /////////////////
        if ( typeof( name ) === 'string' ){
          return commands[ name ];
        }else if ( typeof( name ) === 'function' ){
          var command_names = [];
          for ( name in commands ){
            if ( name( commands[ name ] ) )
            command_names.push[ name ];
          }
          return command_names;
        }
      },
      where : function ( array ) { 
        //TODO replace this function with the improved get function. Which uses
        //function with callback. Once done then delete this function
        var output = [];
        for ( command in commands ){
          var com = commands[command];
          (function () {
            for ( index in array ){
              var key = array[index][0];
              var val = array[index][1];
              if ( com[key] !== val )
              return;
            }
            output.push(command);
          })();
        }
        return output; //returns a list of all the commands that match array
      },
      register : function ( name, constructor ) {
        if ( commands[name] === undefined ){
          var command =  commands[name] = new constructor;
          command.name = name;
          command.package = Term.variables( 'packaging' );
          return command;
        }else{
          return false;
        }
      },
    };
  };
  this.package = new function ( name ){//TODO remove all the propmting to the pre_commandline
    var packages = {};
    return {
      load : function( name ){
        var timedOut = setTimeout((function(name){
          return function(){
            Term.screen.pre_commandline.add(name+' timed out');
          };
        })(name),3000);
        Term.screen.pre_commandline.add('loading '+name+'...');
        var script=document.createElement('script');
        script.setAttribute("type","text/javascript");
        script.setAttribute("src", 'scripts/pkgs/'+name+'.js');
        document.getElementsByTagName("head")[0].appendChild(script);
        var installed = function(){
          Term.variables( 'packaging', 'undefined' );
          clearTimeout(timedOut);
          Term.screen.pre_commandline.append('loaded');
        };
        script.onload = installed;
      },
      where : function( array ){
        var output = [];
        for ( package in packages ){
          var com = packages[package];
          (function () {
            for ( index in array ){
              var key = array[index][0];
              var val = array[index][1];
              if ( com[key] !== val )
              return;
            }
            output.push(package);
          })();
        }
        return output;
      },
      install : function( url ){
        Term.variables( 'packaging', 'undefined');
      },
      remove : function ( name ){
        delete Term.packages[name];
      },
      register : function ( name,  def ){
        Term.variables( 'packaging', name );
        return packages[name];
      },
    };
  };
  this.shortcut = new function ( ){
    var shortcuts = {};
    return {
      exists : function ( name ){
        return ( shortcuts[name] !== undefined );
      },
      perform : function ( name ){
        if ( this.exists( name ) )
        return shortcuts[name]();
        else
        return false;
      },
      get : function( name ){
        return shortcuts[name];
      },
      remove : function ( name ) {
        delete shortcuts[name];
      },
      disable : function ( name ) {
        //What TODO when disabled?
      },
      register : function ( name, action ) {
        return shortcuts[name] = action;
      }
    };
  };
  this.screen = new (function (container){
    var self = this;
    var elements = (function(container){
      var elements = {};
      elements.pre_commandline = Term.helper.elem( container, 'pre_commandline' );
      var commandline = Term.helper.elem( container, 'commandline' );
      elements.pre_cursor = Term.helper.elem( commandline, 'pre_cursor' );
      elements.pos_cursor = Term.helper.elem( commandline, 'pos_cursor' );
      elements.pos_commandline = Term.helper.elem( container, 'pos_commandline' );
      return elements;
    })(container);
    setInterval( function( ){
      if ( elements.pre_cursor.className == 'blink' )
      elements.pre_cursor.className = '';
      else
      elements.pre_cursor.className = 'blink';
    }, 500 );
    this.cursor = {
      //is not really an element
      write : function( string ) {
        return self.pre_cursor.text( string, true );
      },
      move : function ( till ) {
        var string = self.commandline.text();
        var position = till + self.pre_cursor.text().length;
        if ( position < 0 ) position = 0;
        if ( position > string.length ) position = string.length;
        self.pre_cursor.text( string.slice( 0, position ) );
        self.pos_cursor.text( string.slice( position ) );
        return position;
      },
      remove : function ( till ) {
        if ( till < 0 ){
          var string = self.pre_cursor.text();
          return self.pre_cursor.text( string.slice( 0, string.length+till ) );
        }else if (till > 0){
          var string = self.pos_cursor.text();
          return self.pos_cursor.text( string.slice( till ) );
        }
      },
    };
    this.pre_cursor = {
      text : (function( ){
        var value = '';
        return function( string, append ){
          if ( string !== undefined ){
            if ( append )
            value += string;
            else
            value = string;
            return elements.pre_cursor.innerHTML = Term.helper.html(value);
          }
          return value;
        };
      })(),
    };
    this.pos_cursor = {
      text : (function( ){
        var value = '';
        return function( string, append ){
          if ( string !== undefined ){
            if ( append )
            value += string;
            else
            value = string;
            elements.pos_cursor.innerHTML = Term.helper.html(value);
          }
          return value;
        };
      })(),
    };
    this.commandline = {
      clear : function(){
        return self.pre_cursor.text('') + self.pos_cursor.text('');
      },
      text : function( string, append ){
        if ( string === undefined ){
          return self.pre_cursor.text() + self.pos_cursor.text();
        }else{
          self.pos_cursor.text('');
          return self.pre_cursor.text( string, append );
        }
      },
    };
    this.pre_commandline = (function(){
      var last;
      return {
        append : function( string ){
          last.innerHTML += Term.helper.html( string );
        },
        add : function(string){
          last = Term.helper.elem( elements.pre_commandline );
          return last.innerHTML = Term.helper.html( string );
        },
        clear : function(){
          elements.pre_commandline.innerHTML = '';
        }
      };
    })();
    this.pos_commandline = {
      text : (function( ){
        var value = '';
        return function( string ){
          if ( string !== undefined ){
            value = string;
            elements.pos_commandline.innerHTML = Term.helper.html( value );
          }
          return value;
        };
      })(),
    };
  })(Term.variables( 'container' ));
  this.keyboard = new function (){
    var self = this;
    window.addEventListener("keydown", function (event){
      //event.preventDefault();
    });
    window.addEventListener("keypress", function (event){
      event.preventDefault();
      self.keydown( event );
    });
    this.keydown = function ( event ){
      var combo = self.combo(event);
      if ( combo.length == 1 )
      return Term.screen.cursor.write( combo );
      else
      return Term.shortcut.perform( combo );
    };
    this.combo = function ( event ){
      var keycodes = {
        8 : "Backspace",
        9 : "Tab",
        13 : "Enter",
        17 : "Ctrl",
        18 : "Alt",
        37 : "Left",
        38 : "Up",
        39 : "Right",
        40 : "Down",
        46 : "Delete"
      };
      var combo = '';
      if ( event.ctrlKey )
      combo += 'Ctrl ';
      if ( event.altKey )
      combo += 'Alt ';
      if ( ( event.ctrlKey || event.altKey ) && event.shiftKey )
      combo += 'Shift ';
      combo += keycodes[ event.keyCode ] || String.fromCharCode( event.charCode );
      //combo += event.key;
      return combo;
    };
  };
};

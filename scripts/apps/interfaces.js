geome.worldmap = new function World( ) {
  //Worldmap object is a chloroplast map manipulator.
  var centered;
  var width = window.innerWidth;
  var height = window.innerHeight;
  var scale = width/height;
  var svg = d3.select( "#worldmap" ).append( "svg" );
  var projection = d3.geo.equirectangular( )
    .scale( height/3 )
    .translate( [ width / 2, height / 1.8 ] )
    .precision( 0 );
  var path = d3.geo.path( )
    .projection( projection );
  window.addEventListener( 'resize', function( event ) {
    resize( );
  });
  d3.json( "data/world_map.json", function( error, topology ) {
    svg.selectAll( "path" )
      .data( topology.features )
      .enter( )
      .append( "path" )
      .attr( 'title', function(d){
        return d.id;
      })
      .attr( 'stroke', '#111' )
      .attr( 'id', function( d ) {
        return d.id;
      })
      .on( 'click', function( d ) {
        zoom( d );
      })
      .on( 'mouseover', function( d ) {
        //d3.select( this ).transition( ).attr( 'fill', 'darkgray' );
      })
      .attr( "transform", "translate( " + 1 / 2 + ", " + 1 / 2 + " )scale( " + 3
      + " )translate( " + -width * 0.4 + ", " + -height * 0.1 + " )" )
      .attr( "d", path );
  });
  this.plot = function( colorizer ) {
    //Set what country property should be plotted on the map.
    svg.selectAll( "path" )
      .transition( )
      //.delay( function( ) {return Math.random( )*2000; })
      .duration( 500 )
      .attr( "fill", function( d ) {
      var country = nationalist.get_country_by_iso( d.id );
      if ( country == undefined ){
        return 'black';
      }
      return colorizer( country );
    });
  };
  var resize = ( function( elem ) {
    return function( ) {
      var width = window.innerWidth;
      var height = window.innerHeight;
      elem.attr( "width", width ).attr( "height", height );
    };
  })( svg ); resize( );
};

//geome.

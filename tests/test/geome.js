///////////////////////////////////////////////////////////////////////////////
//By testing the nationalist game that uses the geome framework I at the same//
//time also test the geome framework///////////////////////////////////////////
//////////////////////////////////////
QUnit.test( "nationalist", function( assert ){

  assert.ok( nationalist, 'nationalist initiated' );

  //ACTIONS
  /////////

    assert.ok( nationalist.perform_action( 'diplomacy', [ 'NLD', 'BEL', 'attack' ] ), 'action diplomacy' );
    assert.ok( nationalist.perform_action( 'endturn', [] ), 'action endturn' );
    assert.ok( nationalist.perform_action( 'move' , [ 'BEL', 'DEU', 10 ] ), 'action move' );
    assert.ok( nationalist.perform_action( 'endturn', [] ), 'action endturn' );
    assert.ok( nationalist.perform_action( 'invest' , ['NLD'] ), 'action invest' );

});

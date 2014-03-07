App = Ember.Application.create();

//***************************************************************************
// Routes
//***************************************************************************
App.Router.map(function() {
  // put your routes here
  //this.resource('add', {path: '/add'});
  this.route('add');
});

App.AddRoute = Ember.Route.extend({

});

App.IndexRoute = Ember.Route.extend({
  model: function() {
    return ['red', 'yellow', 'blue'];
  }
});

//***************************************************************************
// Controllers
//***************************************************************************
App.AddController = Ember.ObjectController.extend({

    actions: {
        getCoordinates: function(){

            var newLongitude = this.get('newLongitude');

            console.log( arguments );
            console.log( 'Coordinates' );
            //navigator.geolocation.getCurrentPosition(function(position) {
            //    console.log(position);
            //});
        }
    }
});


//***************************************************************************
// Model
//***************************************************************************
App.Location = DS.Model.extend({
    name: DS.attr( 'string' ),
    latitude: DS.attr( 'number' ),
    longitude: DS.attr( 'number' ),
    added: DS.attr( 'date' )
});
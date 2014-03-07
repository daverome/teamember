App = Ember.Application.create({
  LOG_TRANSITIONS: true
});

//***************************************************************************
// Routes
//***************************************************************************
App.Router.map(function() {
  // put your routes here
  //this.resource('add', {path: '/add'});
  this.route('add');
});

App.AddRoute = Ember.Route.extend({
    model: function(){
        return this.store.find('location');
    }
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
            var self = this;
            navigator.geolocation.getCurrentPosition(function(position) {
                self.set('newLongitude', position.coords.longitude);
                self.set('newLatitude', position.coords.latitude);
            });
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
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

            console.log( 'Coordinates' );
            navigator.geolocation.getCurrentPosition(function(position) {
                console.log(position);
            });
        }
    }
});
// var map = new App.Map();
// map.draw();

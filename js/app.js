App = Ember.Application.create();

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

App = Ember.Application.create({
  LOG_TRANSITIONS: true
});

//***************************************************************************
// Routes
//***************************************************************************
App.Router.map(function () {
  this.resource('playces', { path: '/' }, function () {
    this.route('new');
  });
});

App.ApplicationRoute = Ember.Route.extend({
  model: function () {
    return this.store.find('location');
  }
});

App.IndexRoute = Ember.Route.extend({
  model: function () {
    return this.store.find('location');
  }
});

App.PlaycesIndexRoute = Ember.Route.extend({
  model: function () {
    return this.store.find('location');
  }
});

App.PlaycesNewRoute = Ember.Route.extend({
  model: function () {
    return this.store.find('location');
  }
});

//***************************************************************************
// Controllers
//***************************************************************************
// App.ApplicationControler = Ember.Controller.extend({});

App.PlayceController = Ember.ObjectController.extend({
  actions: {
    remove: function () {
      var playce = this.get('model'),
      confirmDelete = false;

      confirmDelete = confirm('Are you sure you want to delete ' + this.get('model').get('name') + '?');

      if (confirmDelete) {
        playce.deleteRecord();
        playce.save();
      }
    }
  }
});

App.PlaycesNewController = Ember.ArrayController.extend({
  actions: {
    getCoordinates: function () {
      var self = this;
      this.set('isGettingCoordinates', true);

      navigator.geolocation.getCurrentPosition (function (position) {
        self.set('longitude', position.coords.longitude);
        self.set('latitude', position.coords.latitude);

        self.set('isSaveable', true);
        self.set('isGettingCoordinates', false);
      });
    },
    saveLocation: function () {
      var newLocation = this.store.createRecord('location', {
        name: this.get('name'),
        latitude: this.get('latitude'),
        longitude: this.get('longitude')
      });

      newLocation.save();
      this.transitionToRoute('playces');

    }
  },

  isGettingCoordinates: false,

  isSaveable: false,
  isNotSaveable: function () {
    return !this.get('isSaveable');
  }.property('isSaveable')
});


//***************************************************************************
// Model
//***************************************************************************
App.Location = DS.Model.extend({
  name: DS.attr('string'),
  latitude: DS.attr('number'),
  longitude: DS.attr('number'),
  added: DS.attr('date')
});


//***************************************************************************
// Views
//***************************************************************************

App.MapView = Ember.View.extend({
  classNames: ['map-container'],
  didInsertElement: function () {
    var mapOptions = {
      zoom: 15,
      center: new google.maps.LatLng(42.366604, -71.208291),
      mapTypeId: google.maps.MapTypeId.ROADMAP
    },
    bounds = new google.maps.LatLngBounds();

    googleMapsMap = new google.maps.Map(this.$()[0], mapOptions);

    this.get('controller').get('model').get('content').forEach(function (item) {
      latlng =  new google.maps.LatLng(item.get('latitude'), item.get('longitude'));

      marker = new google.maps.Marker({
        animation: google.maps.Animation.DROP,
        map: googleMapsMap,
        position: latlng
      });
      bounds.extend(latlng);
    });

    googleMapsMap.fitBounds(bounds);
  }
});

App = Ember.Application.create({
  LOG_TRANSITIONS: true
});

//***************************************************************************
// Routes
//***************************************************************************
App.Router.map(function () {
  this.resource('playces', { path: '/' }, function () {
    this.resource('playce', { path: 'playces/:playce_id' });
    this.route('new');
  });
});

App.PlaycesRoute = Ember.Route.extend({
  model: function () {
    return this.store.find('location');
  }
});

App.PlaycesIndexRoute = Ember.Route.extend({
  model: function () {
    return this.modelFor('playces');
  }
});

App.PlaycesNewRoute = Ember.Route.extend({
  setupController: function (controller, model) {
    controller.set('content', {});
  }
});

//***************************************************************************
// Controllers
//***************************************************************************
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

App.PlaycesNewController = Ember.ObjectController.extend({
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
      zoom: 10,
      center: new google.maps.LatLng(42.366604, -71.208291),
      mapTypeId: google.maps.MapTypeId.ROADMAP
    },
    bounds = new google.maps.LatLngBounds();

    googleMapsMap = new google.maps.Map(this.$()[0], mapOptions);
    this.get('controller').set('googleMapsMap', googleMapsMap);
    this.get('controller').set('googleMapsBounds', bounds);
  }
});

App.MarkerView = Ember.View.extend({
  didInsertElement: function () {
    var map = this.get('controller').get('googleMapsMap'),
    bounds = this.get('controller').get('googleMapsBounds'),
    context = this.get('context'),
    marker,
    infoWindow,
    latlng = new google.maps.LatLng(context.get('latitude'), context.get('longitude'));

    marker = new google.maps.Marker({
      animation: google.maps.Animation.DROP,
      map: map,
      position: latlng
    });

    infoWindow = new google.maps.InfoWindow({
      content: context.get('name') + '<br>(' + context.get('latitude') + ', ' + context.get('longitude') + ')'
    });

    this.set('googleMapsMarker', marker);

    google.maps.event.addListener(marker, 'click', function () {
      infoWindow.open(map, marker);
    });

    bounds.extend(latlng);
    map.fitBounds(bounds);
  },

  willDestroyElement: function () {
    this.get('googleMapsMarker').setMap(null);
  }
});

App = Ember.Application.create({
  LOG_TRANSITIONS: true
});

//***************************************************************************
// Routes
//***************************************************************************
App.Router.map(function() {
  // put your routes here
  this.route('add');
});

App.ApplicationRoute = Ember.Route.extend({
    model: function(){
        return this.store.find('location');
    }
});

App.AddRoute = Ember.Route.extend({
    model: function(){
        return this.store.find('location');
    }
});

App.IndexRoute = Ember.Route.extend({
    model: function() {
        return this.store.find('location');
    }
});

//***************************************************************************
// Controllers
//***************************************************************************
App.ApplicationControler = Ember.Controller.extend({

});

App.AddController = Ember.ObjectController.extend({
    isSaveable: false,
    actions: {
        getCoordinates: function(){
            var self = this;
            navigator.geolocation.getCurrentPosition(function(position) {
                self.set('newLongitude', position.coords.longitude);
                self.set('newLatitude', position.coords.latitude);
                self.set('isSaveable', true);
            });
        },
        saveLocation: function() {
            var newLocation = this.store.createRecord('location', {
                name: this.get('newLocationName'),
                latitude: this.get('newLatitude'),
                longitude: this.get('newLongitude')
            });

            newLocation.save();

            this.transitionToRoute('index');
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


//***************************************************************************
// Views
//***************************************************************************

App.MapView = Ember.View.extend({
    contextBinding: "parentView.content",
    didInsertElement: function () {

        this.$().css({ height: 200 });


        var mapOptions = {
            zoom: 15,
            center: new google.maps.LatLng(42.366604, -71.208291),
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };

        googleMapsMap = new google.maps.Map(this.$()[0], mapOptions);


        this.get('controller').get('model').get('content').forEach(function(item){
           console.log(item.get('latitude'));


                 latlng =  new google.maps.LatLng(item.get('latitude'), item.get('longitude'));

                  marker = new google.maps.Marker({
                    animation: google.maps.Animation.DROP,
                    map: googleMapsMap,
                    position: latlng
                  });

        });

    }

});
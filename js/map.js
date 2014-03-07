App.Map = (function () {
  'use strict';

  var self = {},
  googleMapsMap,
  drawMarkers,
  center,
  playces;

  playces = [
  {
    name: 'keys',
    location: {
      latitude: 42.366604,
      longitude: -71.208291
    }
  }
  ];

  drawMarkers = function () {
    var latlng;
    for (var i = 0; i < playces.length; i++) {
      latlng =  new google.maps.LatLng(playces[i].latitude, playces[i].longitude);

      new google.maps.Marker({
        animation: google.maps.Animation.DROP,
        icon: {
          url: 'http://placehold.it/10x10',
          scaledSize: new google.maps.Size(28, 33)
        },
        map: googleMapsMap,
        position: latlng,
        title: playces[i].name
      });
    }
  };

  center = new google.maps.LatLng([42.366604, -71.208291]);

  var mapOptions = {
    zoom: 15,
    center: center,
    mapTypeId: google.maps.MapTypeId.ROADMAP
  };

  googleMapsMap = new google.maps.Map(document.getElementById('map-view'), mapOptions);
  drawMarkers(playces);

  return self;
})();

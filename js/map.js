App.Map = (function () {
  'use strict';

  var self = {},
  googleMapsMap,
  drawMarkers,
  center,
  playces;

  drawMarkers = function () {
    var latlng,
    marker;

    for (var i = 0; i < playces.length; i++) {
      latlng =  new google.maps.LatLng(playces[i].location.latitude, playces[i].location.longitude);

      marker = new google.maps.Marker({
        animation: google.maps.Animation.DROP,
        map: googleMapsMap,
        position: latlng
      });
    }
  };

  center = new google.maps.LatLng(42.366604, -71.208291);

  playces = [
  {
    name: 'keys',
    location: {
      latitude: 42.366604,
      longitude: -71.208291
    }
  }
  ];

  var mapOptions = {
    zoom: 15,
    center: center,
    mapTypeId: google.maps.MapTypeId.ROADMAP
  };

  googleMapsMap = new google.maps.Map(document.getElementById('map-view'), mapOptions);
  drawMarkers(playces);

  return self;
})();

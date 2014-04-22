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

Ember.TEMPLATES["application"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1, helper, options, self=this, helperMissing=helpers.helperMissing;

function program1(depth0,data) {
  
  
  data.buffer.push("Pla<span>y</span>ces");
  }

  data.buffer.push("<header class=\"app-header\">\n  <div class=\"container\">\n    ");
  stack1 = (helper = helpers['link-to'] || (depth0 && depth0['link-to']),options={hash:{
    'class': ("logo")
  },hashTypes:{'class': "STRING"},hashContexts:{'class': depth0},inverse:self.noop,fn:self.program(1, program1, data),contexts:[depth0],types:["STRING"],data:data},helper ? helper.call(depth0, "playces", options) : helperMissing.call(depth0, "link-to", "playces", options));
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n  </div>\n</header>\n\n<div class=\"container\">\n  ");
  stack1 = helpers._triageMustache.call(depth0, "outlet", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n</div>\n");
  return buffer;
  
});

Ember.TEMPLATES["playce"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1, helper, options, self=this, helperMissing=helpers.helperMissing;

function program1(depth0,data) {
  
  
  data.buffer.push("&laquo; Back");
  }

  stack1 = (helper = helpers['link-to'] || (depth0 && depth0['link-to']),options={hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(1, program1, data),contexts:[depth0],types:["STRING"],data:data},helper ? helper.call(depth0, "playces", options) : helperMissing.call(depth0, "link-to", "playces", options));
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n<h2>");
  stack1 = helpers._triageMustache.call(depth0, "name", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("</h2>\n\n<p>\n  <strong>Latitude:</strong> ");
  stack1 = helpers._triageMustache.call(depth0, "latitude", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("<br>\n  <strong>Longitude:</strong> ");
  stack1 = helpers._triageMustache.call(depth0, "longitude", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n</p>\n");
  return buffer;
  
});

Ember.TEMPLATES["playces"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1, escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = '';
  data.buffer.push("\n  ");
  data.buffer.push(escapeExpression(helpers.view.call(depth0, "App.MarkerView", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data})));
  data.buffer.push("\n");
  return buffer;
  }

  data.buffer.push(escapeExpression(helpers.view.call(depth0, "App.MapView", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data})));
  data.buffer.push("\n\n");
  stack1 = helpers.each.call(depth0, {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(1, program1, data),contexts:[],types:[],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n\n");
  stack1 = helpers._triageMustache.call(depth0, "outlet", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n");
  return buffer;
  
});

Ember.TEMPLATES["playces/index"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1, helper, options, self=this, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;

function program1(depth0,data) {
  
  
  data.buffer.push("+ Add New Playce");
  }

function program3(depth0,data) {
  
  var buffer = '', stack1, helper, options;
  data.buffer.push("\n      <tr>\n        <td>");
  stack1 = (helper = helpers['link-to'] || (depth0 && depth0['link-to']),options={hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(4, program4, data),contexts:[depth0,depth0],types:["STRING","ID"],data:data},helper ? helper.call(depth0, "playce", "", options) : helperMissing.call(depth0, "link-to", "playce", "", options));
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("</td>\n        <td>");
  stack1 = helpers._triageMustache.call(depth0, "latitude", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("</td>\n        <td>");
  stack1 = helpers._triageMustache.call(depth0, "longitude", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("</td>\n        <td><a href=\"#\" ");
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "remove", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["STRING"],data:data})));
  data.buffer.push(">Delete</a></td>\n      </tr>\n      ");
  return buffer;
  }
function program4(depth0,data) {
  
  var stack1;
  stack1 = helpers._triageMustache.call(depth0, "name", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  else { data.buffer.push(''); }
  }

function program6(depth0,data) {
  
  var buffer = '', stack1, helper, options;
  data.buffer.push("\n      <tr>\n        <td colspan=\"4\">\n          <em>No places yet.</em> ");
  stack1 = (helper = helpers['link-to'] || (depth0 && depth0['link-to']),options={hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(7, program7, data),contexts:[depth0],types:["STRING"],data:data},helper ? helper.call(depth0, "playces.new", options) : helperMissing.call(depth0, "link-to", "playces.new", options));
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n        </td>\n      </tr>\n      ");
  return buffer;
  }
function program7(depth0,data) {
  
  
  data.buffer.push("Add a new playce.");
  }

  data.buffer.push("<h2>Playces (");
  stack1 = helpers._triageMustache.call(depth0, "model.length", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push(")</h2>\n\n");
  stack1 = (helper = helpers['link-to'] || (depth0 && depth0['link-to']),options={hash:{
    'class': ("button helper")
  },hashTypes:{'class': "STRING"},hashContexts:{'class': depth0},inverse:self.noop,fn:self.program(1, program1, data),contexts:[depth0],types:["STRING"],data:data},helper ? helper.call(depth0, "playces.new", options) : helperMissing.call(depth0, "link-to", "playces.new", options));
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n\n<div class=\"table-container\">\n  <table>\n    <thead>\n      <tr>\n        <th>Name</th>\n        <th>Latitude</th>\n        <th>Longitude</th>\n        <th></th>\n      </tr>\n    </thead>\n    <tbody>\n      ");
  stack1 = helpers.each.call(depth0, {hash:{
    'itemController': ("playce")
  },hashTypes:{'itemController': "STRING"},hashContexts:{'itemController': depth0},inverse:self.program(6, program6, data),fn:self.program(3, program3, data),contexts:[],types:[],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n    </tbody>\n  </table>\n</div>\n");
  return buffer;
  
});

Ember.TEMPLATES["playces/new"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1, helper, options, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  
  data.buffer.push("Cancel");
  }

  data.buffer.push("<h2>Add New Playce</h2>\n\n<div class=\"form-group span8\">\n  ");
  data.buffer.push(escapeExpression((helper = helpers.input || (depth0 && depth0.input),options={hash:{
    'type': ("text"),
    'placeholder': ("Playce Name"),
    'value': ("name")
  },hashTypes:{'type': "STRING",'placeholder': "STRING",'value': "ID"},hashContexts:{'type': depth0,'placeholder': depth0,'value': depth0},contexts:[],types:[],data:data},helper ? helper.call(depth0, options) : helperMissing.call(depth0, "input", options))));
  data.buffer.push("\n</div>\n\n<div class=\"row\">\n  <div class=\"span4\">\n    ");
  data.buffer.push(escapeExpression((helper = helpers.input || (depth0 && depth0.input),options={hash:{
    'class': ("isGettingCoordinates:loading"),
    'type': ("text"),
    'placeholder': ("Longitude"),
    'value': ("latitude")
  },hashTypes:{'class': "ID",'type': "STRING",'placeholder': "STRING",'value': "ID"},hashContexts:{'class': depth0,'type': depth0,'placeholder': depth0,'value': depth0},contexts:[],types:[],data:data},helper ? helper.call(depth0, options) : helperMissing.call(depth0, "input", options))));
  data.buffer.push("\n  </div>\n  <div class=\"span4\">\n    ");
  data.buffer.push(escapeExpression((helper = helpers.input || (depth0 && depth0.input),options={hash:{
    'class': ("isGettingCoordinates:loading"),
    'type': ("text"),
    'placeholder': ("Longitude"),
    'value': ("longitude")
  },hashTypes:{'class': "ID",'type': "STRING",'placeholder': "STRING",'value': "ID"},hashContexts:{'class': depth0,'type': depth0,'placeholder': depth0,'value': depth0},contexts:[],types:[],data:data},helper ? helper.call(depth0, options) : helperMissing.call(depth0, "input", options))));
  data.buffer.push("\n  </div>\n  <div class=\"span4\">\n    <button class=\"button button-secondary\" ");
  data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {hash:{
    'disabled': ("isGettingCoordinates")
  },hashTypes:{'disabled': "ID"},hashContexts:{'disabled': depth0},contexts:[],types:[],data:data})));
  data.buffer.push(" ");
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "getCoordinates", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["STRING"],data:data})));
  data.buffer.push(">Get My Coordinates</button>\n  </div>\n</div>\n\n<div class=\"form-group\">\n  <ul class=\"list-inline\">\n    <li><button class=\"button\" ");
  data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {hash:{
    'disabled': ("isNotSaveable")
  },hashTypes:{'disabled': "ID"},hashContexts:{'disabled': depth0},contexts:[],types:[],data:data})));
  data.buffer.push(" ");
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "saveLocation", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["STRING"],data:data})));
  data.buffer.push(">Save Location</button></li>\n    <li>");
  stack1 = (helper = helpers['link-to'] || (depth0 && depth0['link-to']),options={hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(1, program1, data),contexts:[depth0],types:["STRING"],data:data},helper ? helper.call(depth0, "playces", options) : helperMissing.call(depth0, "link-to", "playces", options));
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("</li>\n  </ul>\n</div>\n");
  return buffer;
  
});
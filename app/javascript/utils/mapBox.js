/* global mapboxgl */

// TODO: Reactify

export function buildMap (lng = -4.148052, lat = 50.382439, zoom = 15) {
  mapboxgl.accessToken = 'pk.eyJ1IjoiamFtZXNtaWxuZXIiLCJhIjoiY2prNzA2aGprMWt0MTNydGhuMWs3NG13NSJ9.hRj9NRx4ROa0QDkT4t9XdQ';

  var map = new mapboxgl.Map({
    container: 'map', // container id
    style: 'mapbox://styles/mapbox/streets-v11', // stylesheet location
    //style: 'https://s3-eu-west-1.amazonaws.com/tiles.os.uk/styles/open-zoomstack-outdoor/style.json', // stylesheet location
    center: [lng, lat], // starting position [lng, lat]
    zoom // starting zoom
  });

  // Add zoom and rotation controls to the map.
  map.addControl(new mapboxgl.NavigationControl());

  map.addControl(new MapboxGeocoder({
    accessToken: mapboxgl.accessToken,
    mapboxgl: mapboxgl,
    countries: 'gb', // limit results to the UK
    zoom: 19
  }), 'bottom-left');

  map.on('style.load', function() {
    map.addSource('trees-data', {
      type: 'geojson',
      data: 'https://gis.thedata.place/api/v1/geojson/data_geom?geom_column=geom&columns=id%2C%20title%2C%20image_storage_url'
    });

    map.addLayer({
      'id': 'trees',
      'type': 'circle',
      'source': 'trees-data',
      'paint': {
        'circle-color': 'rgba(0, 153, 255,.5)',
        'circle-radius': 5,
        'circle-stroke-color': 'grey',
        'circle-stroke-width': 0.5
      }
    });

    // When a click event occurs near a marker icon, open a popup at the location of
    // the feature, with description HTML from its properties.

    var popup = new mapboxgl.Popup();

    map.on('click', 'trees', function(e) {
      var html = ''
      html += '<img src=' + e.features[0].properties.image_storage_url + ' class=popupImage>'
      html += "ID: " + e.features[0].properties.id;
      html += '<br>';
      html += e.features[0].properties.title;
      popup.setLngLat(e.lngLat).setHTML(html).addTo(map);
    });

    // Change the cursor to a pointer when the mouse is over the states layer.
    map.on('mouseenter', 'trees', function() {
      map.getCanvas().style.cursor = 'pointer';
    });

    // Change it back to a pointer when it leaves.
    map.on('mouseleave', 'trees', function() {
      map.getCanvas().style.cursor = '';
    });

    var layerList = document.getElementById('menu');
    var inputs = layerList.getElementsByTagName('input');

    function switchLayer(layer) {
      var layerId = layer.target.value
      map.setStyle('mapbox://styles/mapbox/' + layerId)
    }

    for (var i = 0; i < inputs.length; i++) {
      inputs[i].onclick = switchLayer;
    }
  })
}

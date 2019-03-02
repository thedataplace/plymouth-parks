// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, or any plugin's
// vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file. JavaScript code in this file should be added after the last require_* statement.
//
// Read Sprockets README (https://github.com/rails/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require rails-ujs
//= require activestorage
//= require turbolinks
//= require_tree .

function geo_success(position) {
  let { latitude, longitude } = position.coords
  latitude = latitude.toFixed(6)
  longitude = longitude.toFixed(6)

  console.log(latitude, longitude)

  document.getElementById('data_entry_latitude').value = latitude
  document.getElementById('data_entry_longitude').value = longitude
  const url = `https://maps.google.com?q=${latitude},${longitude}&t=k&output=embed`
  document.getElementById('map-link').src = url
}

function geo_error(event) {
  console.log(event)
  alert("Sorry, no position available.");
}

var geo_options = {}
//   enableHighAccuracy: true,
//   maximumAge        : 1000,
//   timeout           : 1000
// };

document.addEventListener("DOMContentLoaded", function(event) {
  if (window.location.href.match(/\/$/)) {
    const updateLocationButton = document.getElementById('get-coordinates')
    if ("geolocation" in navigator) {
      updateLocationButton.onclick = function() {
        navigator.geolocation.getCurrentPosition(geo_success, geo_error, geo_options)
      }
    } else {
      alert('Geo location is not available')
    }

    document.getElementById("data_entry_image").onchange = function () {
      var reader = new FileReader();
      reader.onload = function (e) {
        // get loaded data and render thumbnail.
        document.getElementById("image").src = e.target.result;
      };
      // read the image file as a data URL.
      reader.readAsDataURL(this.files[0]);
    };
  }
})

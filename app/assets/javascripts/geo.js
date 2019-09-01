// function geo_success(position) {
//   let { latitude, longitude } = position.coords
//   latitude = latitude.toFixed(6)
//   longitude = longitude.toFixed(6)
//
//   console.log(latitude, longitude)
//
//   document.getElementById('data_entry_latitude').value = latitude
//   document.getElementById('data_entry_longitude').value = longitude
//   const url = `https://maps.google.com?q=${latitude},${longitude}&t=k&output=embed`
//   document.getElementById('map-link').src = url
// }
//
// function geo_error(event) {
//   console.log(event)
//   alert("Sorry, no position available.");
// }
//
// var geo_options = {
//   enableHighAccuracy: true,
//   maximumAge: 0,
//   timeout: 5000
// };
//
// document.addEventListener("DOMContentLoaded", function(event) {
//   if (window.location.href.match(/\/$/)) {
//     const updateLocationButton = document.getElementById('get-coordinates')
//     if ("geolocation" in navigator) {
//       updateLocationButton.onclick = function() {
//         navigator.geolocation.getCurrentPosition(geo_success, geo_error, geo_options)
//       }
//     } else {
//       alert('Geo location is not available')
//     }
//
//     document.getElementById("data_entry_image").onchange = function () {
//       var reader = new FileReader();
//       reader.onload = function (e) {
//         // get loaded data and render thumbnail.
//         document.getElementById("image").src = e.target.result;
//       };
//       // read the image file as a data URL.
//       reader.readAsDataURL(this.files[0]);
//     };
//   }
// })

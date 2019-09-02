/* global window */

export function addFileToWindowImages (storageKey, file) {
  window.formData.images[storageKey] = file
}

export function getFileFromWindowImages (storageKey) {
  return window.formData.images[storageKey]
}

// export function addCoordinatesToWindowData (coordinates) {
//   window.formData.coordinates = coordinates
// }
//
// export function getCoordinatesFromWindowData () {
//   return window.formData.coordinates
// }

export function addFileToWindowImages (storageKey, file) {
  window.images[storageKey] = file
}

export function getFileFromWindowImages (storageKey) {
  return window.images[storageKey]
}

export function csrfToken () {
  const $token = document.querySelector('meta[name="csrf-token"]')
  if ((window.location.pathname === 'blank') || (!$token)) return ''
  return $token.getAttribute('content')
}

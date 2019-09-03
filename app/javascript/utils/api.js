export function csrfToken () {
  const $token = document.querySelector('meta[name="csrf-token"]')
  if ((window.location.pathname === 'blank') || (!$token)) return ''
  return $token.getAttribute('content')
}

export function headers () {
  return {
    'Accepts': 'application/json',
    'X-CSRF-Token': csrfToken()
  }
}

export function saveDataEntry (body) {
  return fetch('/api/v1/data_entries', {
    method: 'POST',
    credentials: 'include',
    headers: headers(),
    body
  })
}

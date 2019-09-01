import { csrfToken } from './utils'

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

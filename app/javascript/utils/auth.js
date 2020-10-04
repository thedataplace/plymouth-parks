export function isFeatureEnabled (featureName) {
  return window.FEATURE_FLAGS.filter(({ name, active }) => {
    return name === featureName && active === true
  }).length === 1
}

export function isLoggedIn () {
  return !!window.CURRENT_USER
}

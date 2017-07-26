export function getBaseUrl() {
  return getQueryStringParameterByName('useMockApi') ? 'http://localhost:8090/' : '/'
}

function getQueryStringParameterByName(name) {
  const url = window.location.href
  name = name.replace('/[[]]/g', '\\$&')
  const regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)')
  const results = regex.exec(url)
  if(!results) return null
  if(!results[2]) return ''
  return decodeURIComponent(results[2].replace('/+/g', ' '))
}